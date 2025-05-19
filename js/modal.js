document.addEventListener('DOMContentLoaded', function() {
    // Elementy DOM
    const modal = document.getElementById('generuj-plan-modal');
    const generujPlanLinks = document.querySelectorAll('.generuj-plan-link');
    const closeModal = document.querySelector('.close-modal');
    const modalCtaButton = document.querySelector('.modal-cta');
    
    // Funkcja do otwierania modalu
    function openModal(e) {
        e.preventDefault();
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Zapobiega przewijaniu strony w tle
        updateModalCountdown(); // Aktualizacja licznika w modalu
    }
    
    // Funkcja do zamykania modalu
    function closeModalFunc(e) {
        if (e) e.preventDefault();
        modal.classList.remove('show');
        document.body.style.overflow = ''; // Przywraca przewijanie strony
    }
    
    // Funkcja do aktualizacji licznika w modalu
    function updateModalCountdown() {
        // Pobierz wartości z głównego licznika
        const days = document.getElementById('cd-days').textContent;
        const hours = document.getElementById('cd-hours').textContent;
        const minutes = document.getElementById('cd-minutes').textContent;
        
        // Ustaw wartości w liczniku modalu
        document.getElementById('modal-cd-days').textContent = days;
        document.getElementById('modal-cd-hours').textContent = hours;
        document.getElementById('modal-cd-minutes').textContent = minutes;
    }
    
    // Nasłuchiwanie zdarzeń
    generujPlanLinks.forEach(link => {
        link.addEventListener('click', openModal);
    });
    
    closeModal.addEventListener('click', closeModalFunc);
    
    // Zamykanie modalu po kliknięciu poza jego zawartością
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModalFunc();
        }
    });
    
    // Zamykanie modalu po kliknięciu w przycisk CTA i przewijanie do sekcji zapisz się
    modalCtaButton.addEventListener('click', function(e) {
        closeModalFunc();
        // Przewijanie do sekcji zapisz się jest obsługiwane przez href="#zapisz-sie"
    });
    
    // Obsługa klawisza Escape do zamykania modalu
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModalFunc();
        }
    });
});
