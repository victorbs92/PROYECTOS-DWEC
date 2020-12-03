
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