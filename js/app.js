// Constructores

function Seguro(marca, year, tipo){
    this.marca = marca;
    this.year =  year;
    this.tipo = tipo;
}

// Realiza cotización
Seguro.prototype.cotizarSeguro =  function(){
    /*
    1 = Renault 11
    2 = Peugeot 12
    3 = Ford 13
    4 = Citroen 14
    5 = Chevrolet 15
    6 = Volkswagen 16
    7 = Toyota 17
    8 = Nissan 18
    9 = Jeep 19
    10 = BMW 20
    */

   let cantidad;
   const base = 2000;

   switch(this.marca){
    case '1':
            cantidad = base * 11;
            break;
    case '2':
            cantidad = base * 12;
            break;
    case '3':
            cantidad = base * 13;
            break;
    case '4':
            cantidad = base * 14;
            break;
    case '5':
            cantidad = base * 15;
            break;
    case '6':
            cantidad = base * 16;
            break;
    case '7':
            cantidad = base * 17;
            break;
    case '8':
            cantidad = base * 18;
            break;
    case '9':
            cantidad = base * 19;
            break;
    case '10':
            cantidad = base * 20;
            break;
    default:
        break;
   }

    // leer año
    const diferencia = new Date().getFullYear() - this.year;
    // cada año que la diferencia es mayor se reduce el costo del seguro
    cantidad -= ((diferencia * 3) * cantidad)/100;
    /*
    Si el seguro es Respon. civil se multiplica por un 22% mas.
    Si el seguro es Terceros se multiplica por un 46% mas.
    Si el seguro es Terceros completos se multiplica por un 61% mas.
    Si el seguro es Todo riesgo se multiplica por un 94% mas.
    */
   if(this.tipo === 'civil'){
       cantidad *= 0.22;
    }else if(this.tipo === 'terceros'){
        cantidad *= 0.46;
    }else if(this.tipo === 'tercecompletos'){
        cantidad *= 0.61;
    }else if(this.tipo === 'todoriesgo'){
    cantidad *= 0.94;
    }

   return cantidad;
}

function UI(){  }

UI.prototype.llenarOpciones = () =>{
    const max = new Date().getFullYear(),
          min = max -20;
    
    const selectYear = document.querySelector('#year');

    for(let i = max; i>min; i--){
        let option =  document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option);
    }
}

// Mueatra alertas
UI.prototype.mostrarMensaje = (mensaje,tipo) => {
    const div = document.createElement('div');
    if(tipo === 'error'){
        div.classList.add('mensaje','error');
    }else{
        div.classList.add('mensaje','correcto');
    }
    
    div.classList.add('mensaje', 'mt-10');
    div.textContent = mensaje;
    // insertar en html
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.insertBefore(div, document.querySelector('#resultado'));

    setTimeout(() => {
        div.remove();
    }, 2000);
}

UI.prototype.mostrarResultado = (total,seguro) =>{

    const {marca, year, tipo} = seguro;
    let txtMarca;
    switch(marca){
        case '1':
            txtMarca = 'BMW';
            break;
        case '2':
            txtMarca = 'Chevrolet';
            break;
        case '3':
            txtMarca = 'Citroen';
            break;
        case '4':
            txtMarca = 'Ford';
            break;
        case '5':
            txtMarca = 'Jeep';
            break;
        case '6':
            txtMarca = 'Nissan';
            break;
        case '7':
            txtMarca = 'Peugeot';
            break;
        case '8':
            txtMarca = 'Renault';
            break;
        case '9':
            txtMarca = 'Toyota';
            break;
        case '10':
            txtMarca = 'Volkswagen';
            break;
        default:
            break;
    }

    // Crear el resultado
    const div = document.createElement('div');
    div.classList.add('mt-10');

    div.innerHTML = `
    <p class='header'> Tu Resumen </p>
    <p class='font-bold'> Marca: <span class='font-normal'> ${txtMarca}</span> </p>
    <p class='font-bold'> Año: <span class='font-normal'> ${year}</span> </p>
    <p class='font-bold'> Tipo: <span class='font-normal capitalize'> ${tipo}</span> </p>
    <p class='font-bold'> Total: <span class='font-normal'> $${total}</span> </p>

        `;
    const resultadoDiv = document.querySelector('#resultado');
    
    // Mostrar spinner
    const spinner = document.querySelector('#cargando');
    spinner.style.display = 'block';
    setTimeout(() => {
        spinner.style.display = 'none';
        // se borra el spinner y se muestra el resultado
        resultadoDiv.appendChild(div);
    }, 2000);
    

}

// Instanciar UI
const ui = new UI();


document.addEventListener('DOMContentLoaded', ()=>{
    ui.llenarOpciones();
});

eventListeners();

function eventListeners(){
    
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit', cotizarSeguro);
}


function cotizarSeguro(e){
    e.preventDefault();

    // leer marca seleccionada
    const marca = document.querySelector('#marca').value;
    // leer año seleccionado
    const year = document.querySelector('#year').value;
    // leer tipo cobertura
    const tipo = document.querySelector('input[name=tipo]:checked').value;

    if(marca === '' || year === '' || tipo === ''){
        ui.mostrarMensaje('Todos los campos son obligatorios', 'error');
        return;
    }
    ui.mostrarMensaje('Cotizando...', 'exito');
    // ocultar cotizaciones previas
    const resultados = document.querySelector('#resultado div');
    if(resultados != null){
        resultados.remove();
    }
    // instanciar seguro
    const seguro = new Seguro(marca, year, tipo);
    const total = seguro.cotizarSeguro();
    // use prototype que va a cotizar
    ui.mostrarResultado(total, seguro);

}
