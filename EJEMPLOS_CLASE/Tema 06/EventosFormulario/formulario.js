const formulario = document.forms[0];

const [texto, boton] = [...formulario.elements];

boton.addEventListener("click", function () {

    //crear cadena de texti html con el formulario dinamico
    const textForm = `<form>
                        <input type="text" name="text2" id="text2">
                        <button type="submit" id="btn2">crear</button>
                        <button type="button" id="btn3">mostrar</button>
                      </form>`;

    document.body.innerHTML += textForm;

    document.getElementById("btn3").addEventListener("click", function () {

        alert(document.forms[1].text2.value);

    });

});

if (document.forms[1] === undefined) {

    alert("formulario no existe");

}