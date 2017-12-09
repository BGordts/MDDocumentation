import * as fs from 'fs';

// Plant UML stuff
interface PUMLNode {
  name: string;
  fields: Array<PUMLField>;
}

interface PUMLField {
  name: string;
  type: string;
}

interface PUMLRelation {
  from: string;
  to: string;
}

// Flat AST stuff
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

function convertFASToPuml(fastObj: FASTObject) {
  let nodes: PUMLNode[] = Object.values(fastObj.nodes).map(fastNode => {
    return {
      name: fastNode.name,
      fields: fastNode.payload.attributes.map(attr => {
        return {
          name: attr.name,
          type: attr.type,
        }})}
    })

  let relations: PUMLRelation[] = Object.values(fastObj.edges).map(fastEdge => {
    return {
      from: fastEdge.payload.from,
      to: fastEdge.payload.to,
    }})

  return drawPUMLFile(nodes, relations)
}

function drawPUMLFile(nodes: PUMLNode[], relations: PUMLRelation[]) {
  return `@startuml

${nodes.map(drawNode)}

${relations.map(drawRelation)}

@enduml`
}

function drawRelation(relation: PUMLRelation) {
  return `${relation.from} --> ${relation.to}`
}

function drawNode(node: PUMLNode) {
  return `entity ${node.name} {
  ${node.fields.map(field => '  ' + drawField(field)).join('\n')}
}
  `
}

function drawField(field: PUMLField) {
  return `${field.name} (${field.type})`
}

let example1 = {
  name: 'User', 
  fields: [
    {
      name: 'Name', 
      type: 'string'
    }
  ]
}

let example2 = {
  nodes: {
    'Concepts#TodoItem': {
      type: 'Concept',
      name: 'Concepts#TodoItem',
      payload: {
        attributes: [
          {
            name: 'title',
            type: 'string',
            description: 'The title of a todo item',
          },
        ],
        actions: [
          {
            name: 'add', 
            description: 'Add a todo'
          },
        ],
      },
    },
  },
  edges: {
    'Edge1': {
      type: 'ConceptRelation',
      payload: {
        from: 'Concepts#TodoItem',
        to: 'Concepts#Tag',
	      multiplicity: 'many-to-many',
      }
    }
  }
}

fs.writeFile('generated.puml', convertFASToPuml(example2), function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
})