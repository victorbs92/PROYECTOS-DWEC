//Creamos el objeto XMLHttpRequest
const ajax = new XMLHttpRequest();

window.onload = function () {
    //Llamamos al evento readystatechange para que cuando este en estado 0 cargue la url
    if(ajax.readyState===0){
        document.getElementById("url").value=window.location.href;
    }
}

document.getElementById("boton").addEventListener("click", function () {


    //Añadimos los eventos al objeto de los diferentes estados
    //Sirve para imprimir las cabeceras deñ archivo, spñp se activa cuando se reciben todos los datos del servidor, por lo tanto solo se activa en estado 4
    ajax.addEventListener("load", function () {
        document.getElementById("text").value = ajax.responseText;
    });

    //Se produce cada vez que se realiza un cambio de estado de peticion
    //Los estados se recogen con la propiedad readyState
    //Estado 0: no se ha invocado el evento open, no se ha inicializado
    //Estado 1: se ha ejecutado el metodo open() pero no se ha ejecutado el metodo send()
    //Estado 2: se ha invocado el metodo send() pero el servidor no ha respondido
    //Estado 3: ha recibido algunos datos pero no puede utilizar responseText
    //Estado 4: carga completa, se ejecuta el evento load
    ajax.addEventListener("readystatechange", function () {
        switch (ajax.readyState) {
            case 0:
                let p = document.createElement("p");
                p.textContent = ajax.statusText;
                let p7 = document.createElement("p");
                p7.textContent = ajax.readyState;
                document.getElementById("codigos").appendChild(p);
                document.getElementById("estados").appendChild(p7);
        
                break;
            case 1:
                let p1 = document.createElement("p");
                p1.textContent = ajax.statusText;
                let p8 = document.createElement("p");
                p8.textContent = ajax.readyState;
                document.getElementById("codigos").appendChild(p1);
                document.getElementById("estados").appendChild(p8);
                break;
            case 2:
                let p2 = document.createElement("p");
                p2.textContent = ajax.statusText;
                let p9 = document.createElement("p");
                p9.textContent = ajax.readyState;
                document.getElementById("codigos").appendChild(p2);
                document.getElementById("estados").appendChild(p9);
                break;
            case 3:
                let p3 = document.createElement("p");
                let texto = document.createTextNode(ajax.statusText);
                p3.appendChild = texto;

                let p4 = document.createElement("p");
                p4.textContent = ajax.getAllResponseHeaders();
                let p10 = document.createElement("p");
                p10.textContent = ajax.readyState;
                document.getElementById("codigos").appendChild(p3);
                document.getElementById("cabeceras").appendChild(p4);
                document.getElementById("estados").appendChild(p10);
                break;
            case 4:
                if (ajax.status >= 200 && ajax.status < 300) {
                    let p5 = document.createElement("p");
                    p5.textContent = ajax.statusText;
                    let p11 = document.createElement("p");
                    p11.textContent = ajax.readyState;
                    document.getElementById("codigos").appendChild(p5);
                    document.getElementById("estados").appendChild(p11);
                  }
                  if (ajax.status >= 500 && ajax.status < 600) {
                    let p6 = document.createElement("p");
                    p6.textContent = ajax.statusText;
                    let p12 = document.createElement("p");
                    p12.textContent = ajax.readyState;
                    document.getElementById("codigos").appendChild(p6);
                    document.getElementById("estados").appendChild(p12);
                  }
                break;
        
            default:
                break;
        }
    });

    //Este evento se dispara cuando ocurre cualquier error
    ajax.addEventListener("error", function () {
        let p7 = document.createElement("p");
        p7.textContent = ajax.statusText;
        document.getElementById("codigos").appendChild(p7);
    });


    //Realizamos la peticion al servidor
    ajax.open("GET",document.getElementById("url").value);
    ajax.send();
});
