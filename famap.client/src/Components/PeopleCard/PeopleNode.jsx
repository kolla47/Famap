import { Handle, Position } from "reactflow";
import PeopleCard from "./PeopleCard";
import { Box } from "@mui/material";

const PeopleNode = ({ data: personData }) => {
  // Determine handle scale based on number of children
  const childrenHandleScale =
    100 /
    (Math.max(
      (personData.gender === "Male" ? personData.fatherOf : personData.motherOf)
        .length,
      1
    ) +
      1);

  // Generate handles for children
  const GetChildHandles = (children) =>
    children.length > 0 &&
    children.map((child, index) => (
      <Handle
        id={`P-${personData.id}-C-${child.id}`}
        key={`P-${personData.id}-C-${child.id}`}
        type="source"
        position={Position.Bottom}
        style={{
          background: "#555",
          left: `${childrenHandleScale * (index + 1)}%`,
        }}
      />
    ));

  return (
    <Box style={{ width: 250, height: "auto", padding: 8 }}>
      {/* Handle for Mother ID */}
      {personData.motherId && (
        <Handle
          id={`MC-${personData.id}`}
          type="target"
          position={Position.Top}
          style={{ background: "#555", left: "33%" }}
        />
      )}
      {/* Handle for Father ID */}
      {personData.fatherId && (
        <Handle
          id={`FC-${personData.id}`}
          type="target"
          position={Position.Top}
          style={{ background: "#555", left: "66%" }}
        />
      )}
      {/* PeopleCard Component */}
      <PeopleCard person={personData} />
      {/* Handles for Children */}
      {GetChildHandles(personData.motherOf)}
      {GetChildHandles(personData.fatherOf)}
      {/* Handle for Spouse */}
      {personData.spouseId && (
        <Handle
          id={
            personData.gender === "Male"
              ? `H-${personData.id}`
              : `W-${personData.id}`
          }
          type={personData.gender === "Male" ? "source" : "target"}
          position={
            personData.gender === "Male" ? Position.Right : Position.Left
          }
          style={{ background: "#555" }}
        />
      )}
    </Box>
  );
};

export default PeopleNode;
