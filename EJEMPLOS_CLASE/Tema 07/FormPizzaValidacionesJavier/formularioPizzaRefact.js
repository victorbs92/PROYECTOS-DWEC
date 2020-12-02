//importar si es un modulo
//Declaración de funciones
function resumen({ ingredientes, tipos, tamanno, entrega, pago }) {
  let strPedido = "";
  strPedido += capturaIngredientes(ingredientes);
  //recoger tipos
  strPedido += tiposPizza(tipos);
  //recoger tamaño
  strPedido += capturaTamanno(tamanno);
  //recoger medio de pago
  strPedido += capturaMedioPago(pago);
  //recoger entrega
  strPedido += capturaDatosPersonales(entrega);
  //devolver cadena HTML
  return strPedido;
}

//Función para capturar los datos de  ingredientes
function capturaIngredientes(ingredientes) {
  let cadenaIngredientes = "<p>Ingredientes: ";
  for (ingrediente in ingredientes) {
    if (ingredientes[ingrediente].checked)
      cadenaIngredientes += ingredientes[ingrediente].value + ", ";
  }
  cadenaIngredientes += "</p>";
  return cadenaIngredientes;
}

//Función para capturar los datos de  tipos de pizza
function tiposPizza(tipos) {
  let cadenaTipos = "<p>Tipos de Pizza: ";
  for (tipo of tipos.selectedOptions) {
    cadenaTipos += tipo.value + ", ";
  }
  cadenaTipos += "</p>";
  return cadenaTipos;
}

//Función para capturar los datos del tamaño de pizza
function capturaTamanno(radios) {
  let cadenaTamannos = "<p>Tamaño pizza: ";
  for (radio of radios) {
    if (radio.checked) {
      cadenaTamannos += radio.value;
      break;
    }
  }
  cadenaTamannos + "</p>";
  return cadenaTamannos;
}

//Función para capturar los medios de pago

function capturaMedioPago(mediosPago) {
  return `<p>Forma de pago: ${mediosPago.value}</p>`;
}

//Función para capturar los datos personales

function capturaDatosPersonales(datosEntrega) {
  let cadenaEntrega = "<p>Datos de entrega:<br>";
  for (let dato in datosEntrega) {
    cadenaEntrega += datosEntrega[dato].value + "<br>";
  }
  cadenaEntrega += "</p>";
  return cadenaEntrega;
}

//Función que valida cada control individual
//Le pasamos como parámetro:
//   El control a validar,
//   El objeto validacion donde se guardan los mensajes de error y el estado de la validación
//   El mensaje de error a mostrar

function validarControl(control, validacion, mensaje) {
  if (!control.checkValidity()) {
    validacion.strErrores += mensaje;
    validacion.valido = false;
  }
  return validacion;
}

//Función de Validación

function validacion({ ingredientes, tipos, tamanno, entrega, pago }) {
  let objValidacion = {
    strErrores: "", //devuelve los mensajes de error que se mostrarán en caso de validación incorrecta
    valido: true    //devuelve si la validación es correcta-true o incorrecta-false
  }
  let [nombre, direccion, telefono] = Object.values(entrega) //desestrutura el objeto entrega en tres variables, las instrucciones no las carga

  //validamos cada control
  objValidacion = validarControl(tipos, objValidacion, "Se requiere que selecciones un tipo de pizza<br>")
  objValidacion = validarControl(pago, objValidacion, "Debes seleccionar un medio de pago<br>")
  objValidacion = validarControl(nombre, objValidacion, "No dejes vacío el nombre<br>")
  objValidacion = validarControl(direccion, objValidacion, "No  dejes vacío la dirección<br>")
  objValidacion = validarControl(telefono, objValidacion, "El telefono requiere 9 dígitos<br>")
  return objValidacion;
}

//Función manejadora de eventos

function validarEnviar() {

  const objValidacion = validacion(pedido) //Se obtiene el estado de validación y los mensajes de error
  const mensajes = document.getElementById("resumen");
  if (objValidacion.valido) {
    mensajes.innerHTML = resumen(pedido);
    this.form.submit()
    this.form.reset();
  } else {
    mensajes.innerHTML = objValidacion.strErrores;
  }

}

//Declaración de clases

//Declaración de variables
const pedido = {
  ingredientes: {
    cebolla: document.getElementById("cebolla"),
    champi: document.getElementById("champi"),
    queso: document.getElementById("queso"),
    pimiento: document.getElementById("pimiento"),
  },
  tipos: document.getElementById("tipos"),
  tamanno: document.getElementsByName("tamano"),
  entrega: {
    nombre: document.getElementById("nombre"),
    direccion: document.getElementById("direccion"),
    telefono: document.getElementById("telefono"),
    instrucciones: document.getElementById("instrucciones"),
  },
  pago: document.getElementById("pago")
}

//Tratamientos globales

//Eventos
document.getElementById("ok").addEventListener("click", validarEnviar);

