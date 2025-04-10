class Inventario {
    constructor(capacidadMaxima) {
        this.items = [];
        this.capacidadMaxima = capacidadMaxima;
        this.pesoMaximo = 50;
        this.pesoActual = 0;
    }

    agregarItem(item) {
        if (this.items.length < this.capacidadMaxima && 
            this.pesoActual + (item.peso || 0) <= this.pesoMaximo) {
            this.items.push(item);
            this.pesoActual += item.peso || 0;
            return true;
        }
        return false;
    }

    eliminarItem(itemId) {
        const indice = this.items.findIndex(item => item.id === itemId);
        if (indice !== -1) {
            this.items.splice(indice, 1);
            return true;
        }
        return false;
    }

    buscarItem(itemId) {
        return this.items.find(item => item.id === itemId);
    }

    tieneEspacio() {
        return this.items.length < this.capacidadMaxima;
    }

    obtenerEspacioRestante() {
        return this.capacidadMaxima - this.items.length;
    }

    calcularPesoTotal() {
        return this.items.reduce((total, item) => total + item.peso, 0);
    }

    obtenerItems() {
        return this.items;
    }

    obtenerPesoMaximo() {
        return this.pesoMaximo;
    }
    
    aumentarCapacidadMaxima(cantidad) {
        this.capacidadMaxima += cantidad;
    }
    
    aumentarPesoMaximo(cantidad) {
        this.pesoMaximo += cantidad;
    }
}