// Variables para manejar el estado del combate
let combateActual = null;
let enemigos = [];
let enemigosSeleccionados = [];

// Inicialización de la pantalla de selección de batalla
function inicializarPantallaSeleccionBatalla() {
    const contenedorEnemigos = document.querySelector('.enemy-selection');
    
    if (!contenedorEnemigos) return;
    
    // Limpiar el contenedor antes de añadir enemigos
    contenedorEnemigos.innerHTML = '';
    
    // Cargar los enemigos disponibles desde los datos del juego
    enemigos = datosJuego.enemigos || [];
    
    // Filtrar enemigos según el nivel del jugador para mostrar enemigos apropiados
    enemigosSeleccionados = enemigos.filter(enemigo => {
        return enemigo.nivel <= estadoDelJuego.jugador.nivel + 2;
    });
    
    // Crear tarjetas para cada enemigo
    enemigosSeleccionados.forEach(enemigo => {
        const tarjetaEnemigo = document.createElement('div');
        tarjetaEnemigo.className = 'enemy-card';
        tarjetaEnemigo.dataset.enemyId = enemigo.id;
        
        tarjetaEnemigo.innerHTML = `
            <img src="assets/enemies/${enemigo.avatar}" alt="${enemigo.nombre}">
            <div class="enemy-info">
                <h3>${enemigo.nombre}</h3>
                <p>Nivel: ${enemigo.nivel}</p>
                <p>Vida: ${enemigo.estadisticas.vida}</p>
                <p>Experiencia: ${enemigo.experienciaDevuelve}</p>
                <p>Oro: ${enemigo.dineroDevuelve}</p>
            </div>
        `;
        
        tarjetaEnemigo.addEventListener('click', () => iniciarBatalla(enemigo));
        contenedorEnemigos.appendChild(tarjetaEnemigo);
    });
    
    // Añadir listener para el botón de volver al lobby
    document.getElementById('back-to-lobby-from-selection').addEventListener('click', () => {
        cambiarPantalla('lobby-screen');
    });
}

// Función para iniciar la batalla con el enemigo seleccionado
function iniciarBatalla(enemigo) {
    // Clonar el enemigo para no modificar el original
    const enemigoInstancia = new Enemigo(
        enemigo.nombre,
        enemigo.nivel,
        enemigo.estadisticas.vida,
        enemigo.estadisticas.ataque,
        enemigo.estadisticas.defensa,
        enemigo.estadisticas.velocidad,
        enemigo.experienciaDevuelve,
        enemigo.dineroDevuelve,
        enemigo.avatar
    );
    
    // Crear una nueva instancia de combate
    combateActual = new Combate(estadoDelJuego.jugador, enemigoInstancia);
    
    // Asegurarse de que el estado del jugador sea correcto antes de la batalla
    if (estadoDelJuego.jugador.estadisticas.vida <= 0 || 
        estadoDelJuego.jugador.estadisticas.vida < estadoDelJuego.jugador.vidaMaxima * 0.2) {
        console.log("Restaurando salud del jugador antes de la batalla");
        estadoDelJuego.jugador.estadisticas.vida = estadoDelJuego.jugador.vidaMaxima;
    }
    
    // Explícitamente establecer el turno inicial según la velocidad
    combateActual.esTurnoJugador = combateActual.determinarPrimerTurno();
    
    // Cambiar a la pantalla de batalla
    cambiarPantalla('battle-screen');
    
    // Inicializar la interfaz de batalla
    inicializarPantallaBatalla();
}

// Función para inicializar la pantalla de batalla
function inicializarPantallaBatalla() {
    if (!combateActual) {
        console.error("No hay combate activo");
        return;
    }
    
    // Configurar la información del jugador
    document.getElementById('battle-player-name').textContent = estadoDelJuego.jugador.nombre;
    document.getElementById('battle-player-hp').textContent = estadoDelJuego.jugador.estadisticas.vida;
    document.getElementById('battle-player-max-hp').textContent = estadoDelJuego.jugador.vidaMaxima;
    document.getElementById('battle-player-image').src = `assets/characters/${estadoDelJuego.jugador.avatar}.gif`;

    // Configurar la información del enemigo
    document.getElementById('battle-enemy-name').textContent = combateActual.enemigo.nombre;
    document.getElementById('battle-enemy-hp').textContent = combateActual.enemigo.estadisticas.vida;
    document.getElementById('battle-enemy-max-hp').textContent = combateActual.enemigo.vidaMaxima;
    console.log(combateActual.enemigo.avatar);
    document.getElementById('battle-enemy-image').src = `assets/enemies/${combateActual.enemigo.avatar}`;

    // IMPORTANTE: Primero localizar los botones antes de clonarlos
    const attackButton = document.getElementById('attack-button');
    const defendButton = document.getElementById('defend-button');
    const specialButton = document.getElementById('special-button');
    const fleeButton = document.getElementById('flee-battle');
    
    if (!attackButton || !defendButton || !specialButton || !fleeButton) {
        console.error("No se pudieron encontrar todos los botones de batalla");
        return;
    }
    
    // Clonar y reemplazar los botones para eliminar listeners anteriores
    const newAttackButton = attackButton.cloneNode(true);
    const newDefendButton = defendButton.cloneNode(true);
    const newSpecialButton = specialButton.cloneNode(true);
    const newFleeButton = fleeButton.cloneNode(true);
    
    // Asignar IDs para que puedan ser encontrados después
    newAttackButton.id = 'attack-button';
    newDefendButton.id = 'defend-button';
    newSpecialButton.id = 'special-button';
    newFleeButton.id = 'flee-battle';
    
    // Añadir clases para estilo y selección
    newAttackButton.classList.add('battle-button');
    newDefendButton.classList.add('battle-button');
    newSpecialButton.classList.add('battle-button');
    
    // Reemplazar botones
    attackButton.parentNode.replaceChild(newAttackButton, attackButton);
    defendButton.parentNode.replaceChild(newDefendButton, defendButton);
    specialButton.parentNode.replaceChild(newSpecialButton, specialButton);
    fleeButton.parentNode.replaceChild(newFleeButton, fleeButton);
    
    // Añadir nuevos event listeners
    newAttackButton.addEventListener('click', realizarAtaque);
    newDefendButton.addEventListener('click', realizarDefensa);
    newSpecialButton.addEventListener('click', realizarMovimientoEspecial);
    newFleeButton.addEventListener('click', huirDeBatalla);
    
    // Actualizar barras de vida
    actualizarBarrasVida();
    
    // Mensaje inicial de batalla
    document.getElementById('battle-message').textContent = '¡La batalla ha comenzado!';
    
    // IMPORTANTE: Establecer explícitamente el turno del jugador al inicio
    combateActual.esTurnoJugador = true;
    
    // Actualizar estado de botones
    setTimeout(() => {
        actualizarEstadoBotones();
        console.log("Botones actualizados. Turno del jugador:", combateActual.esTurnoJugador);
    }, 100);
}

// Modificar la función de actualización de botones para que sea más robusta
function actualizarEstadoBotones() {
    const attackButton = document.getElementById('attack-button');
    const defendButton = document.getElementById('defend-button');
    const specialButton = document.getElementById('special-button');
    const fleeButton = document.getElementById('flee-battle');
    
    if (!combateActual) {
        console.error("No hay combate activo");
        return;
    }
    
    console.log("Actualizando botones - Turno del jugador:", combateActual.esTurnoJugador);
    
    // IMPORTANTE: Forzar que los botones estén habilitados si es el turno del jugador
    if (combateActual.esTurnoJugador) {
        if (attackButton) {
            attackButton.disabled = false;
            console.log("Botón de ataque habilitado");
        }
        if (defendButton) {
            defendButton.disabled = false;
            console.log("Botón de defensa habilitado");
        }
        if (specialButton) {
            specialButton.disabled = false;
            console.log("Botón especial habilitado");
        }
    } else {
        if (attackButton) attackButton.disabled = true;
        if (defendButton) defendButton.disabled = true;
        if (specialButton) specialButton.disabled = true;
    }
    
    // El botón de huir siempre disponible
    if (fleeButton) fleeButton.disabled = false;
}

// Actualizar las barras de vida del jugador y enemigo
function actualizarBarrasVida() {
    const barraVidaJugador = document.getElementById('player-health-bar');
    const barraVidaEnemigo = document.getElementById('enemy-health-bar');
    
    // Calcular el porcentaje de vida
    const porcentajeVidaJugador = (estadoDelJuego.jugador.estadisticas.vida / estadoDelJuego.jugador.vidaMaxima) * 100;
    const porcentajeVidaEnemigo = (combateActual.enemigo.estadisticas.vida / combateActual.enemigo.vidaMaxima) * 100;
    
    // Actualizar el ancho de las barras de vida
    barraVidaJugador.style.width = `${porcentajeVidaJugador}%`;
    barraVidaEnemigo.style.width = `${porcentajeVidaEnemigo}%`;
    
    // Cambiar el color según el porcentaje de vida
    barraVidaJugador.className = 'health-fill';
    barraVidaEnemigo.className = 'health-fill';
    
    if (porcentajeVidaJugador < 25) {
        barraVidaJugador.classList.add('critical');
    } else if (porcentajeVidaJugador < 50) {
        barraVidaJugador.classList.add('warning');
    }
    
    if (porcentajeVidaEnemigo < 25) {
        barraVidaEnemigo.classList.add('critical');
    } else if (porcentajeVidaEnemigo < 50) {
        barraVidaEnemigo.classList.add('warning');
    }
    
    // Actualizar los números de vida
    document.getElementById('battle-player-hp').textContent = Math.max(0, estadoDelJuego.jugador.estadisticas.vida);
    document.getElementById('battle-enemy-hp').textContent = Math.max(0, combateActual.enemigo.estadisticas.vida);
}

// Función para realizar ataque
function realizarAtaque() {
    if (!combateActual || !combateActual.esTurnoJugador) return;

    gestorSonidos.play('ataque');
    
    console.log("Realizando ataque...");
    
    // El jugador ataca
    const resultadoAtaque = combateActual.jugadorAtaca();
    
    // Mostrar mensaje de ataque
    document.getElementById('battle-message').textContent = resultadoAtaque.registo;
    
    // Actualizar barras de vida
    actualizarBarrasVida();
    
    // Verificar si el enemigo ha muerto
    if (resultadoAtaque.enemigoMuerto) {
        finalizarBatalla('victoria');
        return;
    }
    
    // Cambiar turno
    combateActual.esTurnoJugador = false;
    actualizarEstadoBotones();
    
    // Esperar un momento y ejecutar el turno del enemigo
    setTimeout(turnoEnemigo, 1500);
}

// Función para realizar defensa
function realizarDefensa() {
    if (!combateActual || !combateActual.esTurnoJugador) return;
    
    gestorSonidos.play('defensa');
    // El jugador se defiende
    const resultadoDefensa = combateActual.jugadorDefiende();
    
    // Mostrar mensaje de defensa
    document.getElementById('battle-message').textContent = resultadoDefensa.registro;
    
    // Cambiar turno
    combateActual.esTurnoJugador = false;
    actualizarEstadoBotones();
    
    // Esperar un momento y ejecutar el turno del enemigo
    setTimeout(turnoEnemigo, 1500);
}

// Función para realizar movimiento especial
function realizarMovimientoEspecial() {
    if (!combateActual || !combateActual.esTurnoJugador) return;

    gestorSonidos.play('ataque');
    
    // Implementar lógica del movimiento especial
    // Por ahora, hace un ataque más fuerte con 50% más de daño
    const danioEspecial = Math.floor(estadoDelJuego.jugador.calcularDanio() * 1.5);
    const danioRealizado = combateActual.enemigo.recibirDanio(danioEspecial);
    
    const mensaje = `¡${estadoDelJuego.jugador.nombre} usa un movimiento especial y causa ${danioRealizado} de daño a ${combateActual.enemigo.nombre}!`;
    combateActual.registro.push(mensaje);
    
    // Mostrar mensaje del movimiento especial
    document.getElementById('battle-message').textContent = mensaje;
    
    // Actualizar barras de vida
    actualizarBarrasVida();
    
    // Verificar si el enemigo ha muerto
    if (combateActual.enemigo.estaMuerto()) {
        finalizarBatalla('victoria');
        return;
    }
    
    // Cambiar turno
    combateActual.esTurnoJugador = false;
    actualizarEstadoBotones();
    
    // Esperar un momento y ejecutar el turno del enemigo
    setTimeout(turnoEnemigo, 1500);
}

// Función para el turno del enemigo
function turnoEnemigo() {
    if (!combateActual) return;
    
    // El enemigo realiza su acción
    const resultadoAccion = combateActual.enemigoTurno();
    
    // Mostrar mensaje de la acción del enemigo
    document.getElementById('battle-message').textContent = resultadoAccion.registro;
    
    // Actualizar barras de vida
    actualizarBarrasVida();
    
    // Verificar si el jugador ha muerto
    if (resultadoAccion.jugadorMuerto) {
        finalizarBatalla('derrota');
        return;
    }
    
    // Devolver el turno al jugador
    combateActual.esTurnoJugador = true;
    actualizarEstadoBotones();
}

// Función para huir de la batalla
function huirDeBatalla() {
    const probabilidadHuida = 0.7; // 70% de probabilidad de huir
    
    if (Math.random() < probabilidadHuida) {
        document.getElementById('battle-message').textContent = '¡Has huido de la batalla con éxito!';
        
        // Esperar un momento y volver al lobby
        setTimeout(() => {
            combateActual = null;
            cambiarPantalla('lobby-screen');
        }, 1500);
    } else {
        document.getElementById('battle-message').textContent = '¡No has podido huir!';
        
        // Perder el turno
        combateActual.esTurnoJugador = false;
        actualizarEstadoBotones();
        
        // Turno del enemigo
        setTimeout(turnoEnemigo, 1500);
    }
}

// Función para finalizar la batalla
function finalizarBatalla(resultado) {
    // Guardar resultados para la pantalla de resultados
    if (resultado === 'victoria') {
        const resultadosCombate = combateActual.finalCombate();
        
        // Configurar la pantalla de resultados
        document.getElementById('battle-result-title').textContent = '¡Victoria!';
        document.getElementById('experience-gained').textContent = combateActual.enemigo.experienciaDevuelve;
        document.getElementById('gold-earned').textContent = combateActual.enemigo.dineroDevuelve;
        
        // Verificar si el jugador subió de nivel
        const nivelUpNotificacion = document.getElementById('level-up-notification');
        if (resultadosCombate && resultadosCombate.subirNivel) {
            nivelUpNotificacion.classList.remove('hidden');
            document.getElementById('new-level').textContent = estadoDelJuego.jugador.nivel;
        } else {
            nivelUpNotificacion.classList.add('hidden');
        }
        
        // Guardar el progreso del juego
        estadoDelJuego.progresoJuego.enemigosDerrotados.push(combateActual.enemigo.nombre);
        estadoDelJuego.guardarPartida();
        
        // Esperar un momento y mostrar la pantalla de resultados
        setTimeout(() => {
            cambiarPantalla('battle-results-screen');
        }, 2000);
    } else {
        // En caso de derrota
        document.getElementById('battle-message').textContent = '¡Has sido derrotado!';
        gestorSonidos.play('muerte');
        // Esperar un momento y volver al lobby
        setTimeout(() => {
            // Curar al jugador un poco para que pueda seguir jugando
            estadoDelJuego.jugador.estadisticas.vida = Math.floor(estadoDelJuego.jugador.vidaMaxima * 0.5);
            estadoDelJuego.guardarPartida();
            combateActual = null;
            cambiarPantalla('lobby-screen');
        }, 2000);
    }
}

// Event listener para el botón de continuar después de la batalla
document.getElementById('continue-after-battle')?.addEventListener('click', () => {
    combateActual = null;
    cambiarPantalla('lobby-screen');
});