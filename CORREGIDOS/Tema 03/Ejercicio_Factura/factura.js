/*
Declaración de Función manejadora de eventos que agrega
un objeto compuesto por descripción, cantidad y precio de un producto vendido
al array factura.ventas del objeto factura.
*/
function agregaProducto() {
  let item = {};
  let cantidad = document.getElementById("cantidad");
  let precio = document.getElementById("precio");
  let descripcion = document.getElementById("descripcion");
  item.cantidad = cantidad.value;
  item.precio = precio.value;
  item.descripcion = descripcion.value;
  factura.ventas.push(item);
  cantidad.value = "";
  precio.value = "";
  descripcion.value = "";
}

/*
Declaración de función manejadora de eventos que:
Completa el objeto factura llamando a la función obtienePropiedadesFactura
Obtiene el listado de la factura llamando a la función listadoFactura
*/
function obtieneFactura() {
  obtienePropiedadesFactura(factura);
  listadoFactura(factura);
}

/*
Declaración de función que completa las propiedades del objeto  factura
Le pasamos el argumento del objeto factura, para que las referencias sean locales dentro de la función.
*/
function obtienePropiedadesFactura(factura) {
  factura.empresa = document.getElementById("empresa").value;
  factura.cif = document.getElementById("cif").value;
  factura.iva = document.getElementById("iva").value;
  factura.importeTotal = 0;
  factura.fpago = document.getElementById("fpago").value;
  factura.ventas.forEach((item) => {
    factura.importeTotal += item.cantidad * item.precio;
  });
}

/*
Declaración de función que genera un listado en el DOM de la página
Se crea una cadena de texto que incluya el código HTML  que permita estructurar el listado.
Tras completar la cadena, ésta se asigna a la propiedad innerHTML del objeto visor, para que
se creen los nodos del DOM que estructuran el listado.
*/

function listadoFactura(facturaNueva) {
  let listado = `<p>Empresa: ${facturaNueva.empresa}   CIF:${facturaNueva.cif}</p>`;
  facturaNueva.ventas.forEach((producto) => {
    listado += `<li>Descripcion: ${producto.descripcion} ${
      producto.cantidad
    }  X  ${producto.precio} = ${producto.cantidad * producto.precio}</li>`;
  });
  listado += `
  <p>Importe sin IVA: ${facturaNueva.importeTotal}  
  importe con IVA: ${
    facturaNueva.importeTotal * facturaNueva.iva + facturaNueva.importeTotal
  } </p>`;
  listado += `<p>Forma de pago: ${facturaNueva.fpago}</p>`;
  document.getElementById("visor").innerHTML = listado;
}

//Cuerpo principal de la app; el código que se ejecuta tras llamar al script
//Variables globales y declaración de eventos.
let factura = {};
factura.ventas = [];
document.getElementById("agregaproducto").onclick = agregaProducto;
document.getElementById("obtienefactura").onclick = obtieneFactura;
