class Enemigo {
  constructor(
    nombre,
    nivel,
    vida,
    ataque,
    defensa,
    velocidad,
    experiencia,
    dinero,
    avatar
  ) {
    this.nombre = nombre;
    this.nivel = nivel;
    this.estadisticas = {
      vida: vida,
      ataque: ataque,
      defensa: defensa,
      velocidad: velocidad,
    };
    this.vidaMaxima = vida;
    this.experienciaDevuelve = experiencia;
    this.dineroDevuelve = dinero;
    this.avatar = avatar || `${nombre.toLowerCase()}.gif`; //para que se le asigne una imagen al enemigo si o si en le que caso de que no tenga
  }

  calcularDanio() {
    const danioBase = this.estadisticas.ataque;
    const randomFactor = 0.9 + Math.random() * 0.2;
    return Math.floor(danioBase * randomFactor);
  }

  recibirDanio(cantidad) {
    const danioActual = Math.max(1, cantidad - (this.estadisticas.defensa - 2));

    this.estadisticas.vida -= danioActual;

    return danioActual;
  }

  seleccionarAccion(vidaJugador) { //esto es lo que le va a pasar al jugador según las estadísticas
    if (this.estadisticas.vida < this.vidaMaxima * 0.3) {
      return Math.random() > 0.6 ? "defender" : "atacar"; // 0 y 1, 0.6 es 60% de probabilidad -> si sale mas de 60% se defiende y si no ataca
    } else if (vidaJugador < 20) {
      return "atacar";
    } else {
      return Math.random() > 0.2 ? "atacar" : "defender"; // 0 y 1, 0.2 es 20% de probabilidad -> si sale mas de 20% se defiende y si no ataca
    }
  }

  defenderse() {
    this.boostDefensaTemporal = this.estadisticas.defensa * 0.5;
    return this.boostDefensaTemporal;
  }

  reseteoDefensa() {
    this.boostDefensaTemporal = 0;
  }

  estaMuerto() {
    return this.estadisticas.vida <= 0;
  }

  getAvatar() {
    return this.avatar;
  }

  setAvatar(avatar) {
    this.avatar = avatar;
  }
}
