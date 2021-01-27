<?php

//www.boe.es

$ruta = "https://boe.es/diario_boe/xml.php?id=BOE-S-20210120";
$dataXML = simplexml_load_file($ruta);
$datosJson = json_encode($dataXML);
echo $datosJson;

?>