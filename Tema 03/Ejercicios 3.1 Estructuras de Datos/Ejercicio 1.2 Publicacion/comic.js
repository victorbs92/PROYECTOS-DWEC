import { Publicacion } from './publicacion.js';


class Comic extends Publicacion {

    constructor(nPag, editorial, titulo, precio, coleccion, personaje, guion, dibujo) {
        super(nPag, editorial, titulo, precio);
        this.coleccion = coleccion;
        this.personaje = personaje;
        this.guion = guion;
        this.dibujo = dibujo;
    }

}

export {
    Comic
};