document.addEventListener('DOMContentLoaded', function() {
    // Znajdź wszystkie elementy pytań FAQ
    const faqQuestions = document.querySelectorAll('.faq-question');
    const faqToggles = document.querySelectorAll('.faq-toggle');
    
    // Funkcja do przełączania stanu FAQ dla elementów DOM (używana wewnątrz tego pliku)
    function toggleFaqElement(faqItem) {
        const isActive = faqItem.classList.contains('active');
        
        // Zamknij wszystkie otwarte pytania
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Jeśli element nie był aktywny, otwórz go
        if (!isActive) {
            faqItem.classList.add('active');
        }
    }
    
    // Dodaj nasłuchiwanie kliknięć dla każdego pytania
    faqQuestions.forEach(question => {
        question.addEventListener('click', function(e) {
            // Ignoruj kliknięcia na przycisk toggle
            if (e.target.closest('.faq-toggle')) {
                return;
            }
            
            // Znajdź rodzica (element faq-item)
            const faqItem = this.parentElement;
            toggleFaqElement(faqItem);
        });
    });
    
    // Dodaj nasłuchiwanie kliknięć dla przycisków toggle
    faqToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const faqItem = this.closest('.faq-item');
            toggleFaqElement(faqItem);
        });
    });
    
    // Dodaj przyciski podglądu do każdej odpowiedzi
    document.querySelectorAll('.faq-answer').forEach(answer => {
        // Stwórz przycisk "Pokaż więcej"
        const previewBtn = document.createElement('button');
        previewBtn.className = 'faq-preview-btn';
        previewBtn.innerHTML = 'Pokaż więcej <i class="fas fa-angle-down"></i>';
        
        // Dodaj przycisk do odpowiedzi
        answer.appendChild(previewBtn);
        
        // Dodaj nasłuchiwanie kliknięć dla przycisku
        previewBtn.addEventListener('click', function(e) {
            e.stopPropagation(); // Zatrzymaj propagację zdarzenia
            
            const faqItem = this.closest('.faq-item');
            const isExpanded = this.getAttribute('data-expanded') === 'true';
            
            if (isExpanded) {
                // Zwiń odpowiedź
                faqItem.classList.remove('expanded');
                this.innerHTML = 'Pokaż więcej <i class="fas fa-angle-down"></i>';
                this.setAttribute('data-expanded', 'false');
            } else {
                // Rozwiń odpowiedź
                faqItem.classList.add('expanded');
                this.innerHTML = 'Pokaż mniej <i class="fas fa-angle-up"></i>';
                this.setAttribute('data-expanded', 'true');
            }
        });
    });
    
    // Automatyczne otwieranie pierwszego pytania wyłączone
    // const firstFaqItem = document.querySelector('.faq-item');
    // if (firstFaqItem) {
    //     setTimeout(() => {
    //         firstFaqItem.classList.add('active');
    //     }, 500);
    // }
});
