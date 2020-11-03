//IMPORTS
import { Libro } from './libro.js';
import { Comic } from './comic.js';

let libro = new Libro(10,"Mi editorial libro", "Mi titulo libro", 15, "Mi tematica libro", "Mi autor libro");
let comic = new Comic(20,"Mi editorial comic", "Mi titulo comic", 5,"Mi coleccion comic", "Mi personaje comic", "Mi guion comic", "Mi dibujo comic");

console.log(Object.values(libro));
console.log(Object.values(comic));