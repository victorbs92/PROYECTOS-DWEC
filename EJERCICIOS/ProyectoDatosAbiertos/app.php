<?php

//AÑADIR LAS 2 CABECERAS CUANDO SEA UN ERROR DE CORS
header("Access-Control-Allow-Headers:*");
header("Content-type:text/html");

$URL = "https://analisis.datosabiertos.jcyl.es/api/records/1.0/search/?dataset=bibliotecas-bibliobuses-y-puntos-de-servicio-movil-geolocalizados&rows=-1&q=";

$datos = readfile($URL);

?>