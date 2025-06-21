mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v12",
    // center: [77.4126, 23.2599],  ///starting postion [lng,lat]
    center : listing.geometry.coordinates,
    zoom: 9,
});

// console.log(coordinates);

const marker = new mapboxgl.Marker({color : "red"})
    .setLngLat(listing.geometry.coordinates)
    .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`<h1>${listing.title}</h1><p>Exact location provided after booking</p>`))
    .addTo(map);