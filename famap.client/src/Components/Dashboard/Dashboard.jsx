import ReactFlow, {
  useNodesState,
  useEdgesState,
  MiniMap,
  Controls,
  Background,
  Panel,
} from "reactflow";
import { Box, Typography } from "@mui/material";
import { useState, useMemo, useEffect } from "react";
import PeopleNode from "../PeopleCard/PeopleNode";
import DevTools from "../DevTools/DevTools";
import BackgroundSelector from "./BackgroundSelector";
import useFetchPeopleData from "../Hooks/useFetchPeopleData";
import useGenerateNodesAndEdges from "../Hooks/useGenerateNodesAndEdges";
import useForceDirectedLayout from "../Hooks/useForceDirectedLayout";

const Dashboard = () => {
  const [variant, setVariant] = useState("none");
  const { peopleData, loading, error } = useFetchPeopleData();
  const { nodes: generatedNodes, edges: generatedEdges } =
    useGenerateNodesAndEdges(peopleData);
  const { nodes, edges } = useForceDirectedLayout(
    generatedNodes,
    generatedEdges
  );

  const [nodesState, setNodes, onNodesChange] = useNodesState(nodes);
  const [edgesState, setEdges, onEdgesChange] = useEdgesState(edges);

  const nodeTypes = useMemo(() => ({ peopleNode: PeopleNode }), []);

  console.log(typeof nodes);
  console.log(typeof edges);

  useEffect(() => {
    setNodes(nodes);
    setEdges(edges);
  }, [nodes, edges, setNodes, setEdges]);

  const handleVariantChange = (newVariant) => {
    setVariant(newVariant);
    // Force re-render or adjust view if necessary
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error)
    return (
      <Typography variant="body2" color="error">
        {error}
      </Typography>
    );

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: "#333", marginBottom: "20px" }}
      >
        Dashboard
      </Typography>
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f0f0f0",
          p: 3,
        }}
      >
        <ReactFlow
          nodes={nodesState}
          edges={edgesState}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          fitView
        >
          <MiniMap nodeStrokeWidth={3} zoomable pannable />
          <Controls />
          <DevTools />
          {variant !== "none" && (
            <Background color="#707070" variant={variant} />
          )}
          <Panel>
            <BackgroundSelector
              variant={variant}
              onChange={handleVariantChange}
            />
          </Panel>
        </ReactFlow>
      </Box>
    </Box>
  );
};

export default Dashboard;
