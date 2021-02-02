/*function boe(){
let etiqueta=document.getElementById("fecha");
etiqueta.addEventListener("change",mostrarBoe);
}
*/
let select=document.createElement("SELECT");

function mostrarBoe(){
    select.textContent="";
    let fragmento=new DocumentFragment();
    let etiqueta=document.getElementById("fecha");
    let ajax=new XMLHttpRequest();
    ajax.addEventListener("readystatechange",function(){
        switch (ajax.readyState) {
            case 4:
                if(ajax.status>=200 && ajax.status<300){
                    let texto=ajax.responseXML;
                    let documentoXML=texto.documentElement;
                    let secciones=documentoXML.getElementsByTagName("seccion");
                    for (let i = 0; i < secciones.length; i++) {
                        let seccion=secciones[i].getAttribute("nombre");
                        let opcion=document.createElement("OPTION");
                        opcion.setAttribute("value",seccion);
                        opcion.textContent=seccion;
                        select.appendChild(opcion);                      
                    }
                    fragmento.appendChild(select);
                    etiqueta.after(fragmento);
                }
                break;
        }       
    });
    ajax.open("GET",`archivo.php?${etiqueta.getAttribute("name")}=${etiqueta.value}`);
    ajax.send();
}

function mostrarTitulo(seccion){
    let etiqueta=document.getElementById("fecha");
    let ajax=new XMLHttpRequest();
    ajax.addEventListener("readystatechange",function(){
        switch (ajax.readyState) {
            case 4:
                if(ajax.status>=200 && ajax.status<300){
                    let texto=ajax.responseXML;
                    let documentoXML=texto.documentElement;
                    let secciones=documentoXML.getElementsByTagName("seccion");
                    for (let i = 0; i < secciones.length; i++) {
                        if(secciones[i].getAttribute("nombre")==seccion){
                            [...secciones[i].getElementsByTagName("titulo")].forEach(titulo=>{
                                console.log(titulo.textContent);
                            })
                        }
                        
                    }
                }
                break;
        }       
    });
    ajax.open("GET",`archivo.php?${etiqueta.getAttribute("name")}=${etiqueta.value}`);
    ajax.send();
}

select.addEventListener("change",function(){
    mostrarTitulo(this.value);
});
document.getElementById("btn").addEventListener("click",mostrarBoe);