// Aggressive services layout fix
(function() {
    'use strict';
    
    function fixServicesLayout() {
        console.log('Applying aggressive services layout fix...');
        
        // Find the services section
        const servicesSection = document.querySelector('#services, .services');
        if (!servicesSection) {
            console.log('Services section not found');
            return;
        }
        
        // Find the services grid
        let servicesGrid = servicesSection.querySelector('.services-grid');
        if (!servicesGrid) {
            console.log('Services grid not found, creating one...');
            
            // Create a new services grid if it doesn't exist
            servicesGrid = document.createElement('div');
            servicesGrid.className = 'services-grid';
            
            // Find the section header and insert grid after it
            const sectionHeader = servicesSection.querySelector('.section-header');
            if (sectionHeader) {
                sectionHeader.insertAdjacentElement('afterend', servicesGrid);
            } else {
                servicesSection.appendChild(servicesGrid);
            }
        }
        
        // Force balanced grid layout with readable cards
        servicesGrid.style.cssText = `
            display: grid !important;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)) !important;
            gap: 24px !important;
            margin: 32px 0 !important;
            padding: 0 !important;
        `;
        
        // Find all service cards
        const serviceCards = servicesSection.querySelectorAll('.service-card-enhanced, .service-card');
        console.log('Found service cards:', serviceCards.length);
        
        if (serviceCards.length === 0) {
            // If no cards found, create them from any existing content
            createServiceCardsFromContent(servicesGrid, servicesSection);
        } else {
            // Fix existing cards
            serviceCards.forEach((card, index) => {
                // Move card to grid if not already there
                if (card.parentElement !== servicesGrid) {
                    servicesGrid.appendChild(card);
                }
                
                // Apply balanced readable styling
                card.style.cssText = `
                    padding: 24px !important;
                    margin: 0 !important;
                    height: auto !important;
                    min-height: 280px !important;
                    max-height: 320px !important;
                    border-radius: 16px !important;
                    background: white !important;
                    border: 1px solid #e2e8f0 !important;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
                    transition: transform 0.3s ease, box-shadow 0.3s ease !important;
                `;
                
                // Fix content inside cards
                const content = card.querySelector('.service-content');
                if (content) {
                    content.style.cssText = `
                        padding: 8px 0 !important;
                    `;
                }
                
                const title = card.querySelector('h3');
                if (title) {
                    title.style.cssText = `
                        font-size: 20px !important;
                        margin-bottom: 12px !important;
                        line-height: 1.3 !important;
                        color: #1a2b3a !important;
                        font-weight: 600 !important;
                    `;
                }

                const description = card.querySelector('p');
                if (description) {
                    description.style.cssText = `
                        font-size: 14px !important;
                        line-height: 1.5 !important;
                        margin-bottom: 16px !important;
                        color: #64748b !important;
                    `;
                }

                const lists = card.querySelectorAll('ul, ol');
                lists.forEach(list => {
                    list.style.cssText = `
                        display: none !important;
                    `;
                });

                const buttons = card.querySelectorAll('.btn, .service-btn, button, a[class*="btn"]');
                buttons.forEach(btn => {
                    btn.style.cssText = `
                        padding: 12px 20px !important;
                        font-size: 14px !important;
                        font-weight: 600 !important;
                        border-radius: 8px !important;
                        background: #0066cc !important;
                        color: white !important;
                        text-decoration: none !important;
                        border: none !important;
                        cursor: pointer !important;
                        transition: background 0.3s ease !important;
                    `;
                });
            });
        }
        
        console.log('Services layout fix applied');
    }
    
    function createServiceCardsFromContent(servicesGrid, servicesSection) {
        const services = [
            {
                title: 'IV Hydration Therapy',
                description: 'Essential hydration and electrolyte replenishment',
                link: '/pages/book-ivtherapy.html'
            },
            {
                title: 'Energy Boost',
                description: 'Vitamin B12 and energy-enhancing nutrients',
                link: '/pages/book-ivtherapy.html'
            },
            {
                title: 'Immune Support',
                description: 'Vitamin C and immune-boosting compounds',
                link: '/pages/book-ivtherapy.html'
            },
            {
                title: 'Recovery & Wellness',
                description: 'Post-workout and general wellness support',
                link: '/pages/book-ivtherapy.html'
            },
            {
                title: 'NAD+ Therapy',
                description: 'Advanced anti-aging and cellular repair',
                link: '/pages/nad-peptides.html'
            },
            {
                title: 'Vitamin Injections',
                description: 'Quick vitamin B12 and lipotropic shots',
                link: '/pages/vitamin-injections.html'
            }
        ];
        
        services.forEach(service => {
            const card = document.createElement('div');
            card.className = 'service-card-enhanced';
            card.style.cssText = `
                padding: 16px !important;
                margin: 0 !important;
                height: auto !important;
                max-height: 200px !important;
                border-radius: 12px !important;
                background: white !important;
                border: 1px solid #e2e8f0 !important;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1) !important;
                cursor: pointer !important;
                transition: transform 0.2s ease !important;
            `;
            
            card.innerHTML = `
                <h3 style="font-size: 16px; margin-bottom: 6px; line-height: 1.3; color: #1a2b3a;">${service.title}</h3>
                <p style="font-size: 12px; line-height: 1.3; margin-bottom: 8px; color: #64748b;">${service.description}</p>
                <a href="${service.link}" style="padding: 4px 8px; font-size: 11px; background: #0066cc; color: white; text-decoration: none; border-radius: 4px; display: inline-block;">Book Now</a>
            `;
            
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-2px)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
            
            servicesGrid.appendChild(card);
        });
    }
    
    // Apply fix when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fixServicesLayout);
    } else {
        fixServicesLayout();
    }
    
    // Apply fix after a delay to ensure everything is loaded
    setTimeout(fixServicesLayout, 1000);
    setTimeout(fixServicesLayout, 2000);
    
})();
