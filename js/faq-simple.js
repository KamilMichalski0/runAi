document.addEventListener('DOMContentLoaded', function() {
    // Proste rozwijanie FAQ - bezpośrednie podejście
    const faqItems = document.querySelectorAll('.faq-item');
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    // Funkcja do zamykania wszystkich FAQ oprócz wybranego
    function closeAllExcept(exceptItem) {
        faqItems.forEach(item => {
            if (item !== exceptItem) {
                item.classList.remove('active');
            }
        });
    }
    
    // Dodaj nasłuchiwanie kliknięć dla każdego pytania
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            // Znajdź rodzica (element faq-item)
            const faqItem = this.parentElement;
            
            // Jeśli element jest już aktywny, zamknij go
            if (faqItem.classList.contains('active')) {
                faqItem.classList.remove('active');
            } else {
                // Zamknij wszystkie inne elementy
                closeAllExcept(faqItem);
                
                // Otwórz kliknięty element
                faqItem.classList.add('active');
            }
        });
    });
    
    // Otwórz pierwsze pytanie na start
    if (faqItems.length > 0) {
        setTimeout(() => {
            faqItems[0].classList.add('active');
        }, 300);
    }
});
