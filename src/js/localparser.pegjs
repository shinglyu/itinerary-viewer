start = first:day middle:(newday)* {middle.unshift(first); return middle}
newday = "-----" day:day {return day}
day = str:$(!"-----" .)* {return str}

