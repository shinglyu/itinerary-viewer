# -*- coding: utf-8 -*-
# From https://developers.google.com/kml/articles/geocodingforkml
import argparse
import config
import io
import json
import time
import urllib
import unicodedata
import xml.dom.minidom

waitTime=2

def geocode(address, sensor=False):
 # This function queries the Google Maps API geocoder with an
 # address. It gets back a csv file, which it then parses and
 # returns a string with the longitude and latitude of the address.

  # mapsUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address='
  mapsUrl = 'https://maps.googleapis.com/maps/api/place/textsearch/json?key={}&query='.format(config.mapsKey)

 # This joins the parts of the URL together into one string.
  url = ''.join([mapsUrl,urllib.quote(address.encode('utf-8')),'&sensor=',str(sensor).lower()])
#'&key=',mapsKey])
  jsonOutput = str(urllib.urlopen(url).read ()) # get the response
  # fix the output so that the json.loads function will handle it correctly
  jsonOutput=jsonOutput.replace ("\\n", "")
  result = json.loads(jsonOutput) # converts jsonOutput into a dictionary
  # check status is ok i.e. we have results (don't want to get exceptions)
  if result['status'] != "OK":
    print("Search failed for " + address)
    return ""
  coordinates=result['results'][0]['geometry']['location'] # extract the geometry
  # return str(coordinates['lat'])+','+str(coordinates['lng'])
  return str(coordinates['lng'])+','+str(coordinates['lat'])

def createKML(addresses, fileName):
 # This function creates an XML document and adds the necessary
 # KML elements.

  kmlDoc = xml.dom.minidom.Document()

  kmlElement = kmlDoc.createElementNS('http://earth.google.com/kml/2.2','kml')
  kmlElement = kmlDoc.appendChild(kmlElement)

  documentElement = kmlDoc.createElement('Document')
  documentElement = kmlElement.appendChild(documentElement)

  failedlist = []
  for idx, address in enumerate(addresses):
    placemarkElement = kmlDoc.createElement('Placemark')

    nameElement = kmlDoc.createElement('name')
    nameText = kmlDoc.createTextNode(address['name'])
    nameElement.appendChild(nameText)
    placemarkElement.appendChild(nameElement)
    descriptionElement = kmlDoc.createElement('description')
    descriptionText = kmlDoc.createTextNode(address['address'])
    descriptionElement.appendChild(descriptionText)
    placemarkElement.appendChild(descriptionElement)
    pointElement = kmlDoc.createElement('Point')
    placemarkElement.appendChild(pointElement)
    coorElement = kmlDoc.createElement('coordinates')

    # This geocodes the address and adds it to a  element.
    print("Searching for location " + str(idx+1) + "/" + str(len(addresses)))
    coordinates = geocode(address['address'])

    if coordinates == "":
        failedlist.append("{}; {}".format(address['name'], address['address']))
    else:
        coorElement.appendChild(kmlDoc.createTextNode(coordinates))
        pointElement.appendChild(coorElement)

        documentElement.appendChild(placemarkElement)

    time.sleep(waitTime)

  print("==========")
  # This writes the KML Document to a file.
  print("Saving search result to {}".format(fileName))
  with open(fileName, 'w') as kmlFile:
    kmlFile.write(kmlDoc.toprettyxml(' ', '\n', 'UTF-8'))
  failFilename = "{}.failed".format(fileName)
  print("Saving failed searches to {}".format(failFilename))
  with open(failFilename, 'w') as failedFile:
    failedFile.write('\n'.join(failedlist))

def parseAddresses(addressesText):
    addressLines = addressesText.splitlines()
    addressLines = map(lambda x: x.split('#')[0], addressLines)
    addressLines = filter(lambda x: x.strip() != '', addressLines)
    #addressLines = filter(lambda x: not x.strip().startswith('#'), addressLines)
    addressLists = map(lambda x: x.split(';'), addressLines)
    def listToDict(l):
        if len(l) == 1:
            return {'name': l[0].strip(), 'address': l[0].strip()}
        else:
            return {'name': l[0].strip(), 'address': l[1].strip()}
    addressDictLists = map(listToDict, addressLists)
    return addressDictLists

if __name__ == '__main__':
  parser = argparse.ArgumentParser()
  parser.add_argument('filename', help='The input file')
  args = parser.parse_args()
  #with open('{}/{}'.format(os.getcwd(), args.filename), 'r') as f:
  with io.open('{}'.format(args.filename), 'r', encoding='utf-8') as f:
      addressesText = f.read()
  #addressesText = '''
  #Mozilla HQ; 331 E Evelyn Ave, Mountain View, CA 94041
  #Mozilla Paris; 16 Boulevard Montmartre, 75009 Paris
  #'''
  createKML(parseAddresses(addressesText), "{}.kml".format(args.filename))

