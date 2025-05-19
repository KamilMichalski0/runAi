// Skrypt obsługujący animację logo AI i wyładowania elektryczne
document.addEventListener('DOMContentLoaded', function() {
    console.log('Inicjalizacja animacji logo AI...');

    // Elementy DOM
    const logos = document.querySelectorAll('.ai-logo');
    const lightnings = document.querySelectorAll('.lightning');
    const connector = document.querySelector('.connector');
    const pulse = document.querySelector('.pulse');
    const container = document.querySelector('.ai-logos-container');

    // Dodaj klasy CSS dla losowego ruchu logo
    logos.forEach((logo, index) => {
        logo.classList.add('float-' + (index % 5 + 1));
        console.log('Logo znalezione:', logo.getAttribute('alt'));

        // Dodaj efekt pulsowania przy najechaniu myszą
        logo.addEventListener('mouseenter', function() {
            this.style.filter = 'drop-shadow(0 0 15px rgba(0, 162, 255, 0.9))';
        });

        logo.addEventListener('mouseleave', function() {
            this.style.filter = '';
        });
    });

    // Funkcja tworząca wyładowanie elektryczne - realistyczne, zygzakowate
    function createDischarge(sourceElement) {
        console.log('Tworzenie wyładowania z:', sourceElement.getAttribute('alt'));
        
        // Pobierz pozycje elementów
        const sourceRect = sourceElement.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const connectorRect = connector.getBoundingClientRect();
        
        // Oblicz pozycje względem kontenera
        const sourceX = sourceRect.left - containerRect.left + sourceRect.width/2;
        const sourceY = sourceRect.top - containerRect.top + sourceRect.height/2;
        const targetX = connectorRect.left - containerRect.left + connectorRect.width/2;
        const targetY = connectorRect.top - containerRect.top;
        
        // Utwórz SVG dla zygzakowatej ścieżki wyładowania
        const svgNS = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgNS, "svg");
        svg.setAttribute("class", "lightning-svg");
        svg.style.position = "absolute";
        svg.style.top = "0";
        svg.style.left = "0";
        svg.style.width = "100%";
        svg.style.height = "100%";
        svg.style.pointerEvents = "none";
        svg.style.zIndex = "20";
        
        // Utwórz główną ścieżkę wyładowania
        const path = document.createElementNS(svgNS, "path");
        const segments = 12; // Liczba segmentów zygzakowatego wyładowania
        
        // Generuj punkty ścieżki
        let pathD = `M ${sourceX},${sourceY} `;
        
        for (let i = 1; i < segments; i++) {
            const pointX = sourceX + (targetX - sourceX) * (i / segments);
            const pointY = sourceY + (targetY - sourceY) * (i / segments);
            
            // Dodaj losowe przesunięcie
            const offsetRange = Math.min(30, Math.max(5, (targetY - sourceY) / 10));
            const offsetX = (Math.random() - 0.5) * offsetRange;
            
            // Im bliżej końca, tym mniejsze odchylenie
            const scaleFactor = 1 - (i / segments);
            
            pathD += `L ${pointX + offsetX * scaleFactor},${pointY} `;
        }
        
        // Dodaj końcowy punkt
        pathD += `L ${targetX},${targetY}`;
        
        path.setAttribute("d", pathD);
        path.setAttribute("stroke", "rgba(255, 255, 255, 0.9)");
        path.setAttribute("stroke-width", "3");
        path.setAttribute("fill", "none");
        path.setAttribute("stroke-linecap", "round");
        path.setAttribute("stroke-linejoin", "round");
        path.setAttribute("class", "lightning-path-main");
        
        // Dodaj poświatę
        const glowPath = document.createElementNS(svgNS, "path");
        glowPath.setAttribute("d", pathD);
        glowPath.setAttribute("stroke", "#00ccff");
        glowPath.setAttribute("stroke-width", "6");
        glowPath.setAttribute("fill", "none");
        glowPath.setAttribute("stroke-linecap", "round");
        glowPath.setAttribute("stroke-linejoin", "round");
        glowPath.setAttribute("class", "lightning-path-glow");
        glowPath.setAttribute("filter", "blur(5px)");
        
        // Dodaj filtry rozmycia
        const defs = document.createElementNS(svgNS, "defs");
        const filter = document.createElementNS(svgNS, "filter");
        filter.setAttribute("id", "glow");
        
        const feGaussianBlur = document.createElementNS(svgNS, "feGaussianBlur");
        feGaussianBlur.setAttribute("stdDeviation", "2.5");
        feGaussianBlur.setAttribute("result", "coloredBlur");
        
        filter.appendChild(feGaussianBlur);
        defs.appendChild(filter);
        
        // Dodaj elementy do SVG
        svg.appendChild(defs);
        svg.appendChild(glowPath);
        svg.appendChild(path);
        
        // Dodaj SVG do kontenera
        container.appendChild(svg);
        
        // Efekt błysku przy źródle i przy celu
        const flash1 = document.createElement('div');
        flash1.className = 'discharge-flash';
        flash1.style.left = (sourceX - 15) + 'px';
        flash1.style.top = (sourceY - 15) + 'px';
        container.appendChild(flash1);
        
        const flash2 = document.createElement('div');
        flash2.className = 'discharge-flash';
        flash2.style.left = (targetX - 15) + 'px';
        flash2.style.top = (targetY - 15) + 'px';
        flash2.style.animationDelay = '0.1s';
        container.appendChild(flash2);
        
        // Dodaj małe odgałęzienia wyładowań
        const branchCount = Math.floor(Math.random() * 3) + 2;
        
        for (let i = 0; i < branchCount; i++) {
            const branchSegmentIndex = Math.floor((Math.random() * (segments - 2)) + 1);
            const branchStartX = sourceX + (targetX - sourceX) * (branchSegmentIndex / segments) + 
                                (Math.random() - 0.5) * 20;
            const branchStartY = sourceY + (targetY - sourceY) * (branchSegmentIndex / segments);
            
            const branchPath = document.createElementNS(svgNS, "path");
            const branchLength = Math.random() * 50 + 20;
            const branchAngle = Math.random() * 180 - 90;
            
            // Kierunek odgałęzienia
            const branchEndX = branchStartX + Math.cos(branchAngle * Math.PI / 180) * branchLength;
            const branchEndY = branchStartY + Math.sin(branchAngle * Math.PI / 180) * branchLength;
            
            // Punkty pośrednie z losowym przesunięciem
            const midX = branchStartX + (branchEndX - branchStartX) * 0.5 + (Math.random() - 0.5) * 15;
            const midY = branchStartY + (branchEndY - branchStartY) * 0.5 + (Math.random() - 0.5) * 15;
            
            const branchPathD = `M ${branchStartX},${branchStartY} Q ${midX},${midY} ${branchEndX},${branchEndY}`;
            
            branchPath.setAttribute("d", branchPathD);
            branchPath.setAttribute("stroke", "rgba(255, 255, 255, 0.6)");
            branchPath.setAttribute("stroke-width", "2");
            branchPath.setAttribute("fill", "none");
            branchPath.setAttribute("class", "lightning-branch");
            branchPath.setAttribute("opacity", "0.7");
            
            svg.appendChild(branchPath);
            
            // Dodaj poświatę do odgałęzienia
            const branchGlowPath = document.createElementNS(svgNS, "path");
            branchGlowPath.setAttribute("d", branchPathD);
            branchGlowPath.setAttribute("stroke", "#00ccff");
            branchGlowPath.setAttribute("stroke-width", "4");
            branchGlowPath.setAttribute("fill", "none");
            branchGlowPath.setAttribute("filter", "url(#glow)");
            branchGlowPath.setAttribute("class", "lightning-branch-glow");
            branchGlowPath.setAttribute("opacity", "0.3");
            
            svg.insertBefore(branchGlowPath, branchPath);
        }
        
        // Animacja elektryczna - dodaj efekt 'przebiegającego prądu'
        const particles = [];
        const particleCount = 8;
        
        for (let i = 0; i < particleCount; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.className = 'lightning-particle';
                particle.style.left = sourceX + 'px';
                particle.style.top = sourceY + 'px';
                container.appendChild(particle);
                particles.push(particle);
                
                // Animacja cząsteczki wzdłuż ścieżki
                animateParticleAlongPath(particle, pathD, sourceX, sourceY, targetX, targetY, 300 + Math.random() * 200);
            }, i * 100);
        }
        
        // Usuń po animacji
        setTimeout(() => {
            svg.remove();
            flash1.remove();
            flash2.remove();
            particles.forEach(p => p.remove());
        }, 1000);
    }
    
    // Funkcja animująca cząsteczkę wzdłuż ścieżki wyładowania
    function animateParticleAlongPath(particle, pathD, startX, startY, endX, endY, duration) {
        const startTime = Date.now();
        
        function updatePosition() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            if (progress >= 1) {
                particle.remove();
                return;
            }
            
            // Interpolacja pozycji wzdłuż ścieżki
            // Używamy prostej interpolacji liniowej między punktem początkowym a końcowym
            // W prawdziwej implementacji można by użyć bardziej złożonej metody podążania za ścieżką SVG
            
            const x = startX + (endX - startX) * progress;
            const y = startY + (endY - startY) * progress;
            
            // Dodaj małe odchylenie aby efekt był bardziej organiczny
            const jitter = Math.sin(progress * 10) * 3;
            
            particle.style.left = (x + jitter) + 'px';
            particle.style.top = y + 'px';
            
            // Skala i przezroczystość zależne od postępu
            const size = 6 + Math.sin(progress * Math.PI) * 4; // Większy w środku ścieżki
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            
            if (progress > 0.8) {
                // Zanikanie pod koniec
                particle.style.opacity = (1 - progress) * 5;
            }
            
            requestAnimationFrame(updatePosition);
        }
        
        requestAnimationFrame(updatePosition);
    }

    // Funkcja generująca losowe wyładowania
    function randomDischarges() {
        // Losowe logo
        const randomLogo = logos[Math.floor(Math.random() * logos.length)];
        createDischarge(randomLogo);
        
        // Animacja pulsowania dla punktu połączenia
        pulse.style.opacity = '1';
        pulse.style.animation = 'pulse 1s';
        setTimeout(() => {
            pulse.style.opacity = '0';
            pulse.style.animation = '';
        }, 1000);
        
        // Zaplanuj następne wyładowanie
        setTimeout(randomDischarges, Math.random() * 1500 + 500);
    }

    // Rozpocznij animację po krótkim opóźnieniu
    setTimeout(randomDischarges, 1000);

    // Dodaj nasłuchiwanie kliknięć na logo
    logos.forEach(logo => {
        logo.addEventListener('click', function() {
            createDischarge(this);
        });
    });
});
