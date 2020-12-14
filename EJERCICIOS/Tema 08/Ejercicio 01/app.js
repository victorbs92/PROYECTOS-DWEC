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

//recorrerNodo(document.getElementById("a"));
//recorrerNodo(document.querySelector("table"))
recorrerNodo(document.body)

function recorrerNodo(nodo) {

    if (nodo.nodeType == 3) {
        console.log(nodo.nodeValue);

    }

    if (nodo.nodeType == 1) {
        console.log(nodo.nodeName);

        if (nodo.hasAttributes()) {

            for (const iterator of nodo.attributes) {
                console.log(iterator.name + " = " + iterator.value);

            }

        }

    }

    if (nodo.hasChildNodes() > 0) {
        recorrerNodo(nodo.childNodes[0]);

    }

    if (nodo.nextSibling != null) {
        recorrerNodo(nodo.nextSibling)

    }

}