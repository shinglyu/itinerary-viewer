Parse text flight itineraries into JSON so they can be imported into other tools.

# Usage
* Copy the itinerary into a text file, say 'itinerary.txt'
* Run `python flight_parser.py itinerary.txt`, the JSON will be in STDOUT.

## Supported format: 
* Swire's ticket issue notice:

```
訂位代號:ABCDEF(ABACUS)
=============================== ===== ======= ====== ====== ======== ==== ====== =============
行程表                          日期  日 出發 抵達   航班   電腦代號 艙等 狀態   航空公司
=============================== ===== ======= ====== ====== ======== ==== ====== =============
01 台北桃園(TPE)-舊金山(SFO)    20SEP 日 1950 1630   BR18   XXXXXX   H    機位OK 長榮航空
02 舊金山(SFO)-台北桃園(TPE)    25SEP 五 0120 0510+1 BR7    XXXXXX   H    機位OK 長榮航空
------------------------------- ----- ------- ------ ------ -------- ---- ------ ------------ 
``` 
