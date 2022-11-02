export class Graph {
    #vertex;
    #graph;
    #listEdge;
    _classNode;
    _classEdge;
    constructor(vertex) {
        this._classNode = class {
            #edge;
            _next;
            constructor(edge) {
                this.#edge = edge;
                this._next = null;
            }

            getterEdge() {
                return this.#edge;
            }
        }
        this._classEdge = class {
            #start;
            #end;
            #weight;
            _next;
            constructor(start, end, weight) {
                this.#start = start;
                this.#end = end;
                this.#weight = weight;
                this._next = null;
            }
        
            getterStart() {
                return this.#start;
            }
        
            getterEnd() {
                return this.#end;
            }
        
            getterWeight() {
                return this.#weight;
            }
        }

        this.#vertex = vertex;
        this.#graph = new Array(vertex);
        this.#listEdge = [];
    }

    getterVertex() {
        return this.#vertex;
    }
    
    getterGraph() {
        return this.#graph;
    }

    getterListEdge() {
        return this.#listEdge;
    }

    addEdge(start, end, weight) {
        var edge = new this._classEdge(start, end, weight);
        var list = new this._classNode(edge);
        list._next = this.#graph[start];
        this.#graph[start] = list;

        this.#listEdge.push(edge);

        var edge2 = new this._classEdge(end, start, weight);
        var list2 = new this._classNode(edge2);
        list2._next = this.#graph[end];
        this.#graph[end] = list2;
    }

    printGraph() {
        console.log("Graph :");
        for (let i = 0; i < this.#vertex; i++) {
            let output = (" V["+i+"]");
            let list = this.#graph[i];
            if (list == null) {
                output = output + (" --> None");
                continue;
            }
            while (list != null) {
                output = output + (" --> V["+list.getterEdge().getterEnd()+"] | "+list.getterEdge().getterWeight());
                list = list._next;
            }
            console.log(output);
        }
    }

    printEdge() {
        console.log("Edges :");
        for (let i = 0; i < this.#listEdge.length; i++) {
            console.log(" ["+(i+1)+"] Start "+this.#listEdge[i].getterStart()+" --> End "+this.#listEdge[i].getterEnd()+" | weight = "+this.#listEdge[i].getterWeight());
        }
    }
}