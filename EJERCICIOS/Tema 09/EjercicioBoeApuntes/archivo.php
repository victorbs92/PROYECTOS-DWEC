<?php
$fecha=$_GET["fecha"];
header("Content-type:text/xml");
readfile("https://www.boe.es/diario_boe/xml.php?id=BOE-S-".$fecha);
?>