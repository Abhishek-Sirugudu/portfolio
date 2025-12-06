document.addEventListener('DOMContentLoaded', () => {
    
    /* -----------------------------------------------
       1. Mobile Navigation Toggle
    ----------------------------------------------- */
    const navToggle = document.querySelector('.mobile-nav-toggle');
    const primaryNav = document.querySelector('.nav-links');

    if (navToggle && primaryNav) {
        navToggle.addEventListener('click', () => {
            const isVisible = primaryNav.getAttribute('data-visible') === 'true';

            // Toggle logic
            if (!isVisible) {
                primaryNav.setAttribute('data-visible', 'true');
                navToggle.setAttribute('aria-expanded', 'true');
            } else {
                primaryNav.setAttribute('data-visible', 'false');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });

        // Close menu when clicking a link (UX best practice)
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                primaryNav.setAttribute('data-visible', 'false');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    /* -----------------------------------------------
       2. Scroll Animations (Intersection Observer)
    ----------------------------------------------- */
    // This watches for elements with class '.reveal' entering the screen
    const observerOptions = {
        root: null,
        threshold: 0.15, // Trigger when 15% of the element is visible
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once revealed to save resources
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(section => {
        observer.observe(section);
    });

    /* -----------------------------------------------
       3. Active Navigation Link Highlighting
    ----------------------------------------------- */
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // -100px offset for the fixed header
            if (scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
    });
});