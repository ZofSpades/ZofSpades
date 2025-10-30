/**
 * Animations Manager
 * Handles scroll animations and dynamic effects
 */

export class AnimationsManager {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
    }

    init() {
        this.setupScrollAnimations();
        this.setupParallaxEffect();
        this.enhanceInteractions();
    }

    /**
     * Setup scroll-triggered animations
     */
    setupScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, this.observerOptions);

        // Observe skill categories
        const skillCategories = document.querySelectorAll('.skill-category');
        skillCategories.forEach((category, index) => {
            category.classList.add('animate-on-scroll');
            category.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(category);
        });

        // Observe about paragraphs
        const aboutParagraphs = document.querySelectorAll('.about p');
        aboutParagraphs.forEach((p, index) => {
            p.classList.add('animate-on-scroll');
            p.style.transitionDelay = `${index * 0.15}s`;
            observer.observe(p);
        });

        // Observe sections
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            section.classList.add('animate-on-scroll');
            observer.observe(section);
        });
    }

    /**
     * Add subtle parallax effect to header
     */
    setupParallaxEffect() {
        const header = document.querySelector('header');
        if (!header) return;

        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrolled = window.pageYOffset;
                    const rate = scrolled * 0.5;
                    
                    if (header) {
                        header.style.transform = `translateY(${rate}px)`;
                        header.style.opacity = 1 - (scrolled / 600);
                    }
                    
                    ticking = false;
                });

                ticking = true;
            }
        });
    }

    /**
     * Enhance user interactions
     */
    enhanceInteractions() {
        // Add ripple effect to social links
        const socialLinks = document.querySelectorAll('.social-links a');
        socialLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const ripple = document.createElement('span');
                const rect = link.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;

                ripple.style.width = ripple.style.height = `${size}px`;
                ripple.style.left = `${x}px`;
                ripple.style.top = `${y}px`;
                ripple.classList.add('ripple');

                link.appendChild(ripple);

                setTimeout(() => ripple.remove(), 600);
            });
        });

        // Add tilt effect to skill categories
        const skillCategories = document.querySelectorAll('.skill-category');
        skillCategories.forEach(category => {
            category.addEventListener('mousemove', (e) => {
                const rect = category.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;

                category.style.transform = `translateY(-8px) scale(1.02) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });

            category.addEventListener('mouseleave', () => {
                category.style.transform = '';
            });
        });

        // Add smooth scroll for any anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}
