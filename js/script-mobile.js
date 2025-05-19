/**
 * ZnanyTrener.AI - Mobile JavaScript
 * Zawiera funkcje specyficzne dla urządzeń mobilnych
 */

document.addEventListener('DOMContentLoaded', function() {
    // === Obsługa menu mobilnego ===
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    
    if (mobileMenuToggle && mobileNav) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileNav.classList.toggle('active');
            
            // Blokujemy przewijanie strony, gdy menu jest otwarte
            if (mobileNav.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Zamykamy menu po kliknięciu poza nim
        document.addEventListener('click', function(e) {
            if (!mobileMenuToggle.contains(e.target) && !mobileNav.contains(e.target) && mobileNav.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                mobileNav.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // === Dostosowanie wysokości sekcji hero dla urządzeń mobilnych ===
    function adjustHeroHeight() {
        const heroSection = document.querySelector('.hero-section');
        if (heroSection && window.innerWidth <= 768) {
            const viewportHeight = window.innerHeight;
            const headerHeight = document.querySelector('header').offsetHeight;
            
            // Ustawiamy minimalną wysokość sekcji hero
            heroSection.style.minHeight = `${viewportHeight - headerHeight}px`;
        }
    }
    
    // Wywołujemy funkcję przy ładowaniu i zmianie rozmiaru okna
    adjustHeroHeight();
    window.addEventListener('resize', adjustHeroHeight);
    
    // === Obsługa dotykowego przewijania dla galerii (jeśli będzie dodana w przyszłości) ===
    // Placeholder: Kod do obsługi dotykowego przewijania galerii
    
    // === Optymalizacja obrazów dla urządzeń mobilnych ===
    function loadMobileImages() {
        if (window.innerWidth <= 768) {
            const images = document.querySelectorAll('[data-mobile-src]');
            
            images.forEach(img => {
                const mobileSrc = img.getAttribute('data-mobile-src');
                if (mobileSrc) {
                    img.src = mobileSrc;
                }
            });
        }
    }
    
    // Wywołujemy funkcję przy ładowaniu
    loadMobileImages();
    
    // === Obsługa formularza na urządzeniach mobilnych ===
    const signupForm = document.querySelector('.signup-form');
    
    if (signupForm && window.innerWidth <= 768) {
        // Dodajemy obsługę autofocus dla pola email na mobilnych
        const emailInput = signupForm.querySelector('input[name="email"]');
        
        if (emailInput) {
            // Usuwamy autofocus na mobilnych, aby nie wyskakiwała klawiatura
            emailInput.removeAttribute('autofocus');
            
            // Dodajemy obsługę błędów specyficzną dla mobilnych
            emailInput.addEventListener('blur', function() {
                if (this.value.trim() === '') {
                    this.classList.add('error');
                } else {
                    this.classList.remove('error');
                }
            });
        }
    }
    
    // === Obsługa przewijania dla FAQ na urządzeniach mobilnych ===
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length > 0 && window.innerWidth <= 768) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', function() {
                // Przewijamy do aktywnego pytania po kliknięciu
                if (!item.classList.contains('active')) {
                    setTimeout(() => {
                        const offset = item.offsetTop - 100;
                        window.scrollTo({
                            top: offset,
                            behavior: 'smooth'
                        });
                    }, 300); // Opóźnienie, aby animacja rozwijania zdążyła się rozpocząć
                }
            });
        });
    }
});
