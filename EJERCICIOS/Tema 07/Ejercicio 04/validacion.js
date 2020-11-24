/** Ejercicio 4
 * Modificar el ejercicio del FormularioPizza para que la validación
 * de los controles del formulario se realice individualmente control
 * por control utilizando eventos en los controles del formulario.
 * 
 * Los eventos deben detectar si un control no valida. A medida que se
 * detecte un fallo de validación se mostrará el mensaje de error en el visor.
 */
// Definición de variables
const pedido = {
  datosEntrega: {
    nombre: document.getElementById('nombre'),
    telefono: document.getElementById('telefono'),
    direccion: document.getElementById('direccion'),
    instrucciones: document.getElementById('instrucciones'),
    toString() {
      return Object.values(this)
        .map((e) => e.value).join(', ');
    },
  },

  ingredientes: {
    queso: document.getElementById('queso'),
    champi: document.getElementById('champiñones'),
    cebolla: document.getElementById('cebolla'),
    pimiento: document.getElementById('pimiento'),
    toString() {
      return Object.keys(this)
        .reduce((acc, cur) => (this[cur].checked ? [...acc, cur] : acc),
          []).join(', ');
    },
  },

  formaPago: document.getElementById('forma-pago'),
  tamanoPizza: document.getElementsByName('tamano'),
  tiposPizza: document.getElementById('tipos'),

  resumen(visor) {
    visor.innerHTML += `<p>Ingredientes: ${this.ingredientes.toString()}</p>`;
    visor.innerHTML += `<p>Tamaño: ${
          [...this.tamanoPizza].find((x) => x.checked).value
      }</p>`;
    visor.innerHTML += `<p>Tipos: ${[...this.tiposPizza.selectedOptions]
          .map((x) => x.value)
          .join(', ')}</p>`;
  },
};

const visor = document.getElementById('resumen');

// Definición de funciones
function validarFormulario({ target }) {
  let ctrlValido = target.validity.valid;
  let mensaje = '';

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
    case 'forma-pago': {
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

  if (ctrlValido) {
    visor.innerHTML = '';
  } else {
    visor.innerHTML = `<p>${mensaje}</p>`;
  }
}

// Lógica de eventos
document.forms[0].addEventListener('focusout', validarFormulario);

document.getElementById('ok').addEventListener('click', function () {
  if (document.forms[0].checkValidity()) {
    pedido.resumen(document.getElementById('resumen'));
  }
});
