import { useMemo } from "react";
import * as d3 from "d3";

const useForceDirectedLayout = (nodes, edges) => {
  const { nodes: updatedNodes, edges: updatedEdges } = useMemo(() => {
    const width = 800;
    const height = 600;

    // Initialize D3 force simulation
    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3.forceLink(edges).id((d) => d.id)
      )
      .force("charge", d3.forceManyBody().strength(-1200)) // Adjusted strength
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("x", d3.forceX(width / 2).strength(0.1))
      .force("y", d3.forceY(height / 2).strength(0.1));

    // Set nodes and links for the simulation
    simulation.nodes(nodes);
    simulation.force("link").links(edges);

    // Update node positions on each tick
    simulation.on("tick", () => {
      nodes.forEach((node) => {
        node.position = { x: node.x, y: node.y };
      });
    });

    // Ensure edges are correctly referenced
    edges.forEach((edge) => {
      if (!nodes.find((node) => node.id === edge.source)) {
        console.warn(`Edge source ${edge.source} does not match any node.`);
      }
      if (!nodes.find((node) => node.id === edge.target)) {
        console.warn(`Edge target ${edge.target} does not match any node.`);
      }
    });

    return { nodes, edges };
  }, [nodes, edges]);

  return { nodes: updatedNodes, edges: updatedEdges };
};

export default useForceDirectedLayout;
