document.addEventListener('DOMContentLoaded', function() {
    // Elementy DOM
    const mainNav = document.querySelector('.main-nav');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    
    // Funkcja do obsługi efektu przewijania
    function handleScroll() {
        if (window.scrollY > 50) {
            mainNav.classList.add('scrolled');
        } else {
            mainNav.classList.remove('scrolled');
        }
    }
    
    // Funkcja do przełączania menu mobilnego
    function toggleMobileMenu(e) {
        e.preventDefault();
        mobileMenuToggle.classList.toggle('active');
        mobileNav.classList.toggle('active');
        document.body.classList.toggle('menu-open');
        
        // Aktualizacja atrybutu aria-expanded dla dostępności
        const isExpanded = mobileNav.classList.contains('active');
        mobileMenuToggle.setAttribute('aria-expanded', isExpanded);
        
        // Zapobieganie przewijaniu strony gdy menu jest otwarte
        if (isExpanded) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
    
    // Funkcja do zamykania menu mobilnego po kliknięciu w link
    function closeMobileMenu() {
        mobileMenuToggle.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.classList.remove('menu-open');
        document.body.style.overflow = '';
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
    }
    
    // Funkcja do ustawiania aktywnego linku
    function setActiveLink() {
        const sections = document.querySelectorAll('section');
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 200)) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href && href.substring(1) === currentSection) {
                link.classList.add('active');
            }
        });
    }
    
    // Nasłuchiwanie zdarzeń
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', setActiveLink);
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    mobileMenuToggle.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleMobileMenu(e);
        }
    });
    
    // Zamykanie menu mobilnego po kliknięciu w link
    document.querySelectorAll('.mobile-nav a').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Zamykanie menu po kliknięciu poza menu
    document.addEventListener('click', function(e) {
        if (mobileNav.classList.contains('active') && 
            !mobileNav.contains(e.target) && 
            !mobileMenuToggle.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Inicjalizacja stanu początkowego
    handleScroll();
    setActiveLink();
});
