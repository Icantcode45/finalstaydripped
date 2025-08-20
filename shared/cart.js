/**
 * StayDripped Cart System
 * Comprehensive cart functionality with localStorage persistence
 */

class StayDrippedCart {
    constructor() {
        this.storageKey = 'staydripped_cart';
        this.items = this.loadCart();
        this.listeners = new Set();
        this.initializeCartUI();
    }

    // Load cart from localStorage
    loadCart() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.warn('Failed to load cart from storage:', error);
            return [];
        }
    }

    // Save cart to localStorage
    saveCart() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.items));
            this.notifyListeners();
        } catch (error) {
            console.warn('Failed to save cart to storage:', error);
        }
    }

    // Add item to cart
    addItem(item) {
        // Validate required fields
        if (!item.id || !item.name || !item.price) {
            throw new Error('Item must have id, name, and price');
        }

        const existingIndex = this.items.findIndex(cartItem => cartItem.id === item.id);
        
        if (existingIndex >= 0) {
            // Update existing item
            this.items[existingIndex].quantity = (this.items[existingIndex].quantity || 1) + (item.quantity || 1);
        } else {
            // Add new item
            this.items.push({
                id: item.id,
                name: item.name,
                price: parseFloat(item.price),
                quantity: item.quantity || 1,
                category: item.category || 'Service',
                image: item.image || '',
                description: item.description || '',
                addedAt: new Date().toISOString()
            });
        }

        this.saveCart();
        return this.items[existingIndex >= 0 ? existingIndex : this.items.length - 1];
    }

    // Remove item from cart
    removeItem(itemId) {
        this.items = this.items.filter(item => item.id !== itemId);
        this.saveCart();
    }

    // Update item quantity
    updateQuantity(itemId, quantity) {
        const index = this.items.findIndex(item => item.id === itemId);
        if (index >= 0) {
            if (quantity <= 0) {
                this.removeItem(itemId);
            } else {
                this.items[index].quantity = quantity;
                this.saveCart();
            }
        }
    }

    // Get cart items
    getItems() {
        return this.items;
    }

    // Get item count
    getItemCount() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    // Get cart subtotal
    getSubtotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // Get cart total with tax and shipping
    getTotal(taxRate = 0.08, freeShippingThreshold = 100, shippingCost = 9.99) {
        const subtotal = this.getSubtotal();
        const tax = subtotal * taxRate;
        const shipping = subtotal >= freeShippingThreshold ? 0 : shippingCost;
        return subtotal + tax + shipping;
    }

    // Clear cart
    clear() {
        this.items = [];
        this.saveCart();
    }

    // Add listener for cart updates
    addListener(callback) {
        this.listeners.add(callback);
    }

    // Remove listener
    removeListener(callback) {
        this.listeners.delete(callback);
    }

    // Notify all listeners
    notifyListeners() {
        this.listeners.forEach(callback => {
            try {
                callback(this.items, this.getItemCount(), this.getSubtotal());
            } catch (error) {
                console.warn('Cart listener error:', error);
            }
        });
        this.updateCartUI();
    }

    // Initialize cart UI elements
    initializeCartUI() {
        // Create cart widget if it doesn't exist
        if (!document.getElementById('cart-widget')) {
            this.createCartWidget();
        }
        
        // Initialize existing add-to-cart buttons
        this.initializeAddToCartButtons();
        
        // Update UI
        this.updateCartUI();
    }

    // Create floating cart widget
    createCartWidget() {
        const widget = document.createElement('div');
        widget.id = 'cart-widget';
        widget.className = 'cart-widget hidden';
        widget.innerHTML = `
            <div class="cart-header">
                <h4>Your Cart (<span id="cart-count">0</span>)</h4>
                <button class="cart-close" onclick="stayDrippedCart.hideCart()" aria-label="Close cart">×</button>
            </div>
            <div class="cart-items" id="cart-items"></div>
            <div class="cart-footer">
                <div class="cart-total">Total: $<span id="cart-total">0.00</span></div>
                <button class="btn cart-checkout-btn" onclick="stayDrippedCart.goToCheckout()">
                    Checkout
                </button>
                <button class="btn btn-secondary" onclick="stayDrippedCart.hideCart()">
                    Continue Shopping
                </button>
            </div>
        `;

        // Add CSS if not present
        if (!document.querySelector('#cart-widget-styles')) {
            const styles = document.createElement('style');
            styles.id = 'cart-widget-styles';
            styles.textContent = `
                .cart-widget {
                    position: fixed;
                    top: 50%;
                    right: 20px;
                    transform: translateY(-50%);
                    width: 350px;
                    max-height: 80vh;
                    background: white;
                    border-radius: 16px;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
                    z-index: 1000;
                    overflow: hidden;
                    transition: all 0.3s ease;
                    border: 1px solid #E2E8F0;
                }
                .cart-widget.hidden {
                    opacity: 0;
                    visibility: hidden;
                    transform: translateY(-50%) translateX(100px);
                }
                .cart-header {
                    padding: 20px;
                    border-bottom: 1px solid #E2E8F0;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background: #F8FAFC;
                }
                .cart-header h4 {
                    margin: 0;
                    font-size: 16px;
                    color: #1A2B3A;
                }
                .cart-close {
                    background: none;
                    border: none;
                    font-size: 24px;
                    cursor: pointer;
                    color: #64748B;
                    padding: 0;
                    width: 24px;
                    height: 24px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .cart-items {
                    max-height: 300px;
                    overflow-y: auto;
                    padding: 16px 20px;
                }
                .cart-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 12px 0;
                    border-bottom: 1px solid #F0F0F0;
                }
                .cart-item:last-child {
                    border-bottom: none;
                }
                .cart-item-info {
                    flex: 1;
                }
                .cart-item-info h5 {
                    margin: 0 0 4px 0;
                    font-size: 14px;
                    color: #1A2B3A;
                }
                .cart-item-details {
                    font-size: 12px;
                    color: #64748B;
                }
                .cart-item-controls {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                .qty-control {
                    background: #F8FAFC;
                    border: 1px solid #E2E8F0;
                    border-radius: 4px;
                    width: 24px;
                    height: 24px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    font-size: 12px;
                    color: #64748B;
                }
                .qty-control:hover {
                    background: #E2E8F0;
                }
                .qty-display {
                    min-width: 20px;
                    text-align: center;
                    font-size: 12px;
                    font-weight: 600;
                }
                .cart-footer {
                    padding: 20px;
                    border-top: 1px solid #E2E8F0;
                    background: #F8FAFC;
                }
                .cart-total {
                    font-size: 18px;
                    font-weight: 700;
                    color: #1A2B3A;
                    margin-bottom: 16px;
                    text-align: center;
                }
                .cart-checkout-btn {
                    width: 100%;
                    margin-bottom: 8px;
                }
                .cart-floating-btn {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    background: #0066CC;
                    color: white;
                    border: none;
                    border-radius: 50px;
                    padding: 12px 20px;
                    font-weight: 600;
                    cursor: pointer;
                    box-shadow: 0 4px 12px rgba(0, 102, 204, 0.3);
                    z-index: 999;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                .cart-floating-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(0, 102, 204, 0.4);
                }
                .cart-floating-btn.hidden {
                    opacity: 0;
                    visibility: hidden;
                    transform: translateY(20px);
                }
                .cart-badge {
                    background: #FF6B35;
                    color: white;
                    border-radius: 50%;
                    padding: 2px 6px;
                    font-size: 10px;
                    font-weight: 700;
                    min-width: 16px;
                    height: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                @media (max-width: 768px) {
                    .cart-widget {
                        width: calc(100vw - 40px);
                        right: 20px;
                        left: 20px;
                    }
                }
            `;
            document.head.appendChild(styles);
        }

        document.body.appendChild(widget);

        // Create floating cart button
        const floatingBtn = document.createElement('button');
        floatingBtn.id = 'cart-floating-btn';
        floatingBtn.className = 'cart-floating-btn hidden';
        floatingBtn.innerHTML = `
            🛒 Cart <span class="cart-badge">0</span>
        `;
        floatingBtn.onclick = () => this.showCart();
        document.body.appendChild(floatingBtn);
    }

    // Initialize add-to-cart buttons
    initializeAddToCartButtons() {
        document.querySelectorAll('.add-to-cart, .btn[href*="book"], .btn[data-service]').forEach(button => {
            if (!button.hasAttribute('data-cart-initialized')) {
                button.setAttribute('data-cart-initialized', 'true');
                button.addEventListener('click', (e) => this.handleAddToCart(e));
            }
        });
    }

    // Handle add to cart button clicks
    handleAddToCart(event) {
        event.preventDefault();

        const button = event.target.closest('button, a');
        const card = button.closest('.service-card, .service-card-enhanced, .product-card');

        console.log('Add to cart clicked:', {
            button: button,
            card: card,
            buttonClass: button?.className,
            buttonText: button?.textContent
        });

        if (!card) {
            console.warn('No card found for add to cart button');
            return;
        }

        // Extract item details from the card
        const item = this.extractItemFromCard(card, button);

        console.log('Extracted item:', item);

        if (item) {
            this.addItem(item);
            this.showAddedNotification(button, item);
            this.showCart();
        } else {
            console.error('Failed to extract item from card');
        }
    }

    // Extract item details from service card
    extractItemFromCard(card, button) {
        // First check if button has data attributes (preferred method)
        let title = button.getAttribute('data-name');
        let price = button.getAttribute('data-price');
        let category = button.getAttribute('data-category');
        let description = button.getAttribute('data-description');

        // Fall back to extracting from card if data attributes aren't available
        if (!title) {
            title = card.querySelector('h3, h2, .service-title, .product-title')?.textContent?.trim();
        }

        if (!price) {
            const priceText = card.querySelector('.service-price, .price, .product-price, [class*="price"]')?.textContent;
            const priceMatch = priceText?.match(/\$?(\d+(?:\.\d{2})?)/);
            price = priceMatch ? parseFloat(priceMatch[1]) : 0;
        } else {
            price = parseFloat(price);
        }

        if (!description) {
            description = card.querySelector('p, .description, .service-description, .product-description')?.textContent?.trim();
        }

        if (!category) {
            category = this.getItemCategory(card);
        }

        if (!title) {
            console.warn('Could not extract item title from card or button');
            return null;
        }

        // Generate unique ID from title
        const id = title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');

        return {
            id,
            name: title,
            price,
            description: description?.substring(0, 100) + (description?.length > 100 ? '...' : ''),
            category: category || 'Service',
            image: card.querySelector('img')?.src || ''
        };
    }

    // Get item category from context
    getItemCategory(card) {
        const section = card.closest('section');
        const sectionTitle = section?.querySelector('h2')?.textContent?.trim();
        return sectionTitle || 'Service';
    }

    // Show added to cart notification
    showAddedNotification(button, item) {
        const originalText = button.textContent;
        button.textContent = 'Added to Cart!';
        button.style.background = '#8BC34A';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
        }, 2000);
    }

    // Update cart UI
    updateCartUI() {
        const count = this.getItemCount();
        const total = this.getSubtotal();

        // Update cart count
        document.querySelectorAll('#cart-count, .cart-count, .cart-badge').forEach(el => {
            el.textContent = count;
        });

        // Update cart total
        document.querySelectorAll('#cart-total, .cart-total-amount').forEach(el => {
            el.textContent = total.toFixed(2);
        });

        // Update floating button visibility
        const floatingBtn = document.getElementById('cart-floating-btn');
        if (floatingBtn) {
            floatingBtn.classList.toggle('hidden', count === 0);
        }

        // Update cart items
        this.renderCartItems();
    }

    // Render cart items in widget
    renderCartItems() {
        const container = document.getElementById('cart-items');
        if (!container) return;

        if (this.items.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: #64748B; padding: 20px;">Your cart is empty</p>';
            return;
        }

        container.innerHTML = this.items.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-info">
                    <h5>${item.name}</h5>
                    <div class="cart-item-details">$${item.price.toFixed(2)} each</div>
                </div>
                <div class="cart-item-controls">
                    <button class="qty-control" onclick="stayDrippedCart.updateQuantity('${item.id}', ${item.quantity - 1})">-</button>
                    <span class="qty-display">${item.quantity}</span>
                    <button class="qty-control" onclick="stayDrippedCart.updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
                </div>
            </div>
        `).join('');
    }

    // Show cart widget
    showCart() {
        const widget = document.getElementById('cart-widget');
        if (widget) {
            widget.classList.remove('hidden');
        }
    }

    // Hide cart widget
    hideCart() {
        const widget = document.getElementById('cart-widget');
        if (widget) {
            widget.classList.add('hidden');
        }
    }

    // Go to checkout
    goToCheckout() {
        if (this.items.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        
        // Save cart to localStorage for checkout page
        this.saveCart();
        
        // Navigate to checkout
        window.location.href = 'pages/checkout.html';
    }

    // Initialize mutation observer to watch for new buttons
    initializeMutationObserver() {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        const buttons = node.querySelectorAll?.('.add-to-cart, .btn[href*="book"], .btn[data-service]') || [];
                        buttons.forEach(button => {
                            if (!button.hasAttribute('data-cart-initialized')) {
                                button.setAttribute('data-cart-initialized', 'true');
                                button.addEventListener('click', (e) => this.handleAddToCart(e));
                            }
                        });
                    }
                });
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
}

// Create global cart instance
window.stayDrippedCart = new StayDrippedCart();

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.stayDrippedCart.initializeMutationObserver();
    });
} else {
    window.stayDrippedCart.initializeMutationObserver();
}

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = StayDrippedCart;
}
