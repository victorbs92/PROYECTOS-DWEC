//Elementos de la tabla 1
let tabla = document.getElementsByTagName("table")[0];
let filas1 = tabla.getElementsByTagName("tr")[0];
let col1 = filas1.getElementsByTagName("td");
//Elementos de la tabla 2
let tabla2 = document.getElementsByTagName("table")[1];
let filas2 = tabla2.getElementsByTagName("tr")[0];
let col2 = filas2.getElementsByTagName("td");
//Obtenemos el contenedor de los parrafos
let contenedor = document.getElementsByTagName("div")[0];
//Color seleccionado que lo obtenemos con el metodo pintar
let color;
let colorF;

function pintar(e) {
    if (e.target.tagName == "TD") {
        color = e.target.style.backgroundColor;
        //Opción de que al clickar el color se modifique por otro distinto
        //colorp = e.target.style.backgroundColor = getRandomHex();
        console.log(color);
    }
}

function pintarT(e) {
    if (e.target.tagName == "TD") {
        colorF = e.target.style.backgroundColor;
        //Opción de que al clickar el color se modifique por otro distinto
        //colorp = e.target.style.backgroundColor = getRandomHex();
        console.log(colorF);
    }
}


function colorear(e) {
    if (e.target.tagName == "P") {
        e.target.style.backgroundColor = color;
        e.target.style.color = colorF;
    }
}

function grc() {
    let hex = (Math.floor((Math.random() * 255))).toString(16);
    let ceros = "00";
    return ceros.slice(0, -hex.length) + hex;
}

function getRandomHex() {
    return "#" + grc() + grc() + grc();
}
tabla.addEventListener("mousedown", pintar);
tabla2.addEventListener("mousedown", pintarT);
contenedor.addEventListener("mousedown", colorear);

window.onload = function() {
    //Rellenamos la tabla de colores
    for (let i = 0; i < col1.length; i++) {
        col1[i].style.backgroundColor = getRandomHex();
    }
    //Rellenamos la tabla de colores
    for (let i = 0; i < col2.length; i++) {
        col2[i].style.backgroundColor = getRandomHex();
    }
}