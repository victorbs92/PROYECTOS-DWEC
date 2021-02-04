<?php

//recogemos el valor pasado por el GET
$nombrePiscina = $_GET["nombre"];

//AÑADIR LAS 2 CABECERAS CUANDO SEA UN ERROR DE CORS
header("Acces-Control-Allow-Headers:*");
header("Content-type:text/html");

//recogemos el archivo con el file_get_contents
$datos = file_get_contents("https://opendata.gijon.es/descargar.php?id=740&tipo=XML");

$datosJSON = json_decode($datos);


for ($i = 0; $i < count($datosJSON); $i++) {
    if ($nombrePiscina == $datosJSON[$i]->titulo) {
        echo "Código Postal: " . $datosJSON[$i]->codigo_postal;
        echo "Descripción: " . $datosJSON[$i]->descripcion;
        echo "Municipio: " . $datosJSON[$i]->municipio;
    }
}


