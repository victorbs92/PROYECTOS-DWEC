const visor = document.getElementById("resumen")
document.getElementById("tipos").addEventListener("blur", function () {
    if (!this.checkValidity()) {
        visor.innerHTML += "error1<BR>"
    }
});

document.getElementById("pago").addEventListener("blur", function () {
    if (!this.checkValidity()) {
        visor.innerHTML += "error2<BR>"
    }
})

document.getElementById("nombre").addEventListener("blur", function () {
    if (!this.checkValidity()) {
        visor.innerHTML += "error3<BR>"
    }
})
document.getElementById("direccion").addEventListener("blur", function () {
    if (!this.checkValidity()) {
        visor.innerHTML += "error4<BR>"
    }
})
document.getElementById("telefono").addEventListener("blur", function () {
    if (!this.checkValidity()) {
        visor.innerHTML += "error5<BR>"
    }
})
//MEJOR CON UNA DELEGACIÓN DE EVENTOS EN LA ETIQUETA FORM...POR SUPUESTO
