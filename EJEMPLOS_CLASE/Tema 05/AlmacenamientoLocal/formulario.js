class Persona {
  constructor(calle, localidad) {
    this.calle = calle,
      this.localidad = localidad
  }
}

//Capturar controles del formulario
//Eventos del formulario
//let formulario = [txtBuscar, btnBuscar];
//Patron de diseño de espacio de nombres para identificar variables pertenecientes a una parte del programa
let formularioObj = {
  texto: document.getElementById("txtBuscar"),
  botonRegistro: document.getElementById("btnBuscar"),
  botonSesion: document.getElementById("btnSesion"),
};
formularioObj.botonRegistro.addEventListener("click", function () {
  //Introducir en almacenamiento local

  localStorage.setItem(formularioObj.texto.value, "");
});

formularioObj.botonSesion.addEventListener("click", () => {
  let visor = document.getElementById("visor");
  //Metodo getItem mirando si la Key existe
  /*if (localStorage.getItem(formularioObj.texto.value) === null) {
    visor.innerText = "El usuario no existe";
  } else {
    visor.innerText = `${formularioObj.texto.value} Bienvenido`;
  }*/
  //Metodo segun el indice de las Key
  let index;
  for (index = 0; index < localStorage.length; index++) {
    if (localStorage.key(index) === formularioObj.texto.value) {
      visor.innerText = `${formularioObj.texto.value} Bienvenido`;
      break;
    }
  }
  if (index === localStorage.length) {
    visor.innerText = "El usuario no existe";
  }
});

/*//Crear una clave usuario de almacenamiento local
//Verificamos que la clave usuarios existe y si no existe la creamos
if (localStorage.getItem("usuarios") === null) {
  //COn stringify te almacena tal cual el array pero con formato Strings, pero con corchetes,comas,etc
  localStorage.setItem("usuarios", JSON.stringify(["Juan", "Pedro", "Luis"]));
} else {
}*/

localStorage.setItem("usuarioX", JSON.stringify({
  direccion: {
    calle: "XXXXXXX",
    localidad: "YYYYYY"
  }
}));

localStorage.setItem("usuarioY", JSON.stringify(
  new Persona("ZZZZZZZZZ", "Valladolid")
));

if (localStorage.getItem("usuarioY") !== null) {
  let objetoUsuario = JSON.parse(localStorage.getItem("usuarioY"));
  objetoUsuario.localidad = "Burgos";
  localStorage.setItem("usuarioY", JSON.stringify(objetoUsuario));
}