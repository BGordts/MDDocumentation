import { ANTLRInputStream, CommonTokenStream } from 'antlr4ts';
import { bjmlLexer } from './grammar/bjmlLexer'
import { bjmlParser } from './grammar/bjmlParser'

// // Create the lexer and parser
let inputStream = new ANTLRInputStream("+++<>-");
// console.log(inputStream)
let lexer = new bjmlLexer(inputStream)
// console.log(lexer)
let tokenStream = new CommonTokenStream(lexer);
// console.log(tokenStream)
let parser = new bjmlParser(tokenStream);
// console.log(parser)

// // Parse the input, where `compilationUnit` is whatever entry point you defined
let result = parser.file();
console.log(result);
console.log(result.opcode())
//
