import { readFileSync } from 'fs'
import { ANTLRInputStream, CommonTokenStream } from 'antlr4ts';
import { ParseTree } from 'antlr4ts/tree/ParseTree';
import { bjmlLexer } from './grammar/bjmlLexer'
import { bjmlParser, NodeContext, Node_attributeContext } from './grammar/bjmlParser'
import { bjmlVisitor } from './grammar/bjmlVisitor'

const file = readFileSync('./grammar/test.bjml').toString()
// // Create the lexer and parser
let inputStream = new ANTLRInputStream(file);
let lexer = new bjmlLexer(inputStream)
let tokenStream = new CommonTokenStream(lexer);
let parser = new bjmlParser(tokenStream);

// // Parse the input, where `compilationUnit` is whatever entry point you defined
let result = parser.file();

type Ast = {
  nodes: {
    [key: string]: NodeAst,
  },
  edges: {
  },
}
const ast: Ast = {
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
    description = attribute.MULTI_LINE_COMMENT().getText()
  } catch (e) {
  }

  return {
    name: attribute.IDENTIFIER().getText(),
    type: attribute.LOW_IDENTIFIER().getText(),
    description,
  }
}

type NodeAst = {
  type: string,
  name: string,
  payload: {
    attributes: AttributeAst[],
  },
}
function transformNode (node: NodeContext): NodeAst {
  let attributes: AttributeAst[] = []
  try {
    attributes = node.node_attributes().node_attribute().map(transformAttribute)
  } catch (e) {
  }
  return {
    type: node.NODE_CLASS().getText(),
    name: node.IDENTIFIER().getText(),
    payload: {
      attributes,
      // attributes: node.node_attributes().node_attribute().map(transformAttribute)
    }
  }

}
for (let node of result.node()) {
  const transformed = transformNode(node)
  ast.nodes[transformed.name] = transformed
}
console.log(ast)
