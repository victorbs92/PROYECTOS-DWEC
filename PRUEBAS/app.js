let xx = document.getElementById("xx");
let tamano = document.getElementsByName("tamano");
console.log(tamano);

let nombre = document.getElementById("name");

let boton = document.getElementById("XXX");
//let boton = document.formulario.enviar;

const elementosForumlario = {
    xyz: {
        nombre: document.getElementById("name")
    }
};

/*
let elementosForumlario = [];
(function capturarFormulario() {

    //elementosForumlario.push(document.getElementById("nombre"));
    elementosForumlario.push(document.getElementById("name"));

})();

//console.log("asdasd " + boton.value);

//boton.onclick = asddddd;
boton.onclick = function () {
    console.log(elementosForumlario.xyz.nombre.value);
}
*/
nombre.addEventListener("keydown", asd);

function asd(event) {
    console.log(event.keyCode);
    console.log(event.key);
}


boton.addEventListener("mouseover",  function (evento) {
    console.log("AAAAAAAAAAAAAAAA");
    console.log(evento.x, evento.y);
});


boton.addEventListener("click", function (event) {
    if (elementosForumlario.xyz.nombre.value === "") {
        event.preventDefault();
    } 
})

boton.removeEventListener("click", null);

//boton.addEventListener("click", asd);
/*
console.log(nombre);

//console.log(xx);

//console.log(ta);

function asd() {
    console.log(nombre.value);
}

function asddddd() {
    console.log("BBBBBBBB");
}*/