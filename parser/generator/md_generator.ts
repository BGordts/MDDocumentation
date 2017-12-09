import {FASTObject, FASTNode, FASTEdge, FASTAttribute} from './fast_types';
import * as fs from 'fs';

export function convertFASTNodeToMD(node: FASTNode) {
  return `## ${node.name}
>${node.description}
### Attributes
${node.payload.attributes.map(convertFastAttributeToMD).join('\n')}
`
}

function convertFastAttributeToMD(attribute: FASTAttribute) {
  return `- ${attribute.name} (${attribute.type}): ${attribute.description}`
}

function generateMD(fastObject: FASTObject) {
  return `# Your Documentation
${Object.values(fastObject.nodes).map(convertFASTNodeToMD).join('\n')}
`
}

let example2 = {
  nodes: {
    'Concepts#TodoItem': {
      type: 'Concept',
      name: 'Concepts#TodoItem',
      description: 'Represents a todo',
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
      description: 'Using tags, todo items can be grouped',
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

// fs.writeFile('generated.md', generateMD(example2), function(err) {
//   if(err) {
//       return console.log(err)
//   }

//   console.log("The file was saved!")
// })
