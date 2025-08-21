// Animation fixes for the website

document.addEventListener('DOMContentLoaded', function() {
    // Improved animation observer
    function initializeAnimations() {
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -30px 0px'
        };

        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                    entry.target.classList.add('animated');
                }
            });
        }, observerOptions);

        // Observe animated elements
        const animatedElements = document.querySelectorAll('.fade-in, .slide-left, .slide-right');
        animatedElements.forEach(el => {
            // Only pause animations for elements not currently visible
            const rect = el.getBoundingClientRect();
            if (rect.top > window.innerHeight || rect.bottom < 0) {
                el.style.animationPlayState = 'paused';
            } else {
                // Element is visible, let animation run
                el.style.animationPlayState = 'running';
                el.classList.add('animated');
            }
            animationObserver.observe(el);
        });
        
        // Force run animations for hero section elements immediately
        setTimeout(() => {
            const heroElements = document.querySelectorAll('.hero .fade-in, .hero .slide-left, .hero .slide-right');
            heroElements.forEach(el => {
                el.style.animationPlayState = 'running';
                el.classList.add('animated');
            });
        }, 100);
    }

    // Initialize animations
    initializeAnimations();
});
