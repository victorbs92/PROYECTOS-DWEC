<?php

//AÑADIR LAS 2 CABECERAS CUANDO SEA UN ERROR DE CORS
#header("Acces-Control-Allow-Headers:*");
#header("Content-type:text/html");

//recogemos el archivo con el file_get_contents
$datos = file_get_contents("https://opendata.gijon.es/descargar.php?id=740&tipo=JSON");


//TODO LO QUE HAGAS CON ECHO EN PHP LO RECOGE LA VARIABLE AJAX.RESPONSETEXT
echo $datos;