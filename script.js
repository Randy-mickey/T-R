// Wait for DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // --- PRELOADER ---
    // Create preloader
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = `
        <div class="loader">
            <svg viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="32" />
            </svg>
        </div>
    `;
    document.body.appendChild(preloader);
    
    // Hide preloader after page load
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.remove();
                // Reveal page content with animation
                document.body.classList.add('loaded');
            }, 400);
        }, 500);
    });

    // --- SMOOTH SCROLLING for navigation ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // --- HEADER ANIMATION on scroll ---
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add shadow and background on scroll
        if (scrollTop > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide/show header on scroll up/down
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
    
    // --- SCROLL REVEAL ANIMATIONS ---
    const animateOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    };
    
    // Create scroll observer
    const scrollObserver = new IntersectionObserver(animateOnScroll, {
        root: null,
        threshold: 0.15,
        rootMargin: '0px'
    });
    
    // Elements to animate
    const animatedElements = [
        '.hero-text', 
        '.hero-image', 
        '.bio-image', 
        '.bio-content', 
        '.service-card', 
        '.skills-image', 
        '.skills-content',
        '.portfolio-item',
        '.stat-item',
        '.section-title'
    ];
    
    // Add animation classes and observe elements
    animatedElements.forEach((selector, index) => {
        document.querySelectorAll(selector).forEach((element, elementIndex) => {
            // Add animation-ready class
            element.classList.add('animation-ready');
            
            // Add animation direction classes
            if (selector === '.hero-text' || selector === '.bio-content' || selector === '.skills-content') {
                element.classList.add('animate-from-left');
            } else if (selector === '.hero-image' || selector === '.bio-image' || selector === '.skills-image') {
                element.classList.add('animate-from-right');
            } else if (selector === '.service-card' || selector === '.portfolio-item') {
                element.classList.add('animate-fade-up');
                // Add delay for staggered animation
                element.style.transitionDelay = `${elementIndex * 0.1}s`;
            } else if (selector === '.stat-item') {
                element.classList.add('animate-zoom-in');
                element.style.transitionDelay = `${elementIndex * 0.1}s`;
            } else if (selector === '.section-title') {
                element.classList.add('animate-fade-in');
            }
            
            // Observe the element
            scrollObserver.observe(element);
        });
    });
    
    // --- ANIMATE HERO SECTION text typing effect ---
    const heroTitle = document.querySelector('.hero-text h1');
    if (heroTitle) {
        const text = heroTitle.innerText;
        heroTitle.innerHTML = '';
        
        // Add span around each character
        const characters = text.split('');
        characters.forEach((char, index) => {
            const span = document.createElement('span');
            span.innerText = char;
            span.style.animationDelay = `${index * 0.05}s`;
            span.classList.add('char-animation');
            heroTitle.appendChild(span);
        });
    }
    
    // --- SERVICE CARD HOVER EFFECTS ---
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.service-icon');
            icon.classList.add('icon-hover');
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.service-icon');
            icon.classList.remove('icon-hover');
        });
    });
    
    // --- SKILLS PROGRESS BAR ANIMATION ---
    const animateProgressBars = () => {
        const skills = document.querySelector('.skills');
        const progressBars = document.querySelectorAll('.progress');

        if (!skills || !progressBars.length) return;
        
        const skillsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                progressBars.forEach(progress => {
                    const width = progress.style.width;
                    // Reset width and then animate
                    progress.style.width = '0%';
                    setTimeout(() => {
                        progress.style.width = width;
                    }, 200);
                });
                skillsObserver.unobserve(skills);
            }
        }, { threshold: 0.3 });
        
        skillsObserver.observe(skills);
    };
    
    animateProgressBars();
    
    // --- COUNTER ANIMATION for stats ---
    const animateCounters = () => {
        const stats = document.querySelector('.stats');
        const counters = document.querySelectorAll('.stat-number');
        
        if (!stats || !counters.length) return;
        
        const statsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-count'));
                    const duration = 2000; // ms
                    const increment = target / (duration / 16);
                    let current = 0;
                    
                    const updateCounter = () => {
                        current += increment;
                        counter.textContent = Math.floor(current);
                        
                        if (current < target) {
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target;
                        }
                    };
                    
                    updateCounter();
                });
                statsObserver.unobserve(stats);
            }
        }, { threshold: 0.5 });
        
        statsObserver.observe(stats);
    };
    
    animateCounters();
    
    // --- PORTFOLIO ITEM HOVER EFFECTS ---
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        // Create overlay for each portfolio item
        const overlay = document.createElement('div');
        overlay.className = 'portfolio-overlay';
        
        const viewButton = document.createElement('a');
        viewButton.className = 'portfolio-view';
        viewButton.innerHTML = '<i class="fas fa-search-plus"></i>';
        viewButton.href = '#';
        
        overlay.appendChild(viewButton);
        item.appendChild(overlay);
        
        // Add hover effect
        item.addEventListener('mouseenter', () => {
            overlay.style.opacity = '1';
        });
        
        item.addEventListener('mouseleave', () => {
            overlay.style.opacity = '0';
        });
        
        // Add click event for portfolio modal
        viewButton.addEventListener('click', (e) => {
            e.preventDefault();
            const imgSrc = item.querySelector('img').src;
            openPortfolioModal(imgSrc);
        });
    });
    
    // --- PORTFOLIO MODAL ---
    const createPortfolioModal = () => {
        const modal = document.createElement('div');
        modal.className = 'portfolio-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="modal-close">&times;</span>
                <img src="" alt="Project" class="modal-image">
            </div>
        `;
        document.body.appendChild(modal);
        
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
                setTimeout(() => {
                    modal.style.display = 'none';
                }, 300);
            }
        });
        
        return modal;
    };
    
    const portfolioModal = createPortfolioModal();
    
    const openPortfolioModal = (imgSrc) => {
        const modalImage = portfolioModal.querySelector('.modal-image');
        modalImage.src = imgSrc;
        
        portfolioModal.style.display = 'flex';
        setTimeout(() => {
            portfolioModal.classList.add('show');
        }, 10);
    };
    
    // --- MOBILE MENU ---
    const createMobileMenu = () => {
        // Create hamburger menu
        const hamburger = document.createElement('div');
        hamburger.className = 'hamburger';
        hamburger.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;
        
        const navLinks = document.querySelector('.nav-links');
        const headerContainer = document.querySelector('.header-container');
        
        if (headerContainer) {
            headerContainer.appendChild(hamburger);
            
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navLinks.classList.toggle('show');
                document.body.classList.toggle('menu-open');
            });
            
            // Close menu when clicking on links
            const links = navLinks.querySelectorAll('a');
            links.forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('show');
                    document.body.classList.remove('menu-open');
                });
            });
        }
    };
    
    createMobileMenu();
    
    // --- BACK TO TOP BUTTON ---
    const createBackToTop = () => {
        const backToTop = document.createElement('div');
        backToTop.className = 'back-to-top';
        backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
        document.body.appendChild(backToTop);
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });
        
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    };
    
    createBackToTop();
    
    // --- PARALLAX EFFECT ---
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.pageYOffset;
            if (scrollPosition < window.innerHeight) {
                const translateY = scrollPosition * 0.3;
                heroSection.style.backgroundPositionY = `${translateY}px`;
                
                // Move hero content in opposite direction for depth effect
                const heroContent = document.querySelector('.hero-content');
                if (heroContent) {
                    heroContent.style.transform = `translateY(${scrollPosition * 0.1}px)`;
                }
            }
        });
    }
    
    // --- CURSOR EFFECT for desktop ---
    const setupCursorEffect = () => {
        // Only apply on non-touch devices
        if ('ontouchstart' in window) return;
        
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        
        const cursorDot = document.createElement('div');
        cursorDot.className = 'cursor-dot';
        
        document.body.appendChild(cursor);
        document.body.appendChild(cursorDot);
        
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
            
            // Delayed movement for dot
            setTimeout(() => {
                cursorDot.style.left = `${e.clientX}px`;
                cursorDot.style.top = `${e.clientY}px`;
            }, 50);
        });
        
        // Interactive elements cursor effect
        const interactiveElements = document.querySelectorAll('a, button, .service-card, .portfolio-item, .hamburger, .back-to-top');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.classList.add('active');
                cursorDot.classList.add('active');
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.classList.remove('active');
                cursorDot.classList.remove('active');
            });
        });
    };
    
    // Only use custom cursor on desktop
    if (window.innerWidth > 1024) {
        setupCursorEffect();
    }
    
    // --- ADD AOS-LIKE ATTRIBUTES for different animation types ---
    const setDefaultAnimations = () => {
        // Set different animation types for various elements
        document.querySelectorAll('.service-icon').forEach((icon, index) => {
            icon.classList.add('animation-ready', 'animate-bounce');
            icon.style.animationDelay = `${index * 0.2}s`;
            scrollObserver.observe(icon);
        });
        
        document.querySelectorAll('.social-links a').forEach((link, index) => {
            link.classList.add('animation-ready', 'animate-scale');
            link.style.transitionDelay = `${index * 0.1}s`;
            scrollObserver.observe(link);
        });
        
        document.querySelectorAll('.hero-btns a, .bio-btns a').forEach((btn, index) => {
            btn.classList.add('animation-ready', 'animate-scale');
            btn.style.transitionDelay = `${0.5 + index * 0.2}s`;
            scrollObserver.observe(btn);
        });
    };
    
    setDefaultAnimations();
    
    // --- IMAGE HOVER EFFECT ---
    const addImageEffects = () => {
        const images = document.querySelectorAll('.bio-image img, .skills-image img');
        
        images.forEach(img => {
            img.addEventListener('mouseenter', () => {
                img.style.transform = 'scale(1.05)';
            });
            
            img.addEventListener('mouseleave', () => {
                img.style.transform = 'scale(1)';
            });
        });
    };
    
    addImageEffects();
    
    // --- ADD CSS FOR ANIMATIONS ---
    const addAnimationStyles = () => {
        const style = document.createElement('style');
        style.textContent = `
            /* Preloader */
            .preloader {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: #fff;
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 9999;
                transition: opacity 0.5s ease;
            }
            
            .preloader.fade-out {
                opacity: 0;
            }
            
            .loader {
                width: 50px;
                height: 50px;
            }
            
            .loader svg {
                animation: rotate 2s linear infinite;
                width: 50px;
                height: 50px;
            }
            
            .loader circle {
                fill: none;
                stroke: #6c5ce7;
                stroke-width: 3;
                stroke-dasharray: 150;
                stroke-dashoffset: 150;
                animation: dash 2s ease-in-out infinite;
            }
            
            @keyframes rotate {
                100% {
                    transform: rotate(360deg);
                }
            }
            
            @keyframes dash {
                0% {
                    stroke-dashoffset: 150;
                }
                50% {
                    stroke-dashoffset: 30;
                }
                100% {
                    stroke-dashoffset: 150;
                }
            }
            
            /* Animation ready state */
            .animation-ready {
                opacity: 0;
                transition: opacity 0.8s, transform 0.8s;
            }
            
            /* Animation types */
            .animate-from-left {
                transform: translateX(-50px);
            }
            
            .animate-from-right {
                transform: translateX(50px);
            }
            
            .animate-fade-up {
                transform: translateY(30px);
            }
            
            .animate-zoom-in {
                transform: scale(0.8);
            }
            
            .animate-fade-in {
                opacity: 0;
            }
            
            .animate-bounce {
                transform: translateY(0);
                animation: none;
            }
            
            .animate-scale {
                transform: scale(0.9);
                opacity: 0;
            }
            
            /* Animated state */
            .animated {
                opacity: 1;
                transform: translate(0) scale(1);
            }
            
            .animated.animate-bounce {
                animation: bounce 1s ease infinite;
            }
            
            @keyframes bounce {
                0%, 100% {
                    transform: translateY(0);
                }
                50% {
                    transform: translateY(-10px);
                }
            }
            
            /* Header scroll effect */
            header {
                transition: all 0.3s ease;
            }
            
            header.scrolled {
                box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
                background: rgba(255, 255, 255, 0.95);
            }
            
            /* Character animation for hero title */
            .char-animation {
                display: inline-block;
                opacity: 0;
                animation: fadeInUp 0.5s forwards;
                animation-delay: calc(var(--char-index) * 0.05s);
            }
            
            @keyframes fadeInUp {
                from {
                    transform: translateY(20px);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }
            
            /* Portfolio hover effect */
            .portfolio-item {
                position: relative;
                overflow: hidden;
                cursor: pointer;
            }
            
            .portfolio-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(108, 92, 231, 0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            
            .portfolio-view {
                width: 50px;
                height: 50px;
                background: white;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                color: #6c5ce7;
                text-decoration: none;
                transform: scale(0);
                transition: transform 0.3s ease;
            }
            
            .portfolio-item:hover .portfolio-view {
                transform: scale(1);
            }
            
            /* Portfolio modal */
            .portfolio-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: none;
                justify-content: center;
                align-items: center;
                z-index: 9999;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            
            .portfolio-modal.show {
                opacity: 1;
            }
            
            .modal-content {
                max-width: 80%;
                max-height: 80%;
                position: relative;
                transform: scale(0.9);
                transition: transform 0.3s ease;
            }
            
            .portfolio-modal.show .modal-content {
                transform: scale(1);
            }
            
            .modal-close {
                position: absolute;
                top: -40px;
                right: 0;
                font-size: 30px;
                color: white;
                cursor: pointer;
            }
            
            .modal-image {
                max-width: 100%;
                max-height: 80vh;
                display: block;
            }
            
            /* Mobile menu */
            .hamburger {
                display: none;
                cursor: pointer;
                width: 30px;
                height: 20px;
                position: relative;
                z-index: 999;
            }
            
            .hamburger span {
                display: block;
                width: 100%;
                height: 2px;
                background: #333;
                position: absolute;
                transition: all 0.3s ease;
            }
            
            .hamburger span:nth-child(1) {
                top: 0;
            }
            
            .hamburger span:nth-child(2) {
                top: 9px;
            }
            
            .hamburger span:nth-child(3) {
                top: 18px;
            }
            
            .hamburger.active span:nth-child(1) {
                transform: rotate(45deg);
                top: 9px;
            }
            
            .hamburger.active span:nth-child(2) {
                opacity: 0;
            }
            
            .hamburger.active span:nth-child(3) {
                transform: rotate(-45deg);
                top: 9px;
            }
            
            /* Back to top button */
            .back-to-top {
                position: fixed;
                bottom: 30px;
                right: 30px;
                width: 40px;
                height: 40px;
                background: #6c5ce7;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                color: white;
                cursor: pointer;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
                z-index: 999;
            }
            
            .back-to-top.show {
                opacity: 1;
                visibility: visible;
            }
            
            /* Custom cursor */
            .custom-cursor {
                position: fixed;
                width: 30px;
                height: 30px;
                border: 2px solid #6c5ce7;
                border-radius: 50%;
                pointer-events: none;
                transform: translate(-50%, -50%);
                z-index: 9999;
                transition: width 0.3s, height 0.3s, border-color 0.3s;
                mix-blend-mode: difference;
            }
            
            .cursor-dot {
                position: fixed;
                width: 8px;
                height: 8px;
                background: #6c5ce7;
                border-radius: 50%;
                pointer-events: none;
                transform: translate(-50%, -50%);
                z-index: 10000;
                transition: transform 0.1s;
            }
            
            .custom-cursor.active {
                width: 50px;
                height: 50px;
                border-color: white;
            }
            
            .cursor-dot.active {
                transform: translate(-50%, -50%) scale(0);
            }
            
            /* Service icon hover */
            .icon-hover {
                transform: translateY(-10px) scale(1.1) !important;
                color: #6c5ce7;
                transition: transform 0.3s, color 0.3s;
            }
            
            /* Media queries */
            @media screen and (max-width: 768px) {
                .hamburger {
                    display: block;
                }
                
                .nav-links {
                    position: fixed;
                    top: 0;
                    right: -100%;
                    width: 70%;
                    height: 100vh;
                    background: white;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    transition: right 0.3s ease;
                    z-index: 998;
                    box-shadow: -5px 0 20px rgba(0, 0, 0, 0.1);
                }
                
                .nav-links.show {
                    right: 0;
                }
                
                .nav-links a {
                    margin: 10px 0;
                }
                
                body.menu-open {
                    overflow: hidden;
                }
                
                .custom-cursor, .cursor-dot {
                    display: none;
                }
            }
        `;
        
        document.head.appendChild(style);
    };
    
    addAnimationStyles();
    
    console.log('All animations and interactive features loaded successfully!');
});