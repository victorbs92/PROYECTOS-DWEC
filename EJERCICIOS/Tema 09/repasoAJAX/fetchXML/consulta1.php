<?php

header("Content-Type:text/xml");

readfile("https://boe.es/diario_boe/xml.php?id=BOE-S-20210202");
