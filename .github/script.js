// Function to generate a random number in a given range
function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

// Initialize map centered on the US
const map = L.map('map').setView([37.0902, -95.7129], 4);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '© OpenStreetMap'
}).addTo(map);

// Function to fetch locality information for given coordinates
async function fetchLocality(lat, lon) {
    const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`);
    const data = await response.json();
    return data.locality || "Unknown Location";
}

// Generate three random coordinates and add markers to the map
async function addMarkers() {
    const markerInfoDiv = document.getElementById("marker-info");

    for (let i = 1; i <= 3; i++) {
        const lat = getRandomInRange(30, 35, 3);
        const lon = getRandomInRange(-100, -90, 3);
    
        const marker = L.marker([lat, lon]).addTo(map);
        
        // Fetch locality and display info below the map
        const locality = await fetchLocality(lat, lon);
        marker.bindPopup(`Marker ${i}: ${locality}`);
        
        // Append formatted text for each marker in the marker-info div
        markerInfoDiv.innerHTML += `
            <p class="marker-heading">Marker ${i}: Latitude: ${lat}, Longitude: ${lon}</p>
            <span class="marker-locality">Locality: ${locality}</span>
        `;
    }
}

addMarkers();
