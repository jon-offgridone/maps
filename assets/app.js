// Modern OffGridOne JavaScript - Maps Version
class OffGridOneMaps {
    constructor() {
        this.isDarkMode = localStorage.getItem('darkMode') === 'true';
        this.init();
    }

    init() {
        this.setupTheme();
        this.setupNavigation();
        this.setupEventListeners();
    }

    setupTheme() {
        // Apply saved theme
        if (this.isDarkMode) {
            document.documentElement.setAttribute('data-theme', 'dark');
            this.updateThemeIcon();
        }
    }

    setupNavigation() {
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        const mobileMenu = document.getElementById('nav-mobile');

        // Mobile menu toggle functionality
        mobileMenuToggle?.addEventListener('click', () => {
            this.toggleMobileMenu();
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link-mobile').forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        });
    }

    setupEventListeners() {
        const themeToggle = document.getElementById('theme-toggle');
        
        themeToggle?.addEventListener('click', () => {
            this.toggleTheme();
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            const mobileMenu = document.getElementById('nav-mobile');
            const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
            
            if (mobileMenu?.classList.contains('active') && 
                !mobileMenu.contains(e.target) && 
                !mobileMenuToggle?.contains(e.target)) {
                this.closeMobileMenu();
            }
        });

        // Close mobile menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeMobileMenu();
            }
        });
    }

    toggleTheme() {
        this.isDarkMode = !this.isDarkMode;
        
        if (this.isDarkMode) {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
        
        this.updateThemeIcon();
        localStorage.setItem('darkMode', this.isDarkMode.toString());
    }

    updateThemeIcon() {
        const themeIcon = document.querySelector('.theme-icon');
        if (themeIcon) {
            themeIcon.textContent = this.isDarkMode ? '☀️' : '🌙';
        }
    }

    // Mobile menu methods
    toggleMobileMenu() {
        const mobileMenu = document.getElementById('nav-mobile');
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        
        if (mobileMenu?.classList.contains('active')) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    }

    openMobileMenu() {
        const mobileMenu = document.getElementById('nav-mobile');
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        
        mobileMenu?.classList.add('active');
        mobileMenuToggle?.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeMobileMenu() {
        const mobileMenu = document.getElementById('nav-mobile');
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        
        mobileMenu?.classList.remove('active');
        mobileMenuToggle?.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.offGridOneMaps = new OffGridOneMaps();
});