let ls = window.localStorage; //accede al localStorage
let botonComenzar = document.getElementById("comenzar");
let botonTerminar = document.getElementById("terminar");


window.addEventListener("load", reloj(this.event)); //cuando se carga la pg se llama a la funcion reloj

botonComenzar.addEventListener("click", () => { //cuando se pulsa el boton comenzar se obtienen los minutos del input y se guardan en el localstorage y se pone la variable mostrarDatos del localstorage en "no" y se recarga la pg
    ls.setItem('mostrarDatos', "no");
    ls.setItem("botonComenzar", "si");
});


botonTerminar.addEventListener("click", () => { //cuando se pulsa el boton terminar se ponen los minutos del ls a 0 y mostrarDatos en "si" y se recarga la pg
    ls.setItem('minutos', 0);
    ls.setItem('mostrarDatos', "si");
});

function reloj(e) {

    document.getElementById("minutosEjecucion").focus();

    let minutos = ls.getItem('minutos'); //guarda en una variable el valor de "minutos" del localStorage
    ls.setItem("csvValido", "no");

    if (ls.getItem("botonComenzar") === "si" && ls.getItem("mostrarDatos") === "no") {

        desactivarInputsActivarBotonTerminar();

        let crono = document.getElementById("crono");

        // Set the date we're counting down to
        let countDownDate = new Date().getTime() + minutos * 1000 * 60;

        // Update the count down every 1 second
        let intervalo = setInterval(function () {

            // Get today's date and time
            let now = new Date().getTime();

            // Find the distance between now and the count down date
            let totalTime = countDownDate - now;

            // Time calculations for days, hours, minutes and seconds
            let days = Math.floor(totalTime / (1000 * 60 * 60 * 24));
            let hours = Math.floor((totalTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((totalTime % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((totalTime % (1000 * 60)) / 1000);

            if (seconds % 2 == 0) { //cada 2 segundos se llama a mostrar resultados para que se actualicen los datos en la pantalla
                mostrarResultados();
            }

            // Output the result in an element with id="crono"
            crono.innerHTML = days + "d " + hours + "h " +
                minutes + "m " + seconds + "s ";

            // If the count down is over, write some text 
            if (totalTime <= 0) { //si el tiempo se acaba se cierra el intervalo, se resetean los minutos del ls y mostrarDatos se pone en "si"
                clearInterval(intervalo);
                ls.setItem("minutos", 0);
                ls.setItem('mostrarDatos', "si");
                ls.setItem("botonComenzar", "no");
                cerrarProcesosServidor(); //se llama a la funcion que cierra todos los procesos abiertos en el servidor menos el hilo principal
            }

        }, 1000);

    } else if (ls.getItem('mostrarDatos') === "si") { //si mostrarDatos es si se llama a mostrarResultados
        ls.setItem("botonComenzar", "no");
        mostrarResultados();
    }

    function cerrarProcesosServidor() { //para cerrar los procesos del servidor creamos un campo oculto y lo añadimos al form del html, asi cuando se envie, el servidor validara este campo y si existe cerrara los procesos desde el propio server
        let input = document.createElement("input");
        input.setAttribute("type", "hidden");
        input.setAttribute("name", "pararProcesos");
        input.setAttribute("value", "si");
        //append to form element that you want .
        document.getElementById("campoOculto").appendChild(input);
        document.forms[0].submit(); //envia el formulario y recarga la pg
    }

    function activarDesactivarBotonComenzar() {

        let minutos = min.value;
        ls.setItem("minutos", minutos);
        console.log(minutos);
        if (minutos !== null && minutos !== "0" && minutos !== 0 && minutos !== "" && minutos !== undefined && ls.getItem("csvValido") ==="si") {
            botonComenzar.removeAttribute("disabled");
            botonComenzar.classList.remove("desactivado");
            botonComenzar.classList.add("activado");
        } else {
            botonComenzar.setAttribute("disabled", "true");
            botonComenzar.classList.add("desactivado");
            botonComenzar.classList.remove("activado");
        }

    }

    function desactivarInputsActivarBotonTerminar() {
        let inputFile = document.getElementById("matriz");
        let inputNumber = document.getElementById("minutosEjecucion");
        inputFile.setAttribute("disabled", "true");
        inputNumber.setAttribute("disabled", "true");
        botonTerminar.removeAttribute("disabled");
        botonTerminar.classList.remove("desactivado");
        botonTerminar.classList.add("activado");
    }

    let min = document.getElementById("minutosEjecucion");
    min.addEventListener("change", () => {
        activarDesactivarBotonComenzar();
    });


    document.getElementById('matriz').addEventListener('change', validarCSV, false); //cuando se produce algun cambio en el input file se llama a validarCSV que comprueba si es valido el archivo seleccionado por el usuario

    function validarCSV(evt) {
        let mensajeValidacion = document.getElementById("mensajeValidacion");
        let file = evt.target.files[0];
        let reader = new FileReader();
        reader.onload = (e) => {
            // Cuando el archivo se terminó de cargar
            let lines = parseCSV(e.target.result);
            console.log(e.target.result)
            let matrizCSV = reverseMatrix(lines);
            if (matrizCSV === null) {
                mensajeValidacion.style.color = "red";
                mensajeValidacion.innerHTML = "ARCHIVO NO COMPATIBLE. SELECCIONE OTRO ARCHIVO";
                ls.setItem("csvValido", "no");
                activarDesactivarBotonComenzar();
            } else {
                mensajeValidacion.style.color = "green";
                mensajeValidacion.innerHTML = "ARCHIVO CSV VÁLIDO";
                ls.setItem("csvValido", "si");
                activarDesactivarBotonComenzar();
                generarXY(matrizCSV); //si el archivo es válido llama a generarXY
            }

        };
        // Leemos el contenido del archivo seleccionado
        reader.readAsBinaryString(file);

    }

    function parseCSV(text) {
        // Obtenemos las lineas del texto
        let lines = text.trim();
        lines = lines.replace(/\r/g, '').split('\n');

        return lines.map(line => {
            // Por cada linea obtenemos los valores
            let values = line.split(',');
            return values;
        });
    }

    function reverseMatrix(matrix) {
        let numFilas = matrix.length;
        let output = [];
        let flag = false;
        let contElementosPorColumna = 0 //para comprobar que haya el mismo numero de filas que de columnas
        // Por cada fila
        console.log(matrix)
        matrix.forEach((values, row) => {
            contElementosPorColumna = 0;
            // Vemos los valores y su posicion
            values.forEach((value, col) => {
                contElementosPorColumna++;
                if (value === "" || value === undefined || isNaN(value) || value < 0) {
                    flag = true;
                }
                // Si la posición aún no fue creada
                if (output[col] === undefined) {
                    output[col] = [];
                }
                output[col][row] = value;
            });
            if (contElementosPorColumna !== numFilas) {
                flag = true;
            }
        });
        if (flag === true) {
            return null
        } else {
            return output;
        }
    }

    function generarXY(matrizCSV) { //se generan las variables con los datos que luego necesitará la funcion de mostrar resultados
        let arrayX = new Array();
        let arrayY = new Array();
        let ciudades = new Array();
        let max = matrizCSV.length + matrizCSV.length / 3;
        let min = matrizCSV.length - matrizCSV.length / 3;

        for (i = 0; i < matrizCSV.length; i++) {

            ciudades.push("C." + i);
            if (i % 2 !== 0) {
                arrayY.push(Math.floor(Math.random() * (max - min)) + min);
                arrayX.push(i + 1);
            } else {
                arrayY.push(Math.floor(Math.random() * (matrizCSV.length / 2 - 1)) + 1);
                arrayX.push(i + 1);
            }

        }

        arrayX.push(arrayX[0]);
        arrayY.push(arrayY[0]);

        let arrayXLS = JSON.stringify(arrayX);
        let arrayYLS = JSON.stringify(arrayY);
        let ciudadesLS = JSON.stringify(ciudades);
        ls.setItem('arrayXLS', arrayXLS);
        ls.setItem('arrayYLS', arrayYLS);
        ls.setItem('ciudadesLS', ciudadesLS);

    }

    function mostrarResultados() { //esta funcion muestra los resultados de los algoritmos
        let expresionRegular = /\s*=>\s*/; //expresion regular que elimina los espacios y se queda con "=>"
        ls.setItem('mostrarDatos', 'no');
        $.ajax({ //funcion ajax para recoger los datos del txt del servidor donde se han guardado los resultados del algoritmo
            url: "/static/MontecarloResultados.txt",
            dataType: "text",
            success: function (data) {
                let ciudades = data.split(expresionRegular);
                ciudades.splice(0, 1); //elimina el primer elemento
                ciudades[ciudades.length - 1] = ciudades[ciudades.length - 1].slice(0, -3) //elimina los espacios del final del ultimo elemento del array 
                ciudades.unshift(ciudades[ciudades.length - 1]); //añade al principio del array el mismo elemento que hay al final del array, para conseguir que la ruta vuelva al lugar de origen
                mostrarGrafica(ciudades, 1);
                let resultados = data.split(/\n/); //se guarda en una variable el resultado de splitear los datos con un salto de linea
                $("#ite1").text(resultados[0]);
                $("#dis1").text(resultados[1]);
                $("#rut1").text(resultados[2]);
            }
        });

        $.ajax({
            url: "/static/FuerzaBrutaResultados.txt",
            dataType: "text",
            success: function (data) {
                let ciudades = data.split(expresionRegular);
                ciudades.splice(0, 1); //elimina el primer elemento
                ciudades[ciudades.length - 1] = ciudades[ciudades.length - 1].slice(0, -3) //elimina los espacios del final del ultimo elemento del array 
                ciudades.unshift(ciudades[ciudades.length - 1]); //añade al principio del array el mismo elemento que hay al final del array, para conseguir que la ruta vuelva al lugar de origen
                mostrarGrafica(ciudades, 2);
                let resultados = data.split(/\n/); //se guarda en una variable el resultado de splitear los datos con un salto de linea
                $("#ite2").text(resultados[0]);
                $("#dis2").text(resultados[1]);
                $("#rut2").text(resultados[2]);
            }
        });
        /* DESCOMENTAR CUANDO ESTE LISTO ESTE ALGORITMO/////////////////////////////////////////////////////////////!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        $.ajax({
            url: "/static/VecinoMasCercanoResultados.txt", 
            dataType: "text",
            success: function (data) {
                let ciudades = data.split(expresionRegular);
                ciudades.splice(0,1); //elimina el primer elemento
                ciudades[ciudades.length-1] = ciudades[ciudades.length-1].slice(0, -3) //elimina los espacios del final del ultimo elemento del array 
                ciudades.unshift(ciudades[ciudades.length-1]); //añade al principio del array el mismo elemento que hay al final del array, para conseguir que la ruta vuelva al lugar de origen
                mostrarGrafica(ciudades, 3);
                let resultados = data.split(/\n/); //se guarda en una variable el resultado de splitear los datos con un salto de linea
                $("#ite3").text(resultados[0]);
                $("#dis3").text(resultados[1]);
                $("#rut3").text(resultados[2]);
            }
        });
        */
    }

    function mostrarGrafica(ruta, algoritmo) { //funcion que recibe la ruta que tiene que pintar y el algoritmo del que tiene que mostrar los datos
        //creamos las variables necesarias, algunas con valores recogidos del localStorage
        let arrayXLS = JSON.parse(ls.getItem('arrayXLS'));
        let arrayYLS = JSON.parse(ls.getItem('arrayYLS'));
        let ciudadesLS = JSON.parse(ls.getItem('ciudadesLS'));
        let arrayX = new Array();
        let arrayY = new Array();
        let ciudades = new Array();
        let aux = 0;
        for (i = 0; i < ruta.length; i++) { //carga en las variables los datos necesarios para pintarlos, para ello, obtiene los datos de las variables del localStorage
            aux = parseInt(ruta[i].substring(ruta[i].length - 2, ruta[i].length).trim());
            arrayX.push(arrayXLS[aux]);
            arrayY.push(arrayYLS[aux]);
            ciudades.push(ciudadesLS[aux]);
        }

        //añade al final de cada array el primer elemento de cada array, se hace para conseguir la ruta "circular"
        arrayX.push(arrayX[0]);
        arrayY.push(arrayY[0]);
        ciudades.push(ciudades[0]);

        //se crea el objeto con los datos que necesita la clase que pinta los resultados y guarda en el array 
        var trace = {
            x: arrayX,
            y: arrayY,
            mode: "lines+markers+text",
            type: "scatter",
            text: ciudades
        };

        var data = [trace];

        switch (algoritmo) { //dependiendo de que algoritmo se le haya pasado a la funcion, pinta en un campo u otro
            case 1: {
                Plotly.newPlot("gra1", data);
                break;
            }
            case 2: {
                Plotly.newPlot("gra2", data);
                break;
            }
            case 3: {
                Plotly.newPlot("gra3", data);
                break;
            }
            default: {
                return null;
            }
        }

    }

}