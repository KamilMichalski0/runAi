/**
 * ZnanyTrener.AI - Main JavaScript
 * Zawiera główne funkcje dla landing page'a
 */

document.addEventListener('DOMContentLoaded', function() {
    // === Smooth Scrolling dla linków nawigacyjnych ===
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            // Pomijamy linki, które nie prowadzą do konkretnych sekcji
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Zamykamy menu mobilne, jeśli jest otwarte
                const mobileNav = document.querySelector('.mobile-nav');
                const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
                
                if (mobileNav.classList.contains('active')) {
                    mobileNav.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                }
                
                // Przewijamy do sekcji z animacją
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset dla nagłówka
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // === Obsługa FAQ ===
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Zamykamy wszystkie inne pytania
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Przełączamy aktywny stan dla klikniętego pytania
            item.classList.toggle('active');
        });
    });
    
    // === Obsługa formularza zapisu ===
    const signupForm = document.querySelector('.signup-form');
    
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[name="email"]');
            const consentCheckbox = this.querySelector('input[name="consent"]');
            
            // Prosta walidacja
            if (!emailInput.value.trim()) {
                showFormError(emailInput, 'Proszę podać adres e-mail');
                return;
            }
            
            if (!validateEmail(emailInput.value.trim())) {
                showFormError(emailInput, 'Proszę podać poprawny adres e-mail');
                return;
            }
            
            if (!consentCheckbox.checked) {
                showFormError(consentCheckbox, 'Wymagana jest zgoda na przetwarzanie danych');
                return;
            }
            
            // Symulacja wysłania formularza
            const submitButton = this.querySelector('.form-submit');
            const originalText = submitButton.textContent;
            
            submitButton.disabled = true;
            submitButton.textContent = 'Zapisywanie...';
            
            // Symulacja opóźnienia sieciowego
            setTimeout(() => {
                // Tutaj byłoby faktyczne wysłanie danych do API
                
                // Pokazujemy komunikat sukcesu
                signupForm.innerHTML = `
                    <div class="success-message">
                        <i class="fas fa-check-circle success-icon"></i>
                        <h3>Dziękujemy za zapisanie się!</h3>
                        <p>Potwierdzenie zostało wysłane na Twój adres e-mail. Będziemy informować Cię o postępach i dacie startu platformy.</p>
                    </div>
                `;
                
                // Zapisujemy informację w localStorage, że użytkownik się zapisał
                localStorage.setItem('znanytrener_signup', 'true');
                
            }, 1500);
        });
    }
    
    // === Efekt parallax dla sekcji ofertowej ===
    window.addEventListener('scroll', function() {
        const offerSection = document.querySelector('.offer-cta-section');
        if (offerSection) {
            const scrollPosition = window.scrollY;
            const offerSectionPosition = offerSection.offsetTop;
            const windowHeight = window.innerHeight;
            
            if (scrollPosition + windowHeight > offerSectionPosition) {
                const yPos = -(scrollPosition - offerSectionPosition) * 0.2;
                offerSection.style.backgroundPosition = `center ${yPos}px`;
            }
        }
    });
    
    // === Animacja liczb dla sekcji korzyści ===
    // Placeholder: Kod do animacji liczb w sekcji korzyści
    
    // === Funkcje pomocnicze ===
    function showFormError(element, message) {
        // Usuwamy istniejące komunikaty błędów
        const existingErrors = document.querySelectorAll('.form-error');
        existingErrors.forEach(error => error.remove());
        
        // Tworzymy nowy komunikat błędu
        const errorElement = document.createElement('div');
        errorElement.className = 'form-error';
        errorElement.textContent = message;
        
        // Dodajemy komunikat po elemencie
        element.parentNode.appendChild(errorElement);
        
        // Podświetlamy element z błędem
        element.classList.add('error');
        
        // Usuwamy błąd po kliknięciu w element
        element.addEventListener('click', function() {
            errorElement.remove();
            element.classList.remove('error');
        });
    }
    
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    
    // === Sprawdzanie czy użytkownik już się zapisał ===
    function checkPreviousSignup() {
        if (localStorage.getItem('znanytrener_signup') === 'true') {
            // Użytkownik już się zapisał, możemy pokazać inny komunikat
            const ctaButtons = document.querySelectorAll('.cta-button');
            
            ctaButtons.forEach(button => {
                if (button.textContent.includes('Zapisz się')) {
                    button.textContent = 'Dziękujemy za zapisanie się!';
                    button.classList.add('signed-up');
                    button.addEventListener('click', function(e) {
                        e.preventDefault();
                        alert('Już zapisałeś/aś się na listę oczekujących. Dziękujemy!');
                    });
                }
            });
        }
    }
    
    // Sprawdzamy przy ładowaniu strony
    checkPreviousSignup();
});
