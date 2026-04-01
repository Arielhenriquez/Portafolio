/**
 * Premium Dark Mode Portfolio
 * Vanilla JavaScript - No Frameworks
 */

(function() {
    'use strict';

    // ===================================
    // DOM Elements
    // ===================================
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const revealElements = document.querySelectorAll('.skill-category, .timeline-item, .project-card, .contact-card');

    // ===================================
    // Navigation
    // ===================================
    
    // Sticky navbar scroll effect
    let lastScroll = 0;
    
    function handleScroll() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    }

    // Mobile menu toggle
    function toggleMobileMenu() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    }

    // Close mobile menu when clicking a link
    function closeMobileMenu() {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Smooth scroll for navigation links
    function smoothScroll(e) {
        const href = this.getAttribute('href');
        
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                closeMobileMenu();
            }
        }
    }

    // Active nav link on scroll
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.pageYOffset + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    }

    // ===================================
    // Reveal on Scroll Animation
    // ===================================
    
    function reveal() {
        revealElements.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const revealPoint = 150;

            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('visible');
            }
        });
    }

    // Add reveal class to elements
    function initRevealElements() {
        revealElements.forEach(element => {
            element.classList.add('reveal');
        });
    }

    // ===================================
    // Notification System
    // ===================================
    
    function showNotification(message, type = 'info') {
        // Remove existing notification
        const existing = document.querySelector('.notification');
        if (existing) existing.remove();

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button class="notification-close" aria-label="Close notification">&times;</button>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            bottom: 24px;
            right: 24px;
            padding: 16px 24px;
            background-color: ${type === 'success' ? '#22c55e' : '#3b82f6'};
            color: white;
            border-radius: 8px;
            display: flex;
            align-items: center;
            gap: 16px;
            font-size: 14px;
            font-weight: 500;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;

        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 20px;
            cursor: pointer;
            opacity: 0.8;
        `;

        document.body.appendChild(notification);

        // Close button handler
        closeBtn.addEventListener('click', () => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        });

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (document.body.contains(notification)) {
                notification.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    // Add notification animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // ===================================
    // Typing Effect for Hero
    // ===================================
    
    function initTypingEffect() {
        const codeContent = document.querySelector('.code-content code');
        if (!codeContent) return;

        const originalHTML = codeContent.innerHTML;
        codeContent.innerHTML = '';
        
        let index = 0;
        const characters = originalHTML.split('');
        let currentHTML = '';
        let insideTag = false;
        let tagBuffer = '';

        function typeCharacter() {
            if (index < characters.length) {
                const char = characters[index];
                
                if (char === '<') {
                    insideTag = true;
                    tagBuffer = char;
                } else if (char === '>' && insideTag) {
                    tagBuffer += char;
                    currentHTML += tagBuffer;
                    codeContent.innerHTML = currentHTML;
                    insideTag = false;
                    tagBuffer = '';
                } else if (insideTag) {
                    tagBuffer += char;
                } else {
                    currentHTML += char;
                    codeContent.innerHTML = currentHTML;
                }
                
                index++;
                
                // Variable speed for more natural feel
                const delay = insideTag ? 0 : (char === '\n' ? 100 : 20);
                setTimeout(typeCharacter, delay);
            }
        }

        // Start typing after a short delay
        setTimeout(typeCharacter, 500);
    }

    // ===================================
    // Parallax Effect
    // ===================================
    
    function initParallax() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroContent = hero.querySelector('.hero-content');
            const heroVisual = hero.querySelector('.hero-visual');
            
            if (heroContent) {
                heroContent.style.transform = `translateY(${scrolled * 0.1}px)`;
            }
            if (heroVisual) {
                heroVisual.style.transform = `translateY(${scrolled * 0.15}px)`;
            }
        });
    }

    // ===================================
    // Stats Counter Animation
    // ===================================
    
    function animateStats() {
        const stats = document.querySelectorAll('.stat-number');
        
        stats.forEach(stat => {
            const target = parseInt(stat.textContent);
            const suffix = stat.textContent.replace(/[0-9]/g, '');
            let current = 0;
            const increment = target / 50;
            const duration = 2000;
            const stepTime = duration / 50;

            function updateCount() {
                current += increment;
                if (current < target) {
                    stat.textContent = Math.floor(current) + suffix;
                    setTimeout(updateCount, stepTime);
                } else {
                    stat.textContent = target + suffix;
                }
            }

            // Trigger when in viewport
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCount();
                        observer.unobserve(stat);
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(stat);
        });
    }

    // ===================================
    // Project Card Hover Effect
    // ===================================
    
    function initProjectCardEffects() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', function(e) {
                this.style.transform = 'translateY(-8px)';
            });
            
            card.addEventListener('mouseleave', function(e) {
                this.style.transform = 'translateY(0)';
            });
        });
    }

    // ===================================
    // Skill Tags Shuffle Animation
    // ===================================
    
    function initSkillTagEffects() {
        const skillTags = document.querySelectorAll('.skill-tag');
        
        skillTags.forEach(tag => {
            tag.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05)';
            });
            
            tag.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        });
    }

    // ===================================
    // Keyboard Navigation
    // ===================================
    
    function initKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Escape key closes mobile menu
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        });
    }

    // ===================================
    // Initialize Everything
    // ===================================
    
    function init() {
        // Event Listeners
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('scroll', updateActiveNavLink, { passive: true });
        window.addEventListener('scroll', reveal, { passive: true });
        
        if (navToggle) {
            navToggle.addEventListener('click', toggleMobileMenu);
        }
        
        navLinks.forEach(link => {
            link.addEventListener('click', smoothScroll);
        });
        
        // Initialize components
        initRevealElements();
        initTypingEffect();
        initParallax();
        animateStats();
        initProjectCardEffects();
        initSkillTagEffects();
        initKeyboardNavigation();
        
        // Initial calls
        handleScroll();
        reveal();
        
        // Add loaded class to body for initial animations
        document.body.classList.add('loaded');
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
