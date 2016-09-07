#!/usr/bin/env bash
grep -e "sight\|address" "${1}" \
  | sed "s/\s*- sight://" \
  | sed -e :a -e '$!N;s/\n\s*address:/; /;ta;P;D' \
  | sort \
  | uniq


# explanation:
# 
#    :a is a loop placeholder
#    $!N means if not end-of-file append next line to current line.
#    s/\n+// means delete an end on line followed by a plus sign
#    ta means if last substitution worked branch to a loop placeholder
#    P print upto the first newline.
#    D delete upto and including the first newline.

  
