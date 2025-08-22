// Add Steve Levine Entertainment logo to partners section
(function() {
    'use strict';
    
    function addPartnerLogo() {
        console.log('Adding Steve Levine Entertainment logo to partners section...');
        
        // Find the partners grid
        const partnersGrid = document.querySelector('.partners-grid');
        if (!partnersGrid) {
            console.warn('Partners grid not found');
            return;
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
            
            // Replace the placeholder with the logo
            placeholderSlot.parentNode.replaceChild(logoImg, placeholderSlot);
            console.log('Steve Levine Entertainment logo added successfully');
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
            
            newPartnerLogo.appendChild(logoImg);
            partnersGrid.appendChild(newPartnerLogo);
            console.log('Steve Levine Entertainment logo added as new partner');
        }
    }
    
    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', addPartnerLogo);
    } else {
        addPartnerLogo();
    }
    
    // Also run after a delay to ensure the partners section is fully loaded
    setTimeout(addPartnerLogo, 1000);
})();
