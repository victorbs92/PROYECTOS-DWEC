function Publicacion(editorial, titulo, precio) {
  this.editorial = editorial;
  this.titulo = titulo;
  this.precio = precio;
}

function Libro(tematica, autor, editorial, titulo, precio) {
  this.tematica = tematica;
  this.autor = autor;
  Publicacion.call(this, editorial, titulo, precio);
}

function Comic(guion, dibujo, personaje, coleccion, editorial, titulo, precio) {
  this.guion = guion;
  this.dibujo = dibujo;
  this.personaje = personaje;
  this.coleccion = coleccion;
  Publicacion.call(this, editorial, titulo, precio);
  /*
  El método call permite que un objeto tome las propiedades y métodos de un constructor distinto del suyo
  this, es la instancia de Comic. Dicha instancia podrá utilizar las propiedades de Publicación
  cuyos valores se los pasamos como argumento.
  Con este sistema no vinculamos a la instancia de Comic con el método de Publicación porque no afecta a los prototipos

  Esta explicación es similar para instancias de Libro
  */
}

Publicacion.prototype.verDatos = function () {
  console.log(`${this.titulo} `);
  if (this instanceof Libro) {
    console.log(this.autor);
  }
  if (this instanceof Comic) {
    console.log(this.guion, this.dibujo);
  }
};

/*
Vinculamos el prototype de Libro con el prototype de Publicacion para que las instancias de Libro hereden los métodos de Publicacion
Lo mismo con Comic
*/
Libro.prototype = Object.create(Publicacion.prototype);
Comic.prototype = Object.create(Publicacion.prototype);

libro1 = new Libro(
  "Ciencia Ficción",
  "Isaac Asimov",
  "Anagrama",
  "Fundacion",
  10
);
libro1.verDatos();

comic1 = new Comic(
  "pepe",
  "luis",
  "Torgal",
  "Torgal",
  "Delta",
  "El nacimiento de Torgal",
  14
);
comic1.verDatos();

comic2 = new Comic(
  "jose",
  "pedro",
  "Ragnar",
  "Logbruk",
  "KKKK",
  "Los barbaros",
  14
);
comic2.verDatos();

