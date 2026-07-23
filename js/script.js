// Datos del menú
const menuData = {
    comidas: [
        {
            id: 1,
            nombre: "Pasta Alfredo",
            descripcion: "Pasta fettuccine con salsa cremosa de parmesano y pollo",
            precio: 8500,
            imagen: "img/comida1.webp",
            categoria: "comidas"
        },
        {
            id: 2,
            nombre: "Hamburguesa Deluxe",
            descripcion: "Doble carne, queso cheddar, tocino y salsa especial",
            precio: 7500,
            imagen: "img/comida2.webp",
            categoria: "comidas"
        },
        {
            id: 3,
            nombre: "Salmón a la Plancha",
            descripcion: "Salmón con vegetales salteados y salsa de miel",
            precio: 9500,
            imagen: "img/comida3.webp",
            categoria: "comidas"
        }
    ],
    bebidas: [
        {
            id: 4,
            nombre: "Limonada Natural",
            descripcion: "Limonada fresca con hierbabuena",
            precio: 3500,
            imagen: "img/bebida1.webp",
            categoria: "bebidas"
        },
        {
            id: 5,
            nombre: "Smoothie de Frutas",
            descripcion: "Mix de frutas tropicales con yogurt",
            precio: 4000,
            imagen: "img/bebida2.webp",
            categoria: "bebidas"
        },
        {
            id: 6,
            nombre: "Café Especial",
            descripcion: "Café de origen con leche y canela",
            precio: 3000,
            imagen: "img/bebida3.webp",
            categoria: "bebidas"
        }
    ],
    postres: [
        {
            id: 7,
            nombre: "Tiramisú",
            descripcion: "Clásico italiano con café y mascarpone",
            precio: 5000,
            imagen: "img/postre1.jpg",
            categoria: "postres"
        },
        {
            id: 8,
            nombre: "Cheesecake de Fresa",
            descripcion: "Base de galleta con crema de queso y fresas",
            precio: 5500,
            imagen: "img/postre2.jpg",
            categoria: "postres"
        }
    ]
};

// Número de WhatsApp
const WHATSAPP_NUMBER = "50671012511";

// Función para crear elementos del menú
function createMenuItem(item) {
    return `
        <div class="menu-item" onclick="ordenarItem(${item.id})">
            <img src="${item.imagen}" alt="${item.nombre}">
            <div class="menu-item-content">
                <h3>${item.nombre}</h3>
                <p>${item.descripcion}</p>
                <div class="menu-item-footer">
                    <span class="price">₡${item.precio.toLocaleString()}</span>
                    <button class="btn-order" onclick="event.stopPropagation(); ordenarItem(${item.id})">
                        <i class="fas fa-shopping-cart"></i> Ordenar
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Función para cargar el menú
function cargarMenu() {
    // Cargar comidas
    const comidasGrid = document.getElementById('comidas-grid');
    if (comidasGrid) {
        comidasGrid.innerHTML = menuData.comidas.map(item => createMenuItem(item)).join('');
    }

    // Cargar bebidas
    const bebidasGrid = document.getElementById('bebidas-grid');
    if (bebidasGrid) {
        bebidasGrid.innerHTML = menuData.bebidas.map(item => createMenuItem(item)).join('');
    }

    // Cargar postres
    const postresGrid = document.getElementById('postres-grid');
    if (postresGrid) {
        postresGrid.innerHTML = menuData.postres.map(item => createMenuItem(item)).join('');
    }
}

// Función para ordenar un item
function ordenarItem(itemId) {
    // Buscar el item en todos los arrays
    const allItems = [...menuData.comidas, ...menuData.bebidas, ...menuData.postres];
    const item = allItems.find(i => i.id === itemId);
    
    if (item) {
        // Crear mensaje para WhatsApp
        const mensaje = `Hola, me gustaría ordenar: *${item.nombre}* (₡${item.precio.toLocaleString()}) - ${item.descripcion}`;
        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;
        window.open(url, '_blank');
    }
}

// Función para solicitar entrega en mesa
function solicitarMesa() {
    // Crear modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="modal-content">
            <h3>📍 Entrega en Mesa</h3>
            <p>Por favor, indícanos tu número de mesa para atenderte mejor</p>
            <input type="text" id="mesa-input" placeholder="Número de mesa (ej: 5)" required>
            <div class="modal-buttons">
                <button class="btn-cancelar" onclick="cerrarModal()">Cancelar</button>
                <button class="btn-confirmar" onclick="confirmarMesa()">Confirmar</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// Función para cerrar modal
function cerrarModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.remove();
    }
}

// Función para confirmar mesa
function confirmarMesa() {
    const mesaInput = document.getElementById('mesa-input');
    const mesa = mesaInput.value.trim();
    
    if (!mesa) {
        alert('Por favor, ingresa el número de mesa');
        return;
    }
    
    const mensaje = `Hola, necesito servicio en la *mesa ${mesa}*. Por favor, un mesero/a para tomar mi pedido.`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
    cerrarModal();
}

// Función para pedido a domicilio
function pedidoDomicilio() {
    const mensaje = 'Hola, me gustaría hacer un pedido a domicilio. ¿Podrían ayudarme?';
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
}

// Smooth scroll para navegación
document.addEventListener('DOMContentLoaded', function() {
    // Cargar menú
    cargarMenu();
    
    // Agregar evento click a los enlaces de navegación
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

// Cerrar modal al hacer clic fuera del contenido
document.addEventListener('click', function(e) {
    const modal = document.querySelector('.modal');
    if (modal && e.target === modal) {
        cerrarModal();
    }
});
