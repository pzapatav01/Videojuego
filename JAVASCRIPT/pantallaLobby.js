// Función para inicializar la pantalla del lobby principal
function inicializarPantallaLobby() {
    // Verificar que existe un jugador
    if (!estadoDelJuego.jugador) {
        alert('Error: No se encontró un jugador válido.');
        cambiarPantalla('welcome-screen');
        return;
    }
    
    // Actualizar información del jugador en la interfaz
    actualizarInfoJugador();

    
    
    // Configurar botones de navegación
    document.getElementById('goto-shop').addEventListener('click', () => {
        
        gestorSonidos.play('boton');
        cambiarPantalla('shop-screen');
    });
    
    document.getElementById('goto-inventory').addEventListener('click', () => {
        
        gestorSonidos.play('boton');
        cambiarPantalla('inventory-screen');
    });
    
    document.getElementById('goto-battle').addEventListener('click', () => {
        
        gestorSonidos.play('boton');
        cambiarPantalla('battle-selection-screen');
    });
    
    // Botón para guardar partida
    document.getElementById('save-game').addEventListener('click', () => {
        
        gestorSonidos.play('boton');
        estadoDelJuego.guardarPartida();
        mostrarMensajeTemporario('Partida guardada con éxito', 2000);
    });
    
    // Botón para volver al menú principal
    document.getElementById('exit-to-main').addEventListener('click', () => {
        
        gestorSonidos.play('boton');
        cambiarPantalla('welcome-screen');
    });
}

// Función para actualizar la información del jugador en la interfaz
function actualizarInfoJugador() {
    const jugador = estadoDelJuego.jugador;
    document.getElementById('lobby-player-avatar').src = `assets/characters/${estadoDelJuego.jugador.avatar}.gif`;
    
    // Actualizar nombre y nivel
    document.getElementById('lobby-player-name').textContent = jugador.nombre;
    document.getElementById('lobby-player-level').textContent = jugador.nivel;
    
    // Actualizar estadísticas
    document.getElementById('lobby-player-health').textContent = `${jugador.estadisticas.vida}/${jugador.vidaMaxima}`;
    document.getElementById('lobby-player-attack').textContent = jugador.estadisticas.ataque;
    document.getElementById('lobby-player-defense').textContent = jugador.estadisticas.defensa;
    document.getElementById('lobby-player-speed').textContent = jugador.estadisticas.velocidad;
    
    // Actualizar experiencia y progreso al siguiente nivel
    const expActual = jugador.experiencia;
    const expNecesaria = jugador.nivel * 100;
    const porcentajeExp = (expActual / expNecesaria) * 100;
    
    document.getElementById('lobby-player-experience').textContent = `${expActual}/${expNecesaria}`;
    document.getElementById('experience-bar-fill').style.width = `${porcentajeExp}%`;
    
    // Actualizar dinero
    document.getElementById('lobby-player-gold').textContent = jugador.dinero;
    
    // Actualizar arma equipada
    const armaEquipada = jugador.armaEquipada;
    if (armaEquipada) {
        document.getElementById('lobby-player-weapon').textContent = armaEquipada.nombre;
        document.getElementById('lobby-weapon-attack').textContent = `+${armaEquipada.ataque}`;
    } else {
        document.getElementById('lobby-player-weapon').textContent = "Ninguna";
        document.getElementById('lobby-weapon-attack').textContent = "+0";
    }
}

// Función para mostrar un mensaje temporario en la pantalla
function mostrarMensajeTemporario(mensaje, duracion = 2000) {
    // Crear elemento para el mensaje
    const mensajeElement = document.createElement('div');
    mensajeElement.className = 'mensaje-temporario';
    mensajeElement.textContent = mensaje;
    
    // Añadir al DOM
    document.querySelector('.lobby-container').appendChild(mensajeElement);
    
    // Eliminar después de la duración especificada
    setTimeout(() => {
        mensajeElement.classList.add('fadeout');
        setTimeout(() => mensajeElement.remove(), 500);
    }, duracion);
}