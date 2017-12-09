


function drawRelation(from: string, to: string) {
  return `${from} --> ${to}`
}

function drawNode(node: Node) {
  return `entity ${node.name} {
    ${node.fields.map(field => '  ' + drawField(field)).join('\n')}
  }
  `
}

function drawField(field: Field) {
  return `${field.name} (${field.type_name})`
}

interface Node {
  name: string,
  fields: Field[],
}

interface Field {
  name: string,
  type_name: string,
}