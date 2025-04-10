// Instancia de la tienda del juego
const tiendaJuego = new Tienda();

// Función para inicializar la pantalla de la tienda
function inicializarPantallaTienda() {
    // Cargar los items en venta desde los datos del juego
    tiendaJuego.cargarItems(datosJuego.armas, datosJuego.pociones);

    if (!estadoDelJuego.inventario || !(estadoDelJuego.inventario instanceof Inventario)) {
        console.warn("El inventario no está correctamente inicializado. Creando nueva instancia.");
        estadoDelJuego.inventario = new Inventario(20); // Asumiendo capacidad máxima de 20
    }
    
    // Actualizar la información del jugador en la tienda
    document.getElementById('shop-player-gold').textContent = estadoDelJuego.jugador.dinero;
    document.getElementById('shop-player-capacity').textContent = 
        `${estadoDelJuego.inventario.pesoActual.toFixed(1)}/${estadoDelJuego.inventario.pesoMaximo} kg`;
    
    // Generar las tarjetas de los items en venta
    generarTarjetasItems();
    
    // Configurar pestañas de la tienda
    document.getElementById('tab-armas').addEventListener('click', () => {
        document.getElementById('tab-armas').classList.add('active');
        document.getElementById('tab-pociones').classList.remove('active');
        document.querySelector('.shop-items').classList.remove('show-pociones');
        document.querySelector('.shop-items').classList.add('show-armas');
    });
    
    document.getElementById('tab-pociones').addEventListener('click', () => {
        document.getElementById('tab-pociones').classList.add('active');
        document.getElementById('tab-armas').classList.remove('active');
        document.querySelector('.shop-items').classList.remove('show-armas');
        document.querySelector('.shop-items').classList.add('show-pociones');
    });
    
    // Configurar el botón para volver al lobby
    document.getElementById('back-to-lobby-from-shop').addEventListener('click', () => {
        gestorSonidos.play('boton');
        cambiarPantalla('lobby-screen');
    });
}

// Función para generar las tarjetas de los items en venta
function generarTarjetasItems() {
    const contenedorItems = document.querySelector('.shop-items');
    
    // Limpiar el contenedor
    contenedorItems.innerHTML = '';
    
    // Crear contenedor para armas
    const contenedorArmas = document.createElement('div');
    contenedorArmas.className = 'items-section armas';
    
    // Crear contenedor para pociones
    const contenedorPociones = document.createElement('div');
    contenedorPociones.className = 'items-section pociones';
    
    // Generar tarjetas de armas
    generarTarjetasArmas(contenedorArmas);
    
    // Generar tarjetas de pociones
    generarTarjetasPociones(contenedorPociones);
    
    // Añadir ambos contenedores al contenedor principal
    contenedorItems.appendChild(contenedorArmas);
    contenedorItems.appendChild(contenedorPociones);
    
    // Por defecto, mostrar las armas
    contenedorItems.classList.add('show-armas');
}

// Función para generar tarjetas de armas
function generarTarjetasArmas(contenedor) {
    // Filtrar armas según el nivel del jugador (mostrar solo las que puede usar)
    const armasFiltradas = tiendaJuego.armasEnVenta.filter(item => {
        // Supongamos que cada 2 niveles del jugador se desbloquea un nuevo tier de armas
        return Math.ceil(item.id / 2) <= Math.ceil(estadoDelJuego.jugador.nivel / 2);
    });
    
    // Generar una tarjeta para cada arma
    armasFiltradas.forEach(item => {
        // Verificar si el jugador ya tiene este item en su inventario
        let yaComprado = false;
        
        if (estadoDelJuego.inventario) {
            // Si tiene el método buscarItem, úsalo
            if (typeof estadoDelJuego.inventario.buscarItem === 'function') {
                yaComprado = estadoDelJuego.inventario.buscarItem(item.id) !== undefined;
            } 
            // Si no tiene el método pero sí tiene items, búscalo manualmente
            else if (Array.isArray(estadoDelJuego.inventario.items)) {
                yaComprado = estadoDelJuego.inventario.items.some(i => i.id === item.id);
            }
        }
        
        // Crear la tarjeta
        const tarjeta = document.createElement('div');
        tarjeta.className = 'shop-item';
        if (yaComprado) tarjeta.classList.add('owned');
        
        // Configurar el contenido de la tarjeta
        tarjeta.innerHTML = `
            <div class="item-info">
                <h3>${item.nombre}</h3>
                <p>Ataque: +${item.ataque}</p>
                <p>Precio: ${item.precio} monedas</p>
                <p>Peso: ${item.peso} kg</p>
                <p class="item-description">${item.descripcion}</p>
            </div>
            <div class="item-actions">
                <button class="buy-button" data-item-id="${item.id}" ${yaComprado || estadoDelJuego.jugador.dinero < item.precio ? 'disabled' : ''}>
                    ${yaComprado ? 'Comprado' : 'Comprar'}
                </button>
            </div>
        `;
        
        // Añadir evento al botón de compra
        const botonCompra = tarjeta.querySelector('.buy-button');
        if (!yaComprado && estadoDelJuego.jugador.dinero >= item.precio) {
            botonCompra.addEventListener('click', () => comprarItem(item.id));
        }
        
        // Añadir la tarjeta al contenedor
        contenedor.appendChild(tarjeta);
    });
}

// Función para generar tarjetas de pociones
function generarTarjetasPociones(contenedor) {
    // Generar una tarjeta para cada poción
    tiendaJuego.pocionesEnVenta.forEach(item => {
        // Crear la tarjeta
        const tarjeta = document.createElement('div');
        tarjeta.className = 'shop-item potion-item';
        
        // Configurar el contenido de la tarjeta
        tarjeta.innerHTML = `
            <div class="item-info">
                <h3>${item.nombre}</h3>
                <p>Recupera: ${item.vidaRecuperada} HP</p>
                <p>Precio: ${item.precio} monedas</p>
                <p>Peso: ${item.peso} kg</p>
                <p class="item-description">${item.descripcion}</p>
            </div>
            <div class="item-actions">
                <button class="buy-button" data-item-id="${item.id}" ${estadoDelJuego.jugador.dinero < item.precio ? 'disabled' : ''}>
                    Comprar
                </button>
            </div>
        `;
        
        // Añadir evento al botón de compra
        const botonCompra = tarjeta.querySelector('.buy-button');
        if (estadoDelJuego.jugador.dinero >= item.precio) {
            botonCompra.addEventListener('click', () => comprarItem(item.id));
        }
        
        // Añadir la tarjeta al contenedor
        contenedor.appendChild(tarjeta);
    });
}

// Función para comprar un item
function comprarItem(itemId) {
    gestorSonidos.play('compra');
    // Intentar comprar el item
    const resultado = tiendaJuego.venderItem(itemId, estadoDelJuego.jugador, estadoDelJuego.inventario);
    
    // Mostrar mensaje con el resultado
    alert(resultado.mensaje);
    
    if (resultado.exito) {
        // Actualizar el oro del jugador y capacidad de inventario
        document.getElementById('shop-player-gold').textContent = estadoDelJuego.jugador.dinero;
        document.getElementById('shop-player-capacity').textContent = 
            `${estadoDelJuego.inventario.pesoActual.toFixed(1)}/${estadoDelJuego.inventario.pesoMaximo} kg`;
        
        // Actualizar las tarjetas de items
        generarTarjetasItems();
        
        // Guardar el estado del juego
        estadoDelJuego.guardarPartida();
    }
}