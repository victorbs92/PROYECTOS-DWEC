document.addEventListener("DOMContentLoaded", function () {
  //Instanciamos el objeto XMLHtppRequest
  let ajax2 = new XMLHttpRequest();
  let provinciasCYL = [];
  document.getElementById("url").value = "covidcyl.csv";
  console.log("refresco");
  ajax2.open("GET", "./covidcyl.csv");
  ajax2.send();
  ajax2.addEventListener("load", function () {
    document.getElementById("provincias").innerHTML = "";
    let opcionGeneral = document.createElement("option");
    opcionGeneral.textContent = "Todas las provincias";
    opcionGeneral.setAttribute("value", "todas");
    document.getElementById("provincias").appendChild(opcionGeneral);
    let archivo = ajax2.responseText;
    let filas = archivo.split("\n");
    let provincia = "";
    let i;
    for (i = 1; i < filas.length - 1; i++) {
      provincia = filas[i].split(";")[1];
      if (provinciasCYL.indexOf(provincia) == -1) {
        provinciasCYL.push(provincia);
      }
    }
    let opcion;
    let fragmento = document.createDocumentFragment();
    for (i = 0; i < provinciasCYL.length; i++) {
      opcion = document.createElement("option");
      opcion.setAttribute("value", provinciasCYL[i]);
      opcion.textContent = provinciasCYL[i];
      fragmento.appendChild(opcion);
    }
    document.getElementById("provincias").appendChild(fragmento);
    console.log(provinciasCYL);
  });
});

document.getElementById("provincias").addEventListener("change", function (e) {
  ciudad = e.target.value;
});

//Etiqueta donde se introduce el nombre del fichero
let inputUrl = document.getElementById("url");
//ciudad seleccionada
let ciudad = "";

//Evento que se ejecuta cuando se hace click en el boton
document.getElementById("datosbtn").addEventListener("click", function () {
  console.log(ciudad);
  document.getElementById("tablaContenido").textContent = "";
  let ajax = new XMLHttpRequest();
  //Metodo open del objeto donde especificamos el tipo de solicitud y la ruta
  ajax.open("GET", inputUrl.value);

  //Enviamos la solicitud con el metodo send()
  ajax.send();

  //Evento que se dispara cuando el objeto ha cargado la informacion
  ajax.addEventListener("load", function () {
    //Obtenemos la informacion que ha recogido el objeto
    let informacionCSV = ajax.responseText;

    //Obtenemos un array con todas las filas
    let rows = informacionCSV.split("\n");

    //Creo la tabla donde se insertaran los datos
    let tabla = document.createElement("table");

    //Cabecera de la tabla
    let cabecera = rows[0].split(";");
    //Elementos de la tabla
    let th;
    let td;

    //Fila de la cabecera
    let tr = document.createElement("tr");

    for (let i = 0; i < cabecera.length; i++) {
      //Creamos en cada iteraccion del bucle un elemento th que es cada campo de la cabecera
      th = document.createElement("th");
      //Metemos el valor de cada campo dentro del th
      th.textContent = cabecera[i].toUpperCase();
      //Agregamos el th commo hijo a tr
      tr.appendChild(th);
    }
    //Agregamos la fila a la tabla
    tabla.appendChild(tr);

    //Array donde se guarda cada campo
    let datosFila = [];
    //Recorremos cada fila a partir de la 1 puesto que la 0 es la cabecera
    for (let i = 1; i < rows.length; i++) {
      if (rows[i].split(";")[1] === ciudad) {
        //Cojo cada fila y la spliteo por el ; para obtener cada valor del campo
        datosFila = rows[i].split(";");

        //Creo un tr por cada fila que haya
        tr = document.createElement("tr");
        for (let j = 0; j < datosFila.length; j++) {
          //Creo un td por cada campo y le asigno el valor
          td = document.createElement("td");
          td.textContent = datosFila[j];
          //Agrego cada td a la la fila
          tr.appendChild(td);
        }
        //Agrego cada fila a la tabla
        tabla.appendChild(tr);
      } else if (ciudad === "todas") {
        //Cojo cada fila y la spliteo por el ; para obtener cada valor del campo
        datosFila = rows[i].split(";");

        //Creo un tr por cada fila que haya
        tr = document.createElement("tr");
        for (let j = 0; j < datosFila.length; j++) {
          //Creo un td por cada campo y le asigno el valor
          td = document.createElement("td");
          td.textContent = datosFila[j];
          //Agrego cada td a la la fila
          tr.appendChild(td);
        }
        //Agrego cada fila a la tabla
        tabla.appendChild(tr);
      }
    }
    //Agrego la tabla entera al body del documento
    document.getElementById("tablaContenido").appendChild(tabla);
  });
});
