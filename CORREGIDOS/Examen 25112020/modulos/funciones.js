import validarCtrls from "./validaciones.js";


/*
Manejador de evento que controla la pulsación de las tecla 39-->  37<--
para activar y desactivar los fieldset
*/
function activarFieldset(evento) {
    const arrayFieldset = [...document.getElementsByTagName("fieldset")]; //array con los fieldset
    const fieldsetActivo = arrayFieldset.find( //devuelve el fieldset que está activo
        (fieldset) => fieldset.disabled === false
    );
    const indiceActivo = arrayFieldset.indexOf(fieldsetActivo); //devuelve el índice del fieldset activo en el array
    //verificar tecla 37 o 39
    switch (evento.keyCode) {
        case 39:
            fieldsetActivo.disabled = true; //desactivar el fielset activo
            if (indiceActivo + 1 > 2) //controlamos el índice cuando las pulsaciones sobrepasan los fieldset hacia la derecha
                arrayFieldset[2].disabled = false;
            else
                arrayFieldset[indiceActivo + 1].disabled = false; //activar el fielset de la derecha
            break;
        case 37:
            fieldsetActivo.disabled = true; //desactivar el fieldset activo
            if (indiceActivo - 1 < 0) //controlamos el índice cuando las pulsaciones sobrepasan los fieldset hacia la izquierda
                arrayFieldset[0].disabled = false;
            else
                arrayFieldset[indiceActivo - 1].disabled = false; //activa el fieldset de la izquierda
            break;
        default:
            break;
    }

}


/*
Manejador de evento que controla el cambio de valor en la lista desplegable título.
Cuando cambia se carga una lista de estudios correspondiente a cada título
*/
function listas() {
    const datos = { //objeto con una propiedad por cada título. Cada propiedad es un array de opciones que usaremos para crear la lista de opciones de estudios
        Grado: ["Matemáticas", "Física", "Derecho", "Educación"],
        Licenciado: ["Matemáticas", "Física", "Derecho", "Educación"],
        Ingeniero: ["Industrial", "Mecánica", "Informatica"],
        TecnicoSuperior: ["DAW", "DAM", "ASIR", "STI", "AFL", "ARI", "AUL"],
        Tecnico: ["SMR", "CAL", "EVA", "GAD"],
        Bachiller: [],
        ESO: []
    }
    const listaSel = datos[this.value];
    let cadena = `<option value="">--Seleccione un estudio--</option>`;
    listaSel.forEach(item => {
        cadena += `<option value="${item}">${item}</option>`
    })
    document.getElementById("estudios").innerHTML = cadena;
}


/*
Manejador de eventos que controla la carga en el almacenamiento local de los datos del 
fieldset de datos personales.
*/
function agregarDatos() {
    const controles = [...document.querySelectorAll("#fs1>input")]; //array con los controles del fieldset
    if (validarCtrls(controles)) { //llamada a función de validación. Si devuelve true cargamos los valores de los controles en el almacenamiento local
        controles.forEach(control => { //recorremos el array de controles y creamos una clave de almacenamiento local por cada control. Usamos el id del control como nombre de clave.
            localStorage.setItem(control.id, control.value)
        });
        this.form.reset() //borramos los valores de los controles del formulorio 
    } else {
        alert("errores")
    }

}


/*
Similar al anterior pero con los controles del fieldset de estudios
Se creará una única clave de almacenamiento local. Su valor será un array de objetos
Cada objeto del array se creará al pulsar el boton. Cada objeto se compone de los valores de los controles del fieldset
Si la clave no existe, se creará el array y se le agregará el primer objeto.
Si la clave ya existe, se agrerá un objeto al array existente.
*/
function agregarEstudios() {
    const controles = [...document.querySelectorAll("#fs2>input"), ...document.querySelectorAll("#fs2>select")];
    const estudio = {}; //OBJETO PARA CARGAR LOS VALORES DE LOS CONTROLES DEL FIELDSET DE ESTUDIOS
    controles.forEach(control => {
        estudio[control.id] = control.value;
    });
    if (validarCtrls(controles)) { //verificación de validación
        if (localStorage.getItem("estudios") === null) { //comprobamos si la clave de almacenamiento local estudios existe
            localStorage.setItem("estudios", JSON.stringify([estudio])) // si no existe se crea el array con el primer objeto
        } else {
            let estudios = JSON.parse(localStorage.getItem("estudios")) //si ya existe se recupera el contenido de la clave 
            estudios.push(estudio) //se agrega un objeto al array
            localStorage.setItem("estudios", JSON.stringify(estudios)) //se carga el array modificado en el almacenamiento local
        }
        this.form.reset();
    } else {
        alert("errores")
    }

}
//Similar al anterior pero con los datos del fieldset de cursos
function agregarCursos() {
    const controles = [...document.querySelectorAll("#fs3>input")];
    const curso = {};
    controles.forEach(control => {
        curso[control.id] = control.value;
    });
    if (validarCtrls(controles)) {
        if (localStorage.getItem("cursos") === null) {
            localStorage.setItem("cursos", JSON.stringify([curso]))
        } else {
            let cursos = JSON.parse(localStorage.getItem("cursos"))
            cursos.push(curso)
            localStorage.setItem("cursos", JSON.stringify(cursos))
        }
        this.form.reset();
    } else {
        alert("errores")
    }
}



/*
Manejador que carga los valores de las claves de almacenamiento local de datos personales en 
los controles correspondientes. Usamos los id para que el acceso sea más estructurado
*/
function cargarLS() {
    const controles = [...document.querySelectorAll("#fs1>input")];
    controles.forEach((control) => {
        control.value = localStorage.getItem(control.id);
    })
}


export { cargarLS, agregarCursos, agregarEstudios, agregarDatos, activarFieldset, listas }