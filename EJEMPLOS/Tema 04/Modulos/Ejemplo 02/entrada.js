import {
    visor
} from "./salida.js"; //tenemos que poner las llaves si el export no es default

//import visor from "./salida.js"; //esta import solo funcionaria con export default

document.getElementById("btnAceptar").onclick = function () {

    const texto = document.getElementById("txtEntrada");

    //TAMBIEN PODEMOS USAR IMPORTS DINAMICOS, EL PROGRAMADOR ELIGE CUANDO CARGAR EL IMPORT EN VEZ DE CARGARLOS TODOS AL PRINCIPIO,
    //SE UTILIZA EL .then Y UNA FUNCION CALLBACK, LA RUTA TIENE QUE IR ENTRE PARENTESIS
    /*
    import("./salida.js").then(modulo => { 
        modulo.visor.innerHTML = texto.value
    });
    */
    
    //poner el value del texto en el visor
    visor.innerText = texto.value;

};