class Libro extends Publicacion {
    constructor(tematica, autor, nPag, editorial, titulo, precio) {
        super(nPag, editorial, titulo, precio);

        this.tematica = tematica;
        this.autor = autor;
    }
}
