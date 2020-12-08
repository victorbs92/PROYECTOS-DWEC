/*
Función para validar los controles de cada fieldset. 
Es llamada antes de llamar al almacenamiento local
Se le pasa como argumento los controles de un fieldset y devuelve true o false
Si true los controles son válidos y si es false es que alguno de los controles
no cumple las restricciones de los atributos

*/
function validarCtrls(controles) {
    let valido = true;
    controles.forEach((control) => {
        if (!control.checkValidity()) {
            valido = false;
        }
    });
    return valido
}

export default validarCtrls;