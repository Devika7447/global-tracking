// Initialize Google Map
function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 2,
        center: { lat: 20, lng: 0 }
    });

    // Define colors for each transport mode
    const colors = {
        "Sea Route": "#FF0000",  // Red
        "Road Way": "#FFA500",   // Orange
        "Air Way": "#8F00FF"     // Purple
    };

    // Global InfoWindow to prevent multiple open windows
    let globalInfoWindow = new google.maps.InfoWindow();

    // Load GeoJSON (Replace with your valid GeoJSON source)
    map.data.loadGeoJson('path/to/your-geojson-file.json');

    // Style function for the choropleth map
    map.data.setStyle(feature => {
        let mode = feature.getProperty('mode_of_transportation');
        let exports = feature.getProperty('no_of_exports') || 0;

        let color = colors[mode] || "#000000"; // Default black
        let intensity = Math.min(1, exports / 10000); // Normalize export values

        return {
            fillColor: color,
            fillOpacity: intensity,
            strokeColor: "#FFFFFF",
            strokeWeight: 1
        };
    });

    // Click event to show info window
    map.data.addListener('click', function (event) {
        let feature = event.feature;
        let content = `<strong>${feature.getProperty('port_name')} (${feature.getProperty('country')})</strong><br>
                       Mode: <b style="color:${colors[feature.getProperty('mode_of_transportation')] || 'black'}">${feature.getProperty('mode_of_transportation')}</b><br>
                       Exports: ${feature.getProperty('no_of_exports')}<br>
                       Imports: ${feature.getProperty('no_of_imports')}`;

        globalInfoWindow.setContent(content);
        globalInfoWindow.setPosition(event.latLng);
        globalInfoWindow.open(map);
    });
}

// Load Google Maps API
window.initMap = initMap;
