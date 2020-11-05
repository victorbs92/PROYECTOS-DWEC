let usuarios = {
  datos: [],
  buscar(usuario) {
    return this.datos.find((elemento) => elemento === usuario);
  },
};
