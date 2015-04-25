/* description: Parses end executes mathematical expressions. */

/* lexical grammar */
%lex
%%

\w+                   /* skip whitespace */
\n                    return 'NEWLINE'
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
    
    /*| day 'DAYSEP' day
        {$$ = [[$1]].concat([[$3]])}*/
    | day
        {$$ = [[$1]]}
    ;

day 
    /*: day line
        {$$ = $1;}*/
    : lines
        {$$ = $1;}
    ;

lines
    : lines NEWLINE CHAR
        {$$ = $1;}
    | CHAR
    ;



