import { Box, Button, ButtonGroup, Grid, Typography } from "@mui/material";
import { useState, useEffect, useMemo } from "react";
import PeopleCard from "../PeopleCard/PeopleCard";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  MiniMap,
  Controls,
  Background,
  Panel,
} from "reactflow";
import PeopleNode from "../PeopleCard/PeopleNode";
import DevTools from "../DevTools/DevTools";

const Dashboard = () => {
  const [peopleData, setPeopleData] = useState([]);

  const [variant, setVariant] = useState("none");
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const nodeTypes = useMemo(() => ({ peopleNode: PeopleNode }), []);

  // create an counter and add 250 to x of each node

  useEffect(() => {
    const GetNodes = (res) => {
      const nodes = res.map((person, index) => ({
        id: person.id,
        data: person,
        type: "peopleNode",
        position: { x: index * 300, y: 0 },
      }));
      setNodes(nodes);
    };

    const GetEdges = (res) => {
      // Create edges for each parent-child relationship
      let edges = [];
      // father

      // mother
      // spouse
      // children

      setEdges(edges);
    };

    fetch("people")
      .then((response) => response.json())
      .then((data) => {
        setPeopleData(data);
        GetNodes(data);
        GetEdges(data);
      });
  }, [setEdges, setNodes]);

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
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
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          fitView
        >
          <MiniMap nodeStrokeWidth={3} zoomable pannable />
          <Controls />
          <DevTools />
          {variant === "none" ? (
            <></>
          ) : (
            <Background color="#707070" variant={variant} />
          )}
          <Panel>
            <Box>Background :</Box>
            <ButtonGroup variant="contained" aria-label="Basic button group">
              <Button onClick={() => setVariant("none")}>white</Button>
              <Button onClick={() => setVariant("dots")}>dots</Button>
              <Button onClick={() => setVariant("lines")}>lines</Button>
              <Button onClick={() => setVariant("cross")}>cross</Button>
            </ButtonGroup>
          </Panel>
        </ReactFlow>
      </Box>
    </Box>
  );
};

export default Dashboard;
