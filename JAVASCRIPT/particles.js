document.addEventListener('DOMContentLoaded', function() {
    // Verificar que existe el contenedor de partículas
    const particlesContainer = document.getElementById('particles-container');
    if (!particlesContainer) return;
    
    // Limpiar el contenedor por si ya tiene partículas
    particlesContainer.innerHTML = '';
    
    // Crear partículas
    const totalParticles = 50; // Número de partículas a crear
    
    for (let i = 0; i < totalParticles; i++) {
        createParticle();
    }
    
    function createParticle() {
        // Crear elemento de partícula
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Tamaño aleatorio entre 3px y 8px
        const size = Math.random() * 5 + 3;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Posición aleatoria en la pantalla
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100}vh`;
        
        // Color aleatorio (tema mágico/medieval)
        const colors = [
            '#7e57c2', // Púrpura (color primario)
            '#b085f5', // Púrpura claro
            '#ff9800', // Naranja (color secundario)
            '#ffc947', // Naranja claro
            '#4d2c91', // Púrpura oscuro
            '#e0e0e0'  // Blanco plateado
        ];
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.backgroundColor = color;
        
        // Efecto de brillo
        particle.style.boxShadow = `0 0 ${size * 2}px ${color}`;
        
        // Animación con duración y retraso aleatorios
        const duration = Math.random() * 10 + 10; // Entre 10 y 20 segundos
        const delay = Math.random() * 5; // Retraso de hasta 5 segundos
        
        particle.style.animation = `float ${duration}s infinite ease-in-out`;
        particle.style.animationDelay = `${delay}s`;
        
        // Opacidad aleatoria para dar sensación de profundidad
        particle.style.opacity = (Math.random() * 0.5 + 0.3).toString();
        
        // Añadir la partícula al contenedor
        particlesContainer.appendChild(particle);
    }
    
    // Función para añadir partículas adicionales cuando se desplaza la página
    // (opcional, para mantener la densidad de partículas en páginas largas)
    window.addEventListener('scroll', function() {
        // Añadir partículas adicionales si el usuario ha desplazado más allá de cierto punto
        const scrollHeight = window.scrollY;
        const viewportHeight = window.innerHeight;
        
        if (scrollHeight > viewportHeight && Math.random() > 0.9) {
            // 10% de probabilidad de añadir una partícula al hacer scroll
            createParticle();
            
            // Limitar el número máximo de partículas para evitar problemas de rendimiento
            if (particlesContainer.children.length > 100) {
                particlesContainer.removeChild(particlesContainer.firstChild);
            }
        }
    });
    
    // Función para añadir un efecto especial cuando el usuario hace clic
    // (opcional, para interactividad adicional)
    document.addEventListener('click', function(event) {
        // Crear un grupo de partículas en el punto de clic
        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle click-particle';
            
            // Tamaño aleatorio
            const size = Math.random() * 6 + 4;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Posición en el punto de clic
            particle.style.left = `${event.clientX}px`;
            particle.style.top = `${event.clientY}px`;
            
            // Color aleatorio brillante
            const colors = ['#ffc947', '#ff9800', '#b085f5', '#7e57c2'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            particle.style.backgroundColor = color;
            particle.style.boxShadow = `0 0 ${size * 3}px ${color}`;
            
            // Animación de explosión
            const angle = Math.random() * Math.PI * 2; // Ángulo aleatorio
            const speed = Math.random() * 50 + 30; // Velocidad aleatoria
            const translateX = Math.cos(angle) * speed;
            const translateY = Math.sin(angle) * speed;
            
            // Aplicar animación con CSS
            particle.style.transform = 'translate(0, 0)';
            particle.style.opacity = '1';
            
            // Añadir al contenedor
            particlesContainer.appendChild(particle);
            
            // Animar con requestAnimationFrame para mejor rendimiento
            let start = null;
            const duration = Math.random() * 1000 + 500; // Entre 0.5 y 1.5 segundos
            
            function animate(timestamp) {
                if (!start) start = timestamp;
                const progress = (timestamp - start) / duration;
                
                if (progress < 1) {
                    const currentTranslateX = translateX * progress;
                    const currentTranslateY = translateY * progress;
                    const currentOpacity = 1 - progress;
                    
                    particle.style.transform = `translate(${currentTranslateX}px, ${currentTranslateY}px)`;
                    particle.style.opacity = currentOpacity.toString();
                    
                    requestAnimationFrame(animate);
                } else {
                    // Eliminar la partícula cuando termina la animación
                    particlesContainer.removeChild(particle);
                }
            }
            
            requestAnimationFrame(animate);
        }
    });
});