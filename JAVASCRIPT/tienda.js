class Tienda {
    constructor() {
        this.armasEnVenta = [];
        this.pocionesEnVenta = [];
    }

    cargarItems(armas, pociones) {
        this.armasEnVenta = armas || [];
        this.pocionesEnVenta = pociones || [];
        this.itemsEnVenta = [...this.armasEnVenta]; // Para compatibilidad con el código existente
    }

    venderItem(itemId, jugador, inventario) {
        // Buscar primero en armas
        let item = this.armasEnVenta.find(item => item.id === itemId);
        let esPocion = false;
        
        // Si no lo encuentra en armas, buscar en pociones
        if (!item) {
            item = this.pocionesEnVenta.find(item => item.id === itemId);
            esPocion = true;
        }

        if (!item) {
            return {exito: false, mensaje: 'El ítem no existe'};
        }

        if (jugador.dinero < item.precio) {
            return {exito: false, mensaje: 'No tienes suficiente dinero'};
        }

        if (!inventario.tieneEspacio()) {
            return {exito: false, mensaje: 'No tienes espacio en el inventario'};
        }

        const pesItem = item.peso || 0;
        if (inventario.pesoActual + pesItem > inventario.pesoMaximo) {
            return {exito: false, mensaje: `El ítem es demasiado pesado. Peso disponible: ${inventario.obtenerPesoRestante().toFixed(1)} kg`};
        }

        let nuevoItem;
        
        if (esPocion) {
            // Crear una nueva instancia de poción
            nuevoItem = new Pocion(
                item.id,
                item.nombre,
                item.vidaRecuperada,
                item.precio,
                item.descripcion,
                item.peso
            );
        } else {
            // Crear una nueva instancia de arma
            nuevoItem = new Arma(
                item.id,
                item.nombre,
                item.ataque,
                item.precio,
                item.descripcion,
                item.peso
            );
        }

        jugador.dinero -= item.precio;
        inventario.agregarItem(nuevoItem);

        return {exito: true, mensaje: `Has comprado ${item.nombre} por ${item.precio} monedas.`};
    }
}