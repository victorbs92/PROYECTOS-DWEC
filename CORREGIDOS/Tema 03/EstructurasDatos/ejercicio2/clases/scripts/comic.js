class Comic extends Publicacion {
    constructor(coleccion, personaje, guion, dibujo, nPag, editorial, titulo, precio) {
        super(nPag, editorial, titulo, precio);

        this.coleccion = coleccion;
        this.personaje = personaje;
        this.guion = guion;
        this.dibujo = dibujo;
    }
}
