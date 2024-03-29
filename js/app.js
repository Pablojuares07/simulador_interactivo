document.addEventListener('DOMContentLoaded', () => {
    // Variables
    const baseDeDatos = [
        {
            id: 1,
            nombre: 'Pechugas de pollo',
            precio: 1350,
            imagen: '../proyecto/assets/1.png'
        },
        {
            id: 2,
            nombre: 'Pata y muslo 3kg',
            precio: 2040,
            imagen: './assets/pataymuslo.jfif'
        },
        {
            id: 3,
            nombre: 'Milas de pollo',
            precio: 1100,
            imagen: './assets/milasdepollo.png'
        },
        {
            id: 4,
            nombre: 'Alitas de pollo 2kg',
            precio: 650,
            imagen: './assets/alitasdepollo.jpg'
        },
        {
            id: 5,
            nombre: 'Patitas de pollo',
            precio: 1350,
            imagen: './assets/patitaspollo.jpg'
        },
        {
            id: 6,
            nombre: 'Milas rellenas de j y q',
            precio: 1500,
            imagen: './assets/6.jpg'
        },
        {
            id: 7,
            nombre: 'Milas rellenas de panceta y chedar',
            precio: 1600,
            imagen: './assets/7.jpg'
        },
        {
            id: 8,
            nombre: 'Albondigas rellenas de j y q',
            precio: 1500,
            imagen: './assets/8.jpg'
        },
        {
            id: 9,
            nombre: 'Ricosaurios',
            precio: 1400,
            imagen: './assets/9.jfif'
        },
        {
            id: 10,
            nombre: 'Papa Mc Kein',
            precio: 990,
            imagen: './assets/10.jpg'
        },
        {
            id: 11,
            nombre: 'Pechito con manta',
            precio: 1250,
            imagen: './assets/11.png'
        },
        {
            id: 12,
            nombre: 'Bondiolita',
            precio: 1799,
            imagen: './assets/filetmerluza.jpg'
        },
        {
            id: 13,
            nombre: 'Carre cortado en bife',
            precio: 1250,
            imagen: './assets/filetmerluza.jpg'
        },
        {
            id: 14,
            nombre: 'Matambrito',
            precio: 1399,
            imagen: './assets/filetmerluza.jpg'
        },
        {
            id: 15,
            nombre: 'Chorizo super cerdo',
            precio: 1200,
            imagen: './assets/filetmerluza.jpg'
        }

    ];

    let carrito = [];
    const divisa = '$';
    const DOMitems = document.querySelector('#items');
    const DOMcarrito = document.querySelector('#carrito');
    const DOMtotal = document.querySelector('#total');
    const DOMbotonVaciar = document.querySelector('#boton-vaciar');
    const DOMcomprar = document.querySelector('#comprar');

    // Funciones


    //Dibuja todos los productos a partir de la base de datos. No confundir con el carrito

    function renderizarProductos() {
        baseDeDatos.forEach((info) => {
            // Estructura
            const miNodo = document.createElement('div');
            miNodo.classList.add('card', 'col-sm-4');
            // Body
            const miNodoCardBody = document.createElement('div');
            miNodoCardBody.classList.add('card-body');
            // Titulo
            const miNodoTitle = document.createElement('h5');
            miNodoTitle.classList.add('card-title');
            miNodoTitle.textContent = info.nombre;
            // Imagen
            const miNodoImagen = document.createElement('img');
            miNodoImagen.classList.add('img-fluid');
            miNodoImagen.setAttribute('src', info.imagen);
            // Precio
            const miNodoPrecio = document.createElement('p');
            miNodoPrecio.classList.add('card-text');
            miNodoPrecio.textContent = `${info.precio}${divisa}`;
            // Boton 
            const miNodoBoton = document.createElement('button');
            miNodoBoton.classList.add('btn', 'btn-primary');
            miNodoBoton.textContent = '+ Sumar';
            miNodoBoton.setAttribute('marcador', info.id);
            miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);
            // Insertamos
            miNodoCardBody.appendChild(miNodoImagen);
            miNodoCardBody.appendChild(miNodoTitle);
            miNodoCardBody.appendChild(miNodoPrecio);
            miNodoCardBody.appendChild(miNodoBoton);
            miNodo.appendChild(miNodoCardBody);
            DOMitems.appendChild(miNodo);
        });
    }


    //Evento para añadir un producto al carrito de la compra

    function anyadirProductoAlCarrito(evento) {
        // Anyadimos el Nodo a nuestro carrito
        carrito.push(evento.target.getAttribute('marcador'))
        // Actualizamos el carrito 
        renderizarCarrito();

    }


    //Dibuja todos los productos guardados en el carrito

    function renderizarCarrito() {
        // Vaciamos todo el html
        DOMcarrito.textContent = '';
        // Quitamos los duplicados
        const carritoSinDuplicados = [...new Set(carrito)];
        // Generamos los Nodos a partir de carrito
        carritoSinDuplicados.forEach((item) => {
            // Obtenemos el item que necesitamos de la variable base de datos
            const miItem = baseDeDatos.filter((itemBaseDatos) => {
                // ¿Coincide las id? Solo puede existir un caso
                return itemBaseDatos.id === parseInt(item);
            });
            // Cuenta el número de veces que se repite el producto
            const numeroUnidadesItem = carrito.reduce((total, itemId) => {
                // ¿Coincide las id? Incremento el contador, en caso contrario no mantengo
                return itemId === item ? total += 1 : total;
            }, 0);
            // Creamos el nodo del item del carrito
            const miNodo = document.createElement('li');
            miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
            miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${divisa}`;
            // Boton de borrar
            const miBoton = document.createElement('button');
            miBoton.classList.add('btn', 'btn-danger', 'mx-5');
            miBoton.textContent = 'X';
            miBoton.style.marginLeft = '1rem';
            miBoton.dataset.item = item;
            miBoton.addEventListener('click', borrarItemCarrito);
            // Mezclamos nodos
            miNodo.appendChild(miBoton);
            DOMcarrito.appendChild(miNodo);
        });
       // Renderizamos el precio total en el HTML
        DOMtotal.textContent = calcularTotal();
    }


    //Evento para borrar un elemento del carrito

    function borrarItemCarrito(evento) {
        // Obtenemos el producto ID que hay en el boton pulsado
        const id = evento.target.dataset.item;
        // Borramos todos los productos
        carrito = carrito.filter((carritoId) => {
            return carritoId !== id;
        });
        // volvemos a renderizar
        renderizarCarrito();
    }


    /**
     * Calcula el precio total teniendo en cuenta los productos repetidos
     */
    function calcularTotal() {
        // Recorremos el array del carrito 
        return carrito.reduce((total, item) => {
            // De cada elemento obtenemos su precio
            const miItem = baseDeDatos.filter((itemBaseDatos) => {
                return itemBaseDatos.id === parseInt(item);
            });
            // Los sumamos al total
            return total + miItem[0].precio;
        }, 0).toFixed(2);
    }


    //Varia el carrito y vuelve a dibujarlo
    
    function vaciarCarrito() {
        //Pop up
        Swal.fire(
            'Se vacio el carrito con exito',
            '',
            'success'
        )
        // Limpiamos los productos guardados
        carrito = [];
        // Renderizamos los cambios
        renderizarCarrito();
    }




    //Comprar productos
    //function comprar(){ 
    //    Swal.fire({       
    //        title: 'Ya tenes todos los productos?',
    //        confirmButtonText:'<a href="https://wa.me/5211234567890?text=Hola%20me%20gustaria%20saber%20el%20precio">Vamos a pagar</a>',
    //    }
    //)};


    // Eventos
    DOMbotonVaciar.addEventListener('click', vaciarCarrito);
    //DOMcomprar.addEventListener('click', comprar);
    DOMcomprar.addEventListener("click", function() {
        var message = "¿Estás seguro que quieres comprar estos productos?";
        
        for (var i = 0; i < DOMcarrito.children.length; i++) {
            message += "- " + DOMcarrito.children[i].textContent + "\n";
        }
        
        if (confirm(message)) {
            window.location.href = "https://www.example.com/pagar";
        }
    });


    // Inicio
    renderizarProductos();
    renderizarCarrito();





});
