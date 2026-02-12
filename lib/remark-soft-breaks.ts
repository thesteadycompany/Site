import type { Root, PhrasingContent, Text } from "mdast";
import { visit } from "unist-util-visit";

function toBreakNodes(value: string): PhrasingContent[] {
  const parts = value.split("\n");
  const nodes: PhrasingContent[] = [];

  parts.forEach((part, index) => {
    if (part) {
      nodes.push({ type: "text", value: part });
    }

    if (index < parts.length - 1) {
      nodes.push({ type: "break" });
    }
  });

  return nodes;
}

export function remarkSoftBreaks() {
  return (tree: Root) => {
    visit(tree, "text", (node: Text, index, parent) => {
      if (!parent || typeof index !== "number") {
        return;
      }

      if (!node.value.includes("\n")) {
        return;
      }

      const nextNodes = toBreakNodes(node.value);
      parent.children.splice(index, 1, ...nextNodes);
      return index + nextNodes.length;
    });
  };
}
