import { Publicacion } from './publicacion.js';


class Libro extends Publicacion {

    constructor(nPag, editorial, titulo, precio, tematica, autor) {
        super(nPag, editorial, titulo, precio);
        this.tematica = tematica;
        this.autor = autor;
    }

}

export {
    Libro
};