import {FASTObject, FASTNode, FASTEdge} from './fast_types';

import * as fs from 'fs';
// import * as plantuml from 'node-plantuml'; // Gives an error bc the module is not typed
const plantuml = require('node-plantuml');

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

export function convertFASToPuml(fastObj: FASTObject) {
  let nodes: PUMLNode[] = Object.values(fastObj.nodes).map(fastNode => {
    return {
      name: convertFASTName(fastNode.name),
      fields: fastNode.payload.attributes.map(attr => {
        return {
          name: convertFASTName(attr.name),
          type: attr.type,
        }})}
    })

  let relations: PUMLRelation[] = Object.values(fastObj.edges).map(fastEdge => {
    return {
      from: convertFASTName(fastEdge.payload.from),
      to: convertFASTName(fastEdge.payload.to),
    }})

  return drawPUMLFile(nodes, relations)
}

function convertFASTName(fastName: string) {
  return fastName.replace('#', '.')
  // return fastName
}

function drawPUMLFile(nodes: PUMLNode[], relations: PUMLRelation[]) {
  return `@startuml

${nodes.map(drawNode).join('\n')}

${relations.map(drawRelation)}

@enduml`
}

function drawRelation(relation: PUMLRelation) {
  return `${relation.from} --> ${relation.to}`
}

function drawNode(node: PUMLNode) {
  return `class ${node.name} {
  {field} ${node.fields.map(field => '  ' + drawField(field)).join('\n')}
}`
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
    'Concepts#Tag': {
      type: 'Concept',
      name: 'Concepts#Tag',
      payload: {
        attributes: [
          {
            name: 'title',
            type: 'string',
            description: 'The title of a tag',
          },
        ],
        actions: [
          {
            name: 'add', 
            description: 'Add a tag'
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

// fs.writeFile('generated.puml', convertFASToPuml(example2), function(err) {
//     if(err) {
//         return console.log(err)
//     }

//     console.log("The file was saved!")
    
//     console.log("Generating image")
//     var gen = plantuml.generate("generated.puml", {format:'svg'})
//     gen.out.pipe(fs.createWriteStream("generated-image.svg"))
// })
