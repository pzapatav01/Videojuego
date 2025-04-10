// Sistema centralizado para gestionar los sonidos del juego
const gestorSonidos = {
    // Almacén de sonidos cargados
    sonidos: {
        boton: new Audio('../MUSICA/boton.mp3'),
        compra: new Audio('../MUSICA/compra.mp3'),
        defensa: new Audio('../MUSICA/escudo.mp3'),
        ataque: new Audio('../MUSICA/espada.mp3'),
        muerte: new Audio('../MUSICA/muerte.mp3'),
        pocion: new Audio('../MUSICA/pocion.mp3'), // Añadir este sonido a tu carpeta de MUSICA
        // Puedes añadir más sonidos aquí
    },

    // Música de fondo para cada pantalla - sin cambios
    musicaFondo: {
        'welcome-screen': new Audio('../MUSICA/menu_music.mp3'),
        'character-creation-screen': new Audio('../MUSICA/character_music.mp3'),
        'lobby-screen': new Audio('../MUSICA/lobby_music.mp3'),
        'shop-screen': new Audio('../MUSICA/shop_music.mp3'),
        'inventory-screen': new Audio('../MUSICA/inventory_music.mp3'),
        'battle-selection-screen': new Audio('../MUSICA/battle_select_music.mp3'),
        'battle-screen': new Audio('../MUSICA/battle_music.mp3'),
        'battle-results-screen': new Audio('../MUSICA/results_music.mp3')
    },

    // Música de fondo actual
    musicaActual: null,

    // Reproduce un sonido
    play(nombre) {
        if (this.sonidos[nombre]) {
            // Detener cualquier instancia que esté sonando
            this.sonidos[nombre].pause();
            this.sonidos[nombre].currentTime = 0;
            
            // Reproducir el sonido
            this.sonidos[nombre].play().catch(error => {
                console.warn(`Error al reproducir sonido ${nombre}:`, error);
            });
        } else {
            console.warn(`Sonido ${nombre} no encontrado`);
        }
    },
    
    // Detiene todos los sonidos
    detenerTodos() {
        Object.values(this.sonidos).forEach(sonido => {
            sonido.pause();
            sonido.currentTime = 0;
        });
    },

    // Cambiar la música de fondo según la pantalla
    cambiarMusicaFondo(pantallaId) {
        // Detener la música actual si existe
        if (this.musicaActual) {
            this.musicaActual.pause();
            this.musicaActual.currentTime = 0;
        }

        // Cambiar a la nueva música si existe para esta pantalla
        if (this.musicaFondo[pantallaId]) {
            this.musicaActual = this.musicaFondo[pantallaId];
            this.musicaActual.volume = 0.3; // Volumen más bajo para música de fondo
            this.musicaActual.loop = true; // Reproducir en bucle
            this.musicaActual.play().catch(error => {
                console.warn(`Error al reproducir música de ${pantallaId}:`, error);
            });
        }
    },

    // Configurar volumen general de la música de fondo
    setVolumenMusica(volumen) {
        // Volumen debe estar entre 0 y 1
        const vol = Math.max(0, Math.min(1, volumen));
        
        Object.values(this.musicaFondo).forEach(musica => {
            musica.volume = vol;
        });
        
        return vol;
    }
};

document.getElementById('music-volume').addEventListener('input', function() {
    gestorSonidos.setVolumenMusica(this.value);
});