#Itinerary Viewer

#Features
* Search maps
* Search address
* Search traffic routes
* Maps for each day (disabled in demo because I don't have budget to pay for Google API)
* Maps for each location (disabled in demo because I don't have budget to pay for Google API)
* Pretty printing (optimized CSS for printing)

#[Live Demo (Planning Mode)](https://shinglyu.github.io/itinerary-viewer/?planningMode=1)
#[Live Demo (Printing Mode)](https://shinglyu.github.io/itinerary-viewer/)

# The Toolchain
* Use `util/flight_parser` to transform the flight itinerary into itinerary-viewer compatible format.
* Collect a list of sights you want to visit, then use `util/kml` to geocode them into longitude and latitude points.
* You can open the kml file in Google My Map or MAPS.ME to visualize.
* Use the `utils/clustering` tool to cluster sights by distance.

# How to use locally

* Run `./bin/install.sh`
* If node, npm or bower is not installed, uncomment the lines in `./bin/install.sh`
* Run with `./bin/itinerary-viewer <path/to/file.yml>`

