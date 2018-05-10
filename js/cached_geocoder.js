class CachedGeoCoder {
  constructor() {
    // We are going to use localStorage anyway, so no need to abstract this
    this.cache = window.localStorage;
    this.geocode = this.geocode.bind(this);
  }

  geocode(address) {
    let cached_location = this.cache.getItem(address);
    if ( cached_location !== null) {
      return JSON.parse(cached_location);
    } else {
      return fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURI(address) + '&key=' + maps_embed_api_key)
        .then((resp) => resp.json())
        .then((resp) => {
          if (resp.results.length === 0) {
            this.cache.setItem(address, null);
            return null;
          } else {
            let loc = resp.results[0].geometry.location;
            this.cache.setItem(address, JSON.stringify(loc));
            return loc;
          }
        });
    }
  }

  async geocodeMultiple(addresses) {
    return await Promise.all(addresses.map(this.geocode));
  }
}

