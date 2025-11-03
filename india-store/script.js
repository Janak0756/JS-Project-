// Product Data
const products = [
    {
        id: 1,
        name: "Turmeric Powder",
        category: "spices",
        price: 120,
        description: "Pure turmeric powder with rich color and aroma.",
        image: "fas fa-pepper-hot"
    },
    {
        id: 2,
        name: "Silk Saree",
        category: "clothing",
        price: 2500,
        description: "Beautiful handwoven silk saree with intricate designs.",
        image: "fas fa-tshirt"
    },
    {
        id: 3,
        name: "Silver Earrings",
        category: "jewelry",
        price: 800,
        description: "Elegant silver earrings with traditional patterns.",
        image: "fas fa-gem"
    },
    {
        id: 4,
        name: "Cumin Seeds",
        category: "spices",
        price: 90,
        description: "Premium quality cumin seeds for authentic flavor.",
        image: "fas fa-pepper-hot"
    },
    {
        id: 5,
        name: "Kurta Pajama",
        category: "clothing",
        price: 1500,
        description: "Comfortable and stylish cotton kurta pajama set.",
        image: "fas fa-tshirt"
    },
    {
        id: 6,
        name: "Gold Bangle",
        category: "jewelry",
        price: 5000,
        description: "Traditional gold-plated bangle with intricate design.",
        image: "fas fa-gem"
    },
    {
        id: 7,
        name: "Garam Masala",
        category: "spices",
        price: 150,
        description: "Aromatic garam masala blend for flavorful dishes.",
        image: "fas fa-pepper-hot"
    },
    {
        id: 8,
        name: "Chanderi Dupatta",
        category: "clothing",
        price: 800,
        description: "Light and elegant Chanderi dupatta with zari work.",
        image: "fas fa-tshirt"
    }
];

// Cart Array
let cart = [];

// DOM Elements
const productList = document.querySelector('.product-list');
const filterBtns = document.querySelectorAll('.filter-btn');
const cartIcon = document.querySelector('.cart-icon');
const cartOverlay = document.querySelector('.cart-overlay');
const closeCart = document.querySelector('.close-cart');
const cartContent = document.querySelector('.cart-content');
const cartCount = document.querySelector('.cart-count');
const totalAmount = document.querySelector('.total-amount');
const checkoutBtn = document.querySelector('.checkout-btn');

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    displayProducts(products);
    setupEventListeners();
    updateCart();
});

// Display Products
function displayProducts(productsToDisplay) {
    productList.innerHTML = '';
    
    productsToDisplay.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.setAttribute('data-category', product.category);
        
        productCard.innerHTML = `
            <div class="product-image">
                <i class="${product.image}"></i>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-price">
                    <span class="price">₹${product.price}</span>
                    <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                </div>
            </div>
        `;
        
        productList.appendChild(productCard);
    });
    
    // Add event listeners to Add to Cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            addToCart(productId);
        });
    });
}

// Setup Event Listeners
function setupEventListeners() {
    // Filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            e.target.classList.add('active');
            
            const filter = e.target.getAttribute('data-filter');
            
            if (filter === 'all') {
                displayProducts(products);
            } else {
                const filteredProducts = products.filter(product => product.category === filter);
                displayProducts(filteredProducts);
            }
        });
    });
    
    // Cart icon
    cartIcon.addEventListener('click', () => {
        cartOverlay.style.display = 'flex';
    });
    
    // Close cart
    closeCart.addEventListener('click', () => {
        cartOverlay.style.display = 'none';
    });
    
    // Checkout button
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty!');
        } else {
            alert('Thank you for your order! Total: ₹' + calculateTotal());
            cart = [];
            updateCart();
            cartOverlay.style.display = 'none';
        }
    });
    
    // Close cart when clicking outside
    cartOverlay.addEventListener('click', (e) => {
        if (e.target === cartOverlay) {
            cartOverlay.style.display = 'none';
        }
    });
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    
    // Check if product is already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCart();
    
    // Show confirmation
    const notification = document.createElement('div');
    notification.textContent = `${product.name} added to cart!`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #2ecc71;
        color: white;
        padding: 10px 20px;
        border-radius: 4px;
        z-index: 1001;
        box-shadow: 0 3px 10px rgba(0,0,0,0.2);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 2000);
}

// Update Cart
function updateCart() {
    cartContent.innerHTML = '';
    
    if (cart.length === 0) {
        cartContent.innerHTML = '<p>Your cart is empty</p>';
    } else {
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            
            cartItem.innerHTML = `
                <div class="cart-item-image">
                    <i class="${item.image}"></i>
                </div>
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p class="cart-item-price">₹${item.price}</p>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-id="${item.id}">
                        <button class="quantity-btn increase" data-id="${item.id}">+</button>
                    </div>
                    <button class="remove-item" data-id="${item.id}">Remove</button>
                </div>
            `;
            
            cartContent.appendChild(cartItem);
        });
        
        // Add event listeners to quantity buttons and remove buttons
        document.querySelectorAll('.quantity-btn.decrease').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = parseInt(e.target.getAttribute('data-id'));
                updateQuantity(productId, -1);
            });
        });
        
        document.querySelectorAll('.quantity-btn.increase').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = parseInt(e.target.getAttribute('data-id'));
                updateQuantity(productId, 1);
            });
        });
        
        document.querySelectorAll('.quantity-input').forEach(input => {
            input.addEventListener('change', (e) => {
                const productId = parseInt(e.target.getAttribute('data-id'));
                const newQuantity = parseInt(e.target.value);
                
                if (newQuantity < 1) {
                    e.target.value = 1;
                    updateQuantity(productId, 0, 1);
                } else {
                    updateQuantity(productId, 0, newQuantity);
                }
            });
        });
        
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = parseInt(e.target.getAttribute('data-id'));
                removeFromCart(productId);
            });
        });
    }
    
    // Update cart count and total
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    totalAmount.textContent = calculateTotal();
}

// Update Quantity
function updateQuantity(productId, change, newQuantity = null) {
    const item = cart.find(item => item.id === productId);
    
    if (newQuantity !== null) {
        item.quantity = newQuantity;
    } else {
        item.quantity += change;
    }
    
    if (item.quantity < 1) {
        removeFromCart(productId);
    } else {
        updateCart();
    }
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Calculate Total
function calculateTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Search Functionality
const searchBox = document.querySelector('.search-box input');
searchBox.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    
    if (searchTerm === '') {
        displayProducts(products);
    } else {
        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm) || 
            product.description.toLowerCase().includes(searchTerm)
        );
        displayProducts(filteredProducts);
    }
});