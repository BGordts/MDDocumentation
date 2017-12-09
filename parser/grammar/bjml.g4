grammar bjml;

file
   : opcode+
   ;

opcode
   : GT | LT | PLUS | MINUS | DOT | COMMA | LPAREN | RPAREN
   ;


GT
   : '>'
   ;


LT
   : '<'
   ;


PLUS
   : '+'
   ;


MINUS
   : '-'
   ;


DOT
   : '.'
   ;


COMMA
   : ','
   ;


LPAREN
   : '['
   ;


RPAREN
   : ']'
   ;


WS
   : . -> skip
   ;
