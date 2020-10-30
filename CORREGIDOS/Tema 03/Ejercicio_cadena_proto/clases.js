class Publicacion {
  constructor(editorial, titulo, precio) {
    this.editorial = editorial;
    this.titulo = titulo;
    this.precio = precio;
  }
  verDatos() {
    console.log(`${this.titulo} `);
    if (this instanceof Libro) {
      console.log(this.autor);
    }
    if (this instanceof Comic) {
      console.log(this.guion, this.dibujo);
    }
  }
}

class Libro extends Publicacion {
  constructor(tematica, autor, editorial, titulo, precio) {
    super(editorial, titulo, precio);
    this.tematica = tematica;
    this.autor = autor;
  }
}

class Comic extends Publicacion {
  constructor(guion, dibujo, personaje, coleccion, editorial, titulo, precio) {
    super(editorial, titulo, precio);
    this.guion = guion;
    this.dibujo = dibujo;
    this.personaje = personaje;
    this.coleccion = coleccion;
  }
}

libro1=new Libro("Ciencia Ficción","Isaac Asimov","Anagrama","Fundacion",10);
libro1.verDatos();

comic1=new Comic("pepe","luis","Torgal","Torgal","Delta","El nacimiento de Torgal",14)
comic1.verDatos();
/*
Usando clases  cada objeto instanciado hereda las propiedades y métodos de la superclase
Sin ningún tratamiento adicional
*/