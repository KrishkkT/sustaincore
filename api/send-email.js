import nodemailer from 'nodemailer';
import { welcomeTemplate, articleTemplate } from '../src/utils/email-templates.js';

export default async function handler(request, response) {
    if (request.method !== 'POST') {
        response.setHeader('Allow', ['POST']);
        return response.status(405).end(`Method ${request.method} Not Allowed`);
    }

    const { subject, html, testEmail, templateType, articleData, subscriberEmail } = request.body;

    // Resend Configuration (Professional SMTP for Newsletters)
    const RESEND_API_KEY = process.env.RESEND_API_KEY;

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
    if (!RESEND_API_KEY) {
        return response.status(200).json({
            success: true,
            isMock: true,
            message: "Developer Mode Simulation (No RESEND_API_KEY located in environment)."
        });
    }

    try {
        // 1. Initialize Nodemailer Transporter via Resend API
        console.log(`[SMTP TRACE] Connecting to Resend Network...`);
        const transporter = nodemailer.createTransport({
            host: 'smtp.resend.com',
            port: 465,
            secure: true,
            auth: {
                user: 'resend', // Resend requires the literal string 'resend' as the user
                pass: RESEND_API_KEY // Your secret key
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
            from: {
                name: 'SustainCore Intelligence',
                address: 'newsletter@sustaincore.in'
            },
            sender: 'newsletter@sustaincore.in',
            replyTo: 'noreply@sustaincore.in',
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
