document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileOverlay = document.querySelector('.mobile-nav-overlay');
    const closeMenu = document.querySelector('.close-menu');

    function openMobileMenu() {
        mobileNav.classList.add('active');
        mobileOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        mobileNav.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    mobileToggle.addEventListener('click', openMobileMenu);
    closeMenu.addEventListener('click', closeMobileMenu);
    mobileOverlay.addEventListener('click', closeMobileMenu);

    // Desktop dropdown functionality
    const desktopDropdownToggles = document.querySelectorAll('.desktop-nav .dropdown-toggle');

    desktopDropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const dropdown = this.closest('.dropdown');

            // Close all other dropdowns
            document.querySelectorAll('.dropdown').forEach(item => {
                if (item !== dropdown) {
                    item.classList.remove('active');
                    item.querySelector('.fa-chevron-down').style.transform = 'rotate(0)';
                }
            });

            // Toggle current dropdown
            dropdown.classList.toggle('active');
            const icon = this.querySelector('.fa-chevron-down');
            icon.style.transform = dropdown.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0)';
        });
    });

    // Mobile dropdown functionality
    const mobileDropdownToggles = document.querySelectorAll('.mobile-dropdown > a');

    mobileDropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const dropdown = this.parentElement;
            const menu = dropdown.querySelector('.mobile-dropdown-menu');
            const icon = this.querySelector('i');

            // Toggle current dropdown
            menu.classList.toggle('active');
            icon.style.transform = menu.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0)';
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        // Desktop dropdowns
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown').forEach(dropdown => {
                dropdown.classList.remove('active');
                const icon = dropdown.querySelector('.fa-chevron-down');
                if (icon) icon.style.transform = 'rotate(0)';
            });
        }

        // Mobile dropdowns
        if (!e.target.closest('.mobile-dropdown')) {
            document.querySelectorAll('.mobile-dropdown-menu').forEach(menu => {
                menu.classList.remove('active');
            });
            document.querySelectorAll('.mobile-dropdown i').forEach(icon => {
                icon.style.transform = 'rotate(0)';
            });
        }
    });

    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('.mobile-nav a:not(.dropdown-toggle)');
    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
});


document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality for mission/vision card
    const tabButtons = document.querySelectorAll('.mission-card .tab-btn');
    const tabContents = document.querySelectorAll('.mission-card .tab-content');

    // Function to switch tabs
    function switchTab(tabId) {
        // Remove active class from all buttons and contents
        tabButtons.forEach(button => button.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        // Add active class to clicked button and corresponding content
        const selectedButton = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);
        const selectedContent = document.getElementById(tabId);

        if (selectedButton && selectedContent) {
            selectedButton.classList.add('active');
            selectedContent.classList.add('active');
        }
    }

    // Add click event listeners to tab buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            switchTab(tabId);
        });
    });

    // Optional: Auto-rotate tabs every 5 seconds
    const tabIds = ['vision', 'mission', 'values'];
    let currentTabIndex = 0;

    function autoRotateTabs() {
        currentTabIndex = (currentTabIndex + 1) % tabIds.length;
        switchTab(tabIds[currentTabIndex]);
    }

    // Uncomment to enable auto-rotation
    // const tabRotation = setInterval(autoRotateTabs, 5000);

    // Pause auto-rotation when user interacts
    const missionCard = document.querySelector('.mission-card');
    if (missionCard) {
        missionCard.addEventListener('mouseenter', () => {
            // clearInterval(tabRotation);
        });

        missionCard.addEventListener('mouseleave', () => {
            // tabRotation = setInterval(autoRotateTabs, 5000);
        });
    }
});


document.addEventListener('DOMContentLoaded', function() {
    // About Section Animation
    const aboutSection = document.querySelector('.about-section');
    const aboutContent = document.querySelector('.about-content');
    const aboutImage = document.querySelector('.about-image img');

    // Animate about section on scroll
    function animateAboutSection() {
        if (isElementInViewport(aboutSection)) {
            aboutContent.style.opacity = '1';
            aboutContent.style.transform = 'translateY(0)';

            aboutImage.style.opacity = '1';
            aboutImage.style.transform = 'scale(1)';

            // Remove event listener after animation
            window.removeEventListener('scroll', animateAboutSection);
        }
    }

    // Check if element is in viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) / 1.3
        );
    }

    // Initialize about section elements as hidden
    aboutContent.style.opacity = '0';
    aboutContent.style.transform = 'translateY(20px)';
    aboutContent.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

    aboutImage.style.opacity = '0';
    aboutImage.style.transform = 'scale(0.95)';
    aboutImage.style.transition = 'opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s';

    // Run animation when page loads if already in view
    animateAboutSection();

    // Also run on scroll
    window.addEventListener('scroll', animateAboutSection);

    // Benefit items animation
    const benefitItems = document.querySelectorAll('.benefits-list li');

    benefitItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = `opacity 0.4s ease ${index * 0.1}s, transform 0.4s ease ${index * 0.1}s`;
    });

    function animateBenefits() {
        if (isElementInViewport(document.querySelector('.why-choose-us'))) {
            benefitItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateX(0)';
                }, index * 100);
            });
        }
    }

    // Run animation when page loads if already in view
    animateBenefits();

    // Also run on scroll
    window.addEventListener('scroll', animateBenefits);

    // Highlight box animation
    const highlightBox = document.querySelector('.highlight-box');

    highlightBox.style.opacity = '0';
    highlightBox.style.transform = 'scale(0.98)';
    highlightBox.style.transition = 'opacity 0.5s ease, transform 0.5s ease, box-shadow 0.3s ease';

    function animateHighlightBox() {
        if (isElementInViewport(highlightBox)) {
            highlightBox.style.opacity = '1';
            highlightBox.style.transform = 'scale(1)';

            // Add hover effect
            highlightBox.addEventListener('mouseenter', function() {
                this.style.boxShadow = '0 10px 25px rgba(0, 102, 204, 0.15)';
                this.style.transform = 'scale(1.01)';
            });

            highlightBox.addEventListener('mouseleave', function() {
                this.style.boxShadow = 'none';
                this.style.transform = 'scale(1)';
            });
        }
    }

    // Run animation when page loads if already in view
    animateHighlightBox();

    // Also run on scroll
    window.addEventListener('scroll', animateHighlightBox);
});


document.addEventListener('DOMContentLoaded', function() {
    // Process Flow Animation
    const processSteps = document.querySelectorAll('.process-steps .step');

    // Animate process steps on scroll
    function animateProcessSteps() {
        const processFlow = document.querySelector('.process-flow');
        if (isElementInViewport(processFlow)) {
            processSteps.forEach((step, index) => {
                setTimeout(() => {
                    step.style.opacity = '1';
                    step.style.transform = 'translateY(0)';
                }, index * 200);
            });
            // Remove event listener after animation
            window.removeEventListener('scroll', animateProcessSteps);
        }
    }

    // Check if element is in viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) / 1.5
        );
    }

    // Initialize process steps as hidden
    processSteps.forEach(step => {
        step.style.opacity = '0';
        step.style.transform = 'translateY(20px)';
        step.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Run animation when page loads if already in view
    animateProcessSteps();

    // Also run on scroll
    window.addEventListener('scroll', animateProcessSteps);

    // Service card hover effects
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
        });
    });

    // Learn more button arrow animation
    const learnMoreButtons = document.querySelectorAll('.learn-more');

    learnMoreButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            const arrow = this.querySelector('i');
            arrow.style.transform = 'translateX(5px)';
        });

        button.addEventListener('mouseleave', function() {
            const arrow = this.querySelector('i');
            arrow.style.transform = 'translateX(0)';
        });
    });
});


document.addEventListener('DOMContentLoaded', function() {
    // Testimonial Slider Functionality
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    let currentTestimonial = 0;

    // Show testimonial by index
    function showTestimonial(index) {
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });

        currentTestimonial = index;
        testimonials[currentTestimonial].classList.add('active');
    }

    // Next testimonial
    function nextTestimonial() {
        let nextIndex = currentTestimonial + 1;
        if (nextIndex >= testimonials.length) {
            nextIndex = 0;
        }
        showTestimonial(nextIndex);
    }

    // Previous testimonial
    function prevTestimonial() {
        let prevIndex = currentTestimonial - 1;
        if (prevIndex < 0) {
            prevIndex = testimonials.length - 1;
        }
        showTestimonial(prevIndex);
    }

    // Event listeners
    nextBtn.addEventListener('click', nextTestimonial);
    prevBtn.addEventListener('click', prevTestimonial);

    // Auto-rotate testimonials (optional)
    let testimonialInterval = setInterval(nextTestimonial, 5000);

    // Pause auto-rotation on hover
    const testimonialsContainer = document.querySelector('.testimonials');
    testimonialsContainer.addEventListener('mouseenter', () => {
        clearInterval(testimonialInterval);
    });

    testimonialsContainer.addEventListener('mouseleave', () => {
        testimonialInterval = setInterval(nextTestimonial, 5000);
    });

    // Partner logo animation on scroll
    const partnerLogos = document.querySelectorAll('.partner-logo');

    function animatePartnerLogos() {
        partnerLogos.forEach((logo, index) => {
            const logoPosition = logo.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;

            if (logoPosition < screenPosition) {
                setTimeout(() => {
                    logo.style.opacity = '1';
                    logo.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }

    // Initialize logos as hidden
    partnerLogos.forEach(logo => {
        logo.style.opacity = '0';
        logo.style.transform = 'translateY(20px)';
        logo.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Run on load and scroll
    animatePartnerLogos();
    window.addEventListener('scroll', animatePartnerLogos);
});


document.addEventListener('DOMContentLoaded', function() {
    // FAQ Accordion Functionality
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current item
            item.classList.toggle('active');
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Contact Form Handling
    const contactForm = document.getElementById('insurance-contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Validate form
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !phone || !message) {
                alert('Please fill in all required fields');
                return;
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                alert('Please enter a valid email address');
                return;
            }

            // Form data collection
            const formData = {
                name: name,
                email: email,
                phone: phone,
                service: document.getElementById('service').value,
                message: message
            };

            // Here you would typically send to your backend
            console.log('Form submission:', formData);
            alert('Thank you for your message! We will contact you shortly.');
            contactForm.reset();
        });
    }

    // Map Marker Interaction
    const mapMarker = document.querySelector('.map-marker');
    if (mapMarker) {
        mapMarker.addEventListener('click', function() {
            window.open('https://www.google.com/maps/place/Waterfront+Karen,+B1+(Basement+One)/@-1.2687855,36.7104043,17z/data=!3m1!4b1!4m6!3m5!1s0x182f1b1e8d9a82a9:0x1d5e6f1b1e8d9a82a9!8m2!3d-1.2687855!4d36.7104043!16s%2Fg%2F11ryq9_q5y', '_blank');
        });
    }

    // Animation on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.contact-map, .contact-form, .social-media');
        elements.forEach(el => {
            const position = el.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;

            if (position < screenPosition) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    }

    // Initialize animations
    const animatedElements = document.querySelectorAll('.contact-map, .contact-form, .social-media');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
});