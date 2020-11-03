class Factura {

    constructor(importeTotal, tipoIVA, formaPago, empresa, cliente, listaElementos) {
        this.importeTotal = importeTotal;
        this.tipoIVA = tipoIVA;
        this.formaPago = formaPago;
        this.empresa = empresa;
        this.cliente = cliente;
        this.listaElementos = listaElementos;

    }

}

export {
    Factura
};