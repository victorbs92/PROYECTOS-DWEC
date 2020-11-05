class Persona {

    constructor(nombre, direccion, telefonos) {
        this.nombre = nombre;
        this.direccion = direccion;
        this.telefonos = telefonos;
    }

}

class Telefono {

    constructor(movil, casa, trabajo) {
        this.movil = movil;
        this.casa = casa;
        this.trabajo = trabajo;
    }

}

class Direccion {

    constructor(calleNumPiso, poblacion, provincia) {
        this.calleNumPiso = calleNumPiso;
        this.poblacion = poblacion;
        this.provincia = provincia;
    }

}

export {

    Persona as Contacto,
    Telefono,
    Direccion

};