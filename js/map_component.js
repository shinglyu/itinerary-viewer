class DynamicMap extends React.Component {
  constructor() {
    super();
    this.map = undefined;
    this.markers = [];
    this.default_zoom = 14;
  }
  componentDidMount() {
    this._loadMap();
  }

  _loadMap() {
    const mapDOMRef = this.refs.map;
    const containerNode = ReactDOM.findDOMNode(mapDOMRef);

    this.map = new google.maps.Map(containerNode, {
      zoom: this.default_zoom,
      center: {lat: 0, lng: 0},
    });
  }

  _clearAllMarkers() {
    for (let marker of this.markers) {
      marker.setMap(null);
    }
  }

  componentDidUpdate() {
    this._clearAllMarkers();

    if (this.props.markers.length === 1) {
      // Show a single marker and center
      var center = new google.maps.LatLng(this.props.markers[0]['lat'], this.props.markers[0]['lng']);
      this.markers.push(new google.maps.Marker({
        position: center,
        map: this.map
      }));
      this.map.panTo(center);
    } else {
      // Show all markers and center
      var bounds = new google.maps.LatLngBounds();
      for (let marker of this.props.markers) {
        var center = new google.maps.LatLng(marker['lat'], marker['lng']);
        this.markers.push(new google.maps.Marker({
          position: center,
          map: this.map
        }));
        // TODO: display a InfoWindow
        bounds.extend(center);
      }
      this.map.fitBounds(bounds);
    }
  }

  render() {
    return (
      <div className="map" ref="map">
        Loading map...
      </div>
    )
  }
}

