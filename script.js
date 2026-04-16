// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Lightbox for report gallery
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.getElementById('lightbox-close');

    if (lightbox) {
        document.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('click', function() {
                lightboxImg.src = this.dataset.src;
                lightboxImg.alt = this.querySelector('img').alt;
                lightboxCaption.textContent = this.dataset.caption;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        function closeLightbox() {
            lightbox.classList.remove('active');
            lightboxImg.src = '';
            document.body.style.overflow = '';
        }

        lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) closeLightbox();
        });
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') closeLightbox();
        });
    }

    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });

    // Sample Report Form Handling
    const sampleReportForm = document.getElementById('sampleReportForm');
    if (sampleReportForm) {
        sampleReportForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const submitButton = sampleReportForm.querySelector('button[type="submit"]');
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;

            const formData = new FormData(sampleReportForm);

            try {
                const response = await fetch(sampleReportForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    showSampleAlert("Thank you! Check your inbox—we'll send the sample report shortly.", 'success');
                    sampleReportForm.reset();
                } else {
                    showSampleAlert('Oops! There was a problem. Please try again.', 'error');
                }
            } catch (error) {
                showSampleAlert('Oops! There was a problem. Please try again.', 'error');
            }

            submitButton.textContent = 'Send Me the Sample Report';
            submitButton.disabled = false;
        });
    }

    // Form Handling - Formspree
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const submitButton = contactForm.querySelector('button[type="submit"]');
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;

            const formData = new FormData(contactForm);

            try {
                const response = await fetch('https://formspree.io/f/mqedebry', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    showAlert("Thank you! Your message has been sent. We'll be in touch soon!", 'success');
                    contactForm.reset();
                } else {
                    showAlert('Oops! There was a problem sending your message. Please try again.', 'error');
                }
            } catch (error) {
                showAlert('Oops! There was a problem sending your message. Please try again.', 'error');
            }

            submitButton.textContent = 'Send Message';
            submitButton.disabled = false;
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});

// Alert function for sample report form
function showSampleAlert(message, type) {
    const existingAlert = document.querySelector('.sample-alert');
    if (existingAlert) existingAlert.remove();

    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-' + type + ' sample-alert';
    alertDiv.textContent = message;

    const form = document.getElementById('sampleReportForm');
    if (form) form.parentNode.insertBefore(alertDiv, form);

    setTimeout(() => alertDiv.remove(), 6000);
}

// Alert function
function showAlert(message, type) {
    const existingAlert = document.querySelector('.alert');
    if (existingAlert) existingAlert.remove();

    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-' + type;
    alertDiv.textContent = message;

    const form = document.getElementById('contactForm');
    form.parentNode.insertBefore(alertDiv, form);

    setTimeout(() => {
        alertDiv.remove();
    }, 6000);
}
