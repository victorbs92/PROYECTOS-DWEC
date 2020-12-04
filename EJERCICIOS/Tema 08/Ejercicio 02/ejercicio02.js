
tabla = document.querySelector("table");

tabla.addEventListener("click",  function (event) {
    
        if(event.target.nodeName == "TD"){
           
            resetearDiana(tabla);

            event.target.style.backgroundColor = "greenyellow";
            
        }
    
});


function resetearDiana(tabla) {
    
    let celdas = tabla.querySelectorAll("td");
    for (let index = 0; index < celdas.length; index++) {
        
        celdas[index].style.backgroundColor = "white"; 
    }
    
}