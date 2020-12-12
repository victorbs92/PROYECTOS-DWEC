tabla = document.querySelector("table");

tabla.addEventListener("click",  function (event) {
    
        if(event.target.nodeName === "TD"){
           
            resetearDiana(tabla);

            event.target.style.backgroundColor = "greenyellow";

           /* let celdas = tabla.querySelectorAll("td");

            let r = Array.from(cela)
            //celdas.asArray();
            console.log(celdas.isArray());

            let x = event.target;
            celdas.indexOf(x)
           console.log();
            //console.log(celdas.findIndex(event.target));*/
            
        }
    
});

let x = [1,3];
console.log(x.isArray());


function resetearDiana(tabla) {
    
    let celdas = tabla.querySelectorAll("td");
   
    celdas.forEach(element => {
        element.style.backgroundColor = "white"; 
    });
  
}