class Combate {
    constructor (jugador, enemigo){
        this.jugador = jugador;
        this.enemigo = enemigo;
        this.turno = 0;
        this.registro = []; //para que salga por pantalla lo que está pasando (quien ataca, el daño, si alguien se defiende...)
        this.esTurnoJugador = this.determinarPrimerTurno(); 
    }

    determinarPrimerTurno(){
        return this.jugador.velocidad >= this.enemigo.velocidad; //comprueba quié de lo dos tiene más velocidad, y el que tenga más empieza
    }

    jugadorAtaca() {
        const danio = this.jugador.calcularDanio();
        const danioRealizado = this.enemigo.recibirDanio(danio);

        const entradaRegistro = `${this.jugador.nombre} ataca a ${this.enemigo.nombre} y le hace ${danioRealizado} de daño`;
        this.registro.push(entradaRegistro);

        return{
            danio : danioRealizado,
            registo : entradaRegistro,
            enemigoMuerto: this.enemigo.estaMuerto()
        }
    }

    jugadorDefiende(){
        const boostDefensa = this.jugador.defenderse();

        const entradaRegistro = `${this.jugador.nombre} se defiende y aumenta su defensa en ${boostDefensa}`;
        this.registro.push(entradaRegistro);

        return{
            boostDefensa : boostDefensa,
            registro : entradaRegistro
        }
    }

    enemigoTurno(){
        this.enemigo.reseteoDefensa();

        const accion = this.enemigo.seleccionarAccion(this.jugador.estadisticas.vida);
    
        if (accion === "atacar"){
            const danio = this.enemigo.calcularDanio();
            const danioRealizado = this.jugador.recibirDanio(danio);
    
            const entradaRegistro = `${this.enemigo.nombre} ataca a ${this.jugador.nombre} y le hace ${danioRealizado} de daño`;
            this.registro.push(entradaRegistro);
    
            return{
                action: "atacar",
                danio : danioRealizado,
                registro : entradaRegistro,
                jugadorMuerto : this.jugador.siHaMuerto()
            }
        }else{
            const boostDefensa = this.enemigo.defenderse();

            const entradaRegistro = `${this.enemigo.nombre} se defiende y aumenta su defensa en ${boostDefensa}`;
            this.registro.push(entradaRegistro);

            return{
                action: "defender",
                boostDefensa : boostDefensa,
                registro : entradaRegistro
            }
        }
    }

    finalCombate() {
        if (this.enemigo.estaMuerto()){
            this.jugador.experiencia += this.enemigo.experienciaDevuelve;
            this.jugador.dinero += this.enemigo.dineroDevuelve;


            if(this.jugador.experiencia >= this.jugador.nivel * 100){
                this.jugador.subirNivel();

                return{
                    resultado: "ganador",
                    subirNivel: true,
                    experienciaGanada : this.enemigo.experienciaDevuelve,
                    dineroGanado : this.enemigo.dineroDevuelve
                }
            }
        }else{
            return {
                resultado: "perdedor"
            }
        }
    }
}