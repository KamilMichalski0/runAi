// Funkcja animująca elementy podczas przewijania
document.addEventListener('DOMContentLoaded', function() {
    // Funkcja sprawdzająca, czy element jest widoczny w oknie przeglądarki
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85
        );
    }

    // Funkcja dodająca klasę 'visible' do elementów, które są widoczne
    function handleScrollAnimation() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach(function(element) {
            if (isElementInViewport(element)) {
                element.classList.add('visible');
            }
        });
    }

    // Dodaj efekt hover do kart problemów
    const problemCards = document.querySelectorAll('.problem-card');
    problemCards.forEach(function(card) {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.card-indicator').style.width = '100%';
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('.card-indicator').style.width = '0';
        });
    });

    // Uruchom animację przy pierwszym załadowaniu strony
    handleScrollAnimation();

    // Uruchom animację przy przewijaniu strony
    window.addEventListener('scroll', handleScrollAnimation);
});
