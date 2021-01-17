//Para hacer el tratamiento campo por campo habría que irse desplazando por los controles
//por ejemplo mediante clicks o la tecla tabulación. Si salimos de un campo se activa blur.
//Si este campo es validable y no hacemos lo que pide la restricción, se desactivan los controles
// menos donde ha saltado el fallo de restricción que quedará activo.

function capturaControles() {
    const campos = {
        tipos: document.getElementById("tipos"),
        nombre: document.getElementById("nombre"),
        direccion: document.getElementById("direccion"),
        telefono: document.getElementById("telefono"),
        pago: document.getElementById("pago")
        //Aquí también podrían capturarse los controles checkbox y radio buttons si
        //se quieren desactivar y reactivar también, además de los validables
    }
    return Object.values(campos)
}
document.getElementById("tipos").addEventListener("click", [2,5].some)
document.getElementById("tipos").addEventListener("blur", function () {
    const controles = capturaControles()
    if (!this.checkValidity()) {
        controles.forEach(elem => {
            if (this === elem)
                elem.disabled = false;
            else
                elem.disabled = true;
        })
    } else {
        controles.forEach(elem => {
            elem.disabled = false;
        })

    }
});

//El mismo tratamiento se realizará para el resto de controles que requieran validación
//Por esto aquí también se podrá realizar una delegación de eventos en el formulario