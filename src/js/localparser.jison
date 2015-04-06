/* description: Parses end executes mathematical expressions. */

/* lexical grammar */
%lex
%%

\s+                   /* skip whitespace */
";"                   return 'LINESEP'
[STF]":"                   return 'TYPESEP'
"-----"               return 'DAYSEP'
<<EOF>>               return 'EOF'
.*                    return 'CHAR'
/* [0-9]+("."[0-9]+)?\b  return 'NUMBER' */

/lex

/* operator associations and precedence */

/*
%left '+' '-'
%left '*' '/'
%left '^'
%left UMINUS
*/

%start expressions

%% /* language grammar */

expressions
    : days EOF
        {return $1;}
    ;

days 
    : day 'DAYSEP' days
        {$$ = [$1].concat($3)}
    
    | day
        {$$ = [$1]}
    ;

day 
    : line day
        {$$ = [$1].concat($2)}
    | line 
        {$$ = [$1]}
    ;

line
    : TYPESEP CHAR 
        {{$$ = {"type": $1, "title": $2} }}
    | CHAR 
        {$$ = {"type": "NOTE", "title": $1}  }
    ;

