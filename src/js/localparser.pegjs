start = first:day middle:(newday)* {middle.unshift(first); return middle}

newday = "#####" day:day //{return day}

day = line

//date = [0-9]+ "/" [0-9]+
line = $(!"#####".)* "\n"




