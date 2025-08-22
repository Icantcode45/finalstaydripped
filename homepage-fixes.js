// Homepage fixes for all reported issues
document.addEventListener('DOMContentLoaded', function() {
    console.log('Applying homepage fixes...');
    
    // 1. Fix duplicate "Learn More" buttons
    function fixDuplicateLearnMoreButtons() {
        const learnMoreButtons = document.querySelectorAll('a[data-builder-link="learn-more"]');
        console.log('Found Learn More buttons:', learnMoreButtons.length);
        
        if (learnMoreButtons.length > 1) {
            // Remove the small version, keep the large one
            learnMoreButtons.forEach(btn => {
                if (btn.classList.contains('btn-small')) {
                    console.log('Removing duplicate small Learn More button');
                    btn.remove();
                }
            });
        }
    }
    
    // 2. Fix stats animations
    function fixStatsAnimations() {
        console.log('Fixing stats animations...');
        
        let statsAnimated = false;
        
        function animateCounter(counter) {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                counter.textContent = Math.floor(current).toLocaleString();
            }, 16);
        }

        function checkStatsVisibility() {
            if (statsAnimated) return;

            const statsSection = document.querySelector('.stats-section');
            if (!statsSection) return;

            const rect = statsSection.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;

            if (isVisible) {
                statsAnimated = true;
                console.log('Triggering stats animation');

                // Animate stat cards
                const statCards = document.querySelectorAll('.stats-section .stat-card');
                statCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('visible');
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 200);
                });

                // Animate counters
                setTimeout(() => {
                    const counters = document.querySelectorAll('.counter[data-target]');
                    console.log('Found counters to animate:', counters.length);
                    counters.forEach(counter => {
                        animateCounter(counter);
                    });
                }, 600);
            }
        }

        // Set up scroll listener
        window.addEventListener('scroll', checkStatsVisibility);
        // Check immediately in case already visible
        setTimeout(checkStatsVisibility, 100);
    }
    
    // 3. Fix service cards layout to be more compact
    function fixServiceCardsLayout() {
        console.log('Fixing service cards layout...');
        
        // Add CSS to make service cards more compact
        const style = document.createElement('style');
        style.textContent = `
            .services-grid {
                display: grid !important;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)) !important;
                gap: 24px !important;
                margin-bottom: 40px !important;
            }
            
            .service-card-enhanced {
                padding: 24px !important;
                height: auto !important;
                min-height: unset !important;
            }
            
            .service-content {
                padding: 16px 24px 24px 24px !important;
            }
            
            .service-content p {
                margin-bottom: 16px !important;
                line-height: 1.5 !important;
            }
            
            .service-btn {
                margin-top: 16px !important;
                padding: 10px 20px !important;
            }
            
            @media (max-width: 768px) {
                .services-grid {
                    grid-template-columns: 1fr !important;
                    gap: 20px !important;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // 4. Replace Google Reviews carousel with Elfsight widget
    function replaceGoogleReviewsCarousel() {
        console.log('Replacing Google Reviews carousel with Elfsight widget...');
        
        // Find the reviews section
        const reviewsContainer = document.querySelector('.reviews-carousel-container');
        if (!reviewsContainer) {
            console.log('Reviews container not found');
            return;
        }
        
        // Create the Elfsight widget container
        const elfsightWidget = document.createElement('div');
        elfsightWidget.innerHTML = `
            <div style="text-align: center; margin-bottom: 32px;">
                <h3 style="font-size: 32px; font-weight: 700; color: var(--dark-slate); margin-bottom: 16px;">
                    What Our Clients Say
                </h3>
                <p style="font-size: 18px; color: var(--medium-gray); max-width: 600px; margin: 0 auto;">
                    Real reviews from our satisfied clients who've experienced the benefits of our wellness treatments.
                </p>
            </div>
            <div class="elfsight-app-0b06184e-88ba-488f-9d5e-789f8787d167" data-elfsight-app-lazy></div>
        `;
        
        // Replace the old carousel with the new widget
        reviewsContainer.innerHTML = '';
        reviewsContainer.appendChild(elfsightWidget);
        
        // Load the Elfsight script if not already loaded
        if (!document.querySelector('script[src*="elfsightcdn.com"]')) {
            const script = document.createElement('script');
            script.src = 'https://elfsightcdn.com/platform.js';
            script.async = true;
            document.head.appendChild(script);
            console.log('Elfsight script loaded');
        }
        
        // Remove any existing review carousel JavaScript
        try {
            if (window.initializeReviewsCarousel) {
                window.initializeReviewsCarousel = function() {
                    console.log('Review carousel initialization disabled - using Elfsight widget');
                };
            }
        } catch (e) {
            console.log('Could not override review carousel function');
        }
    }
    
    // Apply all fixes
    setTimeout(() => {
        fixDuplicateLearnMoreButtons();
        fixStatsAnimations(); 
        fixServiceCardsLayout();
        replaceGoogleReviewsCarousel();
        console.log('All homepage fixes applied');
    }, 500);
});
