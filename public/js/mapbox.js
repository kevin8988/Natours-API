/* eslint-disable */

const locations = JSON.parse(document.getElementById('map').dataset.locations);

mapboxgl.accessToken = 'pk.eyJ1Ijoia2V2aW44OTg4IiwiYSI6ImNqemNxNW5hNzA4cHAzY3M4NTdmN2pnajgifQ.N2ygKwCYw-gE5WouMlZQ-A';
var map = new mapboxgl.Map({
  container: 'map',
  scrollZoom: false,
  style: 'mapbox://styles/kevin8988/cjzcq8ykw2eh31cp9qwzd5k8o'
});

const bounds = new mapboxgl.LngLatBounds();

locations.forEach(loc => {
  // Create marker
  const el = document.createElement('div');
  el.className = 'marker';

  // Add marker
  new mapboxgl.Marker({
    element: el,
    anchor: 'bottom'
  })
    .setLngLat(loc.coordinates)
    .addTo(map);

  //Add popup
  new mapboxgl.Popup({
    offset: 30,
    className: 'my-class'
  })
    .setLngLat(loc.coordinates)
    .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
    .setMaxWidth('300px')
    .addTo(map);

  // Extend map bounds to include current location
  bounds.extend(loc.coordinates);
});

map.fitBounds(bounds, {
  padding: {
    top: 200,
    bottom: 150,
    left: 100,
    right: 200
  }
});
