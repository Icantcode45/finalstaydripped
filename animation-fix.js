// Animation fixes and services HTML structure repair for the website

document.addEventListener('DOMContentLoaded', function() {

    // Fix for broken HTML structure in services section
    function fixServicesSection() {
        console.log('🔧 Fixing services section HTML structure...');

        // Find the services section
        const servicesSection = document.getElementById('services');
        if (!servicesSection) {
            console.log('❌ Services section not found');
            return;
        }

        // Find the first broken service card
        const firstServiceCard = servicesSection.querySelector('.service-card-enhanced[data-builder-block="service-hydration"]');
        if (!firstServiceCard) {
            console.log('❌ First service card not found');
            return;
        }

        // Get the correct content from the nested div
        const nestedServiceContent = firstServiceCard.querySelector('.service-content .service-content');
        if (nestedServiceContent) {
            console.log('✅ Found nested service content - fixing structure...');

            // Get the parent service content div
            const parentServiceContent = firstServiceCard.querySelector('.service-content');

            // Replace the parent content with the correct structure
            parentServiceContent.innerHTML = `
                <h3 data-builder-text="hydration-title">Hydration Therapy</h3>
                <p data-builder-text="hydration-description">Essential hydration and electrolyte replenishment for optimal cellular function and energy restoration.</p>
                <ul class="treatment-list" data-builder-list="hydration-treatments">
                    <li>Basic Hydration IV</li>
                    <li>Electrolyte Plus</li>
                    <li>Recovery Hydration</li>
                    <li>Athletic Hydration</li>
                </ul>
                <a href="pages/book-ivtherapy.html" class="btn service-btn" data-builder-link="hydration-book">Book Treatment</a>
            `;

            console.log('✅ Services section HTML structure fixed');
        } else {
            console.log('ℹ️ No nested content found - services section may already be correct');
        }

        // Additional cleanup: remove any orphaned or duplicate content
        const allServiceCards = servicesSection.querySelectorAll('.service-card-enhanced');
        allServiceCards.forEach((card, index) => {
            const serviceContent = card.querySelector('.service-content');
            if (serviceContent) {
                // Fix any unclosed ul tags by ensuring proper structure
                const lists = serviceContent.querySelectorAll('ul.treatment-list');
                lists.forEach(ul => {
                    // If a ul has divs as children (which is invalid), fix it
                    const divChildren = ul.querySelectorAll('div');
                    divChildren.forEach(div => {
                        console.log(`🔧 Removing invalid div from ul in card ${index + 1}`);
                        div.remove();
                    });
                });

                // Ensure there's only one h3, one p, one ul, and one link
                const elements = {
                    h3: serviceContent.querySelectorAll('h3'),
                    p: serviceContent.querySelectorAll('p'),
                    ul: serviceContent.querySelectorAll('ul.treatment-list'),
                    button: serviceContent.querySelectorAll('.btn.service-btn')
                };

                // Remove duplicate elements
                Object.entries(elements).forEach(([type, nodeList]) => {
                    if (nodeList.length > 1) {
                        for (let i = 1; i < nodeList.length; i++) {
                            nodeList[i].remove();
                        }
                    }
                });
            }
        });

        console.log(`✅ Services section cleanup complete - processed ${allServiceCards.length} service cards`);
    }

    // Run the services fix first
    fixServicesSection();
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
