class Pocion {
    constructor(id, nombre, vidaRecuperada, precio, descripcion, peso = 1) {
        this.id = id;
        this.nombre = nombre;
        this.vidaRecuperada = vidaRecuperada;
        this.precio = precio;
        this.descripcion = descripcion;
        this.peso = peso;
        this.tipo = 'pocion'; // Para identificar que es una poción
    }
    
    usar(jugador) {
        const vidaAnterior = jugador.estadisticas.vida;
        jugador.curarse(this.vidaRecuperada);
        const vidaRecuperada = jugador.estadisticas.vida - vidaAnterior;
        
        return {
            exito: true,
            mensaje: `Has usado ${this.nombre} y recuperado ${vidaRecuperada} puntos de vida.`,
            vidaRecuperada: vidaRecuperada
        };
    }
}