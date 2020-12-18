function mostrarImagen(){
    let imagen= document.getElementById('imagen');
    let margen=20;

    let izquierda = imagen.offsetLeft;
    let alto = imagen.offsetTop;
    let ancho = imagen.width;
    let largo = imagen.height;

    cx=parseInt(Math.random() * ancho)*10;
    cy=parseInt(Math.random() * largo)*10;

    if (cx>margen){
        cx-=margen;
    }
    if (cy>margen){
        cy-=margen;
    }

    izquierda+=cx;
    alto+=cy;

    let imagenN = document.createElement("img");
    imagenN.setAttribute('src','mole.gif');
    imagenN.setAttribute('class','img');
    imagenN.style.left = izquierda + "px";
    imagenN.style.top = alto + "px";
    document.body.appendChild(imagenN);
}

function getRandomInt(min, max){
    return Math.floor(Math.random() * (max-min)) + min; 
}

window.onload = function(){
    for (let index = 0; index < 3; index++) {
        mostrarImagen();
    }
}


    




