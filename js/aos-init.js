// Inicjalizacja biblioteki AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    // Emulacja funkcjonalności AOS bez konieczności dodawania zewnętrznej biblioteki
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    // Funkcja sprawdzająca, czy element jest widoczny w oknie przeglądarki
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
            rect.bottom >= 0
        );
    }
    
    // Funkcja aktywująca animacje dla widocznych elementów
    function checkAnimations() {
        animatedElements.forEach(element => {
            if (isElementInViewport(element) && !element.classList.contains('aos-animate')) {
                element.classList.add('aos-animate');
            }
        });
    }
    
    // Uruchomienie sprawdzania przy ładowaniu i przewijaniu strony
    window.addEventListener('scroll', checkAnimations);
    window.addEventListener('resize', checkAnimations);
    
    // Inicjalne sprawdzenie animacji
    setTimeout(checkAnimations, 100);
});
