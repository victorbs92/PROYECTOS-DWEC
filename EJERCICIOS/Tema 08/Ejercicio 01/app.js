/*
loop(document.body);

function loop(node) {

    var nodes = node.childNodes;

    for (var i = 0; i < nodes.length; i++) {

        if (nodes[i].childNodes.length > 0) {
            console.log(nodes[i]);
            loop(nodes[i]);
            
        }

    }

}
*/



/*console.log(document.getElementById("a").children);

if (document.getElementById("a").children > 0) {
    console.log("77777777777");
}*/

recorrerNodo(document.getElementById("a"));
//recorrerNodo(document.querySelector("table"))
//recorrerNodo(document.body)

function recorrerNodo(nodo) {
   // console.log("AAAAAA");

    if (nodo.nodeType == 3) {
        console.log(nodo.nodeValue);
    }


    if (nodo.nodeType == 1) {
        console.log(nodo.nodeName);

        if (nodo.hasAttributes()) {

            for (const iterator of nodo.attributes) {
                console.log(iterator.nodeName + " = " + iterator.nodeValue);

            }

        }

    }

    if (nodo.hasChildNodes() > 0) {
        let as = nodo.childNodes
        //console.log("DDDDDDD");
        recorrerNodo(as[0]);

    }

    if (nodo.nextSibling != null) {
        recorrerNodo(nodo.nextSibling)
    }

}