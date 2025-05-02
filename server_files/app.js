const graphData = {
    nodes: [
        { id: 1, label: "Node 1" },
        { id: 2, label: "Node 2" },
        { id: 3, label: "Node 3" },
        { id: 4, label: "Node 4" }
    ],
    links: [
        { source: 1, target: 2 },
        { source: 1, target: 3 },
        { source: 2, target: 4 },
        { source: 3, target: 4 }
    ]
};

let simulation = d3.forceSimulation(graphData.nodes)
    .force("link", d3.forceLink(graphData.links).id(d => d.id).distance(100))
    .force("charge", d3.forceManyBody().strength(-200))
    .force("center", d3.forceCenter(300, 250));

const svg = d3.select("#graph");

const link = svg.append("g")
    .selectAll(".link")
    .data(graphData.links)
    .enter().append("line")
    .attr("class", "link");

// Create nodes (vertices)
const node = svg.append("g")
    .selectAll(".node")
    .data(graphData.nodes)
    .enter().append("circle")
    .attr("class", "node")
    .attr("r", 20)
    .attr("fill", "#69b3a2")
    .call(d3.drag()
        .on("start", dragStarted)
        .on("drag", dragged)
        .on("end", dragEnded));

node.append("title")
    .text(d => d.label);

simulation.on("tick", () => {
    link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

    node
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);
});


function dragStarted(event) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    event.subject.fx = event.subject.x;
    event.subject.fy = event.subject.y;
}

function dragged(event) {
    event.subject.fx = event.x;
    event.subject.fy = event.y;
}

function dragEnded(event) {
    if (!event.active) simulation.alphaTarget(0);
    event.subject.fx = null;
    event.subject.fy = null;
}

function updateGraph(layer) {
    console.log("here")
    console.log(layer)
    if (layer === 1) {
        node.attr("fill", (d, i) => {
            if (i === 0 || i === 1 || i === 2) return "#FF6347";
            return "#69b3a2"; 
        });
    } else if (layer === 2) {
        node.attr("fill", (d, i) => {
            if (i === 0 || i === 1 || i === 2 || i === 3) return "#FFD700"; 
            return "#69b3a2";
        });
    }
}
