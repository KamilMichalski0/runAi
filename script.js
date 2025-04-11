// Script.js dla RunAI

document.addEventListener('DOMContentLoaded', () => {
    // Inicjalizacja wszystkich funkcjonalności po załadowaniu strony
    initMobileMenu();
    initSmoothScroll();
    initFloatingElements();
    initFormValidation();
    initResultsDisplay();
    initCookieBanner();
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

// Walidacja formularza
function initFormValidation() {
    const inputs = document.querySelectorAll('.form-page input, .form-page select, .form-page textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateInput(input);
        });
    });
}

function validateInput(input) {
    const errorElement = input.parentElement.querySelector('.error-message');
    let isValid = true;
    let errorMessage = '';
    
    // Usuń przestrzenie na początku i końcu wartości
    input.value = input.value.trim();
    
    if (input.hasAttribute('required') && !input.value) {
        isValid = false;
        errorMessage = 'To pole jest wymagane';
    } else if (input.type === 'email' && input.value) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(input.value)) {
            isValid = false;
            errorMessage = 'Wprowadź poprawny adres email';
        }
    } else if (input.type === 'number' && input.value) {
        const min = parseInt(input.getAttribute('min'), 10);
        const max = parseInt(input.getAttribute('max'), 10);
        const value = parseInt(input.value, 10);
        
        if (!isNaN(min) && value < min) {
            isValid = false;
            errorMessage = `Minimalna wartość to ${min}`;
        } else if (!isNaN(max) && value > max) {
            isValid = false;
            errorMessage = `Maksymalna wartość to ${max}`;
        }
    }
    
    // Wyświetl lub ukryj komunikat błędu
    if (errorElement) {
        errorElement.textContent = errorMessage;
        errorElement.style.display = isValid ? 'none' : 'block';
    }
    
    // Dodaj lub usuń klasę błędu
    if (isValid) {
        input.classList.remove('error');
    } else {
        input.classList.add('error');
    }
    
    return isValid;
}

// Wypełnianie wyników
function populateResults() {
    const resultsSection = document.querySelector('.results-section');
    if (!resultsSection) return;
    
    // Pobierz dane z formularza
    const name = document.querySelector('[name="name"]')?.value || 'Biegacz';
    const goal = document.querySelector('[name="training-goal"]:checked')?.value || 'Poprawa wydolności';
    const distance = document.querySelector('[name="target-distance"]')?.value || '5 km';
    const trainingDays = document.querySelectorAll('[name="training-days"]:checked').length || 3;
    const planLength = document.querySelector('[name="plan-length"]')?.value || '8 tygodni';
    
    // Przygotuj zalecenia treningowe
    const workoutTypes = ['Interwały', 'Długi bieg', 'Tempo', 'Regeneracja', 'Siła i mobilność'];
    let planHTML = '<h3>Twój spersonalizowany plan treningowy</h3>';
    
    planHTML += `<p>Plan treningowy dla: <strong>${name}</strong></p>`;
    planHTML += `<p>Cel: <strong>${goal}</strong> na dystansie <strong>${distance}</strong></p>`;
    planHTML += `<p>Długość planu: <strong>${planLength}</strong> z treningami <strong>${trainingDays}</strong> razy w tygodniu</p>`;
    
    planHTML += '<h4>Przykładowy tydzień:</h4>';
    planHTML += '<ul class="workout-list">';
    
    // Wygeneruj przykładowe treningi
    const daysOfWeek = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'];
    let assignedDays = 0;
    
    daysOfWeek.forEach((day, index) => {
        if (assignedDays < trainingDays) {
            // Losowo przydzielaj dni treningowe
            if (Math.random() > 0.3 || index === daysOfWeek.length - 1 - (trainingDays - assignedDays - 1)) {
                const workoutType = workoutTypes[Math.floor(Math.random() * workoutTypes.length)];
                let workoutDescription = '';
                
                switch (workoutType) {
                    case 'Interwały':
                        workoutDescription = 'Rozgrzewka 10 min, 6-8 × 400m szybko z odpoczynkiem 2 min, schłodzenie 10 min';
                        break;
                    case 'Długi bieg':
                        workoutDescription = `${Math.floor(parseFloat(distance) * 0.8)} km w komfortowym tempie konwersacyjnym`;
                        break;
                    case 'Tempo':
                        workoutDescription = `Rozgrzewka 10 min, ${Math.floor(parseFloat(distance) * 0.5)} km w tempie tempa, schłodzenie 10 min`;
                        break;
                    case 'Regeneracja':
                        workoutDescription = '30 min bardzo łatwego biegu lub marszu';
                        break;
                    case 'Siła i mobilność':
                        workoutDescription = '30 min ćwiczeń wzmacniających core, biodra i mobilność';
                        break;
                }
                
                planHTML += `<li><strong>${day}:</strong> ${workoutType} - ${workoutDescription}</li>`;
                assignedDays++;
            } else {
                planHTML += `<li><strong>${day}:</strong> Odpoczynek</li>`;
            }
        } else {
            planHTML += `<li><strong>${day}:</strong> Odpoczynek</li>`;
        }
    });
    
    planHTML += '</ul>';
    
    // Dodaj wskazówki treningowe
    planHTML += '<h4>Wskazówki:</h4>';
    planHTML += '<ul>';
    planHTML += '<li>Zawsze zaczynaj od rozgrzewki i kończ schłodzeniem</li>';
    planHTML += '<li>Hydratacja jest kluczowa - pij wodę przed, w trakcie i po treningu</li>';
    planHTML += '<li>Słuchaj swojego ciała - jeśli czujesz ból, zmodyfikuj trening lub odpocznij</li>';
    planHTML += '<li>Zwiększaj objętość treningową stopniowo - max. 10% tygodniowo</li>';
    planHTML += '</ul>';
    
    // Umieść wyniki w sekcji
    const resultsContent = resultsSection.querySelector('.results-content');
    if (resultsContent) {
        resultsContent.innerHTML = planHTML;
    }
    
    // Obsługa przycisku do pobrania planu
    const downloadButton = resultsSection.querySelector('.download-plan');
    if (downloadButton) {
        downloadButton.addEventListener('click', () => {
            alert('Twój plan treningowy został wysłany na podany adres email.');
        });
    }
}

// Obsługa sekcji wyników
function initResultsDisplay() {
    const downloadButton = document.querySelector('.btn-download');
    
    if (downloadButton) {
        downloadButton.addEventListener('click', function() {
            // Symulacja pobierania pliku PDF
            alert('Trwa przygotowywanie planu treningowego. Za chwilę rozpocznie się pobieranie pliku PDF.');
            
            // Możesz tutaj dodać rzeczywistą funkcjonalność pobierania
            setTimeout(() => {
                const dummyLink = document.createElement('a');
                dummyLink.href = '#';
                dummyLink.setAttribute('download', 'RunAI_Plan_Treningowy.pdf');
                dummyLink.click();
            }, 1500);
        });
    }
}

// Obsługa paska nawigacyjnego przy przewijaniu
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Aktualizacja aktywnego linku w menu na podstawie widocznych sekcji
    updateActiveNavLink();
});

// Aktualizacja aktywnego linku w menu na podstawie pozycji na stronie
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Znajdź aktualnie widoczną sekcję
    let currentSectionId = '';
    const scrollPosition = window.scrollY + 100; // Offset dla lepszego wykrywania
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSectionId = section.getAttribute('id');
        }
    });
    
    // Aktualizuj aktywny link
    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkHref = link.getAttribute('href').substring(1); // Usuń #
        
        if (linkHref === currentSectionId) {
            link.classList.add('active');
        }
    });
}

// Funkcja aktualizująca podsumowanie formularza
function updateSummary() {
    // Sprawdź, czy element podsumowania istnieje
    const summaryElement = document.querySelector('.form-summary');
    if (!summaryElement) return;

    // Aktualizacja pól podsumowania na podstawie wszystkich danych z formularza
    // Pobierz wszystkie inputy, selecty i textarea z całego formularza
    const inputs = document.querySelectorAll('.form-page input:not([type="radio"]):not([type="checkbox"]), .form-page select, .form-page textarea');
    const radios = document.querySelectorAll('.form-page input[type="radio"]:checked');
    const checkboxes = document.querySelectorAll('.form-page input[type="checkbox"]:checked');

    // Aktualizuj wartości w podsumowaniu
    inputs.forEach(input => {
        if (input.id && input.value) {
            const summaryValue = document.querySelector(`.summary-value[data-for="${input.id}"]`);
            if (summaryValue) {
                summaryValue.textContent = input.value;
                summaryValue.classList.remove('empty');
            }
        }
    });

    radios.forEach(radio => {
        if (radio.name && radio.value) {
            const summaryValue = document.querySelector(`.summary-value[data-for="${radio.name}"]`);
            if (summaryValue) {
                summaryValue.textContent = radio.value;
                summaryValue.classList.remove('empty');
            }
        }
    });

    // Dla checkboxów zbieramy wszystkie zaznaczone wartości
    const checkboxGroups = {};
    checkboxes.forEach(checkbox => {
        if (checkbox.name && checkbox.value) {
            if (!checkboxGroups[checkbox.name]) {
                checkboxGroups[checkbox.name] = [];
            }
            checkboxGroups[checkbox.name].push(checkbox.value);
        }
    });

    // Aktualizuj podsumowanie dla grup checkboxów
    for (const [name, values] of Object.entries(checkboxGroups)) {
        const summaryValue = document.querySelector(`.summary-value[data-for="${name}"]`);
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
        progressBar.style.width = `${progress}%`;
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
            const checkedRadio = currentFormPage.querySelector(`input[name="${radioGroupName}"]:checked`);
            if (!checkedRadio) {
                isValid = false;
                const radioGroup = currentFormPage.querySelector(`.radio-group:has(input[name="${radioGroupName}"])`);
                
                // Dodaj komunikat o błędzie jeśli nie istnieje
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

// ... existing code ...