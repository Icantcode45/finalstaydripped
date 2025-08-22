// Fix navigation duplication by removing hardcoded navigation content
(function() {
    'use strict';
    
    function removeHardcodedNavigation() {
        // Remove any hardcoded top-bar that's not inside navigation-placeholder
        const navigationPlaceholder = document.getElementById('navigation-placeholder');
        if (!navigationPlaceholder) {
            console.warn('Navigation placeholder not found');
            return;
        }
        
        // Find and remove any top-bar or header elements that are siblings of the placeholder
        const allTopBars = document.querySelectorAll('.top-bar');
        const allHeaders = document.querySelectorAll('header.header');
        
        allTopBars.forEach(topBar => {
            // Only remove if it's NOT inside the navigation placeholder
            if (!navigationPlaceholder.contains(topBar)) {
                console.log('Removing duplicate top-bar');
                topBar.remove();
            }
        });
        
        allHeaders.forEach(header => {
            // Only remove if it's NOT inside the navigation placeholder
            if (!navigationPlaceholder.contains(header)) {
                console.log('Removing duplicate header');
                header.remove();
            }
        });
        
        console.log('Navigation duplication cleanup completed');
    }
    
    // Run immediately if DOM is already loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', removeHardcodedNavigation);
    } else {
        removeHardcodedNavigation();
    }
    
    // Also run after a short delay to catch any dynamically added content
    setTimeout(removeHardcodedNavigation, 100);

    // Add Steve Levine Entertainment logo to partners section
    function addPartnerLogo() {
        const partnersSection = document.querySelector('.partners-section');
        if (!partnersSection) return false;

        const partnersGrid = partnersSection.querySelector('.partners-grid');
        if (!partnersGrid) return false;

        // Check if logo already exists
        const existingLogo = partnersGrid.querySelector('img[alt*="Steve Levine"]');
        if (existingLogo) return true;

        // Find the first placeholder logo slot
        const placeholderSlot = partnersGrid.querySelector('.partner-logo .logo-placeholder');
        if (placeholderSlot) {
            const logoImg = document.createElement('img');
            logoImg.src = 'https://cdn.builder.io/api/v1/image/assets%2F337c720945064b44af05129952e6433b%2Ff3ae9a848f7c42a39b72d88e7482ba95?format=webp&width=800';
            logoImg.alt = 'Steve Levine Entertainment & Public Relations';
            logoImg.loading = 'lazy';
            logoImg.style.maxWidth = '100%';
            logoImg.style.height = 'auto';
            logoImg.style.objectFit = 'contain';
            logoImg.style.filter = 'brightness(0.8)';
            logoImg.style.transition = 'all 0.3s ease';

            // Add hover effect
            logoImg.addEventListener('mouseenter', function() {
                this.style.filter = 'brightness(1)';
                this.style.transform = 'scale(1.05)';
            });

            logoImg.addEventListener('mouseleave', function() {
                this.style.filter = 'brightness(0.8)';
                this.style.transform = 'scale(1)';
            });

            placeholderSlot.parentNode.replaceChild(logoImg, placeholderSlot);
            console.log('Steve Levine Entertainment logo added successfully');
            return true;
        }
        return false;
    }

    // Try to add the logo multiple times
    let logoAttempts = 0;
    const maxLogoAttempts = 10;

    function tryAddLogo() {
        logoAttempts++;
        const success = addPartnerLogo();

        if (!success && logoAttempts < maxLogoAttempts) {
            setTimeout(tryAddLogo, 1000);
        } else if (success) {
            console.log('Steve Levine Entertainment logo successfully added');
        }
    }

    // Start trying to add the logo after a delay
    setTimeout(tryAddLogo, 2000);
})();
