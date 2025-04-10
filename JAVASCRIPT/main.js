// Crear instancia global del estado del juego
const estadoDelJuego = new estadoJuego();

// Función para inicializar el juego
function inicializarJuego() {
    console.log("Inicializando el juego...");

    for (const musicaFondo of Object.values(gestorSonidos.musicaFondo)) {
        musicaFondo.load();
        musicaFondo.volume = 0.3;
        musicaFondo.loop = true;
    }
    
    // Inicializar la navegación entre pantallas
    inicializarNavegacion();
    
    // Intentar cargar partida guardada
    const partidaCargada = estadoDelJuego.cargarPartida();
    console.log("¿Partida cargada?", partidaCargada);
    
    // Mostrar la pantalla de bienvenida
    cambiarPantalla('welcome-screen');
    
    // Eliminar la pantalla de carga si existe
    const pantallasCarga = document.querySelectorAll('.loading-screen');
    pantallasCarga.forEach(pantalla => {
        pantalla.classList.add('fade-out');
        setTimeout(() => pantalla.remove(), 1000);
    });
}

// Cargar el juego cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM cargado, iniciando juego...");
    inicializarJuego();
});

// Registrar eventos de teclado para navegación
document.addEventListener('keydown', (event) => {
    // Tecla Escape para volver atrás en algunas pantallas
    if (event.key === 'Escape') {
        const pantallaActual = document.querySelector('.game-screen[style*="display: block"]');
        
        if (pantallaActual) {
            switch (pantallaActual.id) {
                case 'shop-screen':
                case 'inventory-screen':
                case 'battle-selection-screen':
                    cambiarPantalla('lobby-screen');
                    break;
                case 'character-creation-screen':
                    cambiarPantalla('welcome-screen');
                    break;
            }
        }
    }
});

// Función para precargar assets
function precargarAssets() {
    const assets = [];
    
    // Precargar imágenes de personajes
    ['warrior', 'mage', 'arquero'].forEach(tipo => {
        const img = new Image();
        img.src = `assets/characters/${tipo}.gif`;
        assets.push(img);
    });
    
    // Precargar imágenes de enemigos
    datosJuego.enemigos.forEach(enemigo => {
        const img = new Image();
        img.src = `assets/enemies/${enemigo.imagen}`;
        img.onerror = () => {
            console.log(`No se pudo cargar la imagen para ${enemigo.nombre}`);
        };
        assets.push(img);
    });
    
    // Precargar imágenes de armas
    datosJuego.armas.forEach(arma => {
        const img = new Image();
        img.src = `assets/weapons/weapon${arma.id}.png`;
        assets.push(img);
    });
    
    return assets;
}

// Precargar assets en segundo plano
const assetsPrecargados = precargarAssets();