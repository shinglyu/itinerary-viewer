#!/usr/bin/env python
# -*- coding: utf-8 -*-

import argparse
import codecs
from datetime import datetime
import json

import formatter

def json_serial(obj):
    """JSON serializer for objects not serializable by default json code"""

    if isinstance(obj, datetime):
        serial = obj.isoformat()
        return serial
    raise TypeError ("Type not serializable")

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


def main():
    parser = argparse.ArgumentParser(description='Parse text flight itinearies into JSON.')
    parser.add_argument('filename', help='the text file containing the flight itineary')
    parser.add_argument('-o', '--output', choices=['json', 'yaml'], help='the output format (default: raw json)')

    args = parser.parse_args()
    with codecs.open(args.filename, 'rb', 'utf-8') as f:
        text = unicode(f.read())

    if args.output == "yaml":
        print(formatter.format_yaml(parse_swire_quote(text)).encode('utf-8'))
    else:
        print(json.dumps(parse_swire_quote(text), default=json_serial))

if __name__ == "__main__":
    main()
