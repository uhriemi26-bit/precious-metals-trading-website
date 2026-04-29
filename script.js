// ===== PRICE UPDATER =====
function updatePrices() {
    // Simulated price data with slight variations
    const priceData = {
        gold: {
            current: 2495.50,
            change: 2.45,
            high: 2510.00,
            low: 2440.25
        },
        silver: {
            current: 29.75,
            change: -1.22,
            high: 30.50,
            low: 29.20
        },
        platinum: {
            current: 1095.00,
            change: 1.85,
            high: 1105.50,
            low: 1075.00
        },
        palladium: {
            current: 945.30,
            change: 3.15,
            high: 965.00,
            low: 920.50
        }
    };

    // Simulate real-time updates with small variations
    Object.keys(priceData).forEach(metal => {
        const variation = (Math.random() - 0.5) * 10;
        priceData[metal].current += variation;
        
        const element = document.getElementById(`${metal}-price`);
        if (element) {
            element.textContent = priceData[metal].current.toFixed(2);
        }
    });

    // Update last updated time
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    const lastUpdate = document.getElementById('last-update');
    if (lastUpdate) {
        lastUpdate.textContent = timeString;
    }
}

// Update prices on page load and every 10 seconds
document.addEventListener('DOMContentLoaded', () => {
    updatePrices();
    setInterval(updatePrices, 10000);
});

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ===== NAVBAR ACTIVE STATE =====
function updateActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', updateActiveNavLink);

// ===== BUTTON CLICK HANDLERS =====
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('click', function(e) {
        // Add ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        // Remove any existing ripples
        const existingRipple = this.querySelector('.ripple');
        if (existingRipple) {
            existingRipple.remove();
        }

        this.appendChild(ripple);
    });
});

// ===== NEWSLETTER FORM =====
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value;
        
        if (email) {
            alert(`Thank you for subscribing! A confirmation email has been sent to ${email}`);
            emailInput.value = '';
        }
    });

    // Allow form submission on Enter key
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    if (emailInput) {
        emailInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                newsletterForm.dispatchEvent(new Event('submit'));
            }
        });
    }
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.price-card, .tip-card, .stat-card, .pillar-card').forEach(el => {
        observer.observe(el);
    });
});

// ===== ADD CSS ANIMATION =====
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    @media (max-width: 768px) {
        .nav-menu {
            display: none;
        }
    }
`;
document.head.appendChild(style);

// ===== MOBILE MENU TOGGLE (Optional enhancement) =====
function setupMobileMenu() {
    const menuBtn = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuBtn && navMenu) {
        menuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
}

document.addEventListener('DOMContentLoaded', setupMobileMenu);

// ===== CONSOLE MESSAGE =====
console.log('%cWelcome to MetalTrade Pro! 💎', 'font-size: 20px; color: #d4af37; font-weight: bold;');
console.log('%cStart your precious metals trading journey today!', 'font-size: 14px; color: #2c3e50;');
