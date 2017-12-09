import { readFileSync } from 'fs'
import { ANTLRInputStream, CommonTokenStream } from 'antlr4ts';
import { ParseTree } from 'antlr4ts/tree/ParseTree';
import { bjmlLexer } from './grammar/bjmlLexer'
import { bjmlParser, NodeContext, Node_attributeContext } from './grammar/bjmlParser'
import { bjmlVisitor } from './grammar/bjmlVisitor'
import { FASTObject, FASTNode } from './generator/fast_types'
import { convertFASToPuml } from './generator/puml_generator'
import { convertFASTNodeToMD } from './generator/md_generator'

const file = readFileSync('./grammar/test.bjml').toString()
let inputStream = new ANTLRInputStream(file);
let lexer = new bjmlLexer(inputStream)
let tokenStream = new CommonTokenStream(lexer);
let parser = new bjmlParser(tokenStream);
let result = parser.file();

const fast: FASTObject = {
  nodes: {},
  edges: {},
}
type AttributeAst = {
  name: string,
  type: string,
  description: string,
}
function transformAttribute (attribute: Node_attributeContext): AttributeAst {
  let description = ''

  try {
    description = attribute.MULTI_LINE_COMMENT().getText().replace('/*', '').replace('*/', '').trim()
  } catch (e) {
  }

  return {
    name: attribute.IDENTIFIER(0).getText(),
    type: attribute.IDENTIFIER(1).getText(),
    description,
  }
}

function transformNode (node: NodeContext): FASTNode {
  let attributes: AttributeAst[] = []
  try {
    attributes = node.node_attributes().node_attribute().map(transformAttribute)
  } catch (e) {
  }
  return {
    type: node.NODE_CLASS().getText(),
    name: node.IDENTIFIER().getText(),
    description: '',
    payload: {
      attributes,
    }
  }

}
function refineNode (node: NodeContext, fast: FASTObject) {
  for (let ref of node.node_refinements().node_refinement()) {
    if (ref.getText().startsWith('refines concept')) {
      const conceptName = ref.IDENTIFIER(0).getText()
      const concept = fast.nodes[conceptName]
      const originalNode = fast.nodes[node.IDENTIFIER().getText()]
      fast.nodes[node.IDENTIFIER().getText()].payload.attributes = [
        ...originalNode.payload.attributes,
        ...concept.payload.attributes,
      ]
      return node
    }
  }

}
for (let node of result.node()) {
  const transformed = transformNode(node)
  fast.nodes[transformed.name] = transformed
}
for (let node of result.node()) {
  refineNode(node, fast)
}

console.log(convertFASToPuml(fast))
Object.values(fast.nodes).map(n => console.log(convertFASTNodeToMD(n)))
