Geocode KML
=================
List of location names => KML file that can be opend in map apps

# Usage

Run

```
python geocodeKML.py <your input txt>
```

or

```
bash geocode.sh <your input txt> #Will open online kml viewer and nemo file manager
```
# Output
* `<your input>.kml`: a KML file that can be imported it to apps like MAPS.ME or Google My Map.
* `<your input>.kml.failed`: a list of locations that can't be found using Google's geocode service. You may want to consider adding addresses for them or add them manually in your map app.

#Input file format

```
title          # Title only, e.g. Tower of London
title; address # Add exact address for better positioning accuracy
# Text after a pond sign are comments, they are ignored
```

e.g.
```
# My plan for Taipei 
Taipei 101; No.x, Hsin-yi Rd. Taipei, Taiwan
Taipei Main Train Station 
```


# Compatible Apps
* [Google My Map](https://www.google.com/mymaps/?hl=en_US&app=mp)
* [MAPS.ME](http://maps.me/en/home)
* Other apps that supports KML format
