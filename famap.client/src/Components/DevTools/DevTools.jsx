import { useState } from "react";
import { Panel, Position } from "reactflow";

import NodeInspector from "./NodeInspector";
import { Button } from "@mui/material";

export default function DevTools() {
  const [nodeInspectorActive, setNodeInspectorActive] = useState(false);

  return (
    <div className="react-flow__devtools">
      <Panel position={Position.Right}>
        <DevToolButton
          setActive={setNodeInspectorActive}
          active={nodeInspectorActive}
          title="Toggle Node Inspector"
        >
          Node Inspector
        </DevToolButton>
      </Panel>
      {nodeInspectorActive && <NodeInspector />}
    </div>
  );
}

function DevToolButton({ active, setActive, children, ...rest }) {
  return (
    <Button
      variant="contained"
      onClick={() => setActive((a) => !a)}
      className={active ? "active" : ""}
      {...rest}
    >
      {children}
    </Button>
  );
}
