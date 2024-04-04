// Define a function to open Google/Apple Maps with a given address
function openMaps(address: string, provider: 'google' | 'apple'): void {
    let mapsUrl = '';
    if (provider === 'google') {
        // Construct the Google Maps URL with the address
        mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    } else if (provider === 'apple') {
        // Construct the Apple Maps URL with the address
        mapsUrl = `http://maps.apple.com/?address=${encodeURIComponent(address)}`;
    }
    
    // Open the URL in a new tab/window
    if (mapsUrl) {
        window.open(mapsUrl, '_blank');
    } else {
        console.error("Invalid provider specified.");
    }
}

// Create buttons for Google Maps and Apple Maps
const googleMapsButton = document.createElement("button");
googleMapsButton.textContent = "Open Google Maps";

const appleMapsButton = document.createElement("button");
appleMapsButton.textContent = "Open Apple Maps";

// Example address
const address = "XXX"; // Replace with the desired address

// Attach click event listeners to the buttons
googleMapsButton.addEventListener("click", () => {
    openMaps(address, 'google');
});

appleMapsButton.addEventListener("click", () => {
    openMaps(address, 'apple');
});

// Append the buttons to the document body
document.body.appendChild(googleMapsButton);
document.body.appendChild(appleMapsButton);