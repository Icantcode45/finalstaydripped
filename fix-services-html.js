// Fix for broken HTML structure in services section
(function() {
    'use strict';

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
            
            // Get the correct HTML from the nested div
            const correctHTML = nestedServiceContent.innerHTML;
            
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
            // Check for any unclosed ul tags or malformed structure
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
            }
        });

        // Ensure all service cards have proper structure
        allServiceCards.forEach((card, index) => {
            const serviceContent = card.querySelector('.service-content');
            if (serviceContent) {
                // Ensure there's only one h3, one p, one ul, and one link
                const h3s = serviceContent.querySelectorAll('h3');
                const paragraphs = serviceContent.querySelectorAll('p');
                const lists = serviceContent.querySelectorAll('ul.treatment-list');
                const buttons = serviceContent.querySelectorAll('.btn.service-btn');

                // Remove duplicate elements if they exist
                if (h3s.length > 1) {
                    for (let i = 1; i < h3s.length; i++) {
                        h3s[i].remove();
                    }
                }
                if (paragraphs.length > 1) {
                    for (let i = 1; i < paragraphs.length; i++) {
                        paragraphs[i].remove();
                    }
                }
                if (lists.length > 1) {
                    for (let i = 1; i < lists.length; i++) {
                        lists[i].remove();
                    }
                }
                if (buttons.length > 1) {
                    for (let i = 1; i < buttons.length; i++) {
                        buttons[i].remove();
                    }
                }
            }
        });

        console.log(`✅ Services section cleanup complete - processed ${allServiceCards.length} service cards`);
    }

    // Run the fix when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fixServicesSection);
    } else {
        fixServicesSection();
    }

    // Also run after a short delay to catch any dynamic content
    setTimeout(fixServicesSection, 500);

    console.log('🚀 Services HTML fix script loaded');
})();
