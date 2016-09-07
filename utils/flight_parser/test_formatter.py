# -*- coding: utf-8 -*-
import datetime
import formatter

def test_format_yaml():
    exp_departure1 = datetime.datetime(2016, 9, 10, 18, 10)
    exp_arrival1   = datetime.datetime(2016, 9, 10, 19, 55)
    exp_departure2 = datetime.datetime(2016, 9, 20, 18, 10)
    exp_arrival2   = datetime.datetime(2016, 9, 21, 19, 55)
    input_json = {
        "booking_id": "RUZVKI",
        "flights": [
            {
                "order": 1,
                "from": u"台北桃園(TPE)",
                "to": u"香港(HKG)",
                "departure": exp_departure1,
                "arrival": exp_arrival1,
                "flight_number": u"BR857",
                "code": u"Z3RVWV",
                "class": u"H",
                "status": u"機位OK",
                "airline": u"長榮航空"
            },
            {
                "order": 2,
                "from": u"香港(HKG)",
                "to": u"洛杉磯(LAX)",
                "departure": exp_departure2,
                "arrival": exp_arrival2,
                "flight_number": u"BR321",
                "code": u"Z3RVWV",
                "class": u"H",
                "status": u"機位OK",
                "airline": u"長榮航空"
            }
        ]
    }

    expected = u'''9/10:
  - sight: 台北桃園(TPE) Airport

  - transit: 長榮航空 BR857
    time: 18:10

  - sight: 香港(HKG) Airport
    time: 19:55

9/20:
  - transit: 長榮航空 BR321
    time: 18:10

9/21:
  - sight: 洛杉磯(LAX) Airport
    time: 19:55

'''

    assert(expected == formatter.format_yaml(input_json))


def test_transit_airport():
# Transit airport should not be repeated
    exp_departure1 = datetime.datetime(2016, 9, 10, 18, 10)
    exp_arrival1   = datetime.datetime(2016, 9, 10, 19, 55)
    exp_departure2 = datetime.datetime(2016, 9, 10, 20, 00)
    exp_arrival2   = datetime.datetime(2016, 9, 10, 21, 55)
    input_json = {
        "booking_id": "RUZVKI",
        "flights": [
            {
                "order": 1,
                "from": u"台北桃園(TPE)",
                "to": u"香港(HKG)",
                "departure": exp_departure1,
                "arrival": exp_arrival1,
                "flight_number": u"BR857",
                "code": u"Z3RVWV",
                "class": u"H",
                "status": u"機位OK",
                "airline": u"長榮航空"
            },
            {
                "order": 2,
                "from": u"香港(HKG)",
                "to": u"洛杉磯(LAX)",
                "departure": exp_departure2,
                "arrival": exp_arrival2,
                "flight_number": u"BR321",
                "code": u"Z3RVWV",
                "class": u"H",
                "status": u"機位OK",
                "airline": u"長榮航空"
            }
        ]
    }

    expected = u'''9/10:
  - sight: 台北桃園(TPE) Airport

  - transit: 長榮航空 BR857
    time: 18:10

  - sight: 香港(HKG) Airport
    time: 19:55

  - transit: 長榮航空 BR321
    time: 20:00

  - sight: 洛杉磯(LAX) Airport
    time: 21:55

'''

    assert(expected == formatter.format_yaml(input_json))
