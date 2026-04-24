export default async function handler(request, response) {
    if (request.method !== 'POST') {
        response.setHeader('Allow', ['POST']);
        return response.status(405).end(`Method ${request.method} Not Allowed`);
    }

    const { rawText } = request.body;

    if (!rawText || rawText.length < 10) {
        return response.status(400).json({ success: false, error: "Raw text must be at least 10 characters." });
    }

    const GROQ_API_KEY = process.env.GROQ_API_KEY;

    if (!GROQ_API_KEY) {
        return response.status(200).json({
            success: true,
            isMock: true,
            data: {
                title: "[AI MOCK] THE 2026 METHANE DELTA: REGULATORY INFRASTRUCTURE RISKS",
                description: "Deep-dive analysis of the impending methane emission threshold updates and their impact on global transmission networks.",
                content: `# I. CONTEXT & GLOBAL BENCHMARKS
The **2026 Methane Delta** represents a tectonic shift in industrial emission standards. Historically, the oil and gas sector operated under volumetric estimations that often underreported actual leakage by up to **25%**. 

# II. TECHNICAL RISK ASSESSMENT
**Sensory Drift** is the primary technical failure point in legacy SCADA systems. Over time, chemical sensors exposed to harsh environmental conditions lose their calibration accuracy, leading to **False Compliance** reports. 

# III. OPERATIONAL ROADMAP
1. **Precision Audit**: Deploy mobile monitoring teams to calibrate all **Grade 1** sensors.
2. **AI Layer Integration**: Install SustainCore’s predictive drift software.
3. **Real-time Sync**: Connect all local PLC controllers to the cloud-based **Intelligence Hub**.
4. **Hardware Redundancy**: Implement secondary infrared arrays.
5. **Certification**: Finalize the **Net-Zero Compliance Shield** audit.

# IV. FINANCIAL & ESG IMPACT
Transitioning to the Methane Delta standard can unlock an estimated **$40M per annum** in high-value carbon credits. 

# V. EXECUTIVE KEY TAKEAWAYS
- Takeaway 1: Real-time nodal monitoring is no longer optional; it is a **Regulatory Mandate** that will be enforced starting Q1 2026. Companies failing to comply face immediate suspension of their green energy subsidies.
- Takeaway 2: AI-driven calibration can extend sensor life by **300%** while maintaining ±1% precision, significantly reducing long-term maintenance costs.
- Takeaway 3: Failure to bridge the methane data gap could result in **$10M+** in annual non-compliance fees and a severe drop in 'Green Tier' investor ratings.
- Takeaway 4: Carbon credits are now strictly tied to **Direct Measurement** rather than volumetric modeling, rewarding companies with superior sensor infrastructure.
- Takeaway 5: SustainCore's technical roadmap provides a **12-month** path to total methane neutrality, securing your competitive advantage in the new carbon economy.`,
                imageUrl: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=1000"
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
                        content: `You are a Lead Sustainability Analyst at SustainCore. transform technical inputs into an EXTREMELY DETAILED, LONG-FORM Technical Briefing.

Output ONLY a JSON object with these keys:
1. "title": Headline.
2. "description": Summary.
3. "category": Category.
4. "content": A MASSIVE technical article (1500-2000 words). Use double newlines for paragraphs. Use **bolding** for metrics.
5. "imageUrl": Pick from VERIFIED list (DO NOT hallucinate URLs):
   - https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=1000
   - https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000
   - https://images.unsplash.com/photo-1509391366360-fe5bb58583bb?q=80&w=1000
   - https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1000

The "content" field MUST follow this structure:
# I. GLOBAL CONTEXT & COMPLIANCE BENCHMARKS
# II. TECHNICAL RISK ASSESSMENT & ENGINEERING GAPS
# III. OPERATIONAL ROADMAP & IMPLEMENTATION
# IV. FINANCIAL & ESG IMPACT ANALYSIS
# V. EXECUTIVE KEY TAKEAWAYS
- Takeaway 1: (Detailed 4-sentence paragraph).
- Takeaway 2: (Detailed 4-sentence paragraph).
- Takeaway 3: (Detailed 4-sentence paragraph).
- Takeaway 4: (Detailed 4-sentence paragraph).
- Takeaway 5: (Detailed 4-sentence paragraph).

NOTE: Section V MUST have exactly 5 detailed paragraphs. Avoid generic filler. Use your deep knowledge of ESG and GRI standards.`
                    },
                    { role: "user", content: `Transform this raw intelligence: ${rawText}` }
                ],
                temperature: 0.5,
                response_format: { type: "json_object" }
            })
        });

        if (!aiResponse.ok) {
            const errorText = await aiResponse.text();
            console.error(`[Groq API Error] Status: ${aiResponse.status}`, errorText);
            throw new Error(`AI Service Error: ${aiResponse.status}`);
        }

        const data = await aiResponse.json();
        
        if (!data.choices || !data.choices[0]) {
            throw new Error("AI returned an empty or malformed response.");
        }

        const content = data.choices[0].message.content;
        return response.status(200).json({
            success: true,
            data: JSON.parse(content)
        });

    } catch (error) {
        console.error("Critical AI Bridge Failure:", error.message);
        return response.status(500).json({ success: false, error: error.message });
    }
}
