// AI Process Visualization Script

document.addEventListener('DOMContentLoaded', function() {
    // Create brain nodes and connections for the AI engine visualization
    function initializeAIBrain() {
        const brainContainer = document.querySelector('.ai-brain');
        if (!brainContainer) return;
        
        // Add glowing background effect
        const glow = document.createElement('div');
        glow.className = 'brain-glow';
        brainContainer.appendChild(glow);
        
        // Create nodes - używamy mniej węzłów dla większej przejrzystości
        const nodeCount = 8;
        for (let i = 0; i < nodeCount; i++) {
            const node = document.createElement('div');
            node.className = 'brain-node';
            
            // Bardziej równomierne rozmieszczenie węzłów
            // Tworzymy bardziej zorganizowaną strukturę zamiast w pełni losowej
            let x, y;
            
            if (i < 4) {
                // Węzły w górnej połowie w kształcie łuku
                x = 20 + (i * 20); // Równomiernie od 20% do 80% szerokości
                y = 20 + (i % 2) * 20; // Dwa rzędy w górnej części
            } else {
                // Węzły w dolnej połowie w kształcie łuku
                x = 20 + ((i - 4) * 20); // Równomiernie od 20% do 80% szerokości
                y = 60 + (i % 2) * 20; // Dwa rzędy w dolnej części
            }
            
            node.style.left = `${x}%`;
            node.style.top = `${y}%`;
            // Różne opóźnienia animacji dla lepszego efektu
            node.style.animationDelay = `${i * 0.3}s`;
            
            // Dodajemy klasę typ dla różnych kolorów
            node.classList.add(`node-type-${i % 3 + 1}`);
            
            brainContainer.appendChild(node);
        }
        
        // Create connections między węzłami - łączymy wszystkie w bardziej zorganizowany sposób
        const nodes = brainContainer.querySelectorAll('.brain-node');
        
        // Łączymy węzły w bardziej zorganizowany sposób
        // 1. Połączenie węzłów w górnej części
        // 2. Połączenie węzłów w dolnej części
        // 3. Połączenie między górą a dołem
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                // Nie tworzymy wszystkich możliwych połączeń, tylko strategiczne
                if ((i < 4 && j < 4) || // Połączenia w górnej części
                    (i >= 4 && j >= 4) || // Połączenia w dolnej części
                    (j - i === 4)) { // Połączenia między górną i dolną częścią
                    
                    const startNode = nodes[i];
                    const endNode = nodes[j];
                    
                    const connection = document.createElement('div');
                    connection.className = 'brain-connection';
                    
                    // Animate connection with animation-delay
                    connection.style.animationDelay = `${(i + j) * 0.2}s`;
                    
                    // Calculate position and dimensions
                    const startX = parseFloat(startNode.style.left);
                    const startY = parseFloat(startNode.style.top);
                    const endX = parseFloat(endNode.style.left);
                    const endY = parseFloat(endNode.style.top);
                    
                    // Calculate distance
                    const dx = endX - startX;
                    const dy = endY - startY;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    // Calculate angle
                    const angle = Math.atan2(dy, dx) * 180 / Math.PI;
                    
                    // Set styles
                    connection.style.width = `${distance}%`;
                    connection.style.left = `${startX}%`;
                    connection.style.top = `${startY}%`;
                    connection.style.transform = `rotate(${angle}deg)`;
                    
                    // Dodaj klasę typu dla różnych kolorów
                    connection.classList.add(`connection-type-${(i + j) % 3 + 1}`);
                    
                    brainContainer.appendChild(connection);
                }
            }
        }
        
        // Dodaj efekt przepływu danych
        for (let i = 0; i < 5; i++) {
            const dataPacket = document.createElement('div');
            dataPacket.className = 'data-packet';
            dataPacket.style.animationDelay = `${i * 1.5}s`;
            brainContainer.appendChild(dataPacket);
        }
    }
    
    // Create training plan visualization with varying intensity
    function initializeTrainingPlan() {
        const planContainer = document.querySelector('.training-plan');
        if (!planContainer) return;
        
        // Dodaj tło planu
        const planBackground = document.createElement('div');
        planBackground.className = 'plan-background';
        planContainer.appendChild(planBackground);
        
        // Dodaj opis tygodni
        const weekLabel1 = document.createElement('div');
        weekLabel1.className = 'week-label';
        weekLabel1.textContent = 'Tydzień 1';
        weekLabel1.style.left = '15%';
        planContainer.appendChild(weekLabel1);
        
        const weekLabel2 = document.createElement('div');
        weekLabel2.className = 'week-label';
        weekLabel2.textContent = 'Tydzień 2';
        weekLabel2.style.left = '65%';
        planContainer.appendChild(weekLabel2);
        
        const dayCount = 14; // Two weeks plan
        const dayWidth = 90 / (dayCount - 1); // percentage width between days, leaving margin
        
        // Create plan structure with varying intensities
        for (let i = 0; i < dayCount; i++) {
            // Determine workout type and intensity
            let intensity = 'medium';
            let workoutType = '';
            
            // Create more realistic training pattern
            if (i % 7 === 0) { // Every Sunday
                intensity = 'easy'; // Recovery
                workoutType = 'long';
            } else if (i % 7 === 3) { // Wednesday
                intensity = 'hard'; // Hard workout
                workoutType = 'tempo';
            } else if (i % 7 === 5) { // Friday
                intensity = 'hard'; // Hard workout
                workoutType = 'interval';
            } else if (i % 7 === 6) { // Saturday
                intensity = 'easy'; // Recovery before Sunday long run
                workoutType = 'recovery';
            } else if (i % 7 === 2) { // Tuesday
                workoutType = 'speed';
            }
            
            // Create day node
            const day = document.createElement('div');
            day.className = `plan-day intensity-${intensity}`;
            if (workoutType) {
                day.classList.add(`workout-${workoutType}`);
            }
            day.style.left = `${5 + i * dayWidth}%`; // 5% offset dla marginesu
            
            // Add animation delay for sequential appearance
            day.style.animationDelay = `${i * 0.1}s`;
            
            // Add tooltip with workout description
            day.setAttribute('data-tooltip', `Dzień ${i+1}: ${getWorkoutDescription(workoutType, intensity)}`);
            
            // Add icon based on workout type
            if (workoutType) {
                const icon = document.createElement('div');
                icon.className = 'personalization-icon';
                icon.style.top = '-25px';
                icon.style.left = '-10px';
                
                // Choose icon based on workout type
                let iconHTML = '';
                switch(workoutType) {
                    case 'speed':
                        iconHTML = '<i class="fas fa-bolt"></i>';
                        break;
                    case 'long':
                        iconHTML = '<i class="fas fa-road"></i>';
                        break;
                    case 'recovery':
                        iconHTML = '<i class="fas fa-heart"></i>';
                        break;
                    case 'tempo':
                        iconHTML = '<i class="fas fa-tachometer-alt"></i>';
                        break;
                    case 'interval':
                        iconHTML = '<i class="fas fa-stopwatch"></i>';
                        break;
                }
                
                icon.innerHTML = iconHTML;
                day.appendChild(icon);
            }
            
            planContainer.appendChild(day);
            
            // Don't create a line after the last day
            if (i < dayCount - 1) {
                const line = document.createElement('div');
                line.className = 'plan-line';
                if (intensity === 'hard') {
                    line.classList.add('line-hard');
                } else if (intensity === 'easy') {
                    line.classList.add('line-easy');
                }
                line.style.left = `${5 + i * dayWidth}%`;
                line.style.width = `${dayWidth}%`;
                line.style.animationDelay = `${i * 0.1 + 0.05}s`;
                planContainer.appendChild(line);
            }
        }
        
        // Dodaj animację "aktualnego dnia"
        const currentDay = document.createElement('div');
        currentDay.className = 'current-day-indicator';
        planContainer.appendChild(currentDay);
    }
    
    // Helper function to get workout description
    function getWorkoutDescription(type, intensity) {
        switch(type) {
            case 'speed':
                return 'Trening szybkościowy - interwały';
            case 'long':
                return 'Długi bieg - budowanie wytrzymałości';
            case 'recovery':
                return 'Łatwy bieg regeneracyjny';
            case 'tempo':
                return 'Trening tempowy - podtrzymanie tempa';
            case 'interval':
                return 'Trening interwałowy - budowanie siły';
            default:
                return intensity === 'hard' ? 'Intensywny trening' : 
                       intensity === 'easy' ? 'Łatwy trening' : 'Trening o średniej intensywności';
        }
    }
    
    // Initialize visualizations
    initializeAIBrain();
    initializeTrainingPlan();
    
    // Add scroll-based animations
    const options = {
        threshold: 0.2,
        rootMargin: "0px 0px -100px 0px"
    };
    
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, options);
    
    // Observe all process stages
    document.querySelectorAll('.process-stage').forEach(stage => {
        observer.observe(stage);
    });
});
