class estadoJuego {
  constructor() {
    this.jugador = null;
    this.inventario = null;
    this.progresoJuego = {
      enemigosDerrotados: [],
      areaActual: "ciudad",
    };
  }

  guardarPartida() {
    const datosJuego = {
      jugador: this.jugador,
      inventario: this.inventario,
      progresoJuego: this.progresoJuego,
    };

    localStorage.setItem("datosJuego", JSON.stringify(datosJuego));
  }

  cargarPartida() {
    const datosGuardados = localStorage.getItem("datosJuego");
    if (datosGuardados) {
        const datos = JSON.parse(datosGuardados);
        
        // Recrear el jugador como una instancia de Jugador
        if (datos.jugador) {
            const jugadorTemp = new Jugador(
                datos.jugador.nombre,
                datos.jugador.apariencia
            );
            
            // Copiar los atributos del jugador guardado
            jugadorTemp.nivel = datos.jugador.nivel;
            jugadorTemp.experiencia = datos.jugador.experiencia;
            jugadorTemp.dinero = datos.jugador.dinero;
            jugadorTemp.estadisticas = datos.jugador.estadisticas;
            jugadorTemp.vidaMaxima = datos.jugador.vidaMaxima;
            jugadorTemp.armaEquipada = datos.jugador.armaEquipada;
            jugadorTemp.avatar = datos.jugador.avatar;
            
            // Reemplazar el jugador guardado con el nuevo objeto de clase Jugador
            datos.jugador = jugadorTemp;
        }
        
        // Recrear el inventario como instancia de Inventario
        if (datos.inventario) {
            const inventarioTemp = new Inventario(
                datos.inventario.capacidadMaxima || 20
            );
            
            // Restaurar los items
            if (Array.isArray(datos.inventario.items)) {
                datos.inventario.items.forEach((item) =>
                    inventarioTemp.agregarItem(item)
                );
            }
            
            datos.inventario = inventarioTemp;
        }
        
        // Actualizar el estado del juego
        Object.assign(this, datos);
        return true;
    }
    return false;
}

  borrarPartida() {
    localStorage.removeItem("datosJuego");

    this.jugador = null;
    this.inventario = null;
    this.progresoJuego = {
      enemigosDerrotados: [],
      areaActual: "ciudad",
    };
  }

  crearNuevoJugador(nombre, apariencia, estadisticas, configuracionPersonaje) {
    this.jugador = new Jugador(nombre, apariencia, estadisticas, configuracionPersonaje);
    
    // Si es personaje personalizado, se maneja distinto
    if (apariencia === 'custom') {
        this.jugador.setAvatar('custom');
    } else {
        this.jugador.setAvatar(apariencia);
    }

    if (estadisticas) {
        this.jugador.estadisticas = estadisticas;
    }

    this.inventario = new Inventario(10);
    this.inventario.pesoMaximo = 50;

    const armaInicial = new Arma(
        1,
        "Espada de madera",
        5,
        0,
        "Una espada de madera básica",
        2
    );

    this.inventario.agregarItem(armaInicial);
    this.jugador.equiparArma(armaInicial);

    this.guardarPartida();
}
}
