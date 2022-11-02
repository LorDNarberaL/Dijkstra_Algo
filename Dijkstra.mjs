import {Graph} from "./Graph.mjs";

class Dijkstra extends Graph {
    constructor(vertex) {
        super(vertex);
    }

    dijkstra(start) {
        var newStart = start;
        var vertex = super.getterVertex();
        var setVertex = new Set();
        setVertex.add(start);
        var dist = new Array(vertex);
        for (let i = 0; i < vertex; i++) {
            if (i != start) {
                dist[i] = [Number.MAX_VALUE, null];
            }
            else dist[i] = [0, null]; 
        }

        while (setVertex.size != vertex) {
            let list = (super.getterGraph())[newStart];

            while (list != null) {
                let sum = dist[newStart][0] + list.getterEdge().getterWeight();
                let end = list.getterEdge().getterEnd();

                if (!setVertex.has(end) && sum < dist[end][0]) {
                    dist[end][0] = sum;
                    dist[end][1] = newStart;
                }

                list = list._next;
            }

            var min = 0;
            for (let i = 0; i < vertex; i++) {
                if (!setVertex.has(i)) {
                    min = i;
                    break;
                }      
            }

            for (let i = 0; i < vertex; i++) {
                if (!setVertex.has(i) && dist[i][0] < dist[min][0]) {
                    min = i;
                }  
            }

            setVertex.add(min);
            newStart = min;
        }
        
        this.printDijkstra(dist, start);
    }

    printDijkstra(dist, start) {
        var end = prompt("Enter End Vertex from Vertex "+start+" (-1 to exit) : ");
        
        while (end != -1) {
            console.log("Shortest Path from V["+start+"] to V["+end+"] = "+dist[end][0]);
            let curr = end;
            let output = (" V["+start+"]");
            let p = null;

            while (curr != start) {
                let q = (super.getterGraph())[curr];
                
                while (q.getterEdge().getterEnd() != dist[curr][1]) {
                    q = q._next;
                }

                let temp = new this._classNode(q.getterEdge());
                temp._next = p;
                p = temp;

                curr = dist[curr][1];
            }

            while (p != null) {
                output = output + (" --> V["+p.getterEdge().getterStart()+"] | "+p.getterEdge().getterWeight());
                p = p._next;
            }

            console.log(output);
            console.log("------------------------------------------------------------");
            end = prompt("Enter End Vertex from Vertex "+start+" (-1 to exit) : ");
        }
    }
}





let g = new Dijkstra(6)
g.addEdge(0, 1, 10)
g.addEdge(0, 3, 30)
g.addEdge(0, 4, 45)
g.addEdge(1, 2, 50)
g.addEdge(1, 4, 40)
g.addEdge(1, 5, 25)
g.addEdge(2, 4, 35)
g.addEdge(2, 5, 15)
g.addEdge(3, 5, 20)
g.addEdge(4, 5, 55)

g.printGraph()
g.printEdge()
console.log("------------------------------------------------------------");

var start = prompt("Enter Start Vertex : ");
console.log("------------------------------------------------------------");
g.dijkstra(start)

g.printGraph()