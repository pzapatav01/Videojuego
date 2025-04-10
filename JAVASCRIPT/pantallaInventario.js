// Función para inicializar la pantalla de inventario
function inicializarPantallaInventario() {
    // Verificar que existe un jugador e inventario
    if (!estadoDelJuego.jugador || !estadoDelJuego.inventario) {
        alert('Error: No se encontró un jugador o inventario válido.');
        cambiarPantalla('lobby-screen');
        return;
    }
    
    // Actualizar información del inventario
    actualizarInfoInventario();
    
    // Mostrar los items del inventario
    mostrarItemsInventario();
    
    // Configurar botón para volver al lobby
    document.getElementById('back-to-lobby-from-inventory').addEventListener('click', () => {
        gestorSonidos.play('boton');
        cambiarPantalla('lobby-screen');
    });
}

// Función para actualizar información del inventario
function actualizarInfoInventario() {
    const inventario = estadoDelJuego.inventario;
    const jugador = estadoDelJuego.jugador;
    
    // Actualizar espacio disponible
    document.getElementById('inventory-capacity').textContent = 
        `${inventario.items.length}/${inventario.capacidadMaxima}`;
    
    // Actualizar peso del inventario
    document.getElementById('inventory-weight').textContent = 
        `${inventario.pesoActual.toFixed(1)}/${inventario.pesoMaximo} kg`;
    
    // Actualizar arma equipada
    const armaEquipada = jugador.armaEquipada;
    if (armaEquipada) {
        document.getElementById('equipped-weapon-name').textContent = armaEquipada.nombre;
        document.getElementById('equipped-weapon-attack').textContent = `+${armaEquipada.ataque}`;
        document.getElementById('equipped-weapon-description').textContent = armaEquipada.descripcion;
    } else {
        document.getElementById('equipped-weapon-name').textContent = "Ninguna";
        document.getElementById('equipped-weapon-attack').textContent = "+0";
        document.getElementById('equipped-weapon-description').textContent = "";
    }
}

// Función para mostrar los items del inventario
function mostrarItemsInventario() {
    const contenedorItems = document.querySelector('.inventory-items');
    
    // Limpiar el contenedor
    contenedorItems.innerHTML = '';
    
    // Verificar si hay items
    if (estadoDelJuego.inventario.items.length === 0) {
        contenedorItems.innerHTML = '<p class="empty-inventory">Tu inventario está vacío.</p>';
        return;
    }
    
    // Mostrar cada item
    estadoDelJuego.inventario.items.forEach(item => {
        const estaEquipado = item.tipo === 'arma' && estadoDelJuego.jugador.armaEquipada && 
                             estadoDelJuego.jugador.armaEquipada.id === item.id;
        
        // Crear la tarjeta del item
        const tarjeta = document.createElement('div');
        tarjeta.className = 'inventory-item';
        if (estaEquipado) tarjeta.classList.add('equipped');
        if (item.tipo === 'pocion') tarjeta.classList.add('potion-item');
        
        // Configurar el contenido según el tipo de item
        if (item.tipo === 'arma') {
            tarjeta.innerHTML = `
                <div class="item-info">
                    <h3>${item.nombre}</h3>
                    <p>Ataque: +${item.ataque}</p>
                    <p>Peso: ${item.peso} kg</p>
                    <p class="item-description">${item.descripcion}</p>
                </div>
                <div class="item-actions">
                    <button class="equip-button" data-item-id="${item.id}" ${estaEquipado ? 'disabled' : ''}>
                        ${estaEquipado ? 'Equipado' : 'Equipar'}
                    </button>
                    <button class="discard-button" data-item-id="${item.id}" ${estaEquipado ? 'disabled' : ''}>
                        Descartar
                    </button>
                </div>
            `;
            
            // Añadir eventos a los botones de armas
            const botonEquipar = tarjeta.querySelector('.equip-button');
            botonEquipar.addEventListener('click', () => equiparItem(item.id));
            
            const botonDescartar = tarjeta.querySelector('.discard-button');
            botonDescartar.addEventListener('click', () => descartarItem(item.id));
        } else if (item.tipo === 'pocion') {
            tarjeta.innerHTML = `
                <div class="item-info">
                    <h3>${item.nombre}</h3>
                    <p>Recupera: ${item.vidaRecuperada} HP</p>
                    <p>Peso: ${item.peso} kg</p>
                    <p class="item-description">${item.descripcion}</p>
                </div>
                <div class="item-actions">
                    <button class="use-button" data-item-id="${item.id}">
                        Usar
                    </button>
                    <button class="discard-button" data-item-id="${item.id}">
                        Descartar
                    </button>
                </div>
            `;
            
            // Añadir eventos a los botones de pociones
            const botonUsar = tarjeta.querySelector('.use-button');
            botonUsar.addEventListener('click', () => usarPocion(item.id));
            
            const botonDescartar = tarjeta.querySelector('.discard-button');
            botonDescartar.addEventListener('click', () => descartarItem(item.id));
        }
        
        // Añadir la tarjeta al contenedor
        contenedorItems.appendChild(tarjeta);
    });
}

// Función para equipar un item
function equiparItem(itemId) {
    gestorSonidos.play('boton');
    // Buscar el item en el inventario
    const item = estadoDelJuego.inventario.buscarItem(itemId);
    
    if (item && item.tipo === 'arma') {
        // Equipar el arma
        estadoDelJuego.jugador.equiparArma(item);
        
        // Actualizar la interfaz
        actualizarInfoInventario();
        mostrarItemsInventario();
        
        // Guardar el estado del juego
        estadoDelJuego.guardarPartida();
    }
}

// Función para usar una poción
function usarPocion(itemId) {
    // Buscar la poción en el inventario
    const pocion = estadoDelJuego.inventario.buscarItem(itemId);
    
    if (pocion && pocion.tipo === 'pocion') {
        // Usar la poción
        const resultado = pocion.usar(estadoDelJuego.jugador);
        
        if (resultado.exito) {
            gestorSonidos.play('pocion'); // Necesitas añadir este sonido
            
            // Eliminar la poción del inventario
            estadoDelJuego.inventario.eliminarItem(itemId);
            
            // Mostrar mensaje de resultado
            alert(resultado.mensaje);
            
            // Actualizar la interfaz
            actualizarInfoInventario();
            mostrarItemsInventario();
            
            // Guardar el estado del juego
            estadoDelJuego.guardarPartida();
        }
    }
}

// Función para descartar un item
function descartarItem(itemId) {
    gestorSonidos.play('boton');
    // Confirmar la acción
    if (!confirm('¿Estás seguro de que quieres descartar este item? Esta acción no se puede deshacer.')) {
        return;
    }
    
    // Eliminar el item del inventario
    const eliminado = estadoDelJuego.inventario.eliminarItem(itemId);
    
    if (eliminado) {
        // Si el item eliminado era el arma equipada, quitar el arma equipada
        if (estadoDelJuego.jugador.armaEquipada && estadoDelJuego.jugador.armaEquipada.id === itemId) {
            estadoDelJuego.jugador.equiparArma(null);
        }
        
        // Actualizar la interfaz
        actualizarInfoInventario();
        mostrarItemsInventario();
        
        // Guardar el estado del juego
        estadoDelJuego.guardarPartida();
    }
}