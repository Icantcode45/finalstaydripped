// Bulletproof Navigation JavaScript - Instant Loading
console.log('Navigation Instant JS starting...');

// Wait for DOM to be ready
function ensureNavigationWorks() {
    console.log('Setting up navigation functionality...');
    
    // Function to setup dropdowns
    function setupDropdowns() {
        console.log('Setting up dropdown functionality...');
        
        // Get all service category buttons
        const serviceButtons = document.querySelectorAll('.service-category-btn');
        const expansions = document.querySelectorAll('.nav-expansion');
        
        console.log('Found service buttons:', serviceButtons.length);
        console.log('Found expansions:', expansions.length);
        
        if (serviceButtons.length === 0) {
            console.log('No service buttons found yet, retrying in 500ms...');
            setTimeout(setupDropdowns, 500);
            return;
        }
        
        // Remove any existing event listeners by cloning elements
        serviceButtons.forEach((button) => {
            const newButton = button.cloneNode(true);
            button.parentNode.replaceChild(newButton, button);
        });
        
        // Get fresh references after cloning
        const freshButtons = document.querySelectorAll('.service-category-btn');
        const freshExpansions = document.querySelectorAll('.nav-expansion');
        
        // Add click handlers to each button
        freshButtons.forEach((button) => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const category = this.getAttribute('data-category');
                console.log('Button clicked for category:', category);
                
                const expansion = document.querySelector(`.nav-expansion[data-category="${category}"]`);
                const isCurrentlyExpanded = this.classList.contains('expanded');
                
                // Close all expansions first
                freshButtons.forEach(btn => btn.classList.remove('expanded'));
                freshExpansions.forEach(exp => exp.classList.remove('expanded'));
                
                // If this wasn't expanded, expand it
                if (!isCurrentlyExpanded && expansion) {
                    this.classList.add('expanded');
                    expansion.classList.add('expanded');
                    console.log('Opened expansion for:', category);
                }
            });
            
            console.log('Added click handler for button:', button.getAttribute('data-category'));
        });
        
        // Close dropdowns when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.nav-expandable')) {
                freshButtons.forEach(btn => btn.classList.remove('expanded'));
                freshExpansions.forEach(exp => exp.classList.remove('expanded'));
            }
        });
        
        console.log('Dropdown setup completed successfully');
    }
    
    // Function to setup mobile menu
    function setupMobileMenu() {
        console.log('Setting up mobile menu...');
        
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileMenuClose = document.querySelector('.mobile-menu-close');
        
        // Mobile menu toggle function
        function toggleMobileMenu() {
            if (mobileMenu) {
                const isActive = mobileMenu.classList.contains('active');
                
                if (isActive) {
                    mobileMenu.classList.remove('active');
                    mobileMenuToggle?.classList.remove('active');
                    document.body.style.overflow = '';
                } else {
                    mobileMenu.classList.add('active');
                    mobileMenuToggle?.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            }
        }
        
        // Set up global function
        window.toggleMobileNav = toggleMobileMenu;
        
        // Mobile menu button
        if (mobileMenuToggle) {
            // Remove existing listeners
            const newToggle = mobileMenuToggle.cloneNode(true);
            mobileMenuToggle.parentNode.replaceChild(newToggle, mobileMenuToggle);
            
            newToggle.addEventListener('click', toggleMobileMenu);
            console.log('Mobile menu toggle setup');
        }
        
        // Close button
        if (mobileMenuClose) {
            mobileMenuClose.addEventListener('click', function() {
                mobileMenu?.classList.remove('active');
                document.querySelector('.mobile-menu-toggle')?.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
        
        // Mobile dropdown toggles
        const dropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', function() {
                const targetId = this.getAttribute('data-target');
                const dropdown = document.getElementById(targetId);
                
                if (dropdown) {
                    this.classList.toggle('active');
                    dropdown.classList.toggle('active');
                }
            });
        });
        
        console.log('Mobile menu setup completed');
    }
    
    // Function to setup header scroll effect
    function setupScrollEffect() {
        const header = document.getElementById('header');
        if (header) {
            window.addEventListener('scroll', function() {
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });
            console.log('Scroll effect setup');
        }
    }
    
    // Function to setup search
    function setupSearch() {
        const searchInput = document.getElementById('topbar-search');
        if (searchInput) {
            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    const query = e.target.value.trim();
                    if (query) {
                        console.log('Search query:', query);
                        // Add search functionality here
                    }
                }
            });
            
            // Keyboard shortcut (Cmd+K / Ctrl+K)
            document.addEventListener('keydown', function(e) {
                if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                    e.preventDefault();
                    searchInput.focus();
                }
            });
            
            console.log('Search setup completed');
        }
    }
    
    // Run all setup functions
    setupDropdowns();
    setupMobileMenu();
    setupScrollEffect();
    setupSearch();
    
    console.log('Navigation setup completed!');
}

// Initialize immediately if DOM is ready, otherwise wait
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ensureNavigationWorks);
} else {
    ensureNavigationWorks();
}

// Also initialize when navigation is loaded
window.addEventListener('navigationLoaded', function() {
    console.log('Navigation loaded event received, setting up...');
    setTimeout(ensureNavigationWorks, 100);
});

// Set up a mutation observer to catch any dynamic navigation loading
const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.type === 'childList') {
            const addedNodes = Array.from(mutation.addedNodes);
            const hasNavigationContent = addedNodes.some(node => {
                return node.nodeType === Node.ELEMENT_NODE && 
                       (node.querySelector?.('.service-category-btn') || 
                        node.classList?.contains('service-category-btn'));
            });
            
            if (hasNavigationContent) {
                console.log('Navigation content detected, setting up functionality...');
                setTimeout(ensureNavigationWorks, 100);
            }
        }
    });
});

// Start observing when document is ready
if (document.body) {
    observer.observe(document.body, { childList: true, subtree: true });
} else {
    document.addEventListener('DOMContentLoaded', function() {
        observer.observe(document.body, { childList: true, subtree: true });
    });
}

// Global debug function
window.debugNavigation = function() {
    console.log('=== Navigation Debug ===');
    const buttons = document.querySelectorAll('.service-category-btn');
    const expansions = document.querySelectorAll('.nav-expansion');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    
    console.log('Service buttons:', buttons.length);
    console.log('Expansions:', expansions.length);
    console.log('Mobile toggle:', !!mobileToggle);
    
    buttons.forEach((btn, i) => {
        console.log(`Button ${i + 1}:`, {
            category: btn.getAttribute('data-category'),
            hasClick: !!btn.onclick,
            text: btn.textContent.trim()
        });
    });
    
    return {
        buttons: buttons.length,
        expansions: expansions.length,
        mobileToggle: !!mobileToggle
    };
};

console.log('Navigation Instant JS loaded successfully');
