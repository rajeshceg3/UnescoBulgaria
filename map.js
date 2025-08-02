document.addEventListener('DOMContentLoaded', () => {
    const map = L.map('map').setView([42.7339, 25.4858], 7);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    window.unescoApp.SITES_DATA.forEach(site => {
        const marker = L.marker(site.coords).addTo(map);
        marker.bindPopup(`<b>${site.name}</b><br>${site.category}`);
        marker.on('click', () => {
            window.unescoApp.showDetailView(site.id);
        });
    });
});
