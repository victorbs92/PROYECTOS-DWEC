// LOGICA DE FORMULARIO
let btnAniadirArticulo = document.getElementById('btn_aniadir_articulo');
let btnProcesarDatos = document.getElementById('btn_procesar_datos');
let contenedorInformacion = document.getElementById('detalle_factura');

const eleminarEventoPredefinido = e => e.preventDefault();

btnAniadirArticulo.onclick = eleminarEventoPredefinido;
btnProcesarDatos.onclick = eleminarEventoPredefinido;

// Lógica de Añadir artículo
btnAniadirArticulo.addEventListener('click', () => {
    let descripcionArticulo = document.getElementById('descripcion').value;
    let cantidadArticulo = document.getElementById('cantidad').value;
    let precioArticulo = document.getElementById('precio').value;

    factura.aniadirArticulo(descripcionArticulo, precioArticulo, cantidadArticulo);
});

// Lógica de Procesar y Mostrar datos
btnProcesarDatos.addEventListener('click', () => {
    let datosEmpresa = {
        nombre: document.getElementById('nombre_empresa').value,
        direccion: document.getElementById('direccion_empresa').value,
        telefono: document.getElementById('telefono_empresa').value,
        nif: document.getElementById('nif_empresa').value,
    };
    let datosCliente = {
        nombre: document.getElementById('nombre_cliente').value,
        direccion: document.getElementById('direccion_cliente').value,
        telefono: document.getElementById('telefono_cliente').value,
        nif: document.getElementById('nif_cliente').value,
    };
    let iva = document.getElementById('iva').value;
    let pago = document.getElementById('pago').value;
  
    factura.rellenarFactura(datosEmpresa, datosCliente, pago, iva);
    factura.calcularImporteTotal();
    factura.mostrarInformacion(contenedorInformacion);
});
