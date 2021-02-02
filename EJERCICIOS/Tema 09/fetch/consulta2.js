fetch("consulta.php")
  .then((respuesta) => respuesta.text())
  .then((texto) => {
    let parser = new DOMParser();
    let docXML = parser.parseFromString(texto, "text/xml");
    console.log(docXML.getElementsByTagName("fechaPub")[0].textContent);
  });
