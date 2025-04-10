// Variables para el sistema de creación de personaje
let puntosRestantes = 20;
let estadisticasPersonaje = {
    vida: 10,
    ataque: 5,
    defensa: 3,
    velocidad: 2
};
let aparienciaSeleccionada = 'warrior';
let armaInicialSeleccionada = 1;
// Nueva variable para guardar la ruta de la imagen seleccionada
let avatarSeleccionado = 'assets/characters/aslan.gif';

// Función para inicializar la pantalla de creación de personaje
function inicializarPantallaCreacionPersonaje() {
    // Resetear valores
    puntosRestantes = 20;
    estadisticasPersonaje = {
        vida: 10,
        ataque: 5,
        defensa: 3,
        velocidad: 2
    };
    aparienciaSeleccionada = 'warrior';
    avatarSeleccionado = 'assets/characters/aslan.gif';
    
    // Actualizar los valores en la interfaz
    document.getElementById('health-value').textContent = estadisticasPersonaje.vida;
    document.getElementById('attack-value').textContent = estadisticasPersonaje.ataque;
    document.getElementById('defense-value').textContent = estadisticasPersonaje.defensa;
    document.getElementById('speed-value').textContent = estadisticasPersonaje.velocidad;
    document.getElementById('points-remaining').textContent = puntosRestantes;
    
    // Configurar opciones de apariencia
    const opcionesApariencia = document.querySelectorAll('.appearance-option');
    opcionesApariencia.forEach(opcion => {
        opcion.classList.remove('selected');
        opcion.addEventListener('click', () => {
            // Eliminar selección previa
            opcionesApariencia.forEach(o => o.classList.remove('selected'));
            // Marcar como seleccionada
            opcion.classList.add('selected');
            // Guardar tipo de apariencia
            aparienciaSeleccionada = opcion.dataset.appearance;
            // Guardar ruta de la imagen del avatar
            avatarSeleccionado = opcion.querySelector('img').src;
            // Reproducir sonido
            gestorSonidos.play('boton');
        });
    });
    
    // Seleccionar la última opción (Aslan) por defecto
    opcionesApariencia[opcionesApariencia.length - 1].classList.add('selected');
    
    // Configurar opciones de arma inicial
    const opcionesArma = document.querySelectorAll('.weapon-option');
    opcionesArma.forEach(opcion => {
        opcion.classList.remove('selected');
        opcion.addEventListener('click', () => {
            // Eliminar selección previa
            opcionesArma.forEach(o => o.classList.remove('selected'));
            // Marcar como seleccionada
            opcion.classList.add('selected');
            // Guardar valor
            armaInicialSeleccionada = parseInt(opcion.dataset.weapon);
            // Reproducir sonido
            gestorSonidos.play('boton');
        });
    });
    
    // Seleccionar la primera opción por defecto
    opcionesArma[0].classList.add('selected');
    
    // Configurar botones para ajustar estadísticas
    configurarBotonesEstadisticas();
    
    // Configurar botón de creación de personaje
    document.getElementById('create-character').addEventListener('click', crearPersonaje);
}

// Función para configurar los botones de incremento y decremento de estadísticas
function configurarBotonesEstadisticas() {
    // Configurar botones de incremento
    document.querySelectorAll('.stat-increase').forEach(boton => {
        boton.addEventListener('click', () => {
            const statName = boton.dataset.stat;
            if (puntosRestantes > 0) {
                estadisticasPersonaje[statName]++;
                puntosRestantes--;
                actualizarInterfazEstadisticas();
            }
        });
    });
    
    // Configurar botones de decremento
    document.querySelectorAll('.stat-decrease').forEach(boton => {
        boton.addEventListener('click', () => {
            const statName = boton.dataset.stat;
            // Valores mínimos para cada estadística
            const minValues = {
                vida: 10,
                ataque: 5,
                defensa: 3,
                velocidad: 2
            };
            
            if (estadisticasPersonaje[statName] > minValues[statName]) {
                estadisticasPersonaje[statName]--;
                puntosRestantes++;
                actualizarInterfazEstadisticas();
            }
        });
    });
}

// Función para actualizar la interfaz con los valores actuales de estadísticas
function actualizarInterfazEstadisticas() {
    document.getElementById('health-value').textContent = estadisticasPersonaje.vida;
    document.getElementById('attack-value').textContent = estadisticasPersonaje.ataque;
    document.getElementById('defense-value').textContent = estadisticasPersonaje.defensa;
    document.getElementById('speed-value').textContent = estadisticasPersonaje.velocidad;
    document.getElementById('points-remaining').textContent = puntosRestantes;
    
    // Habilitar o deshabilitar el botón de creación según si quedan puntos
    const crearBtn = document.getElementById('create-character');
    crearBtn.disabled = puntosRestantes > 0;
    crearBtn.classList.toggle('disabled', puntosRestantes > 0);
}

// Función para crear un nuevo personaje
function crearPersonaje() {
    // Verificar que no queden puntos por asignar
    if (puntosRestantes > 0) {
        alert('Debes asignar todos los puntos disponibles antes de crear tu personaje.');
        return;
    }
    
    // Obtener el nombre del personaje
    const nombrePersonaje = document.getElementById('character-name').value.trim();
    if (!nombrePersonaje) {
        alert('Debes ingresar un nombre para tu personaje.');
        return;
    }
    
    // Crear el personaje en el estado del juego
    estadoDelJuego.crearNuevoJugador(nombrePersonaje, aparienciaSeleccionada, estadisticasPersonaje);
    
    // Establecer el avatar seleccionado
    estadoDelJuego.jugador.avatarUrl = avatarSeleccionado;
    
    // Equipar el arma inicial seleccionada
    const armaInicial = datosJuego.armas.find(arma => arma.id === armaInicialSeleccionada);
    if (armaInicial) {
        const armaObj = new Arma(
            armaInicial.id,
            armaInicial.nombre,
            armaInicial.ataque,
            armaInicial.precio,
            armaInicial.descripcion,
            armaInicial.peso || 2
        );
        estadoDelJuego.jugador.equiparArma(armaObj);
    }
    
    // Guardar el estado del juego
    estadoDelJuego.guardarPartida();
    
    // Cambiar a la pantalla del lobby
    cambiarPantalla('lobby-screen');
}