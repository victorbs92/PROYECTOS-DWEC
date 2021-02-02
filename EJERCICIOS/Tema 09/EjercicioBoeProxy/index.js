function Boe() {
    let fecha=document.getElementById("fecha");
    fecha.addEventListener("change", exportarBoe);
}

function exportarBoe() {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener("readystatechange", function () {
    switch (xhr.readyState) {   
        case 4:
            console.log("holaaa");
            if(xhr.status>=200 && xhr.status<300){
                let boe=xhr.responseXML;
                let docBoe=boe.documentElement;
                let departamentos=docBoe.getElementsByTagName("departamento");
                let cadena="<ul>";
                for (let i = 0; i < departamentos.length; i++) {
                 cadena+=`<li>${departamentos[i].getAttribute("nombre")}</li>`;
                    
                }
                cadena+="</ul>"
                document.getElementById("contenedor").innerHTML=cadena;
            }
            break;
    }


  });

  xhr.open("GET",`http://localhost/EjercicioBoeProxy/fichero.php?id=${fecha.value}`);
  xhr.send();
}

window.addEventListener("DOMContentLoaded", Boe);
