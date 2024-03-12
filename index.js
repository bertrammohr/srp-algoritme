//
// Start konfiguration
// 

const n = 5; // Antal af knuder

// 
// Algoritme og funktioner
// 

const adjencyList = Array.from(Array(n), () => []); // Liste med n lister der kommer til at indeholde naboer og vægte på kanter til naboerne

// Tilføj en kant fra u til v med vægt w
const addEdge = (u, v, w) => {
    adjencyList[u].push({neighbour: v, w}); // Tilføj kant fra u til v med vægt w
    adjencyList[v].push({neighbour: u, w}); // Tilføj kant fra v til u med vægt w
};

// Liste med knuders afstande fra startknuden
const distance = Array.from(Array(n), () => Infinity);

// Liste der holder styr på om en knude er blevet behandlet
const processed = Array.from(Array(n), () => false);

// Liste der holder styr på den korteste vej til en knude
const paths = Array.from(Array(n), () => []);

// Algoritmen modtager den nuværende knude og en liste med den korteste vej til den nuværende knude
function dijkstra(curNode, path) {
    // Hvis knuden allerede er blevet behandlet, så stop
    if (processed[curNode]) return;
    // Markér knuden som behandlet
    processed[curNode] = true;
    // Tilføj knuden til den nuværende sti
    path.push(curNode);

    // Gennemgå alle naboer
    for (let i=0; i<adjencyList[curNode].length; i++) {
        // Definér nabo og den tilhørende vægt
        const {neighbour, w} = adjencyList[curNode][i];
        // Tjekker om den nuværende gemte afstand til naboen er større end den afstand der kan opnås ved at gå fra den nuværende knude til naboen
        if (distance[curNode]+w < distance[neighbour]) {
            // Gem afstanden til naboen som den nuværende afstand + vægten
            distance[neighbour] = distance[curNode]+w;
            // Gem den nuværende sti som stien med den korteste rute til naboen
            paths[neighbour] = [...path, neighbour];
        }
    }

    // Sortér naboerne efter vægt, laveste vægt først
    const sortedAdjencyList = adjencyList[curNode].sort((a, b) => a.w-b.w);
    // Gennemgå alle naboer fra den med laveste vægt til den med højeste vægt
    for (let i=0; i<sortedAdjencyList.length; i++) {
        // Kald dijkstra rekursivt med den nuværende nabo og den nuværende sti
        dijkstra(sortedAdjencyList[i].neighbour, [...path]);
    }
}

// 
// INDSAT DATA
// 

// Tilføj kanter til grafen
addEdge(0, 1, 2); 
addEdge(0, 2, 12);
addEdge(0, 4, 23);
addEdge(1, 2, 8);
addEdge(2, 3, 12);
addEdge(2, 4, 15);
addEdge(3, 4, 7);

// Sæt startknuden til at være knude 0
const startNode = 0;
// Sæt afstanden til startknuden til 0
distance[startNode] = 0;

// Kald dijkstra med startknuden og en tom sti
dijkstra(startNode, []);

// Udskriv afstande og stier til terminalen
console.log(distance);
console.log(paths);