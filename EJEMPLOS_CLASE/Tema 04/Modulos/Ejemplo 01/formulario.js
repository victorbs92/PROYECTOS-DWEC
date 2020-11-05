import {

    Contacto,
    Direccion as Address,
    Telefonos

} from './clases.js';


///capturar los controles del formulario
document.getElementById("btnAgregar").onclick = function () {
    if (validacion(txtNombre, txtCasa, txtMovil, txtTrabajo)) {
        agenda.agregar();
    }
};

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