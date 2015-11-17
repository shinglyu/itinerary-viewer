#Usage

Run

```
python geocodeKML.py <your input txt>
```

or

```
bash geocode.sh <your input txt> #Will open online kml viewer and nemo file manager
```

A file called `google.kml` will be generated. You can import it to apps like MAPS.ME or Google My Map.

#Input file format

```
title; address
title; title
```
If you don't know the address, simply repeat the title again.

e.g.

```
Taipei 101; No.x, Hsin-yi Rd. Taipei, Taiwan
Taipei Main Train Station; Taipei Main Train Station
```

