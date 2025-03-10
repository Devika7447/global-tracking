// Initialize Google Map
function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 2,
        center: { lat: 20, lng: 0 }
    });

    fetch('/data')  // Get trade data from Flask API
        .then(response => response.json())
        .then(data => {
            data.forEach(country => {
                let countryCode = country.country_code;
                let tradeValue = country.trade_value;

                // Fetch country geometry from a GeoJSON source
                fetch(`https://raw.githubusercontent.com/johan/world.geo.json/master/countries/${countryCode}.geo.json`)
                    .then(response => response.json())
                    .then(geojson => {
                        let color = getColor(tradeValue);

                        let countryLayer = new google.maps.Data({ map: map });
                        countryLayer.addGeoJson(geojson);

                        // Apply Choropleth styling
                        countryLayer.setStyle({
                            fillColor: color,
                            strokeWeight: 1,
                            fillOpacity: 0.7
                        });

                        // Tooltip on hover
                        countryLayer.addListener('mouseover', function(event) {
                            map.data.revertStyle();
                            map.data.overrideStyle(event.feature, {
                                strokeWeight: 2,
                                fillOpacity: 1
                            });
                        });

                        // Reset style on mouse out
                        countryLayer.addListener('mouseout', function() {
                            map.data.revertStyle();
                        });
                    });
            });
        });
}

// Define color ranges based on trade value
function getColor(value) {
    return value > 1000000 ? "#ff0000" :
           value > 500000  ? "#ff8000" :
           value > 100000  ? "#ffff00" :
                             "#00ff00";
}

// Load map after page loads
window.onload = initMap;
