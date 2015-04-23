/* description: Parses end executes mathematical expressions. */

/* lexical grammar */
%lex
%%

\s+                   /* skip whitespace */
";"                   return 'LINESEP'
/*[STF]":"                   return 'TYPESEP'*/
"-----"               return 'DAYSEP'
<<EOF>>               return 'EOF'
[a-zA-Z0-9:]*                    return 'CHAR'

/lex

/* operator associations and precedence */

/*
%left '+' '-'
*/

%start expressions

%% /* language grammar */

expressions
    : days EOF
        {return $1;}
    ;

days 
    : days 'DAYSEP' day
        {$$ = $1.concat([[$3]])}
    
    | day 'DAYSEP' day
        {$$ = [[$1]].concat([[$3]])}
    | day
        {$$ = [$1]}
    ;

day 
    : CHAR
        {$$ = $1;}
    ;


