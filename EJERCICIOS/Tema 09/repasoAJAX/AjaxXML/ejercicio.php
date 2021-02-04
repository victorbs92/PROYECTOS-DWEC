<?php

//AÑADIR ESTA CABECERA CUANDO SEA UN ERROR DE CORS
#header("Acces-Control-Allow-Headers:*");

//AÑADIR ESTA CABECERA SIEMPRE QUE SE QUIERA LEER UN ARCHIVO XML
header("Content-type:text/xml");

//EL READFILE TE DUEVUELVE DIRECTAMENTE EL CONTENIDO A JAVASCRIPT
readfile("https://opendata.gijon.es/descargar.php?id=740&tipo=XML");
