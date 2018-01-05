# -*- coding: utf-8 -*-
import datetime


def format_yaml(input_json):
    out_str = u""
    curr_date = datetime.datetime(1970,1,1)
    curr_airport = u""
    for flight in input_json['flights']:

        if flight['departure'].date() != curr_date.date():
            curr_date = flight['departure']
            out_str += curr_date.strftime('%m/%d:\n').lstrip("0")

        if flight['from'] != curr_airport:
            curr_airport = flight['from']

            out_str += u"  - sight: {airport} Airport\n".format(airport=flight['from'])
            out_str += u"\n"

        out_str += u"  - transit: {airline} {flight_number}\n".format(airline=flight['airline'],
                                                                  flight_number=flight['flight_number'])
        out_str += u"    time: {time}\n".format(time=flight['departure'].strftime('%H:%M'))
        out_str += u"\n"

        if flight['arrival'].date() != curr_date.date():
            curr_date = flight['arrival']
            out_str += curr_date.strftime('%m/%d:\n').lstrip("0")

        if flight['to'] != curr_airport:
            curr_airport = flight['to']

        out_str += u"  - sight: {airport} Airport\n".format(airport=flight['to'])
        out_str += u"    time: {time}\n".format(time=flight['arrival'].strftime('%H:%M'))
        out_str += u"\n"

    return out_str
