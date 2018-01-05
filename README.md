Itinerary Viewer
-----

A web-based trip planner, write your plan in YAML and have a nice looking printable itinerary.

# Features
* Easy to edit, write in YAML.
* Optimized for printing. 
* Search for traffic routes between destinations
* For each point of interest
  * Search on map
  * Search details, address, foods and sights nearby (using Google)
* Maps for each day (disabled by default, Google API is expensive :P)
* Maps for each location (disabled by default)

#[Live Demo (Planning Mode)](https://shinglyu.github.io/itinerary-viewer/?planningMode=1)
#[Live Demo (Printing Mode)](https://shinglyu.github.io/itinerary-viewer/)

# Additional Tools
Besides the web-based planner, this tool also comes with a set of useful scripts:

* `utils/clustering`: Tells you which attractions are nearby and should be planned together
* `util/kml`: Given a list of destinations, generate a KML file to import into map apps like Google My Map or MAPS.ME
* `util/flight_parser`: transform the flight itinerary email into itinerary-viewer compatible format.

# How to use locally

* Prerequisite: Node.js, NPM, Bower
* Run `./bin/install.sh`
* If node, npm or bower is not installed, uncomment the lines in `./bin/install.sh`
* Run with `./bin/itinerary-viewer <path/to/file.yml>`

