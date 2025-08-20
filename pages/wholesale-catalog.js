// Wholesale Catalog JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the wholesale catalog
    initializeWholesaleCatalog();
});

function initializeWholesaleCatalog() {
    // Initialize search functionality
    initializeSearch();
    
    // Initialize category filters
    initializeCategoryFilters();
    
    // Initialize product interactions
    initializeProductInteractions();
    
    // Initialize cart functionality
    initializeCartFunctionality();
    
    // Initialize navigation buttons
    initializeNavigationButtons();
    
    // Initialize quantity selectors
    initializeQuantitySelectors();
    
    // Initialize brand links
    initializeBrandLinks();
    
    console.log('Wholesale catalog initialized successfully');
}

// Search functionality
function initializeSearch() {
    const searchInput = document.querySelector('.search-input');
    const productCards = document.querySelectorAll('.product-card');
    
    if (!searchInput) return;
    
    let searchTimeout;
    
    searchInput.addEventListener('input', function(e) {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            const searchTerm = e.target.value.toLowerCase().trim();
            filterProducts(searchTerm);
        }, 300);
    });
    
    function filterProducts(searchTerm) {
        productCards.forEach(card => {
            const productName = card.querySelector('.product-name')?.textContent.toLowerCase() || '';
            const productBrand = card.querySelector('.product-brand')?.textContent.toLowerCase() || '';
            const productSize = card.querySelector('.product-size')?.textContent.toLowerCase() || '';
            
            const isMatch = productName.includes(searchTerm) || 
                          productBrand.includes(searchTerm) || 
                          productSize.includes(searchTerm);
            
            if (isMatch) {
                card.style.display = 'flex';
                card.style.opacity = '1';
            } else {
                card.style.display = 'none';
                card.style.opacity = '0';
            }
        });
        
        // Update results count or show no results message if needed
        updateSearchResults(searchTerm);
    }
    
    function updateSearchResults(searchTerm) {
        const visibleCards = Array.from(productCards).filter(card => 
            card.style.display !== 'none'
        );
        
        console.log(`Search for "${searchTerm}" returned ${visibleCards.length} results`);
    }
}

// Category filter functionality
function initializeCategoryFilters() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const productCards = document.querySelectorAll('.product-card');
    
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            filterTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            const category = this.dataset.category;
            filterProductsByCategory(category);
        });
        
        // Add keyboard navigation
        tab.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    function filterProductsByCategory(category) {
        if (category === 'all') {
            productCards.forEach(card => {
                card.style.display = 'flex';
                card.style.opacity = '1';
            });
            return;
        }
        
        // For demo purposes, randomly show/hide products
        // In a real implementation, you'd filter based on actual product categories
        productCards.forEach((card, index) => {
            const shouldShow = Math.random() > 0.3; // Show 70% of products
            
            if (shouldShow) {
                card.style.display = 'flex';
                card.style.opacity = '1';
            } else {
                card.style.display = 'none';
                card.style.opacity = '0';
            }
        });
        
        console.log(`Filtered products by category: ${category}`);
    }
}

// Product interaction functionality
function initializeProductInteractions() {
    const actionButtons = document.querySelectorAll('.action-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    // Handle action buttons (favorites, more options)
    actionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const ariaLabel = this.getAttribute('aria-label');
            
            if (ariaLabel.includes('favorites')) {
                toggleFavorite(this);
            } else if (ariaLabel.includes('More options')) {
                showMoreOptions(this);
            }
        });
    });
    
    // Handle product card hover effects
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const actionBtns = this.querySelectorAll('.action-btn');
            actionBtns.forEach(btn => {
                btn.style.opacity = '1';
            });
        });
        
        card.addEventListener('mouseleave', function() {
            const actionBtns = this.querySelectorAll('.action-btn');
            actionBtns.forEach(btn => {
                btn.style.opacity = '0';
            });
        });
    });
    
    function toggleFavorite(button) {
        const isFavorited = button.classList.contains('favorited');
        
        if (isFavorited) {
            button.classList.remove('favorited');
            button.style.color = '';
            console.log('Removed from favorites');
        } else {
            button.classList.add('favorited');
            button.style.color = '#FFC107';
            console.log('Added to favorites');
        }
        
        // Here you would typically make an API call to update favorites
        updateFavoriteStatus(button.closest('.product-card'), !isFavorited);
    }
    
    function showMoreOptions(button) {
        // Create a simple dropdown menu
        const existingMenu = document.querySelector('.product-options-menu');
        if (existingMenu) {
            existingMenu.remove();
            return;
        }
        
        const menu = document.createElement('div');
        menu.className = 'product-options-menu';
        menu.style.cssText = `
            position: absolute;
            top: 100%;
            right: 0;
            background: white;
            border: 1px solid #B8C6D6;
            border-radius: 8px;
            box-shadow: 0 4px 16px rgba(54, 72, 92, 0.1);
            z-index: 1000;
            min-width: 150px;
        `;
        
        const options = [
            { text: 'View Details', action: 'view-details' },
            { text: 'Compare', action: 'compare' },
            { text: 'Share', action: 'share' }
        ];
        
        options.forEach(option => {
            const item = document.createElement('button');
            item.textContent = option.text;
            item.style.cssText = `
                display: block;
                width: 100%;
                padding: 8px 16px;
                border: none;
                background: none;
                text-align: left;
                cursor: pointer;
                font-size: 14px;
            `;
            
            item.addEventListener('click', function() {
                console.log(`${option.text} clicked`);
                menu.remove();
            });
            
            item.addEventListener('mouseenter', function() {
                this.style.backgroundColor = '#F5F7FA';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.backgroundColor = 'transparent';
            });
            
            menu.appendChild(item);
        });
        
        button.style.position = 'relative';
        button.appendChild(menu);
        
        // Close menu when clicking outside
        setTimeout(() => {
            document.addEventListener('click', function closeMenu(e) {
                if (!menu.contains(e.target)) {
                    menu.remove();
                    document.removeEventListener('click', closeMenu);
                }
            });
        }, 100);
    }
    
    function updateFavoriteStatus(productCard, isFavorited) {
        // Here you would typically make an API call to update the favorite status
        const productName = productCard.querySelector('.product-name')?.textContent;
        console.log(`Product "${productName}" favorite status: ${isFavorited}`);
    }
}

// Cart functionality
function initializeCartFunctionality() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const cartToggleBtn = document.querySelector('.cart-toggle-btn');
    const cartCount = document.querySelector('.cart-count');
    
    let cartItems = 0;
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const productCard = this.closest('.product-card');
            const quantityInput = productCard.querySelector('.quantity-input');
            const quantity = parseInt(quantityInput?.value || 1);
            
            addToCart(productCard, quantity, this);
        });
    });
    
    if (cartToggleBtn) {
        cartToggleBtn.addEventListener('click', function() {
            toggleCart();
        });
    }
    
    function addToCart(productCard, quantity, button) {
        // Show loading state
        button.classList.add('loading');
        button.disabled = true;
        button.textContent = 'Adding...';
        
        const productName = productCard.querySelector('.product-name')?.textContent;
        const productPrice = productCard.querySelector('.wholesale-price')?.textContent;
        
        // Simulate API call
        setTimeout(() => {
            cartItems += quantity;
            updateCartCount();
            
            // Show success state
            showAddToCartSuccess(productCard, button);
            
            console.log(`Added ${quantity} x "${productName}" to cart`);
        }, 1000);
    }
    
    function showAddToCartSuccess(productCard, button) {
        const purchaseSection = productCard.querySelector('.product-purchase');
        
        // Create success notification
        const notification = document.createElement('div');
        notification.className = 'cart-added-notification';
        notification.textContent = `${purchaseSection.querySelector('.quantity-input')?.value || 1} added!`;
        
        const viewCartBtn = document.createElement('a');
        viewCartBtn.href = '#';
        viewCartBtn.className = 'view-cart-btn';
        viewCartBtn.textContent = 'View cart';
        
        // Replace purchase section temporarily
        const originalContent = purchaseSection.innerHTML;
        purchaseSection.classList.add('cart-added');
        purchaseSection.innerHTML = '';
        purchaseSection.appendChild(notification);
        purchaseSection.appendChild(viewCartBtn);
        
        // Restore original content after delay
        setTimeout(() => {
            purchaseSection.classList.remove('cart-added');
            purchaseSection.innerHTML = originalContent;
            
            // Re-initialize quantity selectors for this card
            initializeQuantitySelectorsForCard(productCard);
            
            // Re-attach event listener to new add to cart button
            const newButton = purchaseSection.querySelector('.add-to-cart-btn');
            if (newButton) {
                newButton.addEventListener('click', function(e) {
                    e.preventDefault();
                    const quantity = parseInt(purchaseSection.querySelector('.quantity-input')?.value || 1);
                    addToCart(productCard, quantity, this);
                });
            }
        }, 3000);
        
        viewCartBtn.addEventListener('click', function(e) {
            e.preventDefault();
            toggleCart();
        });
    }
    
    function updateCartCount() {
        if (cartCount) {
            cartCount.textContent = cartItems;
        }
    }
    
    function toggleCart() {
        // Simple cart toggle - in a real app this would show a cart sidebar or modal
        console.log(`Cart toggled. Current items: ${cartItems}`);
        alert(`Cart has ${cartItems} item(s)`);
    }
}

// Navigation buttons functionality
function initializeNavigationButtons() {
    const navButtons = document.querySelectorAll('.nav-btn');
    
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const isNext = this.getAttribute('aria-label').includes('Next');
            const isPrev = this.getAttribute('aria-label').includes('Previous');
            
            if (isNext) {
                navigateProducts('next');
            } else if (isPrev) {
                navigateProducts('prev');
            }
        });
    });
    
    function navigateProducts(direction) {
        // For demo purposes, just log the navigation
        console.log(`Navigating products: ${direction}`);
        
        // In a real implementation, you would:
        // 1. Load more products from API
        // 2. Update the products grid
        // 3. Handle pagination state
    }
}

// Quantity selector functionality
function initializeQuantitySelectors() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        initializeQuantitySelectorsForCard(card);
    });
}

function initializeQuantitySelectorsForCard(card) {
    const quantityInput = card.querySelector('.quantity-input');
    const increaseBtn = card.querySelector('.quantity-btn:last-child');
    const decreaseBtn = card.querySelector('.quantity-btn:first-child');
    
    if (!quantityInput || !increaseBtn || !decreaseBtn) return;
    
    // Handle increase quantity
    increaseBtn.addEventListener('click', function() {
        const currentValue = parseInt(quantityInput.value) || 1;
        const newValue = Math.min(currentValue + 1, 999);
        quantityInput.value = newValue;
        updateQuantityButtons(decreaseBtn, increaseBtn, newValue);
    });
    
    // Handle decrease quantity
    decreaseBtn.addEventListener('click', function() {
        const currentValue = parseInt(quantityInput.value) || 1;
        const newValue = Math.max(currentValue - 1, 1);
        quantityInput.value = newValue;
        updateQuantityButtons(decreaseBtn, increaseBtn, newValue);
    });
    
    // Handle manual input
    quantityInput.addEventListener('input', function() {
        let value = parseInt(this.value) || 1;
        value = Math.max(1, Math.min(999, value));
        this.value = value;
        updateQuantityButtons(decreaseBtn, increaseBtn, value);
    });
    
    // Handle keyboard navigation
    quantityInput.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            increaseBtn.click();
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            decreaseBtn.click();
        }
    });
    
    function updateQuantityButtons(decreaseBtn, increaseBtn, value) {
        // Update decrease button state
        if (value <= 1) {
            decreaseBtn.disabled = true;
            decreaseBtn.style.cursor = 'not-allowed';
            decreaseBtn.style.opacity = '0.6';
        } else {
            decreaseBtn.disabled = false;
            decreaseBtn.style.cursor = 'pointer';
            decreaseBtn.style.opacity = '1';
        }
        
        // Update increase button state
        if (value >= 999) {
            increaseBtn.disabled = true;
            increaseBtn.style.cursor = 'not-allowed';
            increaseBtn.style.opacity = '0.6';
        } else {
            increaseBtn.disabled = false;
            increaseBtn.style.cursor = 'pointer';
            increaseBtn.style.opacity = '1';
        }
    }
    
    // Initialize button states
    const initialValue = parseInt(quantityInput.value) || 1;
    updateQuantityButtons(decreaseBtn, increaseBtn, initialValue);
}

// Brand links functionality
function initializeBrandLinks() {
    const brandLinks = document.querySelectorAll('.brand-link');
    
    brandLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Remove active class from all brand links
            brandLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            const brandName = this.textContent;
            filterByBrand(brandName);
        });
    });
    
    function filterByBrand(brandName) {
        console.log(`Filtering products by brand: ${brandName}`);
        
        // In a real implementation, you would:
        // 1. Filter products by the selected brand
        // 2. Update the featured new products section
        // 3. Make API calls to load brand-specific products
    }
}

// Location selector functionality
function initializeLocationSelector() {
    const locationBtn = document.querySelector('.location-selector-btn');
    
    if (locationBtn) {
        locationBtn.addEventListener('click', function() {
            showLocationSelector();
        });
    }
    
    function showLocationSelector() {
        // Simple location selector - in a real app this would show a modal with states/regions
        const locations = ['Arizona', 'California', 'Nevada', 'Texas', 'Colorado'];
        const currentLocation = 'Arizona';
        
        const newLocation = prompt(`Select your location:\n${locations.join('\n')}`, currentLocation);
        
        if (newLocation && locations.includes(newLocation)) {
            updateLocation(newLocation);
        }
    }
    
    function updateLocation(location) {
        const locationText = document.querySelector('.location-selector-btn span');
        if (locationText) {
            locationText.textContent = `Ship to: ${location}`;
        }
        
        console.log(`Location updated to: ${location}`);
        
        // In a real implementation, you would:
        // 1. Update shipping calculations
        // 2. Filter products by availability in the region
        // 3. Update pricing based on location
    }
}

// Size selector functionality
function initializeSizeSelectors() {
    const sizeSelectors = document.querySelectorAll('.size-selector');
    
    sizeSelectors.forEach(selector => {
        selector.addEventListener('click', function() {
            showSizeOptions(this);
        });
    });
    
    function showSizeOptions(selector) {
        // For demo purposes, show available sizes
        const sizes = ['30 tablets', '60 tablets', '90 tablets', '120 tablets'];
        const currentSize = selector.querySelector('span').textContent;
        
        // Create dropdown menu
        const existingMenu = document.querySelector('.size-options-menu');
        if (existingMenu) {
            existingMenu.remove();
            return;
        }
        
        const menu = document.createElement('div');
        menu.className = 'size-options-menu';
        menu.style.cssText = `
            position: absolute;
            top: 100%;
            left: 0;
            background: white;
            border: 1px solid #B8C6D6;
            border-radius: 8px;
            box-shadow: 0 4px 16px rgba(54, 72, 92, 0.1);
            z-index: 1000;
            min-width: 120px;
        `;
        
        sizes.forEach(size => {
            const item = document.createElement('button');
            item.textContent = size;
            item.style.cssText = `
                display: block;
                width: 100%;
                padding: 8px 12px;
                border: none;
                background: none;
                text-align: left;
                cursor: pointer;
                font-size: 14px;
                ${size === currentSize ? 'background-color: #F5F7FA; font-weight: 600;' : ''}
            `;
            
            item.addEventListener('click', function() {
                selector.querySelector('span').textContent = size;
                menu.remove();
                console.log(`Size changed to: ${size}`);
            });
            
            item.addEventListener('mouseenter', function() {
                if (size !== currentSize) {
                    this.style.backgroundColor = '#F5F7FA';
                }
            });
            
            item.addEventListener('mouseleave', function() {
                if (size !== currentSize) {
                    this.style.backgroundColor = 'transparent';
                }
            });
            
            menu.appendChild(item);
        });
        
        selector.style.position = 'relative';
        selector.appendChild(menu);
        
        // Close menu when clicking outside
        setTimeout(() => {
            document.addEventListener('click', function closeMenu(e) {
                if (!menu.contains(e.target)) {
                    menu.remove();
                    document.removeEventListener('click', closeMenu);
                }
            });
        }, 100);
    }
}

// Initialize additional functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeLocationSelector();
    initializeSizeSelectors();
});

// Accessibility enhancements
function enhanceAccessibility() {
    // Add ARIA labels and keyboard navigation where needed
    const interactiveElements = document.querySelectorAll('.filter-tab, .nav-btn, .action-btn');
    
    interactiveElements.forEach(element => {
        if (!element.hasAttribute('tabindex')) {
            element.setAttribute('tabindex', '0');
        }
        
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('Wholesale catalog error:', e.error);
});

// Initialize accessibility enhancements
document.addEventListener('DOMContentLoaded', enhanceAccessibility);

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeWholesaleCatalog,
        initializeSearch,
        initializeCategoryFilters,
        initializeProductInteractions,
        initializeCartFunctionality
    };
}
