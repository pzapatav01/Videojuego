// Función para cambiar entre pantallas del juego
// Función para cambiar entre pantallas del juego
function cambiarPantalla(pantallaId) {
    // Detener todos los sonidos de efectos (no la música)
    gestorSonidos.detenerTodos();
    
    // Cambiar la música según la pantalla
    gestorSonidos.cambiarMusicaFondo(pantallaId);
    
    // Ocultar todas las pantallas
    const pantallas = document.querySelectorAll('.game-screen');
    pantallas.forEach(pantalla => {
        pantalla.style.display = 'none';
    });
    
    // Mostrar la pantalla solicitada
    const pantallaSeleccionada = document.getElementById(pantallaId);
    if (pantallaSeleccionada) {
        pantallaSeleccionada.style.display = 'block';
        
        // Inicializar la pantalla según su tipo
        switch(pantallaId) {
            case 'welcome-screen':
                inicializarPantallaBienvenida();
                break;
            case 'character-creation-screen':
                inicializarPantallaCreacionPersonaje();
                break;
            case 'lobby-screen':
                inicializarPantallaLobby();
                break;
            case 'shop-screen':
                inicializarPantallaTienda();
                break;
            case 'inventory-screen':
                inicializarPantallaInventario();
                break;
            case 'battle-selection-screen':
                inicializarPantallaSeleccionBatalla();
                break;
            case 'battle-results-screen':
                // No necesita inicialización adicional
                break;
        }
    }
}

// Función para inicializar eventos de navegación
function inicializarNavegacion() {
    // Botones en pantalla de bienvenida
    document.getElementById('continue-game')?.addEventListener('click', () => {
        if (estadoDelJuego.cargarPartida()) {
            cambiarPantalla('lobby-screen');
            gestorSonidos.play('boton');
        } else {
            alert('No se encontró ninguna partida guardada.');
        }
    });
    
    document.getElementById('new-game')?.addEventListener('click', () => {
        gestorSonidos.play('boton');
        cambiarPantalla('character-creation-screen');
    });
    
    document.getElementById('delete-game')?.addEventListener('click', () => {
        gestorSonidos.play('boton');
        if (confirm('¿Estás seguro de que quieres eliminar tu partida guardada?')) {
            estadoDelJuego.borrarPartida();
            alert('Partida eliminada con éxito.');
        }
    });
    
    // Botones en pantalla de creación de personaje
    document.getElementById('back-to-welcome')?.addEventListener('click', () => {
        gestorSonidos.play('boton');
        cambiarPantalla('welcome-screen');
    });
    
    // Botones en pantalla de lobby
    document.getElementById('goto-shop')?.addEventListener('click', () => {
        gestorSonidos.play('boton');
        cambiarPantalla('shop-screen');
    });
    
    document.getElementById('goto-inventory')?.addEventListener('click', () => {
        gestorSonidos.play('boton');
        cambiarPantalla('inventory-screen');
    });
    
    document.getElementById('goto-battle')?.addEventListener('click', () => {
        gestorSonidos.play('boton');
        cambiarPantalla('battle-selection-screen');
    });
    
    // Botones en pantalla de tienda
    document.getElementById('back-to-lobby-from-shop')?.addEventListener('click', () => {
        gestorSonidos.play('boton');
        cambiarPantalla('lobby-screen');
    });
    
    // Botones en pantalla de inventario
    document.getElementById('back-to-lobby-from-inventory')?.addEventListener('click', () => {
        gestorSonidos.play('boton');
        cambiarPantalla('lobby-screen');
    });
    
    // Botones en pantalla de selección de batalla
    document.getElementById('back-to-lobby-from-selection')?.addEventListener('click', () => {
        gestorSonidos.play('boton');
        cambiarPantalla('lobby-screen');
    });
}