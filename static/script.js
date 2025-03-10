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

    // Fetch data from Flask API
    fetch("/data")  // Use relative URL to avoid CORS issues
        .then(response => {
            if (!response.ok) throw new Error("Network response was not ok " + response.statusText);
            return response.json();
        })
        .then(data => {
            console.log("Fetched Data:", data); // Debugging

            data.forEach(point => {
                let lat = parseFloat(point.latitude);
                let lng = parseFloat(point.longitude);
                let exports = parseInt(point["no_of_exports"]) || 0;
                let imports = parseInt(point["no_of_imports"]) || 0;
                let mode = point["mode_of_transportation"];

                // Validate coordinates
                if (isNaN(lat) || isNaN(lng)) {
                    console.error("Invalid coordinates:", point);
                    return;
                }

                // Calculate radius dynamically (Minimum size: 50km for visibility)
                let radius = Math.max(50000, Math.sqrt(exports) * 8000);

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

                // Show info window on click & close previous one
                circle.addListener('click', function () {
                    globalInfoWindow.close(); // Close previous info window
                    globalInfoWindow = infoWindow;
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

// Ensure initMap is globally accessible
window.initMap = initMap;
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

    // Fetch data from Flask API
    fetch("/data")  // Use relative URL to avoid CORS issues
        .then(response => {
            if (!response.ok) throw new Error("Network response was not ok " + response.statusText);
            return response.json();
        })
        .then(data => {
            console.log("Fetched Data:", data); // Debugging

            data.forEach(point => {
                let lat = parseFloat(point.latitude);
                let lng = parseFloat(point.longitude);
                let exports = parseInt(point["no_of_exports"]) || 0;
                let imports = parseInt(point["no_of_imports"]) || 0;
                let mode = point["mode_of_transportation"];

                // Validate coordinates
                if (isNaN(lat) || isNaN(lng)) {
                    console.error("Invalid coordinates:", point);
                    return;
                }

                // Calculate radius dynamically (Minimum size: 50km for visibility)
                let radius = Math.max(50000, Math.sqrt(exports) * 8000);

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

                // Show info window on click & close previous one
                circle.addListener('click', function () {
                    globalInfoWindow.close(); // Close previous info window
                    globalInfoWindow = infoWindow;
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

// Ensure initMap is globally accessible
window.initMap = initMap;
