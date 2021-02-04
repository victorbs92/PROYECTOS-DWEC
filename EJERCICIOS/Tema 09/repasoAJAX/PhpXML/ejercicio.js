//https://opendata.gijon.es/descargar.php?id=740&tipo=JSON
//https://opendata.gijon.es/descargar.php?id=740&tipo=XML


function mostrar() {

    //1º se crea el objeto
    const ajax = new XMLHttpRequest();

    //2º se asigna el evento al objeto
    ajax.addEventListener("readystatechange", function () {

        switch (ajax.readyState) {
            case 4:
                if (ajax.status >= 200 && ajax.status < 300) {
                    //AQUI RECOGEMOS TODO LO QUE SE HAYA IMPRIMIDO CON ECHO EN EL PHP
                    let archivo = ajax.responseText;

                    let piscinas = archivo.split("//");

                    piscinas.pop();

                    for (let index = 0; index < piscinas.length; index++) {
                        let option = document.createElement("OPTION");
                        option.setAttribute("value", piscinas[index]);
                        option.textContent = piscinas[index];
                        document.getElementById("piscinas").appendChild(option);
                    }

                }
                break;

            default:
                break;
        }

    });

    //3º se configura la peticion
    ajax.open("GET", "consulta1.php");

    //4º se envia la peticion
    ajax.send();

}

function mostrarPiscina(e) {

    //1º se crea el objeto
    const ajax = new XMLHttpRequest();

    //2º se asigna el evento al objeto
    ajax.addEventListener("readystatechange", function () {

        switch (ajax.readyState) {
            case 4:
                if (ajax.status >= 200 && ajax.status < 300) {
                    //AQUI RECOGEMOS TODO LO QUE SE HAYA IMPRIMIDO CON ECHO EN EL PHP
                    let archivo = ajax.responseText;
                    document.getElementById("div").innerHTML = archivo;

                }
                break;

            default:
                break;
        }

    });

    //3º se configura la peticion
    ajax.open("GET", `consulta2.php?nombre=${e.target.value}`);

    //4º se envia la peticion
    ajax.send();


}

document.getElementById("boton").addEventListener("click", mostrar);

document.getElementById("piscinas").addEventListener("change", mostrarPiscina);