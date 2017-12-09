grammar bjml;

file
  : node+
  ;

node
  : NODE_CLASS IDENTIFIER (LBRACE node_refinements node_attributes? node_actions? RBRACE)?
  ;

node_refinements
  : node_refinement*
  ;

node_refinement
  : 'refines concept' IDENTIFIER
  | 'refines relation' IDENTIFIER IDENTIFIER
  ;

node_attributes
  : 'attributes' LBRACE node_attribute* RBRACE
  ;

node_attribute
  : IDENTIFIER COLON IDENTIFIER MULTI_LINE_COMMENT?
  ;

node_actions
  : 'actions' LBRACE node_action* RBRACE
  ;

node_action
  : IDENTIFIER
  ;

LBRACE: '{';
RBRACE: '}';
COLON: ':';
COMMA: ',';

MULTI_LINE_COMMENT: '/*' .*? '*/';
NODE_CLASS: 'concept' | 'node' | 'table';
IDENTIFIER: [a-zA-Z_]+;

/* NL: ('\r\n'|'\n'|'\r')+; */
/* WS: [ \t\r\n] -> skip; */

WS
   : [ \t\n\r] + -> skip
   ;
