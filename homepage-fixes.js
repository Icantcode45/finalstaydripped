// Enhanced homepage fixes including services HTML structure repair
(function() {
    'use strict';

    console.log('🚀 Loading enhanced homepage fixes...');

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

    // Enhanced promo banner removal
    function removePromoBanner() {
        console.log('🧹 Removing promo banner...');
        setTimeout(() => {
            const promoBanner = document.querySelector('.promo-banner');
            if (promoBanner) {
                promoBanner.remove();
                console.log('✅ Promo banner removed');
            }
        }, 100);
    }

    // Fix duplicate "Learn More" buttons
    function fixDuplicateButtons() {
        console.log('🔧 Fixing duplicate buttons...');
        setTimeout(() => {
            const learnMoreButtons = document.querySelectorAll('a[data-builder-link="learn-more"]');
            console.log(`Found ${learnMoreButtons.length} Learn More buttons`);

            if (learnMoreButtons.length > 1) {
                for (let i = 1; i < learnMoreButtons.length; i++) {
                    console.log(`Removing duplicate Learn More button ${i}`);
                    learnMoreButtons[i].remove();
                }
            }
        }, 500);
    }

    // Enhanced services grid layout fix
    function fixServicesGrid() {
        console.log('🎨 Applying enhanced services grid layout...');
        setTimeout(() => {
            const servicesGrids = document.querySelectorAll('.services-grid');
            servicesGrids.forEach(grid => {
                grid.style.display = 'grid';
                grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(280px, 1fr))';
                grid.style.gap = '24px';
                grid.style.marginBottom = '32px';
                console.log('✅ Enhanced layout applied to services grid');
            });

            // Make service cards more professional
            const serviceCards = document.querySelectorAll('.service-card-enhanced');
            serviceCards.forEach((card, index) => {
                card.style.padding = '24px';
                card.style.borderRadius = '16px';
                card.style.background = 'white';
                card.style.boxShadow = '0 8px 32px rgba(26, 43, 58, 0.12)';
                card.style.border = '1px solid #e2e8f0';
                card.style.transition = 'all 0.3s ease';

                // Add hover effect
                card.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-4px)';
                    this.style.boxShadow = '0 12px 40px rgba(26, 43, 58, 0.15)';
                });

                card.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0)';
                    this.style.boxShadow = '0 8px 32px rgba(26, 43, 58, 0.12)';
                });

                const content = card.querySelector('.service-content');
                if (content) {
                    content.style.padding = '0';
                }

                const title = card.querySelector('h3');
                if (title) {
                    title.style.fontSize = '20px';
                    title.style.fontWeight = '600';
                    title.style.marginBottom = '12px';
                    title.style.color = '#1a2b3a';
                }

                const description = card.querySelector('p');
                if (description) {
                    description.style.fontSize = '14px';
                    description.style.lineHeight = '1.5';
                    description.style.marginBottom = '16px';
                    description.style.color = '#64748b';
                }

                const button = card.querySelector('.btn, .service-btn');
                if (button) {
                    button.style.padding = '12px 20px';
                    button.style.fontSize = '14px';
                    button.style.fontWeight = '600';
                    button.style.backgroundColor = '#0066cc';
                    button.style.color = 'white';
                    button.style.border = 'none';
                    button.style.borderRadius = '8px';
                    button.style.cursor = 'pointer';
                    button.style.transition = 'all 0.3s ease';
                    button.style.textDecoration = 'none';
                    button.style.display = 'inline-block';
                    button.style.marginTop = '16px';

                    button.addEventListener('mouseenter', function() {
                        this.style.backgroundColor = '#0052a3';
                        this.style.transform = 'translateY(-1px)';
                    });

                    button.addEventListener('mouseleave', function() {
                        this.style.backgroundColor = '#0066cc';
                        this.style.transform = 'translateY(0)';
                    });
                }

                // Hide treatment lists to keep cards compact
                const treatmentList = card.querySelector('.treatment-list');
                if (treatmentList) {
                    treatmentList.style.display = 'none';
                }
            });

            console.log(`✅ Enhanced styling applied to ${serviceCards.length} service cards`);
        }, 1000);
    }

    // Main initialization function
    function initializeHomepageFixes() {
        console.log('🎯 Initializing comprehensive homepage fixes...');

        // Run fixes in sequence
        fixServicesSection();
        removePromoBanner();
        fixDuplicateButtons();
        fixServicesGrid();

        console.log('✅ All homepage fixes applied');
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeHomepageFixes);
    } else {
        initializeHomepageFixes();
    }

    // Also run after navigation loads
    window.addEventListener('navigationReady', function() {
        console.log('🔄 Navigation ready - re-running homepage fixes...');
        setTimeout(initializeHomepageFixes, 100);
    });

    console.log('✨ Enhanced homepage fixes script loaded');
})();
