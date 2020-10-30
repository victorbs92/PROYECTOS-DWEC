export const agenda = {

    datos: [],

    agregar(objPersona) {
        //agregar persona a datos.
        //se agrega al pulsar el boton agregar.
        this.datos.push(objPersona);
    },

    buscar(nombre) {
        //buscar una persona del array "datos" por su nombre.
        //lo encontraremos en el "control nombre" del formulario.
        //se ejecuta al pulsar el boton buscar.
        let contacto;

        this.datos.forEach(element => {
            if (element.nombre == nombre) {
                contacto = element;
            }
        });
        return contacto;
    }

}