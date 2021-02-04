<?php

header("Acces-Control-Allow-Headers:*");
header("Content-Type:text/html");

$archivo = file_get_contents("https://opendata.gijon.es/descargar.php?id=740&tipo=JSON");

echo $archivo;
