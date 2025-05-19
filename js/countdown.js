// Countdown timer to launch date (1 month from now)
document.addEventListener('DOMContentLoaded', function() {
    // Set launch date: 1 month from now
    const launchDate = new Date('2025-06-13T21:22:18+02:00');
    function updateTimer() {
        const now = new Date();
        let diff = launchDate - now;
        if (diff < 0) diff = 0;
        const days = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, '0');
        const hours = String(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
        const minutes = String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
        const daysEl = document.getElementById('cd-days');
        const hoursEl = document.getElementById('cd-hours');
        const minutesEl = document.getElementById('cd-minutes');
        if (daysEl) daysEl.textContent = days;
        if (hoursEl) hoursEl.textContent = hours;
        if (minutesEl) minutesEl.textContent = minutes;
    }
    setInterval(updateTimer, 1000);
    updateTimer();
});
