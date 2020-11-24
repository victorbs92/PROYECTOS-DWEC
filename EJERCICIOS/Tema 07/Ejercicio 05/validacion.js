/* Definición de objetos */
const pedido = {
  datosEntrega: {
    nombre: document.getElementById("nombre"),
    telefono: document.getElementById("telefono"),
    direccion: document.getElementById("direccion"),
    instrucciones: document.getElementById("instrucciones"),
    toString() {
      return Object.values(this).map(e => e.value).flat().join(', ');
    },
  },

  ingredientes: {
    queso: document.getElementById("queso"),
    champi: document.getElementById("champiñones"),
    cebolla: document.getElementById("cebolla"),
    pimiento: document.getElementById("pimiento"),
    toString() {
      return Object.keys(this).reduce((acc, cur) =>
        this[cur].checked ? [...acc, cur] : acc, []).join(', ');
    },
  },

  formaPago: document.getElementById("forma-pago"),
  tamanoPizza: document.getElementsByName('tamano'),
  tiposPizza: document.getElementById("tipos"),

  resumen(visor) {
    visor.innerHTML = `<p>Datos de entrega: ${this.datosEntrega.toString()}</p>`;
    visor.innerHTML += `<p>Ingredientes: ${this.ingredientes.toString()}</p>`;
  },
};


/* Definición de funciones */
function getControles() {
  return [
    ...Object.values(pedido.datosEntrega),
    ...Object.values(pedido.ingredientes),
    pedido.formaPago,
    pedido.tiposPizza,
    ...pedido.tamanoPizza
  ];
}

function habilitarControles(controles, disabled) {
  controles.forEach(control => control.disabled = !disabled);
}

/* Definición de variables */
const visor = document.getElementById('resumen');


/* Lógica de eventos */
document.forms[0].addEventListener('focusout', function ({ target }) {
  let ctrlValido = target.validity.valid;
  let mensaje = '';
  let otrosControles = getControles();

  // Quitando el elemento target del array de controles
  otrosControles = otrosControles.filter(control => target !== control)

  // Quitando todos los radio tamano si el target forma parte
  if (target.name === 'tamano') {
    otrosControles = otrosControles.filter(control => control.name !== 'tamano');
  }

  // Cambiando el mensaje en funcion del campo actual
  switch (target.name) {
    case 'nombre': {
      mensaje = 'El nombre es inválido';
      break;
    }
    case 'telefono': {
      mensaje = 'El telefono debe tener 9 dígitos';
      break;
    }
    case 'direccion': {
      mensaje = 'La dirección es inválida';
      break;
    }
    case 'tipos': {
      ctrlValido = target.selectedIndex > 0;
      if (!ctrlValido) {
        mensaje = 'Elige un tipo de pizza';
      }
      break;
    }
    case 'pago': {
      ctrlValido = target.selectedIndex > 0;
      if (!ctrlValido) {
        mensaje = 'Elige una forma de pago';
      }
      break;
    }
    case 'tamano': {
      let ningunoSeleccionado = true;

      [...pedido.tamanoPizza].forEach((tamano) => {
        ningunoSeleccionado = ningunoSeleccionado && !tamano.checked;
      });

      if (ningunoSeleccionado) {
        mensaje = 'Elige un tamaño';
      }
    }
  }

  habilitarControles(otrosControles, ctrlValido);

  if (ctrlValido) {
    visor.innerHTML = '';
  } else {
    visor.innerHTML = `<p>${mensaje}</p>`;
  }
})