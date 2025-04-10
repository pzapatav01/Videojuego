// Función para inicializar la pantalla de bienvenida
function inicializarPantallaBienvenida() {
    // Verificar si hay una partida guardada
    const hayPartidaGuardada = localStorage.getItem("datosJuego") !== null;
    
    // Habilitar o deshabilitar el botón de continuar según corresponda
    const botonContinuar = document.getElementById('continue-game');
    if (botonContinuar) {
        botonContinuar.disabled = !hayPartidaGuardada;
        botonContinuar.classList.toggle('disabled', !hayPartidaGuardada);
    }
    
    // Habilitar o deshabilitar el botón de eliminar según corresponda
    const botonEliminar = document.getElementById('delete-game');
    if (botonEliminar) {
        botonEliminar.disabled = !hayPartidaGuardada;
        botonEliminar.classList.toggle('disabled', !hayPartidaGuardada);
    }
}