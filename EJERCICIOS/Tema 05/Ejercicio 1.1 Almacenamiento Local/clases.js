class Persona {

    constructor(nombre, direccion, telefonos) {
        this.nombre = nombre;
        this.direccion = direccion;
        this.telefonos = telefonos;
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
    Direccion

};