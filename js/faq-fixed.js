document.addEventListener('DOMContentLoaded', function() {
    // Znajdź wszystkie elementy FAQ
    const faqItems = document.querySelectorAll('.faq-item');
    
    // Funkcja do obsługi kliknięcia w element FAQ
    function handleFaqClick(e) {
        // Sprawdź, czy kliknięcie było na przycisku podglądu
        if (e.target.closest('.faq-preview-btn')) {
            return; // Jeśli tak, nie wykonuj kodu rozwijania/zwijania
        }
        
        // Pobierz element FAQ
        const faqItem = this;
        
        // Sprawdź, czy element jest już aktywny
        const isActive = faqItem.classList.contains('active');
        
        // Zamknij wszystkie aktywne elementy
        document.querySelectorAll('.faq-item.active').forEach(item => {
            if (item !== faqItem) {
                item.classList.remove('active');
            }
        });
        
        // Przełącz stan aktywności klikniętego elementu
        if (isActive) {
            faqItem.classList.remove('active');
        } else {
            faqItem.classList.add('active');
        }
    }
    
    // Dodaj obsługę kliknięcia do każdego elementu FAQ
    faqItems.forEach(item => {
        item.addEventListener('click', handleFaqClick);
    });
    
    // Dodaj przyciski "Pokaż więcej" do każdej odpowiedzi
    document.querySelectorAll('.faq-answer').forEach(answer => {
        // Sprawdź, czy odpowiedź zawiera listę
        const list = answer.querySelector('ul');
        if (list) {
            // Stwórz przycisk
            const previewBtn = document.createElement('button');
            previewBtn.className = 'faq-preview-btn';
            previewBtn.innerHTML = 'Pokaż więcej <i class="fas fa-angle-down"></i>';
            
            // Dodaj przycisk do odpowiedzi
            answer.appendChild(previewBtn);
            
            // Dodaj obsługę kliknięcia przycisku
            previewBtn.addEventListener('click', function(e) {
                e.stopPropagation(); // Zatrzymaj propagację zdarzenia
                
                const faqItem = this.closest('.faq-item');
                const isExpanded = faqItem.classList.contains('expanded');
                
                if (isExpanded) {
                    // Zwiń odpowiedź
                    faqItem.classList.remove('expanded');
                    this.innerHTML = 'Pokaż więcej <i class="fas fa-angle-down"></i>';
                } else {
                    // Rozwiń odpowiedź
                    faqItem.classList.add('expanded');
                    this.innerHTML = 'Pokaż mniej <i class="fas fa-angle-up"></i>';
                }
            });
        }
    });
    
    // Automatycznie otwórz pierwsze pytanie po załadowaniu strony
    setTimeout(() => {
        const firstFaqItem = document.querySelector('.faq-item');
        if (firstFaqItem) {
            firstFaqItem.classList.add('active');
        }
    }, 500);
});
