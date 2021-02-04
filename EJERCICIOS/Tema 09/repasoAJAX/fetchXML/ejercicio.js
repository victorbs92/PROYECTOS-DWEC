function mostrar() {

    fetch("consulta1.php")
        .then(respuesta =>
            respuesta.text()
        ) 
        .then(archivo => {
            let archivoParseado = new DOMParser();
            let xml = archivoParseado.parseFromString(archivo, "text/xml")
            for (let index = 0; index < xml.getElementsByTagName("departamento").length; index++) {
                let option = document.createElement("option");
                option.setAttribute("value", xml.getElementsByTagName("departamento")[index].getAttribute("nombre"));
                option.textContent = xml.getElementsByTagName("departamento")[index].getAttribute("nombre");
                document.getElementById("piscinas").appendChild(option);
            }
        })

}

document.getElementById("boton").addEventListener("click", mostrar);