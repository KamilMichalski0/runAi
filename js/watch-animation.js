// Animacja zegarka i statycznych logotypów
document.addEventListener('DOMContentLoaded', function() {
    const watchSection = document.querySelector('.watch-container');
    const watchImage = document.querySelector('.watch-image');
    const logosStatic = document.querySelector('.logos-static');
    const logoItems = document.querySelectorAll('.logo-static-item');
    const integrationSection = document.querySelector('.integrations-section');
    
    if (!watchSection || !watchImage) return;
    
    // Funkcja do animacji elementów podczas przewijania
    function animateOnScroll() {
        const scrollPosition = window.scrollY;
        const sectionTop = integrationSection.offsetTop;
        const sectionHeight = integrationSection.offsetHeight;
        const windowHeight = window.innerHeight;
        
        // Sprawdź, czy sekcja jest widoczna
        if (scrollPosition + windowHeight > sectionTop && scrollPosition < sectionTop + sectionHeight) {
            // Oblicz, jak daleko zescrollowano w sekcji (wartość od 0 do 1)
            const scrollProgress = (scrollPosition + windowHeight - sectionTop) / (sectionHeight + windowHeight);
            
            if (scrollProgress >= 0 && scrollProgress <= 1) {
                // Animacja zegarka - pulsowanie i lekkie przesunięcie
                const pulseScale = 1 + (Math.sin(scrollProgress * Math.PI) * 0.05);
                const moveY = scrollProgress * 20;
                watchImage.style.transform = `scale(${pulseScale}) translateY(${-moveY}px)`;
                
                // Animacja logotypów
                logoItems.forEach((logo, index) => {
                    // Opóźnij animację każdego logo
                    const delay = index * 0.2;
                    const logoProgress = Math.max(0, Math.min(1, (scrollProgress - delay) * 2));
                    
                    // Efekt unoszenia się logotypów
                    const translateY = -20 * logoProgress;
                    const scale = 1 + (0.1 * logoProgress);
                    const opacity = 0.5 + (0.5 * logoProgress);
                    
                    logo.querySelector('.logo-static-wrapper').style.transform = `translateY(${translateY}px) scale(${scale})`;
                    logo.querySelector('.logo-static-wrapper').style.opacity = opacity;
                    
                    // Dodaj klasę aktywności dla efektu cienia
                    if (logoProgress > 0.5) {
                        logo.classList.add('scroll-active');
                    } else {
                        logo.classList.remove('scroll-active');
                    }
                });
            }
        }
    }
    
    // Efekt paralaksy dla zegarka
    function parallaxEffect() {
        document.addEventListener('mousemove', function(e) {
            const mouseX = (e.clientX / window.innerWidth - 0.5) * 2; // -1 do 1
            const mouseY = (e.clientY / window.innerHeight - 0.5) * 2; // -1 do 1
            
            const watchRect = watchImage.getBoundingClientRect();
            const watchCenterX = watchRect.left + watchRect.width / 2;
            const watchCenterY = watchRect.top + watchRect.height / 2;
            
            // Odległość myszy od zegarka
            const distance = Math.sqrt(
                Math.pow((e.clientX - watchCenterX) / window.innerWidth, 2) + 
                Math.pow((e.clientY - watchCenterY) / window.innerHeight, 2)
            );
            
            // Efekt przesunięcia zegarka w kierunku przeciwnym do ruchu myszy
            if (distance < 0.3) {
                const moveX = -mouseX * 15; // Przeciwny kierunek
                const moveY = -mouseY * 15; // Przeciwny kierunek
                watchImage.style.transform = `translate(${moveX}px, ${moveY}px)`;
                
                // Również przesuń logotypy, ale w mniejszym stopniu
                logoItems.forEach(logo => {
                    const logoWrapper = logo.querySelector('.logo-static-wrapper');
                    const position = logo.classList.contains('logo-top') ? 'top' : 
                                    logo.classList.contains('logo-right') ? 'right' : 'bottom';
                    
                    let factorX = 0.5;
                    let factorY = 0.5;
                    
                    // Różne przesunięcia w zależności od pozycji
                    if (position === 'top') {
                        factorX = -0.3;
                        factorY = -0.7;
                    } else if (position === 'right') {
                        factorX = 0.7;
                        factorY = -0.3;
                    } else if (position === 'bottom') {
                        factorX = -0.3;
                        factorY = 0.7;
                    }
                    
                    const logoMoveX = -mouseX * 8 * factorX;
                    const logoMoveY = -mouseY * 8 * factorY;
                    
                    // Zachowaj istniejące transformacje
                    const currentTransform = getComputedStyle(logoWrapper).transform;
                    if (currentTransform && currentTransform !== 'none') {
                        // Dodaj przesunięcie do istniejącej transformacji
                        logoWrapper.style.transform += ` translate(${logoMoveX}px, ${logoMoveY}px)`;
                    } else {
                        logoWrapper.style.transform = `translate(${logoMoveX}px, ${logoMoveY}px)`;
                    }
                });
            } else {
                // Resetuj tylko transformacje związane z ruchem myszy, zachowaj inne efekty
                animateOnScroll();
            }
        });
    }
    
    // Interaktywność logotypów przy najechaniu myszką
    logoItems.forEach(logo => {
        const logoWrapper = logo.querySelector('.logo-static-wrapper');
        
        logo.addEventListener('mouseenter', function() {
            logoWrapper.style.transform = 'translateY(-15px) scale(1.1)';
            logoWrapper.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
        });
        
        logo.addEventListener('mouseleave', function() {
            // Przywróć animację przewijania
            animateOnScroll();
        });
    });
    
    // Nasłuchuj przewijania strony
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('resize', animateOnScroll);
    
    // Inicjalizacja efektów
    parallaxEffect();
    
    // Początkowe sprawdzenie animacji
    setTimeout(animateOnScroll, 100);
});
