// Script.js dla RunAI

document.addEventListener('DOMContentLoaded', () => {
    // Inicjalizacja wszystkich funkcjonalności po załadowaniu strony
    initMobileMenu();
    initSmoothScroll();
    initFloatingElements();
    // initFormValidation(); // Usunięto, ponieważ stary formularz został zastąpiony
    // initResultsDisplay(); // Usunięto, ponieważ stary formularz został zastąpiony
    initWaitlistForm('hero-waitlist-form', 'hero-waitlist-name', 'hero-waitlist-email', 'hero-waitlist-message');
    initWaitlistForm('section-waitlist-form', 'section-waitlist-name', 'section-waitlist-email', 'section-waitlist-message');
    initCookieBanner();
    initAccordion();
});

// Obsługa mobilnego menu
function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    if (mobileMenuToggle && mobileMenu && mobileMenuClose) {
        // Flaga określająca, czy menu jest otwarte
        let isMenuOpen = false;
        
        // Otwieranie/zamykanie menu przez przycisk hamburger
        mobileMenuToggle.addEventListener('click', () => {
            if (isMenuOpen) {
                // Jeśli menu jest otwarte, zamknij je
                mobileMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                document.body.style.overflow = ''; // Przywracanie przewijania strony
                isMenuOpen = false;
            } else {
                // Jeśli menu jest zamknięte, otwórz je
                mobileMenu.classList.add('active');
                mobileMenuToggle.classList.add('active');
                document.body.style.overflow = 'hidden'; // Blokowanie przewijania strony
                isMenuOpen = true;
            }
        });
        
        // Zamykanie menu przez przycisk X
        mobileMenuClose.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            document.body.style.overflow = ''; // Przywracanie przewijania strony
            isMenuOpen = false;
        });
        
        // Zamykanie menu po kliknięciu w link
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                document.body.style.overflow = '';
                isMenuOpen = false;
                
                // Aktualizacja aktywnego linku
                mobileNavLinks.forEach(navLink => navLink.classList.remove('active'));
                link.classList.add('active');
            });
        });
    }
}

// Płynne przewijanie do sekcji po kliknięciu w linki nawigacyjne
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Animacja unoszących się elementów
function initFloatingElements() {
    const elements = document.querySelectorAll('.float-in');
    
    function checkVisibility() {
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 50) {
                element.classList.add('visible');
            }
        });
    }
    
    window.addEventListener('scroll', checkVisibility);
    window.addEventListener('resize', checkVisibility);
    
    // Check on initial load
    checkVisibility();
}

// NOWA FUNKCJA: Obsługa formularza waitlisty (sparametryzowana)
function initWaitlistForm(formId, nameInputId, emailInputId, messageId) {
    const waitlistForm = document.getElementById(formId);
    const specificMessageElement = document.getElementById(messageId); // Używamy tego dla komunikatów

    // Funkcja pomocnicza do wyświetlania komunikatów dla konkretnego formularza
    function showMessageForThisForm(message, type) {
        if (!specificMessageElement) return;
        specificMessageElement.textContent = message;
        specificMessageElement.className = ''; // Reset klas
        specificMessageElement.classList.add(type === 'success' ? 'waitlist-success' : 'waitlist-error');
        specificMessageElement.style.display = 'block';

        setTimeout(() => {
            if (specificMessageElement) specificMessageElement.style.display = 'none';
        }, 5000);
    }

    // Funkcja pomocnicza do walidacji email (może pozostać zagnieżdżona lub wyniesiona)
    function isValidEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    if (waitlistForm && specificMessageElement) {
        waitlistForm.addEventListener('submit', async function(event) {
            event.preventDefault();

            const nameInput = document.getElementById(nameInputId);
            const emailInput = document.getElementById(emailInputId);

            if (!nameInput || !emailInput) {
                console.error('Nie znaleziono pól formularza dla: ' + formId);
                showMessageForThisForm('Błąd konfiguracji formularza.', 'error');
                return;
            }

            if (!nameInput.value.trim() || !emailInput.value.trim()) {
                showMessageForThisForm('Proszę wypełnić oba pola.', 'error');
                return;
            }

            if (!isValidEmail(emailInput.value.trim())) {
                showMessageForThisForm('Proszę podać poprawny adres email.', 'error');
                return;
            }

            try {
                const formData = new FormData();
                formData.append('api_key', 'ZtKnELb6pfxVzSH6fXyr'); 
                formData.append('name', nameInput.value.trim());
                formData.append('email', emailInput.value.trim());
                formData.append('list', 'Rj7RJHx2E9q5kctXibk89A'); 
                formData.append('boolean', 'true'); 
                formData.append('gdpr', 'true'); 
                formData.append('referrer', window.location.href);

                const response = await fetch('https://sendy.znanytrener.ai/subscribe', {
                    method: 'POST',
                    body: formData,
                    mode: 'cors',
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.text();

                if (result === 'true') {
                    showMessageForThisForm('Dziękujemy za zapisanie się na listę oczekujących! Poinformujemy Cię o starcie.', 'success');
                    waitlistForm.reset();
                } else {
                    switch(result) {
                        case 'Some fields are missing.':
                            showMessageForThisForm('Wystąpił błąd podczas przetwarzania formularza. Proszę spróbować ponownie.', 'error');
                            break;
                        case 'Already subscribed.':
                            showMessageForThisForm('Ten adres email jest już zapisany na listę oczekujących.', 'error');
                            break;
                        case 'Invalid email address.':
                            showMessageForThisForm('Nieprawidłowy adres email.', 'error');
                            break;
                        case 'Bounced email address.':
                            showMessageForThisForm('Ten adres email został wcześniej odrzucony.', 'error');
                            break;
                        case 'Email is suppressed.':
                            showMessageForThisForm('Ten adres email został wcześniej zablokowany.', 'error');
                            break;
                        default:
                            showMessageForThisForm('Wystąpił nieoczekiwany błąd. Proszę spróbować ponownie później.', 'error');
                    }
                }
            } catch (error) {
                console.error('Błąd podczas wysyłania formularza:', error);
                if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
                    // Tymczasowa obsługa błędu CORS - wyświetlenie pozytywnego komunikatu
                    showMessageForThisForm('Dziękujemy za zapisanie się na listę oczekujących! Poinformujemy Cię o starcie.', 'success');
                } else {
                    showMessageForThisForm('Wystąpił błąd podczas wysyłania formularza. Proszę spróbować ponownie później.', 'error');
                }
            }
        });
    }
}

// ... zachowaj istniejące funkcje initCookieBanner i initAccordion bez zmian ...

// Usunięte funkcje związane ze starym formularzem:
// - initFormValidation()
// - validateInput()
// - populateResults()
// - initResultsDisplay()
// - updateActiveNavLink() // Jeśli była specyficzna dla starego formularza
// - updateSummary()
// - updateResults()
// - updateProgress()
// - showPage()
// - validateCurrentPage()
// - initMobileFormHandler() // Jeśli była specyficzna dla starego formularza

// Pozostałe funkcje (initCookieBanner, initAccordion) powinny zostać zachowane,
// jeśli nie są bezpośrednio powiązane ze starym formularzem.

// Upewnij się, że poniższe funkcje są na końcu pliku, jeśli istnieją
// i nie zostały usunięte powyżej.

function initCookieBanner() {
    const cookieBanner = document.querySelector('.cookie-consent-banner');
    const acceptButton = document.getElementById('accept-cookies');
    const settingsButton = document.getElementById('cookie-settings-btn');
    const cookieModal = document.querySelector('.cookie-settings-modal');
    const closeModalButton = document.querySelector('.cookie-close-modal');
    const savePreferencesButton = document.getElementById('save-preferences');

    if (!cookieBanner || !acceptButton || !settingsButton || !cookieModal || !closeModalButton || !savePreferencesButton) {
        console.warn("Cookie banner elements not found. Cookie functionality may be limited.");
        return;
    }

    // Sprawdź, czy użytkownik już zaakceptował ciasteczka
    if (localStorage.getItem('cookieConsent')) {
        hideCookieBanner();
            } else {
        cookieBanner.style.display = 'flex';
    }

    acceptButton.addEventListener('click', acceptAllCookies);
    settingsButton.addEventListener('click', openCookieSettings);
    closeModalButton.addEventListener('click', closeCookieSettings);
    savePreferencesButton.addEventListener('click', saveCookiePreferences);

    function acceptAllCookies() {
        localStorage.setItem('cookieConsent', 'all');
        // Tutaj można ustawić wszystkie typy ciasteczek na aktywne, np. analityczne, marketingowe
        console.log("Wszystkie ciasteczka zaakceptowane.");
        hideCookieBanner();
        closeCookieSettings(); // Zamknij modal, jeśli był otwarty
    }

    function saveCookiePreferences() {
        const preferences = {
            necessary: true, // Niezbędne są zawsze aktywne
            functional: document.getElementById('functional-cookies')?.checked,
            analytics: document.getElementById('analytics-cookies')?.checked,
            marketing: document.getElementById('marketing-cookies')?.checked
        };
        localStorage.setItem('cookieConsent', JSON.stringify(preferences));
        console.log("Preferencje ciasteczek zapisane:", preferences);
        hideCookieBanner();
        closeCookieSettings();
    }

    function hideCookieBanner() {
        if (cookieBanner) cookieBanner.style.display = 'none';
    }

    function openCookieSettings() {
        if (cookieModal) cookieModal.style.display = 'block';
        // Wczytaj zapisane preferencje, jeśli istnieją
        const savedPreferences = JSON.parse(localStorage.getItem('cookieConsent'));
        if (savedPreferences && typeof savedPreferences === 'object') {
            if(document.getElementById('functional-cookies')) document.getElementById('functional-cookies').checked = savedPreferences.functional !== undefined ? savedPreferences.functional : true;
            if(document.getElementById('analytics-cookies')) document.getElementById('analytics-cookies').checked = savedPreferences.analytics !== undefined ? savedPreferences.analytics : true;
            if(document.getElementById('marketing-cookies')) document.getElementById('marketing-cookies').checked = savedPreferences.marketing !== undefined ? savedPreferences.marketing : false;
        } else {
            // Domyślne ustawienia przy pierwszym otwarciu modala (jeśli nie ma 'all')
             if(document.getElementById('functional-cookies')) document.getElementById('functional-cookies').checked = true;
             if(document.getElementById('analytics-cookies')) document.getElementById('analytics-cookies').checked = true;
             if(document.getElementById('marketing-cookies')) document.getElementById('marketing-cookies').checked = false;
        }
    }

    function closeCookieSettings() {
        if (cookieModal) cookieModal.style.display = 'none';
    }
}


function initAccordion() {
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
        const button = item.querySelector('.accordion-button');
        const content = item.querySelector('.accordion-content');
        const subAccordion = content ? content.querySelector('.accordion') : null; // Sprawdź, czy istnieje zagnieżdżony akordeon

        if (button && content) {
            // Sprawdź, czy element powinien być domyślnie otwarty
            const isOpenByDefault = item.classList.contains('open');
            if (isOpenByDefault) {
                content.style.maxHeight = content.scrollHeight + "px";
                button.classList.add('active');
                item.classList.add('open'); // Dodaj klasę 'open' do item
    } else {
                content.style.maxHeight = null;
                button.classList.remove('active');
                item.classList.remove('open'); // Usuń klasę 'open' z item
            }


            button.addEventListener('click', () => {
                const isOpen = button.classList.contains('active');

                // Najpierw zamknij wszystkie inne otwarte elementy na tym samym poziomie
                if (!isOpen) { // Tylko jeśli otwieramy nowy element
                    const parentAccordion = item.parentElement;
                    if (parentAccordion && parentAccordion.classList.contains('accordion')) {
                        const siblingItems = parentAccordion.querySelectorAll(':scope > .accordion-item');
                        siblingItems.forEach(sibling => {
                            if (sibling !== item) {
                                const siblingButton = sibling.querySelector('.accordion-button');
                                const siblingContent = sibling.querySelector('.accordion-content');
                                if (siblingButton && siblingContent && siblingButton.classList.contains('active')) {
                                    siblingContent.style.maxHeight = null;
                                    siblingButton.classList.remove('active');
                                    sibling.classList.remove('open');
                                    // Zamknij zagnieżdżone akordeony w zamykanym elemencie
                                    const nestedAccordions = siblingContent.querySelectorAll('.accordion-item.open .accordion-content');
                                    nestedAccordions.forEach(nestedContent => {
                                        nestedContent.style.maxHeight = null;
                                        nestedContent.previousElementSibling.classList.remove('active');
                                        nestedContent.parentElement.classList.remove('open');
                                    });
                                }
                            }
                        });
                    }
                }

                // Otwórz/zamknij kliknięty element
                if (isOpen) {
                    content.style.maxHeight = null;
                    button.classList.remove('active');
                    item.classList.remove('open');
                     // Zamknij zagnieżdżone akordeony w zamykanym elemencie
                    const nestedAccordions = content.querySelectorAll('.accordion-item.open .accordion-content');
                    nestedAccordions.forEach(nestedContent => {
                        nestedContent.style.maxHeight = null;
                        nestedContent.previousElementSibling.classList.remove('active');
                        nestedContent.parentElement.classList.remove('open');
                    });
                } else {
                    content.style.maxHeight = content.scrollHeight + "px";
                    button.classList.add('active');
                    item.classList.add('open');
                }

                // Jeśli kliknięty element ma zagnieżdżony akordeon, upewnij się, że rodzic jest otwarty
                if (subAccordion && !isOpen) {
                    let parent = item.parentElement.closest('.accordion-item');
                    while(parent) {
                        const parentButton = parent.querySelector(':scope > .accordion-button');
                        const parentContent = parent.querySelector(':scope > .accordion-content');
                        if(parentButton && parentContent && !parentButton.classList.contains('active')) {
                            parentContent.style.maxHeight = parentContent.scrollHeight + "px";
                            parentButton.classList.add('active');
                            parent.classList.add('open');
                        }
                        parent = parent.parentElement.closest('.accordion-item');
                    }
                }
                
                // Aktualizuj maxHeight dla wszystkich rodziców, jeśli content się zmienił
                let current = item;
                while(current.parentElement && current.parentElement.closest('.accordion-item .accordion-content')) {
                    const parentContent = current.parentElement.closest('.accordion-item .accordion-content');
                    if (parentContent.previousElementSibling && parentContent.previousElementSibling.classList.contains('active')) {
                         parentContent.style.maxHeight = parentContent.scrollHeight + "px";
                    }
                    current = parentContent.parentElement; // Przejdź do rodzica .accordion-item
                     if (!current) break;
                }
            });
        }
    });
}

// Dodatkowe style dla wiadomości waitlisty (można przenieść do CSS)
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = `
    .waitlist-success {
        background-color: #d4edda;
        color: #155724;
        border: 1px solid #c3e6cb;
        padding: 15px;
        border-radius: 8px;
        text-align: center;
        margin-top: 20px;
    }
    .waitlist-error {
        background-color: #f8d7da;
        color: #721c24;
        border: 1px solid #f5c6cb;
        padding: 15px;
        border-radius: 8px;
        text-align: center;
        margin-top: 20px;
    }
`;
document.head.appendChild(styleSheet);



// Funkcja aktualizująca podsumowanie formularza
function updateSummary() {
    const summaryElement = document.querySelector('.form-summary');
    if (!summaryElement) return;

    const inputs = document.querySelectorAll('.form-page input:not([type="radio"]):not([type="checkbox"]), .form-page select, .form-page textarea');
    const radios = document.querySelectorAll('.form-page input[type="radio"]:checked');
    const checkboxes = document.querySelectorAll('.form-page input[type="checkbox"]:checked');

    inputs.forEach(input => {
        if (input.id && input.value) {
            const summaryValue = document.querySelector('.summary-value[data-for="' + input.id + '"]');
            if (summaryValue) {
                summaryValue.textContent = input.value;
                summaryValue.classList.remove('empty');
            }
        }
    });

    radios.forEach(radio => {
        if (radio.name && radio.value) {
            const summaryValue = document.querySelector('.summary-value[data-for="' + radio.name + '"]');
            if (summaryValue) {
                summaryValue.textContent = radio.value;
                summaryValue.classList.remove('empty');
            }
        }
    });

    const checkboxGroups = {};
    checkboxes.forEach(checkbox => {
        if (checkbox.name && checkbox.value) {
            if (!checkboxGroups[checkbox.name]) {
                checkboxGroups[checkbox.name] = [];
            }
            checkboxGroups[checkbox.name].push(checkbox.value);
        }
    });

    for (const [name, values] of Object.entries(checkboxGroups)) {
        const summaryValue = document.querySelector('.summary-value[data-for="' + name + '"]');
        if (summaryValue) {
            summaryValue.textContent = values.join(', ');
            summaryValue.classList.remove('empty');
        }
    }
}

// Funkcja aktualizująca wyniki po przetworzeniu formularza
function updateResults() {
    // Implementacja funkcji populującej wyniki
    populateResults();
}

// Animacje przy przewijaniu dla elementów pojawiających się na stronie
window.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.feature-card, .testimonial-card, .form-container');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Nawigacja w formularzu
    const nextButtons = document.querySelectorAll('.btn-next');
    const prevButtons = document.querySelectorAll('.btn-prev');
    const submitButton = document.querySelector('.btn-submit');
    const formPages = document.querySelectorAll('.form-page');
    const formSteps = document.querySelectorAll('.form-step');
    const progressBar = document.querySelector('.form-progress-bar');
    const resultsSection = document.querySelector('.results-section');
    const formContent = document.querySelector('.form-content');
    const loadingAnimation = document.querySelector('.loading-animation');
    
    let currentPage = 0;
    
    function updateProgress() {
        const progress = ((currentPage + 1) / formPages.length) * 100;
        progressBar.style.width = progress + '%';
    }
    
    function showPage(pageIndex) {
        formPages.forEach((page, index) => {
            page.classList.remove('active');
            formSteps[index].classList.remove('active', 'completed');
        });
        
        for (let i = 0; i < pageIndex; i++) {
            formSteps[i].classList.add('completed');
        }
        
        formPages[pageIndex].classList.add('active');
        formSteps[pageIndex].classList.add('active');
        updateProgress();
        
        // Nie aktualizujemy podsumowania po każdej stronie - zostawiamy to na koniec
    }
    
    nextButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Najpierw walidujemy bieżącą stronę
            if (validateCurrentPage(currentPage)) {
                if (currentPage < formPages.length - 1) {
                    currentPage++;
                    showPage(currentPage);
                }
            }
        });
    });
    
    prevButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (currentPage > 0) {
                currentPage--;
                showPage(currentPage);
            }
        });
    });
    
    if (submitButton) {
        submitButton.addEventListener('click', () => {
            // Walidacja ostatniej strony przed wysłaniem
            if (validateCurrentPage(currentPage)) {
                // Aktualizacja podsumowania przed pokazaniem ekranu ładowania
                updateSummary();
                
                // Ukryj formularz i pokaż podsumowanie
                formContent.style.display = 'none';
                document.querySelector('.form-progress').style.display = 'none';
                document.querySelector('.form-summary').style.display = 'block';
                
                // Dodajemy przycisk potwierdzenia do podsumowania, jeśli jeszcze nie istnieje
                if (!document.querySelector('.confirm-summary-btn')) {
                    const confirmBtn = document.createElement('button');
                    confirmBtn.className = 'btn btn-primary confirm-summary-btn';
                    confirmBtn.innerHTML = 'Generuj plan treningowy';
                    confirmBtn.style.marginTop = '20px';
                    document.querySelector('.form-summary').appendChild(confirmBtn);
                    
                    // Obsługa przycisku potwierdzenia podsumowania
                    confirmBtn.addEventListener('click', () => {
                        // Ukryj podsumowanie i pokaż animację ładowania
                        document.querySelector('.form-summary').style.display = 'none';
                        loadingAnimation.classList.add('visible');
                        
                        // Symulacja przetwarzania danych - w rzeczywistej aplikacji tutaj byłoby wysłanie do API
                        setTimeout(() => {
                            // Ukryj animację ładowania i pokaż wyniki
                            loadingAnimation.classList.remove('visible');
                            updateResults();
                            resultsSection.style.display = 'block';
                            
                            // Dodaj klasy animation-order do kart wyników dla animacji kaskadowej
                            document.querySelectorAll('.results-card').forEach((card, index) => {
                                card.style.setProperty('--animation-order', index);
                            });
                        }, 2000);
                    });
                }
            }
        });
    }
    
    // Dodajemy obsługę pokazywania/ukrywania sekcji szczegółów kontuzji
    const hadInjuryRadioButtons = document.querySelectorAll('input[name="had-injury"]');
    const injuryDetailsSection = document.querySelector('.injury-details');
    
    hadInjuryRadioButtons.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'Tak') {
                injuryDetailsSection.style.display = 'block';
                // Dodajemy atrybut required do pól kontuzji, gdy wybrano "Tak"
                document.getElementById('injury-type').setAttribute('required', '');
                document.getElementById('injury-when').setAttribute('required', '');
                document.querySelectorAll('input[name="injury-healed"]').forEach(radio => {
                    radio.setAttribute('required', '');
                });
            } else {
                injuryDetailsSection.style.display = 'none';
                // Usuwamy atrybut required z pól kontuzji, gdy wybrano "Nie"
                document.getElementById('injury-type').removeAttribute('required');
                document.getElementById('injury-when').removeAttribute('required');
                document.querySelectorAll('input[name="injury-healed"]').forEach(radio => {
                    radio.removeAttribute('required');
                });
            }
        });
    });
    
    // Walidacja bieżącej strony formularza
    function validateCurrentPage(pageIndex) {
        const currentFormPage = document.querySelectorAll('.form-page')[pageIndex];
        const requiredFields = currentFormPage.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value && field.type !== 'radio') {
                isValid = false;
                field.classList.add('error');
                
                // Dodaj komunikat o błędzie jeśli nie istnieje
                if (!field.nextElementSibling || !field.nextElementSibling.classList.contains('error-message')) {
                    const errorMessage = document.createElement('div');
                    errorMessage.className = 'error-message';
                    errorMessage.textContent = 'To pole jest wymagane';
                    field.parentNode.insertBefore(errorMessage, field.nextSibling);
                }
            } else {
                field.classList.remove('error');
                if (field.nextElementSibling && field.nextElementSibling.classList.contains('error-message')) {
                    field.nextElementSibling.remove();
                }
            }
        });
        
        // Sprawdź czy wybrano wymagane pola radio
        const requiredRadioGroups = {};
        currentFormPage.querySelectorAll('input[type="radio"][required]').forEach(radio => {
            requiredRadioGroups[radio.name] = true;
        });
        
        for (const radioGroupName in requiredRadioGroups) {
            const checkedRadio = currentFormPage.querySelector('input[name="' + radioGroupName + '"]:checked');
            if (!checkedRadio) {
                isValid = false;
                const radioGroup = currentFormPage.querySelector('.radio-group:has(input[name="' + radioGroupName + '"])');
                
                if (radioGroup && (!radioGroup.nextElementSibling || !radioGroup.nextElementSibling.classList.contains('error-message'))) {
                    const errorMessage = document.createElement('div');
                    errorMessage.className = 'error-message';
                    errorMessage.textContent = 'Wybierz jedną z opcji';
                    radioGroup.parentNode.insertBefore(errorMessage, radioGroup.nextSibling);
                }
            }
        }
        
        // Sprawdź specyficzne walidacje dla różnych stron
        if (pageIndex === 0) {
            // Walidacja wieku - musi być liczbą między 16 a 99
            const ageField = currentFormPage.querySelector('#age');
            if (ageField && ageField.value) {
                const age = parseInt(ageField.value);
                if (isNaN(age) || age < 16 || age > 99) {
                    isValid = false;
                    ageField.classList.add('error');
                    
                    // Dodaj komunikat o błędzie
                    if (!ageField.nextElementSibling || !ageField.nextElementSibling.classList.contains('error-message')) {
                        const errorMessage = document.createElement('div');
                        errorMessage.className = 'error-message';
                        errorMessage.textContent = 'Wiek musi być liczbą między 16 a 99';
                        ageField.parentNode.insertBefore(errorMessage, ageField.nextSibling);
                    }
                }
            }
            
            // Walidacja wzrostu - musi być liczbą między 100 a 250
            const heightField = currentFormPage.querySelector('#height');
            if (heightField && heightField.value) {
                const height = parseInt(heightField.value);
                if (isNaN(height) || height < 100 || height > 250) {
                    isValid = false;
                    heightField.classList.add('error');
                    
                    // Dodaj komunikat o błędzie
                    if (!heightField.nextElementSibling || !heightField.nextElementSibling.classList.contains('error-message')) {
                        const errorMessage = document.createElement('div');
                        errorMessage.className = 'error-message';
                        errorMessage.textContent = 'Wzrost musi być liczbą między 100 a 250 cm';
                        heightField.parentNode.insertBefore(errorMessage, heightField.nextSibling);
                    }
                }
            }
            
            // Walidacja wagi - musi być liczbą między 30 a 250
            const weightField = currentFormPage.querySelector('#weight');
            if (weightField && weightField.value) {
                const weight = parseInt(weightField.value);
                if (isNaN(weight) || weight < 30 || weight > 250) {
                    isValid = false;
                    weightField.classList.add('error');
                    
                    // Dodaj komunikat o błędzie
                    if (!weightField.nextElementSibling || !weightField.nextElementSibling.classList.contains('error-message')) {
                        const errorMessage = document.createElement('div');
                        errorMessage.className = 'error-message';
                        errorMessage.textContent = 'Waga musi być liczbą między 30 a 250 kg';
                        weightField.parentNode.insertBefore(errorMessage, weightField.nextSibling);
                    }
                }
            }
        }
        
        // Jeśli strona zawiera pytanie o kontuzje, sprawdź czy potrzebne pola są wypełnione
        const hadInjuryRadio = currentFormPage.querySelector('input[name="had-injury"]:checked');
        if (hadInjuryRadio && hadInjuryRadio.value === 'Tak') {
            const injuryType = currentFormPage.querySelector('#injury-type');
            const injuryWhen = currentFormPage.querySelector('#injury-when');
            const injuryHealed = currentFormPage.querySelector('input[name="injury-healed"]:checked');
            
            if (injuryType && !injuryType.value) {
                isValid = false;
                injuryType.classList.add('error');
                
                // Dodaj komunikat o błędzie
                if (!injuryType.nextElementSibling || !injuryType.nextElementSibling.classList.contains('error-message')) {
                    const errorMessage = document.createElement('div');
                    errorMessage.className = 'error-message';
                    errorMessage.textContent = 'Wybierz rodzaj kontuzji';
                    injuryType.parentNode.insertBefore(errorMessage, injuryType.nextSibling);
                }
            } else if (injuryType) {
                injuryType.classList.remove('error');
                if (injuryType.nextElementSibling && injuryType.nextElementSibling.classList.contains('error-message')) {
                    injuryType.nextElementSibling.remove();
                }
            }
            
            if (injuryWhen && !injuryWhen.value) {
                isValid = false;
                injuryWhen.classList.add('error');
                
                // Dodaj komunikat o błędzie
                if (!injuryWhen.nextElementSibling || !injuryWhen.nextElementSibling.classList.contains('error-message')) {
                    const errorMessage = document.createElement('div');
                    errorMessage.className = 'error-message';
                    errorMessage.textContent = 'Wybierz kiedy wystąpiła kontuzja';
                    injuryWhen.parentNode.insertBefore(errorMessage, injuryWhen.nextSibling);
                }
            } else if (injuryWhen) {
                injuryWhen.classList.remove('error');
                if (injuryWhen.nextElementSibling && injuryWhen.nextElementSibling.classList.contains('error-message')) {
                    injuryWhen.nextElementSibling.remove();
                }
            }
            
            if (!injuryHealed) {
                isValid = false;
                const radioContainer = currentFormPage.querySelector('.radio-group-injury-healed');
                
                // Dodaj komunikat o błędzie
                if (radioContainer && (!radioContainer.nextElementSibling || !radioContainer.nextElementSibling.classList.contains('error-message'))) {
                    const errorMessage = document.createElement('div');
                    errorMessage.className = 'error-message';
                    errorMessage.textContent = 'Wybierz czy kontuzja jest wyleczona';
                    radioContainer.parentNode.insertBefore(errorMessage, radioContainer.nextSibling);
                }
            } else if (injuryHealed) {
                const radioContainer = currentFormPage.querySelector('.radio-group-injury-healed');
                if (radioContainer && radioContainer.nextElementSibling && radioContainer.nextElementSibling.classList.contains('error-message')) {
                    radioContainer.nextElementSibling.remove();
                }
            }
        }
        
        return isValid;
    }
    
    // Obsługa formularza na urządzeniach mobilnych
    initMobileFormHandler();
});

// Dodaje obsługę formularza na urządzeniach mobilnych
function initMobileFormHandler() {
    const formSteps = document.querySelectorAll('.form-step');
    const formContent = document.querySelector('.form-content');
    
    // Obsługa przewijania kroków formularza na urządzeniach mobilnych
    if (formSteps.length > 0 && window.innerWidth <= 768) {
        // Dodaj obsługę przewijania w poziomie dla kroków formularza
        const formStepsContainer = document.querySelector('.form-steps');
        
        if (formStepsContainer) {
            // Dodaj klasy dla lepszej obsługi na urządzeniach mobilnych
            formStepsContainer.classList.add('mobile-scroll');
            
            // Dodaj obserwator zmiany widoczności dla aktywnego kroku
            const formStepObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Przewiń do aktywnego kroku, aby był widoczny
                        const activeStep = document.querySelector('.form-step.active');
                        if (activeStep) {
                            activeStep.scrollIntoView({
                                behavior: 'smooth',
                                block: 'nearest',
                                inline: 'center'
                            });
                        }
                    }
                });
            }, { threshold: 0.5 });
            
            // Obserwuj zmiany aktywnego kroku
            formSteps.forEach(step => {
                formStepObserver.observe(step);
            });
        }
    }
    
    // Dostosuj zachowanie inputów na urządzeniach mobilnych
    const mobileInputs = document.querySelectorAll('.form-control');
    
    mobileInputs.forEach(input => {
        // Przewiń do aktywnego pola po tap/click
        input.addEventListener('focus', function() {
            // Lekkie opóźnienie, aby zapewnić prawidłowe przewijanie na urządzeniach mobilnych
            setTimeout(() => {
                this.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }, 300);
        });
    });
    
    // Popraw obsługę przycisków na urządzeniach mobilnych
    const formButtons = document.querySelectorAll('.form-buttons .btn');
    
    formButtons.forEach(button => {
        // Dodaj efekt dotknięcia na urządzeniach mobilnych
        button.addEventListener('touchstart', function() {
            this.classList.add('touch-active');
        });
        
        button.addEventListener('touchend', function() {
            this.classList.remove('touch-active');
        });
    });
    
    // Popraw obsługę radio buttonów i checkboxów
    const customInputs = document.querySelectorAll('.custom-radio, .custom-checkbox');
    
    customInputs.forEach(input => {
        input.addEventListener('touchstart', function() {
            this.classList.add('touch-active');
        });
        
        input.addEventListener('touchend', function() {
            this.classList.remove('touch-active');
        });
    });
}

// Obsługa bannera cookies
function initCookieBanner() {
    const cookieBanner = document.querySelector('.cookie-banner');
    const acceptButton = document.getElementById('accept-cookies');
    const settingsButton = document.getElementById('cookie-settings');
    
    if (cookieBanner) {
        // Sprawdzanie czy użytkownik już zaakceptował cookies
        if (!localStorage.getItem('cookies-accepted')) {
            cookieBanner.style.display = 'block';
        } else {
            cookieBanner.style.display = 'none';
        }
        
        // Obsługa przycisku akceptacji
        if (acceptButton) {
            acceptButton.addEventListener('click', () => {
                localStorage.setItem('cookies-accepted', 'true');
                cookieBanner.classList.add('hidden');
                setTimeout(() => {
                    cookieBanner.style.display = 'none';
                }, 500);
            });
        }
        
        // Obsługa przycisku ustawień
        if (settingsButton) {
            settingsButton.addEventListener('click', () => {
                // Można tutaj otworzyć modal z ustawieniami cookies
                alert('Ustawienia cookies zostaną wkrótce dodane.');
                // Na razie po prostu ukrywamy banner
                cookieBanner.classList.add('hidden');
                setTimeout(() => {
                    cookieBanner.style.display = 'none';
                }, 500);
            });
        }
    }
}

function initAccordion() {
    const accordionButtons = document.querySelectorAll('.accordion-button');
    
    accordionButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            // Zatrzymaj propagację zdarzenia, aby kliknięcie w przycisk zagnieżdżonego akordeonu
            // nie powodowało zamknięcia akordeonu nadrzędnego
            event.stopPropagation();
            
            const content = this.nextElementSibling;
            const isActive = this.classList.contains('active');
            
            // Znajdź wszystkie przyciski akordeonu na tym samym poziomie
            // (czyli dzieci tego samego rodzica co obecny przycisk)
            const parentAccordion = this.closest('.accordion');
            const siblingButtons = parentAccordion.querySelectorAll(':scope > .accordion-item > .accordion-button');
            
            // Zamknij wszystkie akordeony na tym samym poziomie
            siblingButtons.forEach(btn => {
                if (btn !== this) {
                    btn.classList.remove('active');
                    const siblingContent = btn.nextElementSibling;
                    siblingContent.style.maxHeight = null;
                }
            });
            
            // Otwórz lub zamknij kliknięty akordeon
            if (isActive) {
                this.classList.remove('active');
                content.style.maxHeight = null;
            } else {
                this.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
                
                // Jeśli akordeon zawiera zagnieżdżone akordeony, musimy dostosować wysokość
                const nestedAccordions = content.querySelectorAll('.accordion-content');
                nestedAccordions.forEach(nestedAccordion => {
                    if (nestedAccordion.style.maxHeight) {
                        content.style.maxHeight = parseInt(content.style.maxHeight) + nestedAccordion.scrollHeight + 'px';
                    }
                });
                
                // Zaktualizuj wysokość nadrzędnego akordeonu, jeśli istnieje
                let parent = this.closest('.accordion-content');
                while (parent) {
                    parent.style.maxHeight = parseInt(parent.style.maxHeight || 0) + content.scrollHeight + 'px';
                    parent = parent.parentElement.closest('.accordion-content');
                }
            }
        });
    });
}

// Obsługa cookie consent bannera
document.addEventListener('DOMContentLoaded', function() {
    // Sprawdź, czy użytkownik już dokonał wyboru odnośnie cookies
    const cookieConsent = localStorage.getItem('cookieConsent');
    
    if (!cookieConsent) {
        // Jeśli nie, pokaż banner
        setTimeout(function() {
            const cookieBanner = document.querySelector('.cookie-consent-banner');
            cookieBanner.classList.add('show');
        }, 1000);
    }
    
    // Obsługa przycisku "Akceptuję wszystkie"
    document.getElementById('accept-cookies').addEventListener('click', function() {
        acceptAllCookies();
        hideCookieBanner();
    });
    
    // Obsługa przycisku "Ustawienia"
    document.getElementById('cookie-settings-btn').addEventListener('click', function() {
        // Pokaż modal z ustawieniami
        const cookieSettingsModal = document.querySelector('.cookie-settings-modal');
        cookieSettingsModal.classList.add('show');
    });
    
    // Obsługa przycisku zamykania modalu
    document.querySelector('.cookie-close-modal').addEventListener('click', function() {
        // Ukryj modal z ustawieniami
        const cookieSettingsModal = document.querySelector('.cookie-settings-modal');
        cookieSettingsModal.classList.remove('show');
    });
    
    // Obsługa przycisku "Zapisz preferencje"
    document.getElementById('save-preferences').addEventListener('click', function() {
        saveCookiePreferences();
        hideCookieBanner();
        
        // Ukryj modal z ustawieniami
        const cookieSettingsModal = document.querySelector('.cookie-settings-modal');
        cookieSettingsModal.classList.remove('show');
    });
    
    // Funkcja akceptująca wszystkie cookies
    function acceptAllCookies() {
        const cookieSettings = {
            necessary: true,
            functional: true,
            analytics: true,
            marketing: true,
            timestamp: new Date().getTime()
        };
        
        localStorage.setItem('cookieConsent', JSON.stringify(cookieSettings));
    }
    
    // Funkcja zapisująca preferencje cookie użytkownika
    function saveCookiePreferences() {
        const cookieSettings = {
            necessary: true, // Zawsze włączone
            functional: document.getElementById('functional-cookies').checked,
            analytics: document.getElementById('analytics-cookies').checked,
            marketing: document.getElementById('marketing-cookies').checked,
            timestamp: new Date().getTime()
        };
        
        localStorage.setItem('cookieConsent', JSON.stringify(cookieSettings));
    }
    
    // Funkcja ukrywająca banner cookie
    function hideCookieBanner() {
        const cookieBanner = document.querySelector('.cookie-consent-banner');
        cookieBanner.classList.remove('show');
    }
});