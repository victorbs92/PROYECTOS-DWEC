// LOGICA DE FACTURA

let factura = {
    empresa: { },
    cliente: { },
    articulos: [ ],
    importe_total: 0,
    iva: 0,
    forma_pago: 0,

    aniadirArticulo(descripcion, precio, cantidad) {
        this.articulos.push({ descripcion, precio, cantidad });
    },

    rellenarFactura(datosEmpresa, datosCliente, forma_pago, iva) {
        this.empresa = datosEmpresa;
        this.cliente = datosCliente;
        this.forma_pago = forma_pago;
        this.iva = iva;
    },

    calcularImporteTotal() {
        this.importe_total = this.articulos.reduce((acc, cur) => {
            acc += cur.precio * cur.cantidad;
            return acc;
        }, 0) * (Number(this.iva / 100) + 1);
    },

    mostrarInformacion(contenedor) {
        contenedor.innerText = JSON.stringify(this, null, 2);
    },
};








