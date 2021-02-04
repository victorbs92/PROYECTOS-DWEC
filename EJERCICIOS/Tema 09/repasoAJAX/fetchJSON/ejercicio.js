let documento = "";

function mostrar() {

    fetch("consulta1.php")
        .then(respuesta =>
            respuesta.json()
        )
        .then(archivoJSON => {
            documento = archivoJSON;
            for (let i = 0; i < archivoJSON.length; i++) {
                let option = document.createElement("option");
                option.setAttribute("value", archivoJSON[i].titulo);
                option.textContent = archivoJSON[i].titulo;
                document.getElementById("piscinas").appendChild(option);
            }
        })
}

function info() {
    let cadena = "";
    for (let i = 0; i < documento.length; i++) {
        if (documento[i].titulo === this.value) {
            cadena += `Código postal: ${documento[i].codigo_postal}<br>`;
            cadena += `Dirección: ${documento[i].direccion}<br>`;
            cadena += `Municipio: ${documento[i].municipio}<br>`;
        }

    }

    document.getElementById("contenedor").innerHTML = cadena;

}

document.getElementById("boton").addEventListener("click", mostrar);
document.getElementById("piscinas").addEventListener("change", info);