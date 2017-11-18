echo $1
python geocodeKML.py $1
sensible-browser http://ivanrublev.me/kml/ &
nautilus . &
