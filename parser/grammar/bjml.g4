grammar bjml;

file
  : node+
  ;

node
  : NODE_CLASS IDENTIFIER (LBRACE node_attributes? node_actions? RBRACE)?
  ;

node_attributes
  : 'attributes' LBRACE node_attribute* RBRACE
  ;

node_attribute
  : LOW_IDENTIFIER COLON IDENTIFIER MULTI_LINE_COMMENT? COMMA
  ;

node_actions
  : 'actions' LBRACE node_action* RBRACE
  ;

node_action
  : LOW_IDENTIFIER
  ;

LBRACE: '{';
RBRACE: '}';
COLON: ':';
COMMA: ',';

MULTI_LINE_COMMENT: '/*' .*? '*/';
NODE_CLASS: 'concept' | 'node';
IDENTIFIER: [A-Z][a-zA-Z]*;

LOW_IDENTIFIER: [a-z][a-zA-Z_]*;

/* NL: ('\r\n'|'\n'|'\r')+; */
/* WS: [ \t\r\n] -> skip; */

WS
   : [ \t\n\r] + -> skip
   ;
