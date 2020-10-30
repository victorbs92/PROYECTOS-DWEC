
let agenda = new Map();
let btnAgregarContacto = document.getElementById('btn_agregar_contacto');
btnAgregarContacto.onclick = e => e.preventDefault();

agenda.agregar = (persona, datos) => {
    agenda.set(persona, datos);
},

btnAgregarContacto.addEventListener('click', () => {
    let nombrePresona = document.getElementById('persona').value;
    let datos = [
        document.getElementById('tel_movil').value,
        document.getElementById('tel_casa').value,
        document.getElementById('tel_trabajo').value,
    ];

    agenda.agregar(nombrePresona, datos);
    console.log(agenda);
})
