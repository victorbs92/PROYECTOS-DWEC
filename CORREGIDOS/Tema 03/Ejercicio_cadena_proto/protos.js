/*
Declaración de los constructores 
*/
function Publicacion(editorial, titulo, precio) {
  this.editorial = editorial;
  this.titulo = titulo;
  this.precio = precio;
}


function Libro(tematica, autor) {
  this.tematica = tematica;
  this.autor = autor;
}

function Comic(guion, dibujo, personaje, coleccion) {
  this.guion = guion;
  this.dibujo = dibujo;
  this.personaje = personaje;
  this.coleccion = coleccion;
}

/*
Declaración del método verDatos
Queremos que verDatos sea heredado de por todos los objetos instanciados de
Publicacion, Comic y Libro
Lo agregamos al prototype de Publicacion porque
Al instanciar Libro o Comic, como estos heredan de Publicacion deben heredar también los métodos
*/

Publicacion.prototype.verDatos = function () {
  console.log(`${this.titulo} `);
  if (this instanceof Libro) { //this es el objeto instanciado. Puede haberlo sido desde Libro o Comic. Para averiguarlo evaluamos cual es su constructor
    console.log(this.autor);
  }
  if (this instanceof Comic) {
    console.log(this.guion, this.dibujo);
  }
};

/*
Instancias de objetos
*/
Libro.prototype = new Publicacion("Anagrama", "Fundacion", 10); //1.-conseguimos que cada instancia de Libro herede las propiedades y método de Publicacion
libro1 = new Libro("Ciencia Ficción", "Isaac Asimov");//2.-instancia de Libro
Libro.prototype.constructor = Libro; //3.-Recuperar el constructor de los objetos instanciados de Libro, porque en el paso 1 se perdió por Publicacion
libro1.verDatos();//4.-Llamada al método verDatos
Comic.prototype = new Publicacion("Delta", "El nacimiento de Torgal", 14);
comic1 = new Comic("pepe", "luis", "Torgal", "Torgal");
Comic.prototype.constructor = Comic;
comic1.verDatos();
Comic.prototype = new Publicacion("KKKK", "Los barbaros", 14);
comic2 = new Comic("jose", "pedro", "Ragnar", "Lodbrok");
Comic.prototype.constructor = Comic;
comic2.verDatos();

