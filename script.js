document.addEventListener('DOMContentLoaded', () => {

    const SITES_DATA = [
        {
            id: 'rila',
            name: 'Rila Monastery',
            category: 'Cultural',
            description: 'A stunning example of Bulgarian Renaissance architecture, the Rila Monastery is the largest and most famous Eastern Orthodox monastery in Bulgaria. It has been a spiritual and cultural hub for centuries.',
            image: 'https://images.unsplash.com/photo-1598207969837-86b2b9c7b447?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
            gradient: 'linear-gradient(135deg, #f3e7e9 0%, #e3eeff 100%)',
            svg: 'assets/svg/rila.svg',
            coords: [42.1333, 23.3403]
        },
        {
            id: 'boyana',
            name: 'Boyana Church',
            category: 'Cultural',
            description: 'Located on the outskirts of Sofia, the Boyana Church consists of three buildings. The second church, built in the 13th century, contains some of the most complete and perfectly preserved examples of medieval Eastern European art.',
            image: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Boyana_Church_01.jpg',
            gradient: 'linear-gradient(135deg, #e6e9f0 0%, #eef1f5 100%)',
            svg: 'assets/svg/boyana.svg',
            coords: [42.6458, 23.2667]
        },
        {
            id: 'ivanovo',
            name: 'Rock-Hewn Churches',
            category: 'Cultural',
            description: 'A complex of rock-hewn churches, chapels and monasteries near the village of Ivanovo. The complex is noted for its beautiful and well-preserved medieval frescoes from the 13th and 14th centuries.',
            image: 'https://upload.wikimedia.org/wikipedia/commons/9/9e/Basarbovo_Monastery_2.jpg',
            gradient: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            svg: 'assets/svg/ivanovo.svg',
            coords: [43.7000, 25.9833]
        },
        {
            id: 'thracian',
            name: 'Thracian Tomb',
            category: 'Cultural',
            description: 'Discovered in 1944, this tomb dates from the Hellenistic period, around the end of the 4th century BC. Its narrow corridor and round burial chamber are decorated with murals representing Thracian burial rituals and culture.',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Kazanlak_tomb_replica_interior.jpg/1280px-Kazanlak_tomb_replica_interior.jpg',
            gradient: 'linear-gradient(135deg, #fde4e1 0%, #e6d1d1 100%)',
            svg: 'assets/svg/thracian.svg',
            coords: [42.6242, 25.3925]
        },
        {
            id: 'pirin',
            name: 'Pirin National Park',
            category: 'Natural',
            description: 'Encompassing a vast area of the Pirin Mountains, the park is known for its limestone karst landscapes, glacial lakes, waterfalls, caves, and coniferous forests. It is a sanctuary for diverse alpine flora and fauna.',
            image: 'https://images.unsplash.com/photo-1629221237398-5401e6e902a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            gradient: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
            svg: 'assets/svg/pirin.svg',
            coords: [41.7650, 23.4180]
        },
        {
            id: 'nesebar',
            name: 'Ancient City of Nesebar',
            category: 'Cultural',
            description: 'Situated on a rocky peninsula on the Black Sea, Nesebar is a rich city-museum defined by more than three millennia of history. The city\'s architecture showcases its evolution from a Thracian settlement to a major Byzantine hub.',
            image: 'https://images.unsplash.com/photo-1628373327576-97a4d55c7041?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80',
            gradient: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
            svg: 'assets/svg/nesebar.svg',
            coords: [42.6592, 27.7350]
        },
    ];

    const orrery = document.getElementById('heritage-orrery');
    const body = document.body;
    const backgroundCanvas = document.querySelector('.background-canvas');
    const backButton = document.querySelector('.back-button');
    const defaultGradient = 'linear-gradient(135deg, #e0eafc, #cfdef3)';

    // --- Initialization ---
    function init() {
        createSiteNodes();
        addEventListeners();
    }

    // --- Create Orrery Nodes ---
    function createSiteNodes() {
        const radius = 170; // Orbit radius
        const angleStep = (2 * Math.PI) / SITES_DATA.length;

        SITES_DATA.forEach((site, index) => {
            const angle = angleStep * index;
            const x = radius * Math.cos(angle);
            const y = radius * Math.sin(angle);

            const node = document.createElement('div');
            node.className = 'site-node';
            node.dataset.id = site.id;
            node.style.transform = `translate(${x}px, ${y}px)`;

            const label = document.createElement('span');
            label.className = 'node-label';
            label.textContent = site.name;
            node.appendChild(label);
            
            orrery.appendChild(node);
        });
    }

    // --- Event Listeners ---
    function addEventListeners() {
        orrery.addEventListener('click', (e) => {
            if (e.target.classList.contains('site-node')) {
                showDetailView(e.target.dataset.id);
            }
        });

        backButton.addEventListener('click', hideDetailView);
    }
    
    // --- View Transitions ---
    function showDetailView(siteId) {
        const site = SITES_DATA.find(s => s.id === siteId);
        if (!site) return;

        // Populate detail view
        document.getElementById('detail-title').textContent = site.name;
        document.getElementById('detail-category').textContent = site.category;
        document.getElementById('detail-description').textContent = site.description;
        document.querySelector('.detail-image-container').style.backgroundImage = `url('${site.image}')`;

        // Update background
        backgroundCanvas.style.background = site.gradient;
        
        // Add class to trigger transition
        body.classList.add('detail-active');

        // Show map
        const mapContainer = document.getElementById('map-container');
        mapContainer.style.opacity = 1;
        mapContainer.style.transform = 'translateY(0)';
    }

    function hideDetailView() {
         // Reset background
        backgroundCanvas.style.background = defaultGradient;
        
        // Remove class to reverse transition
        body.classList.remove('detail-active');

        // Hide map
        const mapContainer = document.getElementById('map-container');
        mapContainer.style.opacity = 0;
        mapContainer.style.transform = 'translateY(100px)';
    }

    init();
});
