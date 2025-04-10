// Script.js dla RunAI

document.addEventListener('DOMContentLoaded', () => {
    // Inicjalizacja wszystkich funkcjonalności po załadowaniu strony
    initMobileMenu();
    initSmoothScroll();
    initFloatingElements();
    initFormNavigation();
    initFormValidation();
    initResultsDisplay();
});

// Obsługa menu mobilnego
function initMobileMenu() {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuButton && navLinks) {
        mobileMenuButton.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuButton.setAttribute('aria-expanded', 
                navLinks.classList.contains('active') ? 'true' : 'false');
        });
    }
}

// Płynne przewijanie do sekcji po kliknięciu w linki nawigacyjne
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Zamknij menu mobilne po kliknięciu w link
                const navLinks = document.querySelector('.nav-links');
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    document.querySelector('.mobile-menu-button').setAttribute('aria-expanded', 'false');
                }
            }
        });
    });
}

// Animacja unoszących się elementów
function initFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating');
    
    if (floatingElements.length) {
        window.addEventListener('scroll', () => {
            floatingElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (elementTop < windowHeight * 0.8) {
                    element.classList.add('visible');
                }
            });
        });
        
        // Wywołaj raz, aby pokazać elementy widoczne od razu
        window.dispatchEvent(new Event('scroll'));
    }
}

// Obsługa nawigacji formularza
function initFormNavigation() {
    const formPages = document.querySelectorAll('.form-page');
    const nextButtons = document.querySelectorAll('.next-button');
    const prevButtons = document.querySelectorAll('.prev-button');
    const progressBar = document.querySelector('.progress-bar');
    const formSteps = document.querySelectorAll('.form-step');
    const resultsSection = document.querySelector('.results-section');
    
    if (!formPages.length) return;
    
    let currentPage = 0;
    updateFormProgress();
    
    // Obsługa przycisków "Dalej"
    nextButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (validateCurrentPage()) {
                if (currentPage < formPages.length - 1) {
                    formPages[currentPage].classList.remove('active');
                    currentPage++;
                    formPages[currentPage].classList.add('active');
                    updateFormProgress();
                } else {
                    showResults();
                }
            }
        });
    });
    
    // Obsługa przycisków "Wstecz"
    prevButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (currentPage > 0) {
                formPages[currentPage].classList.remove('active');
                currentPage--;
                formPages[currentPage].classList.add('active');
                updateFormProgress();
            }
        });
    });
    
    // Aktualizacja paska postępu i kroków
    function updateFormProgress() {
        if (progressBar) {
            const progressPercentage = (currentPage / (formPages.length - 1)) * 100;
            progressBar.style.width = `${progressPercentage}%`;
        }
        
        if (formSteps.length) {
            formSteps.forEach((step, index) => {
                if (index < currentPage) {
                    step.classList.add('completed');
                    step.classList.remove('active');
                } else if (index === currentPage) {
                    step.classList.add('active');
                    step.classList.remove('completed');
                } else {
                    step.classList.remove('completed', 'active');
                }
            });
        }
    }
    
    // Wyświetlanie wyników po zakończeniu formularza
    function showResults() {
        if (resultsSection) {
            formPages.forEach(page => page.classList.remove('active'));
            resultsSection.classList.add('active');
            
            // Wypełnij wyniki danymi z formularza
            populateResults();
        }
    }
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

function validateCurrentPage() {
    const currentPage = document.querySelector('.form-page.active');
    if (!currentPage) return true;
    
    const requiredInputs = currentPage.querySelectorAll('[required]');
    let isValid = true;
    
    requiredInputs.forEach(input => {
        if (!validateInput(input)) {
            isValid = false;
        }
    });
    
    return isValid;
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