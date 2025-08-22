// Add Steve Levine Entertainment logo to partners section
(function() {
    'use strict';

    function addPartnerLogo() {
        console.log('Adding Steve Levine Entertainment logo to partners section...');

        // Try to find the partners section
        const partnersSection = document.querySelector('.partners-section');
        if (!partnersSection) {
            console.log('Partners section not found, will retry...');
            return false;
        }

        // Find the partners grid
        const partnersGrid = partnersSection.querySelector('.partners-grid');
        if (!partnersGrid) {
            console.warn('Partners grid not found in partners section');
            return false;
        }

        // Check if Steve Levine logo already exists
        const existingLogo = partnersGrid.querySelector('img[alt*="Steve Levine"]');
        if (existingLogo) {
            console.log('Steve Levine Entertainment logo already exists');
            return true;
        }

        // Find the first placeholder logo slot
        const placeholderSlot = partnersGrid.querySelector('.partner-logo .logo-placeholder');
        if (placeholderSlot) {
            // Replace the placeholder with the actual logo
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

            // Replace the placeholder with the logo
            placeholderSlot.parentNode.replaceChild(logoImg, placeholderSlot);
            console.log('Steve Levine Entertainment logo added successfully to placeholder slot');
            return true;
        } else {
            // If no placeholder found, add a new partner logo slot
            const newPartnerLogo = document.createElement('div');
            newPartnerLogo.className = 'partner-logo';

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

            newPartnerLogo.appendChild(logoImg);
            partnersGrid.appendChild(newPartnerLogo);
            console.log('Steve Levine Entertainment logo added as new partner');
            return true;
        }
    }

    let attempts = 0;
    const maxAttempts = 10;

    function tryAddLogo() {
        attempts++;
        const success = addPartnerLogo();

        if (!success && attempts < maxAttempts) {
            console.log(`Attempt ${attempts} failed, retrying in 500ms...`);
            setTimeout(tryAddLogo, 500);
        } else if (success) {
            console.log('Steve Levine Entertainment logo successfully added to partners section');
        } else {
            console.warn('Failed to add Steve Levine Entertainment logo after', maxAttempts, 'attempts');
        }
    }

    // Start trying to add the logo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', tryAddLogo);
    } else {
        tryAddLogo();
    }
})();
