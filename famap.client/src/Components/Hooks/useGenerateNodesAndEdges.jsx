import { useMemo } from "react";

const useGenerateNodesAndEdges = (people) => {
  const generatePersonNode = (person, index) => ({
    id: person.id,
    data: person,
    type: "peopleNode",
    position: { x: index * 300, y: 0 }, // Position nodes horizontally
  });

  const generateEdge = (id, source, target, sourceHandle, targetHandle) => ({
    id,
    style: { stroke: "#000", strokeWidth: 2 }, // Updated to use a more visible color and thickness
    source,
    target,
    sourceHandle,
    targetHandle,
    type: "default",
    markerEnd: { type: "arrowclosed" }, // Ensures the marker is correctly applied
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

  const nodes = useMemo(() => people.map(generatePersonNode), [people]);
  const edges = useMemo(
    () => [
      ...generateSpouseEdges(people),
      ...generateParentChildEdges(people, "fatherOf", "F", "FC"),
      ...generateParentChildEdges(people, "motherOf", "M", "MC"),
    ],
    [people]
  );

  return { nodes, edges };
};

export default useGenerateNodesAndEdges;
