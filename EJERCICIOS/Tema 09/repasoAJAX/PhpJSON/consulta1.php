<?php

//AÑADIR LAS 2 CABECERAS CUANDO SEA UN ERROR DE CORS
header("Acces-Control-Allow-Headers:*");
header("Content-type:text/html");

//recogemos el archivo con el file_get_contents
$datos = file_get_contents("https://opendata.gijon.es/descargar.php?id=740&tipo=JSON");

$datosJSON = json_decode($datos);

$piscinas = array();

for ($i = 0; $i < count($datosJSON); $i++) {
    $piscina = $datosJSON[$i]->titulo;
    array_push($piscinas, $piscina);
}

//TODO LO QUE HAGAS CON ECHO EN PHP LO RECOGE LA VARIABLE AJAX.RESPONSETEXT
echo json_encode($piscinas);
