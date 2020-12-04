tabla = document.querySelector("table");

tabla.addEventListener("click",  function (event) {
    
        if(event.target.nodeName == "TD"){
           
            resetearDiana(tabla);

            event.target.style.backgroundColor = "greenyellow";
            
        }
    
});


function resetearDiana(tabla) {
    
    let celdas = tabla.querySelectorAll("td");
   
    celdas.forEach(element => {
        element.style.backgroundColor = "white"; 
    });
  
}