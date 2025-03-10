// Initialize Google Map
function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 2,
        center: { lat: 20, lng: 0 }
    });

    // Define colors for each transport mode
    const colors = {
        "Sea Route": "#FF0000",  // Red for Sea Route
        "Road Way": "#FFA500",    // Orange for Roadway
        "Air Way": "#8F00FF"      // Purple for Airway
    };

    // Fetch data from Flask API
    fetch("http://127.0.0.1:5000/data") // Ensure Flask is running
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok " + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log("Fetched Data:", data); // Debugging

            data.forEach(function (point) {
                let lat = parseFloat(point.latitude);
                let lng = parseFloat(point.longitude);
                let exports = parseInt(point["no_of_exports"]);
                let imports = parseInt(point["no_of_imports"]);
                let mode = point["mode_of_transportation"];

                // Validate coordinates
                if (isNaN(lat) || isNaN(lng)) {
                    console.error("Invalid coordinates:", point);
                    return;
                }

                // Set bubble radius (increased for better visibility)
                let radius = Math.sqrt(exports) * 8000;

                // Set color based on transport mode
                let color = colors[mode] || "#000000"; // Default black if mode is unknown

                // Create a circle for each transport mode
                var circle = new google.maps.Circle({
                    strokeColor: color,
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: color,
                    fillOpacity: 0.4,  
                    map: map,
                    center: { lat: lat, lng: lng },
                    radius: radius
                });

                // Create an info window for the bubble
                var infoWindow = new google.maps.InfoWindow({
                    content: `<strong>${point.port_name} (${point.country})</strong><br>
                              Mode: <b style="color:${color}">${mode}</b><br>
                              Exports: ${exports}<br>
                              Imports: ${imports}`
                });

                // Show info window on click
                circle.addListener('click', function () {
                    infoWindow.setPosition(circle.getCenter());
                    infoWindow.open(map);
                });
            });
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            document.getElementById('error').innerText = "Failed to load data. Ensure Flask is running.";
        });
}

// Load the map when the page is loaded
window.onload = initMap;
