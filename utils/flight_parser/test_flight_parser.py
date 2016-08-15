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


def test_parse_swire_ticket():
    text = u'''
訂位代號：RUZVKI
　　　　　Z3RVWV(BR-長榮航空)
　　　　　Z3RVWV(LH-德國漢莎航空)

旅客姓名:1. LYU/SHINGMR
                                                       航班     停留/機型/
                 城市/航站/                            艙等     飛行時間
日 日期          停留城市                         時間 狀態     服務
== ======== ==== ================================ ==== ======== ===================
六 09月10日 出發 台北桃園(TPE)台灣桃園國際機場    1810 BR857    直飛
                 第二航站                              經濟艙(H)空中巴士 330-220
            抵達 香港(HKG)香港國際機場            1955 機位OK   1小時45分鐘
                 第一航站                                       餐點
                 LYU/SHINGMR                   特殊服務需求:非吸煙靠走道座位 - ON REQUEST
                                                            非吸煙靠走道座位 - 28H - OK
                                               會員卡號:UAXD318305
-----------------------------------------------------------------------------------
六 09月10日 出發 香港(HKG)香港國際機場            2305 LH797    直飛
                 第一航站                              經濟艙(Q)388
   09月11日 抵達 法蘭克福(FRA)法蘭克福國際機場    0520 機位OK   12小時15分鐘
                 第一航站                                       餐點
                 LYU/SHINGMR                   特殊服務需求:非吸煙靠走道座位 - ON REQUEST
                                                            非吸煙靠走道座位 - 72G - OK
                                               會員卡號:UAXD318305
-----------------------------------------------------------------------------------
日 09月11日 出發 法蘭克福(FRA)法蘭克福國際機場    0645 LH170    直飛
                 第一航站                              經濟艙(Q)空中巴士 320
            抵達 柏林(TXL)柏林塔吉爾國際機場      0755 機位OK   1小時10分鐘
                                                                點心
                 LYU/SHINGMR                   特殊服務需求:非吸煙靠走道座位 - 
                                               會員卡號:UAXD318305
-----------------------------------------------------------------------------------
一 09月19日 出發 柏林(TXL)柏林塔吉爾國際機場      1945 LH201    直飛
                                                       經濟艙(V)空中巴士 321
            抵達 法蘭克福(FRA)法蘭克福國際機場    2055 機位OK   1小時10分鐘
                 第一航站                                       點心
                 LYU/SHINGMR                   特殊服務需求:非吸煙靠走道座位 - 
                                               會員卡號:UAXD318305
-----------------------------------------------------------------------------------
一 09月19日 出發 法蘭克福(FRA)法蘭克福國際機場    2210 LH796    直飛
                 第一航站                              經濟艙(V)388
   09月20日 抵達 香港(HKG)香港國際機場            1515 機位OK   11小時05分鐘
                 第一航站                                       餐點
                 LYU/SHINGMR                   特殊服務需求:非吸煙靠走道座位 - ON REQUEST
                                                            非吸煙靠走道座位 - 78H - OK
                                               會員卡號:UAXD318305
-----------------------------------------------------------------------------------
二 09月20日 出發 香港(HKG)香港國際機場            1700 BR856    直飛
                 第一航站                              經濟艙(H)空中巴士 321
            抵達 台北桃園(TPE)台灣桃園國際機場    1845 機位OK   1小時45分鐘
                 第二航站                                       餐點
                 LYU/SHINGMR                   特殊服務需求:非吸煙靠走道座位 - ON REQUEST
                                                            非吸煙靠走道座位 - 33H - OK
                                               會員卡號:UAXD318305
-----------------------------------------------------------------------------------
機票號碼:
2209153205890/91 - LYU SHINGMR
   '''

    exp_departure = datetime.datetime(2016, 9, 10, 18, 10)
    exp_arrival= datetime.datetime(2016, 9, 10, 19, 55)
    expected = {
        "booking_id": "RUZVKI",
        "flights": [
            {
                "order": 1,
                "from": u"台北桃園(TPE)台灣桃園國際機場",
                "to": u"香港(HKG)香港國際機場",
                "departure": exp_departure,
                "arrival": exp_arrival,
                "flight_number": u"BR857",
                "code": u"Z3RVWV",
                "class": u"經濟艙(H)",
                "status": u"機位OK",
                "airline": u""
            }
        ]
    }
    assert(expected['booking_id'] ==
           flight_parser.parse_swire_quote(text)['booking_id'])
    assert(6 == len(flight_parser.parse_swire_quote(text)['flights']))
    assert(expected['flights'][0] ==
           flight_parser.parse_swire_quote(text)['flights'][0])

