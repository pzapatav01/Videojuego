class Jugador {
    constructor(nombre, apariencia, estadisticas, configuracionPersonaje){
        this.nombre = nombre;
        this.apariencia = apariencia;
        this.nivel = 1;
        this.experiencia = 0;
        this.dinero = 100;
        this.estadisticas = estadisticas || { //primero te metes dentro de la segunda parte y en el caso de que el usuario modifique algo se mete dentro de la opción "estadistica" 
            vida: 100, //este es el máximo
            ataque: 10,
            defensa: 5,
            velocidad: 7
        };
        this.vidaMaxima = this.estadisticas.vida;
        this.armaEquipada = null;
        this.avatar = null; //porque al principio no tiene avatar

    }


    subirNivel(){
        this.nivel++;
        this.estadisticas.vida += 10;
        this.estadisticas.ataque += 2;
        this.estadisticas.defensa += 1;
        this.estadisticas.velocidad += 1;
        this.vidaMaxima = this.estadisticas.vida;

        this.estadisticas.vida = this.vidaMaxima;
    }

    //el arma ya no es null, si no que va a ser la que equipe (sellecione) el usuario
    equiparArma(arma){
        this.armaEquipada = arma;
    }

    // Cuando pega el jugador, es decir, el daño que va hacer
    calcularDanio(){
        const ataqueArma = this.armaEquipada ? this.armaEquipada.ataque : 0;

        const danioBase = this.estadisticas.ataque + ataqueArma;

        const randomFactor = 0.8 + Math.random() * 0.4; //para el daño que le haga que sea aleatorio. Math.random() da valores entre 0 y 1

        return Math.floor(danioBase * randomFactor); //lo de Math.floor es para que no salgan muchos decimales cuando devuelva el daño
    }

    // Cuando recibe danio
    recibirDanio(cantidad){
        const danioActual = Math.max(1, cantidad - (this.estadisticas.defensa / 2)); //esto es para que independientemente de las defensas del jugador, 
        // siempre sufra algún tipo de daño por parte del enemigo (mínimo 1)
        this.estadisticas.vida -= danioActual; // a la vida le quitamos el daño calculado arriba
        return danioActual;
    }


    defenderse(){
        this.boostDefensaTemporal = this.estadisticas.defensa * 0.5; //boost es un aumento de parámetro (subirte un poco las estadísticas para que no pierdas, pero el jugador sigue sufriendo daño), 
        // que te da el juego porque has gastado tu turno em defenderte
        return this.boostDefensaTemporal;
    }

    resetearDefensa(){
        this.boostDefensaTemporal = 0; //para que dejen de subirte las estadísticas en el momento en el que deje de defenderse el jugador
    }

    siHaMuerto(){
        return this.estadisticas.vida <= 0; //si tiene 0 o menos de vida EVIDENTEMENTE esta muerto. 
    }

    curarse(cantidad){
        this.estadisticas.vida = Math.min(this.vidaMaxima, this.estadisticas.vida + cantidad); //Math.min esto es para que no puedas curarte más de el tope de vida que tiene establecida el jugador
    }

    getAvatar(){
        return this.avatar //esto develve la imagen del jugador
    }

    setAvatar(avatar){
        this.avatar = avatar; //para cambiar el avatar (el jugador)
    }

}