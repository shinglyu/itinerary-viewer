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

# How to use locally
* Install bower and/or node.js + npm 
```
bower install
npm install -g live-server # or python -m SimpleHTTPServer
```

```
ln -s <your yml file> source_files/default.yml
live-server 
```

