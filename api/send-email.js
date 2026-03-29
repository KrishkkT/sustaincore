import nodemailer from 'nodemailer';
import { welcomeTemplate, articleTemplate } from '../src/utils/email-templates.js';

export default async function handler(request, response) {
    if (request.method !== 'POST') {
        response.setHeader('Allow', ['POST']);
        return response.status(405).end(`Method ${request.method} Not Allowed`);
    }

    const { subject, html, testEmail, templateType, articleData, subscriberEmail } = request.body;

    // Gmail SMTP Configuration
    const GMAIL_USER = process.env.GMAIL_USER;
    const GMAIL_PASS = process.env.GMAIL_PASS; // 16-digit App Password

    // Determine Final HTML
    let finalHtml = html;
    if (templateType === 'welcome') {
        finalHtml = welcomeTemplate(subscriberEmail);
    } else if (templateType === 'article') {
        finalHtml = articleTemplate(articleData);
    }

    if (!finalHtml) {
        return response.status(400).json({ success: false, error: "Content or Template Type required." });
    }

    // For prototyping without credentials
    if (!GMAIL_USER || !GMAIL_PASS) {
        return response.status(200).json({
            success: true,
            isMock: true,
            message: "Gmail SMTP simulated (No Credentials logged)."
        });
    }

    try {
        // 1. Initialize Nodemailer Transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: GMAIL_USER,
                pass: GMAIL_PASS
            }
        });

        // 2. Determine recipients
        let emails = [];
        if (testEmail) {
            emails = [testEmail];
        } else if (subscriberEmail) {
            emails = [subscriberEmail];
        } else {
            // Fetch all for broadcast
            const protocol = request.headers['x-forwarded-proto'] || 'http';
            const host = request.headers.host || 'localhost:3001';
            const origin = `${protocol}://${host}`;
            
            const subsRes = await fetch(`${origin}/api/subscribe`);
            const subsData = await subsRes.json();
            emails = subsData.data.map(s => s.email);
        }

        if (emails.length === 0) {
            return response.status(400).json({ success: false, error: "No recipients found for Gmail SMTP." });
        }

        // 3. Send Mail
        await transporter.sendMail({
            from: `"SustainCore Intelligence" <${GMAIL_USER}>`,
            to: emails.join(','), // Gmail allows comma-separated list
            subject: subject || (templateType === 'welcome' ? 'Welcome to SustainCore Intelligence' : 'Technical Flash Brief'),
            html: finalHtml
        });

        return response.status(200).json({
            success: true,
            count: emails.length,
            message: `Gmail SMTP flow executed for ${emails.length} nodes.`
        });

    } catch (error) {
        console.error("Gmail SMTP Error:", error);
        return response.status(500).json({ success: false, error: "Failed to process Gmail SMTP flow." });
    }
}
