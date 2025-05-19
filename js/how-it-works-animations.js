// Animacje dla sekcji "Jak to działa"
document.addEventListener('DOMContentLoaded', function() {
    // Funkcja do sprawdzania, czy element jest widoczny w viewporcie
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Funkcja do animowania kroków, gdy są widoczne
    function animateSteps() {
        const steps = document.querySelectorAll('.step-card');
        
        steps.forEach(step => {
            if (isElementInViewport(step) && !step.classList.contains('visible')) {
                step.classList.add('visible');
            }
        });
    }

    // Nasłuchiwanie na scroll
    window.addEventListener('scroll', animateSteps);
    
    // Wywołanie animacji przy załadowaniu strony
    animateSteps();
    
    // Dodatkowe efekty dla numerów kroków
    const stepNumbers = document.querySelectorAll('.step-number');
    stepNumbers.forEach(number => {
        // Dodaj efekt hover
        number.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(-50%) scale(1.1)';
            this.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.15)';
        });
        
        number.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(-50%)';
            this.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
        });
    });
});
