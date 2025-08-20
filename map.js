document.addEventListener('DOMContentLoaded', () => {
    const map = L.map('map').setView([42.7339, 25.4858], 7);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    window.unescoApp.SITES_DATA.forEach(site => {
        const marker = L.marker(site.coords, {
            alt: site.name // Add alt text for screen readers
        }).addTo(map);

        marker.bindPopup(`<b>${site.name}</b><br>${site.type}`);

        // --- Accessibility Enhancement ---
        // Make the marker focusable and announce its purpose
        const icon = marker.getElement();
        if (icon) {
            icon.setAttribute('tabindex', '0');
            icon.setAttribute('role', 'button');
            icon.setAttribute('aria-label', `View details for ${site.name}`);

            // Trigger click on Enter or Space key press
            marker.on('keydown', (e) => {
                if (e.originalEvent.key === 'Enter' || e.originalEvent.key === ' ') {
                    window.unescoApp.showDetailView(site.id);
                }
            });
        }
        // --- End Accessibility Enhancement ---

        marker.on('click', () => {
            window.unescoApp.showDetailView(site.id);
        });
    });
});
