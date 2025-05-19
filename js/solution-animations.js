// Animacje dla sekcji rozwiązania
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

    // Funkcja do animowania elementów, gdy są widoczne
    function animateOnScroll() {
        const features = document.querySelectorAll('.solution-feature');
        const badges = document.querySelectorAll('.solution-badge-item');
        
        features.forEach(feature => {
            if (isElementInViewport(feature) && !feature.classList.contains('animated')) {
                feature.classList.add('animated');
                feature.style.opacity = '1';
                feature.style.transform = 'translateY(0)';
            }
        });
        
        // Dodatkowa animacja dla odznak
        badges.forEach(badge => {
            if (isElementInViewport(badge) && !badge.classList.contains('animate-pulse')) {
                badge.classList.add('animate-pulse');
            }
        });
    }

    // Inicjalne ustawienie stylów dla animacji
    const features = document.querySelectorAll('.solution-feature');
    features.forEach(feature => {
        feature.style.opacity = '0';
        feature.style.transform = 'translateY(20px)';
        feature.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Nasłuchiwanie na scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Wywołanie animacji przy załadowaniu strony
    animateOnScroll();
    
    // Interaktywne efekty hover dla tagów korzyści
    const benefitTags = document.querySelectorAll('.benefit-tag');
    benefitTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
});
