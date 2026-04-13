// Run immediately since module scripts are inherently deferred and DOM is ready
(() => {
    const contactForm = document.getElementById('contact-form');

    // Create Modal Structure if not exists
    let modalOverlay = document.getElementById('feedback-modal');
    if (!modalOverlay) {
        modalOverlay = document.createElement('div');
        modalOverlay.id = 'feedback-modal';
        modalOverlay.className = 'modal-overlay';
        modalOverlay.innerHTML = `
            <div class="modal-content">
                <div id="modal-icon-container" class="modal-icon"></div>
                <h3 id="modal-title" class="modal-title"></h3>
                <p id="modal-message" class="modal-message"></p>
                <button type="button" class="modal-btn" onclick="document.getElementById('feedback-modal').classList.remove('active')">Acknowledge</button>
            </div>
        `;
        document.body.appendChild(modalOverlay);
    }

    const showModal = (type, title, message) => {
        const iconContainer = document.getElementById('modal-icon-container');
        const titleEl = document.getElementById('modal-title');
        const messageEl = document.getElementById('modal-message');

        titleEl.textContent = title;
        messageEl.textContent = message;

        // Set Icon based on type
        if (type === 'success') {
            iconContainer.className = 'modal-icon success';
            iconContainer.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
        } else {
            iconContainer.className = 'modal-icon error';
            iconContainer.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;
        }

        modalOverlay.classList.add('active');

        // Auto close success after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                modalOverlay.classList.remove('active');
            }, 5000);
        }
    };

    const handleFormSubmission = async (form, targetEmail, successTitle, successMessage) => {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        submitBtn.textContent = 'Processing...';
        submitBtn.disabled = true;

        try {
            const endpoint = `https://formsubmit.co/ajax/${targetEmail}`;

            const response = await fetch(endpoint, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (!response.ok) throw new Error('Network response was not ok');

            showModal('success', successTitle, successMessage.replace('{email}', data.email || 'your address'));
            form.reset();
        } catch (error) {
            console.error('Submission failed:', error);
            showModal('error', 'Transmission Failed', 'A network interruption prevented your mandate from reaching our systems. Please attempt direct correspondence.');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    };

    document.addEventListener('submit', async (e) => {
        const form = e.target;
        
        // 1. Handle Contact Form
        if (form.id === 'contact-form') {
            e.preventDefault();
            handleFormSubmission(
                form,
                'support@sustaincore.in',
                'Mandate Dispatched',
                'Your communication has been successfully routed to SustainCore. We will contact you at {email} within 24 business hours.'
            );
            return;
        }

        // 2. Handle Partners Form
        if (form.id === 'partners-form') {
            e.preventDefault();
            handleFormSubmission(
                form,
                'partners@sustaincore.in',
                'Partnership Enquiry Received',
                'Thank you for your interest. A member of our partnership team will reach out to you within 3 business days.'
            );
            return;
        }

        // 3. Handle Subscribe & Newsletter Forms
        if (form.id === 'subscribe-form' || form.id === 'newsletter-form') {
            e.preventDefault();
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Processing...';
            submitBtn.disabled = true;

            try {
                const formData = new FormData(form);
                const email = formData.get('email');
                
                const response = await fetch('/api/subscribe', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email })
                });

                if (!response.ok) throw new Error('API Error');

                showModal('success', 'Subscription Success', `Your email (${email}) has been added to our circular. You will receive the SustainCore quarterly update starting this week.`);
                form.reset();
            } catch (error) {
                console.error('Subscription failed:', error);
                showModal('error', 'Transmission Failed', 'A network interruption prevented your subscription from reaching our systems.');
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
            return;
        }
    });

})();
