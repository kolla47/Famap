import { Handle, Position } from "reactflow";
import PeopleCard from "./PeopleCard"; // Import your custom PeopleCard component
import { Box } from "@mui/material";

const PeopleNode = (props) => {
  const personData = props.data;
  const childrenHandleScale =
    personData.gender == "Male"
      ? 100 / (personData.fatherOf.length + 1)
      : 100 / (personData.motherOf.length + 1);

  const GetChildHandles = (data) => {
    console.log(data, "data");
    if (data.length > 0) {
      return data.map((child, index) => (
        <Handle
          id={"P-" + personData.id + "-" + "C-" + child.id}
          key={"P-" + personData.id + "-" + "C-" + child.id}
          type="source"
          position={Position.Bottom}
          style={{
            background: "#555",
            left: `${childrenHandleScale * (index + 1)}%`,
          }}
        />
      ));
    }
  };

  return (
    <Box style={{ width: 250, height: "auto", padding: 8 }}>
      {personData.motherId != null ? (
        <Handle
          id={"MC-" + personData.id}
          type="target"
          position={Position.Top}
          style={{ background: "#555", left: "33%" }}
        />
      ) : null}
      {personData.fatherId != null ? (
        <Handle
          id={"FC-" + personData.id}
          type="target"
          position={Position.Top}
          style={{ background: "#555", left: "66%" }}
        />
      ) : null}
      <PeopleCard person={personData} />
      {GetChildHandles(personData.motherOf)}
      {GetChildHandles(personData.fatherOf)}
      {personData.spouseId != null ? (
        personData.gender == "Male" ? (
          <Box>
            <Handle
              id={"H-" + personData.id}
              type="source"
              position={Position.Right}
              style={{ background: "#555" }}
            />
          </Box>
        ) : (
          <Box>
            <Handle
              id={"W-" + personData.id}
              type="target"
              position={Position.Left}
              style={{ background: "#555" }}
            />
          </Box>
        )
      ) : (
        <></>
      )}
    </Box>
  );
};

export default PeopleNode;
