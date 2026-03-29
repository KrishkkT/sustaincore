export default async function handler(request, response) {
    if (request.method !== 'POST') {
        response.setHeader('Allow', ['POST']);
        return response.status(405).end(`Method ${request.method} Not Allowed`);
    }

    const { rawText } = request.body;

    if (!rawText || rawText.length < 10) {
        return response.status(400).json({ success: false, error: "Raw text must be at least 10 characters." });
    }

    // Groq Configuration (Ultra-fast inference)
    const GROQ_API_KEY = process.env.GROQ_API_KEY;

    if (!GROQ_API_KEY) {
        // High-Fidelity Mock for Engineering Confidence
        return response.status(200).json({
            success: true,
            isMock: true,
            data: {
                title: "[AI MOCK] THE 2026 METHANE DELTA: REGULATORY INFRASTRUCTURE RISKS",
                description: "Deep-dive analysis of the impending methane emission threshold updates and their impact on global transmission networks.",
                content: "# I. CONTEXT & GLOBAL BENCHMARKS\nThe 2026 Methane Delta represents a critical shift in how industrial methane leakage is reported and taxed at the source. Historically, global benchmarks have focused on aggregate volumetric loss; however, the new standard enforces real-time nodal monitoring with a ±2% precision threshold. This transition is a key step towards the EU's 2030 decarbonization goals and requires immediate action from O&G infrastructure providers.\n\n# II. TECHNICAL RISK ASSESSMENT\nOur analysis identifies three critical technical risks: 1) Sensory drift in legacy scada systems, 2) Data latency in cross-border reporting pipelines, and 3) Calibration gaps in infrared monitoring arrays. If these are not addressed, companies face a 12% increase in non-compliance penalties and a significant loss in 'Green Tier' financing eligibility.\n\n# III. OPERATIONAL ROADMAP\n1. Initial Audit: Conduct a baseline precision test of all Grade 1 sensory nodes. 2. Implementation: Deploy AI-driven calibration software to reduce sensory drift by 80%. 3. Integration: Synchronize report logs with the SustainCore Intelligence Hub. 4. Redundancy: Install secondary IR arrays at all high-pressure transmission points. 5. Validation: Run a 30-day stress test against the new 2% precision mandate.\n\n# IV. FINANCIAL & ESG IMPACT\nStrategic compliance with the Methane Delta will directly improve the carbon-intensity profile of the enterprise, potentially unlocking up to $40M in additional carbon credits per annum. More importantly, it secures long-term capital efficiency by reducing unmeasured product loss by a projected 14.5% over the next decade. SustainCore remains the definitive partner for this technical transition."
            }
        });
    }

    try {
        const aiResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${GROQ_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: [
                    {
                        role: "system",
                        content: `You are a Senior Environmental Strategist at SustainCore Intelligence Units. Your mission is to transform brief technical inputs into authoritative, multi-page Technical Briefings for C-Suites. 

Output ONLY a JSON object with these keys:
1. "title": A definitive, professional headline (e.g., "Methane Compliance: The 2026 Regulatory Delta").
2. "description": A high-impact executive summary (max 180 chars).
3. "content": A LONG-FORM, detailed professional article (min 500-800 words). Use double newlines for paragraphs. 

The "content" field MUST follow this strict structural layout:
# I. CONTEXT & GLOBAL BENCHMARKS
(Provide 2 detailed paragraphs on current standards and historical data).
# II. TECHNICAL RISK ASSESSMENT
(Analyze 3 specific technical risks or regulatory gaps).
# III. OPERATIONAL ROADMAP
(Provide a 5-step detailed plan for mitigation).
# IV. FINANCIAL & ESG IMPACT
(Discuss long-term capital efficiency and carbon credits).

NOTE: If the input is short, use your vast internal knowledge of ESG and Sustainability to expand it into a full, technically accurate analysis. NEVER provide short or generic filler content.`
                    },
                    { role: "user", content: `Transform this raw intelligence: ${rawText}` }
                ],
                temperature: 0.5,
                response_format: { type: "json_object" }
            })
        });

        const data = await aiResponse.json();
        const content = data.choices[0].message.content;

        return response.status(200).json({
            success: true,
            data: JSON.parse(content)
        });

    } catch (error) {
        console.error("Groq AI Error:", error);
        return response.status(500).json({ success: false, error: "Failed to reach Groq AI service." });
    }
}
