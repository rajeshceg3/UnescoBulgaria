document.addEventListener('DOMContentLoaded', () => {
    // Initialize map with a dark theme
    const map = L.map('map', {
        zoomControl: false, // We'll add it in a better position or custom
        attributionControl: false // We'll add custom attribution
    }).setView([42.7339, 25.4858], 7);

    // Add attribution manually to style it better
    L.control.attribution({
        position: 'bottomright'
    }).addTo(map);

    // CartoDB Dark Matter Tiles for the "Dark Luxury" look
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
    }).addTo(map);

    // Custom marker style
    const markerOptions = {
        radius: 8,
        fillColor: "#c0a062", // Gold
        color: "#fff",
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8
    };

    window.unescoApp.SITES_DATA.forEach(site => {
        // Use CircleMarker for a cleaner, modern look
        const marker = L.circleMarker(site.coords, markerOptions).addTo(map);

        // Custom tooltip instead of default popup for slickness
        marker.bindTooltip(site.name, {
            permanent: false,
            direction: 'top',
            className: 'custom-map-tooltip'
        });

        marker.on('mouseover', function (e) {
            this.setStyle({
                radius: 12,
                fillColor: "#fff",
                color: "#c0a062"
            });
        });

        marker.on('mouseout', function (e) {
            this.setStyle(markerOptions);
        });

        marker.on('click', () => {
            window.unescoApp.showDetailView(site.id);
        });

        // Accessibility (CircleMarker doesn't return an element immediately like Marker,
        // but we can try to add it via the path)
        // Note: L.circleMarker renders as SVG/Canvas path.
        // Leaflet 1.7 doesn't make it easily focusable by default.
        // For this polished version, we rely on the main UI for accessibility
        // but let's keep the map usable.
    });
});
