//VARAIBLES GLOBALES
let arrayBibliotecasTotales = new Array();


$(document).ready(function () {
    // antes de realizar la consulta cargamos nuestro gif
    let imgUrl = "https://media.giphy.com/media/y1ZBcOGOOtlpC/200.gif";
    $('.loadGIF').html('<img src="' + imgUrl + '" alt="cargando">');

    cargaDatosInicial();

    setTimeout(function () {
        //Limpiamos el contenido de "edit-content" eliminando la imangen antes de cargar los nuevos datos
        $('.loadGIF').html('');
        mostrarDatos(arrayBibliotecasTotales);
    }, 5000); // vamos a poner una demora de 5 segundos 

});

function cargaDatosInicial(d) {
    //documentFragment
    $.ajax({
        type: "get",
        url: "app.php",
        data: "data",
        dataType: "json",
        success: function (response) {

            response.records.forEach(element => {
                //console.log(element);
                arrayBibliotecasTotales.push(element);

            });

        },
        error: function (xhr, status) {
            alert('Disculpe, existió un problema -- ' + xhr.status + " : " + status);
        },
    });

}

function mostrarDatos(array) {
    let documentFragment = $(document.createDocumentFragment());
    let plantilla = "";
    let h3Nombre = "";
    let parrafoDireccion = "";
    let parrafoLocalidad = "";
    let parrafoProvincia = "";
    let parrafoDescripcion = "";
    let botonEnlace = "";
    let botonMapa = "";

    //recorremos el array que se recibe como parametro y creamos una "plantilla" por cada objeto, la añadimos al documentFragment y añadimos el docFrag al html
    array.forEach(element => {
        plantilla = $(`<div class='plantilla' id='${element.fields.identificador}A'></div>`);

        h3Nombre = $(`<h3>${element.fields.nombre_entidad}</h3>`);
        plantilla.append(h3Nombre);

        parrafoDireccion = $(`<p><span>Dirección: </span> ${element.fields.direccion}</p>`);
        plantilla.append(parrafoDireccion);

        parrafoLocalidad = $(`<p><span>Localidad: </span> ${element.fields.localidad}</p>`);
        plantilla.append(parrafoLocalidad);

        parrafoProvincia = $(`<p><span>Provincia: </span> ${element.fields.provincia}</p>`);
        plantilla.append(parrafoProvincia);

        parrafoDescripcion = $(`<p><span>Descripción: </span> ${element.fields.descripcion}</p>`);
        if (element.fields.descripcion !== undefined) {
            if (!element.fields.descripcion.includes('src=')) {
                plantilla.append(parrafoDescripcion);
            }
        }

        botonEnlace = $(`<button class='enlace'><a href = '${element.fields.enlace_contenido}' target='blank'>Ir a la web</a></button>`);
        plantilla.append(botonEnlace);

        botonMapa = $(`<input type='button' id='${element.fields.identificador}' class='mostrarMapa' value='Mostrar en el mapa'></input>`);
        plantilla.append(botonMapa);

        documentFragment.append(plantilla);

    });
    $('.main').append(documentFragment);
}


$(document).on('click', 'input[type="button"]', function (event) {

    let idBoton = this.id;

    if (idBoton === "buscar") { //si se ha pulsado el boton buscar del filtro por nombre

        let texto = $('#buscadorNombre').val();

        if (texto === "") { //si el texto esta en blanco muestra todas las bibliotecas
            $(".main").empty(); //limpia el main de su contenido
            mostrarDatos(arrayBibliotecasTotales)

        } else {
            //si el texto no esta vacio, pasa el texto a mayus y el nombre de la biblio a mayus y busca todas las bibliotecas que contengan ese texto en su nombre y las devuelve en un array
            let bibliotecas = arrayBibliotecasTotales.filter(element =>
                element.fields.nombre_entidad.toUpperCase().indexOf(texto.toUpperCase()) != -1);

            if (bibliotecas.length === 0) {
                $(".main").empty(); //limpia el main de su contenido
                $(".main").html("<br><h3>NO SE ENCNTRARON RESULTADOS</h3><br>");

            } else {
                $(".main").empty(); //limpia el main de su contenido
                mostrarDatos(bibliotecas); //muestra las bibliotecas filtradas
            }

        }

        console.log(texto);

    } else { //se recupera el id del boton pulsado y con ese id se accede al id de la plantilla en la que se encuentra

        let boton = $(`#${idBoton}`);
        let idPlantilla = idBoton + "A";
        let plantilla = $(`#${idPlantilla}`);
        let idDivMap = idBoton + "B";
        let divMap = $(`<div id='${idDivMap}' class='divMap'></div>`);

        //se comprueba si el boton contiene la clase mostrarMapa, si la tiene, se crea un contenedor para mostrar el mapa y se cambia el nombre del boton y se llama a pintarMapa
        if (boton.hasClass("mostrarMapa")) {
            boton.removeClass("mostrarMapa");
            boton.attr({
                "value": "Ocultar mapa"
            });
            plantilla.append(divMap);
            pintarMapa(idBoton, idDivMap); //el id del boton y el del objeto a buscar es el mismo

        } else { //si el boton no tiene la clase mostrarMpaa significa que el mapa esta mostrado y se procede a eliminar su contenedor, volver a añadir la clase al boton y cambiar el nombre 
            boton.addClass("mostrarMapa");
            boton.attr({
                "value": "Mostrar en el mapa"
            });
            $("div").remove(`#${idDivMap}`);
        }
    }




});

function pintarMapa(identificadorObjeto, identificadorDivMap) {

    let biblioteca = arrayBibliotecasTotales.find(element => element.fields.identificador == identificadorObjeto);
    let latitud = biblioteca.fields.latitud;
    let longitud = biblioteca.fields.longitud;
    let nombre = biblioteca.fields.nombre_entidad;
    let direccion = biblioteca.fields.direccion;
    let localidad = biblioteca.fields.localidad;
    let provincia = biblioteca.fields.provincia;

    //Creamos el punto a partir de la latitud y longitud de una dirección:
    let point = new google.maps.LatLng(latitud, longitud);

    //Configuramos las opciones indicando zoom, punto y tipo de mapa
    let myOptions = {
        zoom: 18,
        center: point,
        mapTypeId: 'roadmap'
    };

    //Creamos el mapa y lo asociamos a nuestro contenedor
    let map = new google.maps.Map(document.getElementById(identificadorDivMap), myOptions);

    //Mostramos el marcador en el punto que hemos creado
    let marker = new google.maps.Marker({
        position: point,
        map: map,
        title: `${nombre} - ${direccion}, ${localidad}(${provincia})`
        //title: "Nombre empresa - Calle Balmes 192, Barcelona"
    });

}