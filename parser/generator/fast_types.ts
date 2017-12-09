// FAST: Flat AST
type FASTObject = {
  nodes: {
    [key: string]: FASTNode
  };
  edges: FASTEdge[],
}

type FASTNode = {
  type: string;
  name: string;
  description: string;
  payload: FASTPayload;
}

type FASTPayload = {
  attributes: FASTAttribute[];
}

type FASTAttribute = {
  name: string;
  type: string;
  description: string;
}

type FASTEdge = {
  type: string;
  payload: {
    from: string;
    to: string;
    multiplicity: string;
  }
}

export {FASTObject, FASTNode, FASTPayload, FASTAttribute, FASTEdge}
