import ReactFlow, {
  useNodesState,
  useEdgesState,
  MiniMap,
  Controls,
  Background,
  Panel,
} from "reactflow";
import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import { useState, useEffect, useMemo } from "react";
import PeopleNode from "../PeopleCard/PeopleNode";
import DevTools from "../DevTools/DevTools";

const Dashboard = () => {
  const [variant, setVariant] = useState("none");
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const nodeTypes = useMemo(() => ({ peopleNode: PeopleNode }), []);

  useEffect(() => {
    const fetchPeopleData = async () => {
      try {
        const response = await fetch("people");
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error fetching people data:", error);
        return [];
      }
    };

    const generatePersonNode = (person, index) => ({
      id: person.id,
      data: person,
      type: "peopleNode",
      position: { x: index * 300, y: 0 },
    });

    const generateEdge = (id, source, target, sourceHandle, targetHandle) => ({
      id,
      style: { stroke: "#555" },
      source,
      target,
      sourceHandle,
      targetHandle,
      type: "default",
      markerEnd: "arrowclosed",
      animated: true,
    });

    const generateSpouseEdges = (people) =>
      people
        .filter((person) => person.spouseId && person.gender === "Male")
        .map((person) =>
          generateEdge(
            `H-${person.id}-W-${person.spouseId}`,
            person.id,
            person.spouseId,
            `H-${person.id}`,
            `W-${person.spouseId}`
          )
        );

    const generateParentChildEdges = (
      people,
      relationship,
      sourceHandlePrefix,
      targetHandlePrefix
    ) =>
      people.flatMap((person) =>
        person[relationship].map((child) =>
          generateEdge(
            `P-${person.id}-C-${child.id}`,
            person.id,
            child.id,
            `${sourceHandlePrefix}-${person.id}-C-${child.id}`,
            `${targetHandlePrefix}-${child.id}`
          )
        )
      );

    const getNodes = (people) => people.map(generatePersonNode);

    const getEdges = (people) => [
      ...generateSpouseEdges(people),
      ...generateParentChildEdges(people, "fatherOf", "F", "FC"),
      ...generateParentChildEdges(people, "motherOf", "M", "MC"),
    ];

    fetchPeopleData()
      .then((data) => {
        setNodes(getNodes(data));
        setEdges(getEdges(data));
      })
      .catch((error) => console.error("Error setting nodes and edges:", error));
  }, [setEdges, setNodes]);

  const handleVariantChange = (newVariant) => {
    setVariant(newVariant);
  };

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
              <Button onClick={() => handleVariantChange("none")}>white</Button>
              <Button onClick={() => handleVariantChange("dots")}>dots</Button>
              <Button onClick={() => handleVariantChange("lines")}>
                lines
              </Button>
              <Button onClick={() => handleVariantChange("cross")}>
                cross
              </Button>
            </ButtonGroup>
          </Panel>
        </ReactFlow>
      </Box>
    </Box>
  );
};

export default Dashboard;
