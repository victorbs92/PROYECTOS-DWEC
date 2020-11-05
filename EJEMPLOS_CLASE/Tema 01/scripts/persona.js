let persona = {
  iden: ["pepe", "lopez", "rodriguez"], //PROPIEDAD ARRAY
  edad: 20, //PROPIEDAD TIPO NUMBER
  direccion: {
    //PROPIEDAD TIPO OBJECT

    calle: "Villabañez s/n",
    poblacion: "Valladolid",
    provincia: "Valladolid",
    cp: 47001,
  },
  casado: true, //PROPIEDAD TIPO BOOLEAN
  nombreCompleto: function () {
    // METODO
    console.log(this.iden.toString());
  },
};
