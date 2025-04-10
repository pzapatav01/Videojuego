class Arma {
    //se hace el constructor directamente porquee javaScript es no tipado(no hay que ponerle tipo a la variable)
    constructor (id, nombre, ataque, precio, descripcion, peso){
        this.id = id;
        this.nombre = nombre;
        this.ataque = ataque;
        this.precio = precio;
        this.descripcion = descripcion;
        this.peso = peso;
        this.tipo = 'arma'; // Para identificar que es un arma
    }
}