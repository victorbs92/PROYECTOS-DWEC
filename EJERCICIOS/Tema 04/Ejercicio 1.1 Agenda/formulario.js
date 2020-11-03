import {

    Contacto,
    Direccion as Address,
    Telefonos

} from './clases.js';

import {
    agenda
} from "./agenda.js";


let elementosForumlario = [];

(function capturarFormulario() {

    elementosForumlario.push(document.getElementById("nombre"));
    elementosForumlario.push(document.getElementById("calle"));
    elementosForumlario.push(document.getElementById("pobl"));
    elementosForumlario.push(document.getElementById("prov"));
    elementosForumlario.push(document.getElementById("movil"));
    elementosForumlario.push(document.getElementById("casa"));
    elementosForumlario.push(document.getElementById("trabajo"));

})();



///capturar los controles del formulario
document.getElementById("btnAgregar").onclick = function () {

    let txtNombre = document.getElementById("nombre").value;
    let txtCasa = document.getElementById("movil").value;
    let txtMovil = document.getElementById("casa").value;
    let txtTrabajo = document.getElementById("trabajo").value;

    if (validacion(txtNombre, txtCasa, txtMovil, txtTrabajo)) {

        let txtCalleNumPiso = document.getElementById("calle").value;
        let txtPoblacion = document.getElementById("pobl").value;
        let txtProvincia = document.getElementById("prov").value;

        let direccion = new Address(txtCalleNumPiso, txtPoblacion, txtProvincia);
        let telefonos = new Telefonos(txtCasa, txtMovil, txtTrabajo);

        let contacto = new Contacto(txtNombre, direccion, telefonos);

        agenda.agregar(contacto);

        limpiarForumalrio(elementosForumlario);

        /*
        agenda.datos.forEach(element => {
            console.table(element);
        });
        */
    }

}

function limpiarForumalrio(elementosFormulario) {
    elementosFormulario.forEach(element => {
        element.value = "";
    });
}

document.getElementById("btnBuscar").onclick = function () {

    let txtNombre = document.getElementById("nombre").value;
    let visor = document.getElementById("visor");
    let contacto = agenda.buscar(txtNombre);

    if (txtNombre !== "") {
        if (contacto != undefined) {
            let contactoString = `<table border = 1>
                                    <tr>
                                        <td>${contacto.nombre}</td>
                                    </tr>
                                    <tr>
                                        <td>${contacto.direccion.calleNumPiso}</td>
                                        <td>${contacto.direccion.poblacion}</td>
                                        <td>${contacto.direccion.provincia}</td>
                                    </tr>
                                    <tr>
                                        <td>${contacto.telefonos.movil}</td>
                                        <td>${contacto.telefonos.casa}</td>
                                        <td>${contacto.telefonos.trabajo}</td>
                                    </tr>
                                  </table>`;
            visor.innerHTML = contactoString;
        } else {
            visor.innerHTML = "Contacto no encontrado";
        }
    } else {
        alert("ERROR!");
    }

}

function validacion(nombre, ...telefonos) {

    if (
        nombre.value !== "" &&
        telefonos.some((telefono) => telefono.value !== "")
    ) {
        return true;
    } else {
        return false;
    }

}