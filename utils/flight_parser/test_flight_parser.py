#!/usr/bin/env python
# -*- coding: utf-8 -*-

import datetime
import flight_parser


def test_parse_swire_quote():
    text = u'''
訂位代號:RUZVKI
=============================== ===== ======= ====== ====== ======== ==== ====== =============
行程表                          日期  日 出發 抵達   航班   電腦代號 艙等 狀態   航空公司
=============================== ===== ======= ====== ====== ======== ==== ====== =============
01 台北桃園(TPE)-香港(HKG)      10SEP 六 1810 1955   BR857  Z3RVWV   H    機位OK 長榮航空
02 香港(HKG)-法蘭克福(FRA)      10SEP 六 2305 0520+1 LH797  Z3RVWV   Q    機位OK 德國漢莎航空
03 法蘭克福(FRA)-柏林(TXL)      11SEP 日 0645 0755   LH170  Z3RVWV   Q    機位OK 德國漢莎航空
04 柏林(TXL)-法蘭克福(FRA)      19SEP 一 1945 2055   LH201  Z3RVWV   V    機位OK 德國漢莎航空
05 法蘭克福(FRA)-香港(HKG)      19SEP 一 2210 1515+1 LH796  Z3RVWV   V    機位OK 德國漢莎航空
06 香港(HKG)-台北桃園(TPE)      20SEP 二 1700 1845   BR856  Z3RVWV   H    機位OK 長榮航空
------------------------------- ----- ------- ------ ------ -------- ---- ------ ------------
    '''

    exp_departure = datetime.datetime(2016, 9, 10, 18, 10)
    exp_arrival= datetime.datetime(2016, 9, 10, 19, 55)
    expected = {
        "booking_id": "RUZVKI",
        "flights": [
            {
                "order": 1,
                "from": u"台北桃園(TPE)",
                "to": u"香港(HKG)",
                "departure": exp_departure,
                "arrival": exp_arrival,
                "flight_number": u"BR857",
                "code": u"Z3RVWV",
                "class": u"H",
                "status": u"機位OK",
                "airline": u"長榮航空"
            }
        ]
    }
    assert(expected['booking_id'] ==
           flight_parser.parse_swire_quote(text)['booking_id'])
    assert(6 == len(flight_parser.parse_swire_quote(text)['flights']))
    assert(expected['flights'][0] ==
           flight_parser.parse_swire_quote(text)['flights'][0])

def test_parse_date_plus_one():
    text = u"01 台北桃園(TPE)-香港(HKG)      10SEP 六 1810 1955+1   BR857  Z3RVWV   H    機位OK 長榮航空"
    # Testing this                                            ^^
    exp_departure = datetime.datetime(2016, 9, 10, 18, 10)
    exp_arrival= datetime.datetime(2016, 9, 11, 19, 55)
    # Testing this                          ^^
    expected = {
        "booking_id": "",
        "flights": [
            {
                "order": 1,
                "from": u"台北桃園(TPE)",
                "to": u"香港(HKG)",
                "departure": exp_departure,
                "arrival": exp_arrival,
                "flight_number": u"BR857",
                "code": u"Z3RVWV",
                "class": u"H",
                "status": u"機位OK",
                "airline": u"長榮航空"
            }
        ]
    }
    assert(expected == flight_parser.parse_swire_quote(text))
