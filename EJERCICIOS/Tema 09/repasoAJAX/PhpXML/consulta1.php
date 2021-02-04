
<?php

$xmlDoc=new DOMDocument();

$xmlDoc->load("https://opendata.gijon.es/descargar.php?id=740&tipo=XML");

$piscinas=$xmlDoc->getElementsByTagName("piscina");

for ($i=0; $i < count($piscinas) ; $i++) { 
    $piscina=$piscinas[$i]->getElementsByTagName("titulo")[0];
    echo $piscina->textContent."//";
}
