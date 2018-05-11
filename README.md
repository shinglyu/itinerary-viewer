# Itinerary Viewer

A web-based trip planner, write your plan in YAML and have a nice looking printable itinerary.

![demo](doc/demo.png)

## Demo:
* [Demo (Planning Mode)](https://shinglyu.github.io/itinerary-viewer/?planningMode=1)
* [Printable PDF](https://shinglyu.github.io/itinerary-viewer/demo_itinerary.pdf)

## Features
* Easy to edit, write in YAML (direct editing is coming soon)
* Optimized for printing, with note-taking area
* One-click search for traffic routes between destinations
* For each point of interest
  * Search on map
  * Search details, address, foods and sights nearby (using Google)
* Maps for each day

## Additional Tools
Besides the web-based planner, this tool also comes with a set of useful scripts:

* `utils/clustering`: Tells you which attractions are nearby and should be planned together
* `util/kml`: Given a list of destinations, generate a KML file to import into map apps like Google My Map or MAPS.ME
* `util/flight_parser`: transform the flight itinerary email into itinerary-viewer compatible format.
* [`utils/calendar_reminder`](http://shinglyu.github.io/itinerary-viewer/utils/calendar_reminder/): Add pre-trip reminders like flight check-in for your upcoming trip

## How to use locally

* Prerequisite: [ingotchest](https://github.com/shinglyu/ingotchest)
* Download ingotchest and run `cargo install`
* Run with `./bin/itinerary-viewer <path/to/file.yml>`

# Tests 
## Test are disabled because of React version mismatch between Node and web
