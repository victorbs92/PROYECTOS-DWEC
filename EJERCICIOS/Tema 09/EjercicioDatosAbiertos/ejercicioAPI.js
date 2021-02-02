document.getElementById("boton").addEventListener("click", function () {
  //Instanciamos el objeto XMLHtppRequest
  let ajax = new XMLHttpRequest();
  ajax.open("GET", document.getElementById("uri").value);
  ajax.send();
  ajax.addEventListener("load", function () {
    let archivo = ajax.responseText;
    document.getElementById("contenedor").textContent = archivo;
  });
});
