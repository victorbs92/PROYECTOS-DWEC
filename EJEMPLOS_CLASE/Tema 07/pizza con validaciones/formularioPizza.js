//orden a la hora de hacer el script.
//0.importar si es un modulo
//1. declaracion de funciones
function resumen() {
  let strPedido = "";
  strPedido += capturaIngredientes(pedido.ingredientes);
  //recoger tipos
  strPedido += tiposPizza(pedido.tipos);

  strPedido += capturaTamanno(pedido.tamanno);

  //recoger ingredientes
  //recoger tamaño
  //recoger medio de pago
  //....
  //devolver cadena html
  return strPedido;
}

function capturaIngredientes(ingredientes) {
  let cadenaIngredientes = "<p>Ingredientes: ";
  for (ingrediente in ingredientes) {
    if (ingredientes[ingrediente].checked) {
      cadenaIngredientes += ingredientes[ingrediente].value + ", ";
    }
  }
  cadenaIngredientes += "</p>";
  return cadenaIngredientes;
}

function capturaTamanno(radios) {
  let cadenaTamannos = "<p>Tamano pizza: ";
  for (radio of radios) {
    if (radio.checked) {
      cadenaTamannos += radio.value;
      break;
    }
  }
  cadenaTamannos + "</p>";
  return cadenaTamannos;
}
function capturaMedioPago() {}
function capturaDatosPersonales() {}

function tiposPizza(tipos) {
  let cadenaTipos = "<p>Tipos de pizza";
  for (tipo of tipos.selectedOptions) {
    cadenaTipos += tipo.value + ", ";
  }

  cadenaTipos += "</p>";
  return cadenaTipos;
}
//2. declaracion de clases
//3.declaracion de variables/objetos almacenados en variables

const pedido = {
  ingredientes: {
    cebolla: document.getElementById("cebolla"),
    champi: document.getElementById("champinones"),
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

  pago: document.getElementById("pago"),
};

//4. tratamientos globales

//5. llamadas a eventos

document.getElementById("ok").addEventListener("click", function (event) {
  //si los datos introducidos en el formulario son todos validos (validados) se imprime el resumn, si no no
  if (this.form.checkValidity()) {
    //o form.validity.valid
    //el check validity se puede aplicar tanto al fomulario completo como a controles individuales
    document.getElementById("resumen").innerHTML = resumen();
  }

  //el parametro que le poasamos es un objeto event que se crea
  //junto con el dom.

  //sentencia para eliminar acciones por defecto del boton tipo submit.(sino lo ponemos, al pulsarlo
  //salen los errores en consola pero desaparacen al segundo)

  //event.preventDefault();
});

//evento que ocurre al meter el numero en un formato incorrecto.

pedido.entrega.telefono.addEventListener("invalid", function name(params) {
  //el this es para referirse al objeto que hemos puesto que va a tener el evento.(pedido.entrega.telefono)
  this.setValidationMessage("Tienes que poner nueve numeros decimales");
});

//6. exportar si es un modulo
