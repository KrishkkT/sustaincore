/**
 * SustainCore Intelligence Email Templates
 * Premium HTML designs for automated communications.
 */

const baseStyles = `
    font-family: 'Inter', -apple-system, sans-serif;
    line-height: 1.6;
    color: #ffffff;
    background-color: #0B0E14;
    padding: 40px;
    border-radius: 24px;
`;

export const welcomeTemplate = (email) => `
    <div style="${baseStyles}">
        <div style="margin-bottom: 40px;">
            <h1 style="font-family: 'Outfit', sans-serif; font-size: 24px; font-weight: 900; letter-spacing: -0.05em; color: #ffffff; margin: 0;">
                SUSTAIN<span style="color: #0047FF;">CORE.</span>
            </h1>
            <p style="font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.3em; color: rgba(255,255,255,0.3); margin-top: 5px;">
                Technical Intelligence Access
            </p>
        </div>

        <h2 style="font-size: 32px; font-weight: 800; letter-spacing: -0.04em; color: #ffffff; margin-bottom: 24px;">
            Welcome to the <br/><span style="color: #00FF85; font-style: italic; font-weight: 300;">Mandate Grid.</span>
        </h2>

        <p style="color: rgba(255,255,255,0.7); font-size: 16px; margin-bottom: 32px;">
            Hello,<br/><br/>
            You have successfully activated your subscription to the **SustainCore Technical Brief**. As part of our global advisory network, you now have real-time access to our insights on CBAM, ESG reporting, and regional carbon border policies.
        </p>

        <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); border-radius: 16px; padding: 24px; margin-bottom: 40px;">
            <p style="font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; color: #0047FF; margin-bottom: 12px; margin-top: 0;">What to Expect</p>
            <ul style="color: rgba(255,255,255,0.5); font-size: 14px; margin: 0; padding-left: 20px;">
                <li style="margin-bottom: 8px;">Weekly regulatory pulse updates.</li>
                <li style="margin-bottom: 8px;">AI-optimized summaries of EU CBAM progress.</li>
                <li>Exclusive access to our technical data models.</li>
            </ul>
        </div>

        <a href="https://sustaincore.vercel.app/insights.html" style="display: inline-block; background-color: #0047FF; color: #ffffff; padding: 16px 32px; border-radius: 12px; text-decoration: none; font-weight: 700; font-size: 14px;">Visit Insights Portal</a>
        
        <p style="font-size: 11px; color: rgba(255,255,255,0.3); margin-top: 60px; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 24px;">
            SustainCore Advisory Group &copy; 2026<br/>
            Unsubscribe from this technical sequence.
        </p>
    </div>
`;

export const articleTemplate = (article) => {
    // Process markdown-style headers for the email
    const formattedContent = (article.content || article.description)
        .split('\n')
        .map(p => {
            if (p.startsWith('# ')) return `<h3 style="color: #0047FF; font-size: 18px; font-weight: 800; margin-top: 32px; border-bottom: 1px solid rgba(0,71,255,0.1); padding-bottom: 8px;">${p.replace('# ', '')}</h3>`;
            if (p.startsWith('## ')) return `<h4 style="color: #ffffff; font-size: 16px; font-weight: 700; margin-top: 24px;">${p.replace('## ', '')}</h4>`;
            return p.trim() ? `<p style="color: rgba(255,255,255,0.6); font-size: 15px; margin-bottom: 16px;">${p}</p>` : '';
        })
        .join('');

    return `
    <div style="${baseStyles}">
        <div style="margin-bottom: 40px;">
            <h1 style="font-family: 'Outfit', sans-serif; font-size: 24px; font-weight: 900; letter-spacing: -0.05em; color: #ffffff; margin: 0;">
                SUSTAIN<span style="color: #0047FF;">CORE.</span>
            </h1>
            <p style="font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.3em; color: rgba(255,255,255,0.3); margin-top: 5px;">
                Technical Flash Brief // ATTN: ${article.author || 'Member'}
            </p>
        </div>

        <div style="display: inline-block; background-color: rgba(0,255,133,0.1); color: #00FF85; padding: 4px 12px; border-radius: 20px; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 16px;">
            TECHNICAL ANALYSIS: ${article.category || 'Insight'}
        </div>

        <h2 style="font-size: 34px; font-weight: 800; letter-spacing: -0.04em; color: #ffffff; margin-bottom: 24px; line-height: 1.1;">
            ${article.title}
        </h2>

        <div style="background: rgba(255,255,255,0.02); border-left: 4px solid #0047FF; padding: 32px; border-radius: 0 16px 16px 0; margin-bottom: 48px;">
            <p style="color: #ffffff; font-size: 18px; font-weight: 600; margin: 0; line-height: 1.4;">
                ${article.description}
            </p>
        </div>

        <div style="padding-bottom: 40px;">
            ${formattedContent}
        </div>

        <div style="padding-top: 40px; border-top: 1px solid rgba(255,255,255,0.05);">
            <p style="font-size: 11px; color: rgba(255,255,255,0.3); line-height: 1.8; margin: 0;">
                AUTHENTICATION: TRANSMISSION ENCRYPTED // SustainCore Advisory Group &copy; 2026<br/>
                This technical briefing is intended for members of the ${article.category} network.
            </p>
        </div>
    </div>
    `;
};
