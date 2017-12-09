// FAST: Flat AST
interface FASTObject {
  nodes: {
    [key: string]: FASTNode
  };
  edges: {
    [key: string]: FASTEdge
  };
}

interface FASTNode {
  type: string;
  name: string;
  description: string;
  payload: FASTPayload;
}

interface FASTPayload {
  attributes: FASTAttribute[];
}

interface FASTAttribute {
  name: string;
  type: string;
  description: string;
}

interface FASTEdge {
  type: string;
  payload: {
    from: string;
    to: string;
    multiplicity: string;
  }
}

export {FASTObject, FASTNode, FASTPayload, FASTAttribute, FASTEdge}