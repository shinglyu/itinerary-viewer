echo $1
python geocodeKML.py $1
firefox http://ivanrublev.me/kml/ &
nemo . &
