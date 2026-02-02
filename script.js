// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });

    // Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });

            // Create mailto link
            const subject = encodeURIComponent(`Website Inquiry: ${data.service}`);
            const body = encodeURIComponent(
                `Name: ${data.name}\n` +
                `District: ${data.district}\n` +
                `Email: ${data.email}\n` +
                `Phone: ${data.phone || 'Not provided'}\n` +
                `Service Interest: ${data.service}\n\n` +
                `Message:\n${data.message}`
            );
            
            // Open mail client
            window.location.href = `mailto:david@sparrowdataservices.com?subject=${subject}&body=${body}`;
            
            // Show success message
            showAlert('Thank you! Your default email client should open. If not, please email us directly at david@sparrowdataservices.com', 'success');
            
            // Reset form
            contactForm.reset();
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

// Alert function
function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    
    const form = document.getElementById('contactForm');
    form.parentNode.insertBefore(alertDiv, form);
    
    setTimeout(() => {
        alertDiv.remove();
    }, 6000);
}
