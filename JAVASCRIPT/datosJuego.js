const datosJuego = {
    // Lista de armas disponibles en la tienda
    armas: [
        {
            id: 1,
            nombre: "Espada de Madera",
            ataque: 5,
            precio: 0,
            descripcion: "Una espada de madera básica para principiantes.",
            peso: 2
        },
        {
            id: 2,
            nombre: "Arco Corto",
            ataque: 3,
            precio: 150,
            descripcion: "Un arco pequeño que permite atacar a distancia.",
            peso: 1.5
        },
        {
            id: 3,
            nombre: "Bastón de Madera",
            ataque: 3,
            precio: 100,
            descripcion: "Un bastón básico con un poco de magia.",
            peso: 2
        },
        {
            id: 4,
            nombre: "Espada de Hierro",
            ataque: 10,
            precio: 300,
            descripcion: "Una espada resistente de hierro.",
            peso: 3
        },
        {
            id: 5,
            nombre: "Hacha de Batalla",
            ataque: 15,
            precio: 450,
            descripcion: "Un hacha pesada que causa mucho daño.",
            peso: 4.5
        },
        {
            id: 6,
            nombre: "Vara Mágica",
            ataque: 12,
            precio: 500,
            descripcion: "Una vara que canaliza energía mágica.",
            peso: 1.5
        },
        {
            id: 7,
            nombre: "Espada Larga",
            ataque: 18,
            precio: 700,
            descripcion: "Una espada de gran alcance y poder.",
            peso: 3.5
        },
        {
            id: 8,
            nombre: "Arco Largo",
            ataque: 16,
            precio: 650,
            descripcion: "Un arco poderoso para cazadores expertos.",
            peso: 2.5
        },
        {
            id: 9,
            nombre: "Daga Envenenada",
            ataque: 20,
            precio: 900,
            descripcion: "Una daga que causa daño adicional por veneno.",
            peso: 1
        },
        {
            id: 10,
            nombre: "Espada Legendaria",
            ataque: 30,
            precio: 1500,
            descripcion: "Una espada de leyenda, forjada por los dioses.",
            peso: 5
        },
        {
            id: 11,
            nombre: "Martillo de Guerra",
            ataque: 25,
            precio: 1200,
            descripcion: "Martillo pesado que puede derribar a los enemigos.",
            peso: 6
        },
        {
            id: 12,
            nombre: "Báculo Arcano",
            ataque: 22,
            precio: 1100,
            descripcion: "Báculo imbuido con poderosa magia elemental.",
            peso: 2.5
        }
    ],
    
    // Lista de pociones disponibles en la tienda
    pociones: [
        {
            id: 101,
            nombre: "Poción Pequeña",
            vidaRecuperada: 20,
            precio: 50,
            descripcion: "Una pequeña poción que restaura algo de vida.",
            peso: 0.5
        },
        {
            id: 102,
            nombre: "Poción Media",
            vidaRecuperada: 50,
            precio: 120,
            descripcion: "Una poción de calidad media que restaura bastante vida.",
            peso: 1
        },
        {
            id: 103,
            nombre: "Poción Grande",
            vidaRecuperada: 100,
            precio: 250,
            descripcion: "Una poción de gran calidad que restaura mucha vida.",
            peso: 1.5
        },
        {
            id: 105,
            nombre: "Elixir Divino",
            vidaRecuperada: 999,
            precio: 1000,
            descripcion: "Un elixir legendario que restaura completamente tu vida.",
            peso: 3
        }
    ],
    
    // Lista de enemigos del juego
    enemigos: [
        {
            id: 1,
            nombre: "Goblin",
            nivel: 1,
            imagen: "goblin.gif",
            estadisticas: {
                vida: 50,
                ataque: 8,
                defensa: 3,
                velocidad: 5
            },
            experienciaDevuelve: 20,
            dineroDevuelve: 15,
            avatar: "goblin.gif"
        },
        {
            id: 2,
            nombre: "Lobo",
            nivel: 2,
            imagen: "lobo.gif",
            estadisticas: {
                vida: 65,
                ataque: 12,
                defensa: 2,
                velocidad: 8
            },
            experienciaDevuelve: 25,
            dineroDevuelve: 20,
            avatar: "lobo.gif"
        },
        {
            id: 3,
            nombre: "Esqueleto",
            nivel: 3,
            imagen: "esqueleto.gif",
            estadisticas: {
                vida: 80,
                ataque: 10,
                defensa: 5,
                velocidad: 4
            },
            experienciaDevuelve: 35,
            dineroDevuelve: 30,
            avatar: "esqueleto.gif"
        },
        {
            id: 4,
            nombre: "Bandido",
            nivel: 4,
            imagen: "bandido.gif",
            estadisticas: {
                vida: 100,
                ataque: 15,
                defensa: 7,
                velocidad: 6
            },
            experienciaDevuelve: 45,
            dineroDevuelve: 50,
            avatar: "bandido.gif"
        },
        {
            id: 5,
            nombre: "Ogro",
            nivel: 5,
            imagen: "ogro.gif",
            estadisticas: {
                vida: 150,
                ataque: 20,
                defensa: 10,
                velocidad: 3
            },
            experienciaDevuelve: 60,
            dineroDevuelve: 70,
            avatar: "ogro.gif"
        },
        {
            id: 6,
            nombre: "Brujo",
            nivel: 6,
            imagen: "brujo.gif",
            estadisticas: {
                vida: 120,
                ataque: 25,
                defensa: 8,
                velocidad: 7
            },
            experienciaDevuelve: 75,
            dineroDevuelve: 90,
            avatar: "brujo.gif"
        },
        {
            id: 7,
            nombre: "Dragón",
            nivel: 10,
            imagen: "dragon.gif",
            estadisticas: {
                vida: 300,
                ataque: 35,
                defensa: 20,
                velocidad: 10
            },
            experienciaDevuelve: 200,
            dineroDevuelve: 500,
            avatar: "dragon.gif"
        }
    ]
};