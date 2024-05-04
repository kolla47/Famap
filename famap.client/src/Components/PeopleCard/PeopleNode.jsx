import { Handle, Position } from "reactflow";
import PeopleCard from "./PeopleCard"; // Import your custom PeopleCard component
import { Box } from "@mui/material";

const PeopleNode = (props) => {
  const personData = props.data;
  const childrenHandleScale =
    personData.gender == "Male"
      ? 100 / (personData.fatherOf.length + 1)
      : 100 / (personData.motherOf.length + 1);

  return (
    <Box style={{ width: 250, height: "auto", padding: 8 }}>
      {personData.motherId != null ? (
        <Handle
          id={personData.motherId}
          type="source"
          position={Position.Top}
          style={{ background: "#555", left: "33%" }}
        />
      ) : null}
      {personData.fatherId != null ? (
        <Handle
          id={personData.fatherId}
          type="source"
          position={Position.Top}
          style={{ background: "#555", left: "66%" }}
        />
      ) : null}
      <PeopleCard person={personData} />{" "}
      {personData.spouseId != null ? (
        personData.gender == "Male" ? (
          <>
            <Handle
              id={personData.spouseId}
              type="source"
              position={Position.Right}
              style={{ background: "#555" }}
            />
            {personData.fatherOf.map((child, index) => (
              <Handle
                key={child.id}
                type="target"
                position={Position.Bottom}
                style={{
                  background: "#555",
                  left: `${childrenHandleScale * (index + 1)}%`,
                }}
              />
            ))}
          </>
        ) : (
          <>
            <Handle
              id={personData.spouseId}
              type="target"
              position={Position.Left}
              style={{ background: "#555" }}
            />
            {personData.motherOf.map((child, index) => (
              <Handle
                key={"Mother-" + personData.id + "Child-" + child.id}
                type="target"
                position={Position.Bottom}
                style={{
                  background: "#555",
                  left: `${childrenHandleScale * (index + 1)}%`,
                }}
              />
            ))}
          </>
        )
      ) : (
        <></>
      )}
    </Box>
  );
};

export default PeopleNode;
