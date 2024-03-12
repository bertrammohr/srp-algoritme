// Algoritmen
function dijkstra(adjencyList, start) {
    // Liste med knuders afstande fra startknuden
    const dist = Array.from(Array(n), () => Infinity);

    // Liste der holder styr på hvilken knude der er besøgt før en anden knude
    const prev = Array.from(Array(n), () => null);

    // Liste der holder styr på om en knude er blevet behandlet
    const processed = Array.from(Array(n), () => false);

    // Sæt afstanden til startknuden til 0
    dist[startNode] = 0;

    const Q = Array.from(Array(n), (_, i) => i); // Liste med alle knuderne
    
    while (Q.length > 0) {
        Q.sort((a, b) => dist[a] - dist[b]); // Sorter knuderne efter afstand til startknuden
        const u = Q.shift(); // Tag den knude med den mindste afstand til startknuden

        for (const {neighbour, w} of adjencyList[u]) { // Gennemgå alle naboknuderne til u
            if (!processed[neighbour]) { // Hvis naboknuden ikke er blevet behandlet
                const alt = dist[u] + w; // Beregn afstanden til naboknuden
                if (alt < dist[neighbour]) { // Hvis den beregnede afstand er mindre end den nuværende afstand
                    dist[neighbour] = alt; // Opdater afstanden
                    prev[neighbour] = u; // Sæt naboens forrige knude til at være den nuværende knude
                }
            }
        }
        processed[u] = true; // Marker knuden som behandlet
    }

    return {dist, prev}; // Returner listen med afstande
}

// Funktion til at finde stien fra startknuden til en anden knude der er blevet beregnet af dijkstra
const getPath = (prev, source, target) => {
    // Gem stien i en liste
    const path = [];
    // Valider at der enten findes en sti til knuden eller at knuden er startknuden
    if (prev[target] != null || target == source) {
        // Gem målet i en variabel
        let cur = target;
        // I mens der er endnu en knude i stien
        while (cur != null) {
            // Tilføj knuden til stien
            path.push(cur);
            // Sæt den knude der er forrige knude til at være den knude der skal tilføjes til stien i næste iteration
            cur = prev[cur];
        }
        // Returner den omvendte sti, da stien er blevet bygget bagfra
        return path.reverse();
    }
}

// 
// INDSAT DATA
// 

const n = 5; // Antal af knuder

const adjencyList = Array.from(Array(n), () => []); // Liste med n lister der kommer til at indeholde naboer og vægte på kanter til naboerne

// Funktion til at tilføje en urettet kant fra u til v med vægt w
const addUndirectedEdge = (u, v, w) => {
    adjencyList[u].push({neighbour: v, w}); // Tilføj kant fra u til v med vægt w
    adjencyList[v].push({neighbour: u, w}); // Tilføj kant fra v til u med vægt w
};

// Tilføj kanter til grafen
addUndirectedEdge(0, 1, 2); 
addUndirectedEdge(0, 2, 12);
addUndirectedEdge(0, 4, 23);
addUndirectedEdge(1, 2, 8);
addUndirectedEdge(2, 3, 12);
addUndirectedEdge(2, 4, 15);
addUndirectedEdge(3, 4, 7);

// Sæt startknuden til at være knude 0
const startNode = 0;

// Kald dijkstra med grafen og startknuden, og gem resultatet i variablen distances
const {dist, prev} = dijkstra(adjencyList, startNode);

// Beregn korteste sti til alle knuder fra startknuden
const paths = Array.from(Array(n), (_, i) => getPath(prev, startNode, i));

console.log(dist); // Forventet output: [0, 2, 10, 22, 15] 
console.log(paths); // Forventet output: [[0], [0, 1], [0, 1, 2], [0, 1, 2, 3], [0, 4]] 