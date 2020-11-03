//IMPORTS
import {
    Cliente
} from './cliente.js';
import {
    Direccion
} from './direccion.js';
import {
    Elemento
} from './elemento.js';
import {
    Empresa
} from './empresa.js';
import {
    Factura
} from './factura.js';

//DECLARACION DE VARIABLES Y RECOGIDA DE ELEMENTOS DEL FORMULARIO
let nombreEmpresa = document.getElementById("nombreEmpresa");
let tlfEmpresa = document.getElementById("tlfEmpresa");
let nifEmpresa = document.getElementById("nifEmpresa");
let provinciaEmpresa = document.getElementById("provinciaEmpresa");
let poblacionEmpresa = document.getElementById("poblacionEmpresa");
let calleEmpresa = document.getElementById("calleEmpresa");
let numeroEmpresa = document.getElementById("numeroEmpresa");
let pisoEmpresa = document.getElementById("pisoEmpresa");
let cpEmpresa = document.getElementById("cpEmpresa");

let nombreCliente = document.getElementById("nombreCliente");
let apellidosCliente = document.getElementById("apellidosCliente");
let tlfCliente = document.getElementById("tlfCliente");
let dniCliente = document.getElementById("dniCliente");
let provinciaCliente = document.getElementById("provinciaCliente");
let poblacionCliente = document.getElementById("poblacionCliente");
let calleCliente = document.getElementById("calleCliente");
let numeroCliente = document.getElementById("numeroCliente");
let pisoCliente = document.getElementById("pisoCliente");
let cpCliente = document.getElementById("cpCliente");

let descripcionElemento = document.getElementById("descripcionElemento");
let precioElemento = document.getElementById("precioElemento");
let cantidadElemento = document.getElementById("cantidadElemento");
let botonAddElemento = document.getElementById("btnAddElemento");
let lista = document.querySelector("ul");

let iva4 = document.getElementById("iva4");
let iva10 = document.getElementById("iva10");
let iva21 = document.getElementById("iva21");
let formaPago = document.getElementById("formaPago");
let total = document.getElementById("total");

let botonAceptar = document.getElementById("btnAceptar");

let parrafo = document.querySelector("p");

let listaElementos = [];

//---------------------------------------------------//

//estos 3 elementos llaman a la funcion validarCamposLista cuando se escribe en ellos
descripcionElemento.onkeyup = validarCamposLista;
precioElemento.onkeyup = validarCamposLista;
cantidadElemento.onkeyup = validarCamposLista;

botonAddElemento.onclick = agregarElemento;

iva4.onclick = calculaTotal;
iva10.onclick = calculaTotal;
iva21.onclick = calculaTotal;

botonAceptar.onclick = crearFactura;

//comprueba que los 3 campos no esten vacios ni sean nulos para activar el boton
function validarCamposLista() {
    let validado = true;
    let elementos = document.getElementsByClassName("validarCamposLista");
    for (let i = 0; i < elementos.length; i++) {
        if (elementos[i].value == "" || elementos[i].value == null) {
            validado = false;
        }
    }
    if (validado) {
        botonAddElemento.disabled = false;
    } else {
        botonAddElemento.disabled = true;
    }
}

//añade un elemento a la lista del html y a la variable listaElementos
function agregarElemento() {
    let elemento = new Elemento(descripcionElemento.value, precioElemento.value, cantidadElemento.value);
    listaElementos.push(elemento);
    lista.insertAdjacentHTML("beforebegin", "<li>" + `${descripcionElemento.value} --- ${precioElemento.value}€ --- ${cantidadElemento.value}uds.` + "</li> <br />");
    calculaTotal();
}

//calcula el total de todos los articulos aplicando el IVA seleccionado.
function calculaTotal() {
    let x = 0;
    for (let i = 0; i < listaElementos.length; i++) {
        x += listaElementos[i].precioElemento * listaElementos[i].cantidadElemento;
    }

    let iva = ivaSeleccionado();
    total.value = (x + x * iva / 100) + "€";

}

//devuelve el IVA seleccionado actualmente
function ivaSeleccionado() {
    if (iva4.checked) {
        return 4;
    } else if (iva10.checked) {
        return 10;
    } else {
        return 21;
    }
}

//devuelve la forma de pago seleccionada actualmente
function formaPagoSeleccionada() {
    return formaPago.options[formaPago.selectedIndex].text;
}

//crea el objeto factura 
function crearFactura() {
    let direccionEmpresa = new Direccion(provinciaEmpresa.value, poblacionEmpresa.value, calleEmpresa.value, numeroEmpresa.value, pisoEmpresa.value, cpEmpresa.value);
    let empresa = new Empresa(nombreEmpresa.value, direccionEmpresa, tlfEmpresa.value, nifEmpresa.value);
    let direccionCliente = new Direccion(provinciaCliente.value, poblacionCliente.value, calleCliente.value, numeroCliente.value, pisoCliente.value, cpCliente.value);
    let cliente = new Cliente(nombreCliente.value, apellidosCliente.value, direccionCliente, tlfCliente.value, dniCliente.value);
    let iva = ivaSeleccionado();
    let formaPago = formaPagoSeleccionada();
    let factura = new Factura(total.value, iva, formaPago, empresa, cliente, listaElementos);

    mostrarDatos(factura);
}

function mostrarDatos(factura) {
    console.log(Object.values(factura));

    let tabla = document.createElement("table");
    let tblBody = document.createElement("tbody");

    // Crea las celdas
    for (let i = 0; i < factura.listaElementos.length + 2; i++) {

        let hilera = document.createElement("tr");

        if (i == 0) {

            for (let j = 0; j < 3; j++) {
                // Crea un elemento <td> y un nodo de texto, haz que el nodo de
                // texto sea el contenido de <td>, ubica el elemento <td> al final
                // de la hilera de la tabla
                let celda = document.createElement("td");
                let textoCelda;
                if (j == 0) {
                    textoCelda = document.createTextNode("Descripción");
                } else if (j == 1) {
                    textoCelda = document.createTextNode("Precio");
                } else {
                    textoCelda = document.createTextNode("Cantidad");
                }

                celda.appendChild(textoCelda);
                hilera.appendChild(celda);
            }
        } else if (i == factura.listaElementos.length + 1) {

            let celda = document.createElement("td");
            let textoCelda = document.createTextNode("TOTAL:" + total.value);

            celda.appendChild(textoCelda);
            hilera.appendChild(celda);

        } else {
            // Crea las hileras de la tabla
            for (let j = 0; j < 3; j++) {
                // Crea un elemento <td> y un nodo de texto, haz que el nodo de
                // texto sea el contenido de <td>, ubica el elemento <td> al final
                // de la hilera de la tabla
                let celda = document.createElement("td");
                let textoCelda;
                if (j == 0) {
                    textoCelda = document.createTextNode(factura.listaElementos[i - 1].descripcionElemento.value);
                } else if (j == 1) {
                    textoCelda = document.createTextNode(factura.listaElementos[i - 1].precioElemento);
                } else {
                    textoCelda = document.createTextNode(factura.listaElementos[i - 1].cantidadElemento);
                }

                celda.appendChild(textoCelda);
                hilera.appendChild(celda);
            }

        }

        // agrega la hilera al final de la tabla (al final del elemento tblbody)
        tblBody.appendChild(hilera);
    }

    // posiciona el <tbody> debajo del elemento <table>
    tabla.appendChild(tblBody);
    // appends <table> into <body>
    parrafo.appendChild(tabla);
    // modifica el atributo "border" de la tabla y lo fija a "2";
    tabla.setAttribute("border", "2");

}