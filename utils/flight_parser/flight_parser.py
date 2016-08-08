#!/usr/bin/env python
# -*- coding: utf-8 -*-

from datetime import datetime


def parse_swire_quote(text):
    lines = text.splitlines()
    booking_id = u''
    flights = []
    for line in lines:
        if line.startswith(u'訂位代號'):
            booking_id = line.split(":")[1]
        if len(line.split()) == 11 and u'機位' in line: # Can be better
            cols = line.split()
            fromto = cols[1]
            departure = datetime.strptime(cols[2] + cols[4], '%d%b%H%M')
            departure = departure.replace(datetime.now().year)
            if cols[5].endswith("+1"):
                arrival = datetime.strptime(cols[2] + cols[5][0:4], '%d%b%H%M')
                arrival = arrival.replace(datetime.now().year,
                                          arrival.month,
                                          arrival.day + 1)
            else:
                arrival = datetime.strptime(cols[2] + cols[5], '%d%b%H%M')
                arrival = arrival.replace(datetime.now().year)
            flight = {
                "order": int(cols[0]),
                "from": fromto.split('-')[0],
                "to":   fromto.split('-')[1],
                "departure": departure,
                "arrival": arrival,
                "flight_number": cols[6],
                "code":    cols[7],
                "class":   cols[8],
                "status":  cols[9],
                "airline": cols[10],
            }
            flights.append(flight)


    return {
        "booking_id": booking_id,
        "flights": flights
    }
