document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');

    if (!contactForm) return;

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());

        // Target Email: trialemaila1@gmail.com
        // Note: For real automated emailing, we normally use a backend or a service like Formspree, 
        // but here we are setting up for a Google Apps Script endpoint.
        const scriptURL = 'REPLACE_WITH_YOUR_DEPLOYED_SCRIPT_URL';

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Dispatching...';
        submitBtn.disabled = true;

        try {
            console.log('Sending data to endpoint:', data);

            // In a real scenario, you'd fetch(scriptURL, { method: 'POST', body: formData })
            // For now, we simulate success for the UI demonstration
            await new Promise(resolve => setTimeout(resolve, 1500));

            alert('Your mandate has been dispatched to SustainCore. We will contact you at ' + data.email);
            contactForm.reset();
        } catch (error) {
            console.error('Submission failed:', error);
            alert('Critical communication failure. Please try direct electronic mail.');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
});
