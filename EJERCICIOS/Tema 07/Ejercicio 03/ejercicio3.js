 //capturar elementos del html
 let [lista] = document.getElementsByTagName("ul");
 let li = document.getElementsByTagName("li");
 //variables
 let posicion = 0;

 //metodos
 let clickLista = function (evento) {
     if (evento.target.tagName === "A") {
         evento.target.style.color = "red";
     }
 };
 let recorerLista = function (evento) {
     switch (evento.keyCode) {
         //si sube
         case 38:
             if (posicion === 0) {
                 li[posicion].focus();
             } else {
                 posicion--;
                 li[posicion].focus();
             }
             break;
             //si baja
         case 40:
             if (posicion === li.length - 1) {
                 li[posicion.length - 1].focus();
             } else {
                 posicion++;
                 li[posicion].focus();
             }

             break;

     }

 }

 //capturar los controladores
 lista.addEventListener("click", clickLista);
 document.addEventListener("keydown", recorerLista);
 window.addEventListener("load", function () {
     li[0].focus();
 });