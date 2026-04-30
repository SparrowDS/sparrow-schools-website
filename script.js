// Google Analytics Event Tracking
const analyticsTracked = {
    scrollDepth: new Set(),
    galleryViewed: new Set()
};

// Track scroll depth
window.addEventListener('scroll', function() {
    const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

    [25, 50, 75, 100].forEach(milestone => {
        if (scrollPercentage >= milestone && !analyticsTracked.scrollDepth.has(milestone)) {
            analyticsTracked.scrollDepth.add(milestone);
            gtag('event', 'scroll_depth', {
                event_category: 'engagement',
                event_label: `${milestone}%`,
                value: milestone
            });
        }
    });
});

// Track schedule call CTA clicks
function trackScheduleCallClick() {
    gtag('event', 'schedule_call_click', {
        event_category: 'conversion',
        event_label: 'exploratory_call'
    });
}

// Track sample report/Google Drive link clicks
function trackSampleReportClick(source) {
    gtag('event', 'sample_report_view', {
        event_category: 'engagement',
        event_label: source || 'sample_report_link'
    });
}

// Track gallery item views
function trackGalleryView(caption) {
    if (!analyticsTracked.galleryViewed.has(caption)) {
        analyticsTracked.galleryViewed.add(caption);
        gtag('event', 'gallery_view', {
            event_category: 'engagement',
            event_label: caption || 'report_sample'
        });
    }
}

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
                trackGalleryView(this.dataset.caption);
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

    // Track schedule call CTA clicks (Google Calendar link)
    document.querySelectorAll('a[href*="calendar.app.google"]').forEach(link => {
        link.addEventListener('click', trackScheduleCallClick);
    });

    // Track sample report/Google Drive link clicks
    document.querySelectorAll('a[href*="drive.google.com/file"]').forEach(link => {
        link.addEventListener('click', function() {
            const source = this.closest('section')?.id || this.className || 'sample_report_link';
            trackSampleReportClick(source);
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
