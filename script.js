// Create a global namespace for the application
window.unescoApp = {};

document.addEventListener('DOMContentLoaded', () => {

    // Hide the loader as soon as the DOM is ready
    document.body.classList.add('loaded');

    const SITES_DATA = [
        {
            id: 'rila',
            name: 'Rila Monastery',
            type: 'Cultural',
            year_inscribed: 1983,
            official_link: 'https://whc.unesco.org/en/list/216',
            description: 'A stunning example of Bulgarian Renaissance architecture, the Rila Monastery is the largest and most famous Eastern Orthodox monastery in Bulgaria. It has been a spiritual and cultural hub for centuries.',
            significance: 'The Rila Monastery is an outstanding example of the Bulgarian Renaissance, and it symbolizes the awareness of a Slavic cultural identity after centuries of occupation.',
            image: 'https://images.unsplash.com/photo-1565099710373-c827376c2629?q=80&w=2671&auto=format&fit=crop', // Better placeholder or stick to existing
            gradient: 'linear-gradient(135deg, #1a1a1a 0%, #2c3e50 100%)',
            coords: [42.1333, 23.3403]
        },
        {
            id: 'boyana',
            name: 'Boyana Church',
            type: 'Cultural',
            year_inscribed: 1979,
            official_link: 'https://whc.unesco.org/en/list/42',
            description: 'Located on the outskirts of Sofia, the Boyana Church consists of three buildings. The second church, built in the 13th century, contains some of the most complete and perfectly preserved examples of medieval Eastern European art.',
            significance: 'The Boyana Church is a group of three churches, renowned worldwide for its 13th-century frescoes, which are an exceptional testimony of the human creative genius of the peoples of South-Eastern Europe.',
            image: 'https://images.unsplash.com/photo-1604586940860-262105151e36?q=80&w=2670&auto=format&fit=crop',
            gradient: 'linear-gradient(135deg, #232526 0%, #414345 100%)',
            coords: [42.6458, 23.2667]
        },
        {
            id: 'ivanovo',
            name: 'Rock-Hewn Churches',
            type: 'Cultural',
            year_inscribed: 1979,
            official_link: 'https://whc.unesco.org/en/list/45',
            description: 'A complex of rock-hewn churches, chapels and monasteries near the village of Ivanovo. The complex is noted for its beautiful and well-preserved medieval frescoes from the 13th and 14th centuries.',
            significance: 'The Rock-Hewn Churches of Ivanovo are a complex of rock-hewn churches, chapels, monasteries and cells, which represent the work of the Hesychasts, who practised a form of asceticism.',
            image: 'https://images.unsplash.com/photo-1596423985794-22b270a3c20c?q=80&w=2670&auto=format&fit=crop',
            gradient: 'linear-gradient(135deg, #2b5876 0%, #4e4376 100%)',
            coords: [43.7000, 25.9833]
        },
        {
            id: 'thracian_tomb_of_kazanlak',
            name: 'Thracian Tomb of Kazanlak',
            type: 'Cultural',
            year_inscribed: 1979,
            official_link: 'https://whc.unesco.org/en/list/44',
            description: 'Discovered in 1944, this tomb dates from the Hellenistic period, around the end of the 4th century BC. Its narrow corridor and round burial chamber are decorated with murals representing Thracian burial rituals and culture.',
            significance: 'The Thracian Tomb of Kazanlak is a unique aesthetic and artistic masterpiece, a masterpiece of the Thracian creative spirit. The monument is the only one of its kind anywhere in the world.',
            image: 'https://images.unsplash.com/photo-1627920769837-581335d8864f?q=80&w=2669&auto=format&fit=crop',
            gradient: 'linear-gradient(135deg, #3a1c1c 0%, #1e130c 100%)',
            coords: [42.6242, 25.3925]
        },
        {
            id: 'pirin',
            name: 'Pirin National Park',
            type: 'Natural',
            year_inscribed: 1983,
            official_link: 'https://whc.unesco.org/en/list/225',
            description: 'Encompassing a vast area of the Pirin Mountains, the park is known for its limestone karst landscapes, glacial lakes, waterfalls, caves, and coniferous forests. It is a sanctuary for diverse alpine flora and fauna.',
            significance: "Pirin National Park is a testimony to the evolutionary history of the Balkan Peninsula's flora and fauna, and it is an area of outstanding natural beauty.",
            image: 'https://images.unsplash.com/photo-1566838031580-00d984cf8224?q=80&w=2670&auto=format&fit=crop',
            gradient: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
            coords: [41.7650, 23.4180]
        },
        {
            id: 'nesebar',
            name: 'Ancient City of Nesebar',
            type: 'Cultural',
            year_inscribed: 1983,
            official_link: 'https://whc.unesco.org/en/list/217',
            description: 'Situated on a rocky peninsula on the Black Sea, Nesebar is a rich city-museum defined by more than three millennia of history. The city\'s architecture showcases its evolution from a Thracian settlement to a major Byzantine hub.',
            significance: 'The Ancient City of Nessebar is an outstanding testimony of multilayered cultural and historical heritage. It is a place where many civilizations left their tangible traces.',
            image: 'https://images.unsplash.com/photo-1565780362835-13174431e67c?q=80&w=2670&auto=format&fit=crop',
            gradient: 'linear-gradient(135deg, #141e30 0%, #243b55 100%)',
            coords: [42.6592, 27.7350]
        },
        {
            id: 'thracian_sveshtari',
            name: 'Thracian Tomb of Sveshtari',
            type: 'Cultural',
            year_inscribed: 1985,
            official_link: 'https://whc.unesco.org/en/list/359',
            description: 'Discovered in 1982, this 3rd-century BC Thracian tomb reflects the fundamental structural principles of Thracian cult buildings. The tomb has a unique architectural decor, with polychrome half-human, half-plant caryatids and painted murals.',
            significance: "The Thracian Tomb of Sveshtari is a unique monument of Thracian art, with its remarkable architecture and its rich sculptural and painted decoration.",
            image: 'https://images.unsplash.com/photo-1598341856149-a29d10e54917?q=80&w=2670&auto=format&fit=crop',
            gradient: 'linear-gradient(to top, #1e1e1e 0%, #3d332b 100%)',
            coords: [43.745, 26.765]
        }
    ];

    // Expose SITES_DATA to the global app object
    window.unescoApp.SITES_DATA = SITES_DATA;

    const orrery = document.getElementById('heritage-orrery');
    const body = document.body;
    const backgroundCanvas = document.querySelector('.background-canvas');
    const backButton = document.querySelector('.back-button');
    const defaultGradient = 'radial-gradient(circle at center, #1e293b, #0f172a)';

    // --- Initialization ---
    function init() {
        createSiteNodes();
        addEventListeners();
    }

    // --- Create Orrery Nodes ---
    function createSiteNodes() {
        // Create decorative rings
        const radii = [130, 210, 280];
        radii.forEach(r => {
            const ring = document.createElement('div');
            ring.className = 'orbit-ring';
            ring.style.width = (r * 2) + 'px';
            ring.style.height = (r * 2) + 'px';
            orrery.appendChild(ring);
        });

        const orbitRadius = 170; // Main Orbit radius
        const angleStep = (2 * Math.PI) / SITES_DATA.length;

        SITES_DATA.forEach((site, index) => {
            const angle = angleStep * index;
            const x = orbitRadius * Math.cos(angle);
            const y = orbitRadius * Math.sin(angle);

            const node = document.createElement('button');
            node.className = 'site-node';
            node.dataset.id = site.id;
            node.setAttribute('aria-label', site.name);
            node.style.transform = `translate(${x}px, ${y}px)`;

            const label = document.createElement('span');
            label.className = 'node-label';
            label.textContent = site.name;
            node.appendChild(label);
            
            orrery.appendChild(node);
        });
    }

    const contributionForm = document.getElementById('contribution-form');
    let currentSiteId = null;

    // --- Sanitization ---
    function sanitize(str) {
        const temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML;
    }

    // --- Community Stories ---
    function renderStories(siteId) {
        const container = document.getElementById('contributions-container');
        const stories = JSON.parse(localStorage.getItem(`stories_${siteId}`)) || [];
        container.innerHTML = '';

        if (stories.length === 0) {
            container.innerHTML = '<p>Be the first to share a story about this place!</p>';
            return;
        }

        stories.forEach(story => {
            const storyEl = document.createElement('div');
            storyEl.className = 'story';
            storyEl.innerHTML = `
                <h4>${sanitize(story.name)}</h4>
                <p>${sanitize(story.story)}</p>
                ${story.image ? `<img src="${sanitize(story.image)}" alt="Contribution by ${sanitize(story.name)}" style="max-width: 100%; border-radius: 8px; margin-top: 10px;">` : ''}
            `;
            container.appendChild(storyEl);
        });
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        const name = document.getElementById('contribution-name').value;
        const story = document.getElementById('contribution-story').value;
        const image = document.getElementById('contribution-image').value;

        const newStory = { name, story, image };
        const stories = JSON.parse(localStorage.getItem(`stories_${currentSiteId}`)) || [];
        stories.push(newStory);
        localStorage.setItem(`stories_${currentSiteId}`, JSON.stringify(stories));

        renderStories(currentSiteId);
        contributionForm.reset();
    }

    // --- Event Listeners ---
    function addEventListeners() {
        orrery.addEventListener('click', (e) => {
            const node = e.target.closest('.site-node');
            if (node) {
                window.unescoApp.showDetailView(node.dataset.id);
            }
        });

        backButton.addEventListener('click', window.unescoApp.hideDetailView);
        contributionForm.addEventListener('submit', handleFormSubmit);
    }
    
    // --- View Transitions ---
    window.unescoApp.showDetailView = function(siteId) {
        const site = SITES_DATA.find(s => s.id === siteId);
        if (!site) return;

        currentSiteId = siteId;

        // Populate detail view
        document.getElementById('detail-title').textContent = site.name;
        document.getElementById('detail-type').textContent = site.type;
        document.getElementById('detail-year').textContent = `Inscribed: ${site.year_inscribed}`;
        document.getElementById('detail-description').textContent = site.description;
        document.getElementById('detail-significance').textContent = site.significance;
        document.getElementById('detail-link').href = site.official_link;

        const detailImage = document.getElementById('detail-image');
        // Use high-res images if available, otherwise placeholder
        detailImage.src = site.image;
        detailImage.alt = `A view of the ${site.name}`;

        // Update background
        backgroundCanvas.style.background = site.gradient;
        
        // Add class to trigger transition
        body.classList.add('detail-active');

        // Show map (but styled nicely via CSS)
        const mapContainer = document.getElementById('map-container');
        // We let CSS handle the transition logic for map-container via detail-active class
        // But the current JS sets opacity manually, which might conflict.
        // Let's remove manual style setting here and rely on CSS classes if possible.
        // However, map.js logic might rely on map being visible for size calculation.
        // Just in case, let's keep it but ensure it matches CSS.
        // Actually, let's REMOVE the manual style manipulation for map container here
        // and let CSS handle it via .detail-active

        // renderStories(siteId);
        renderStories(siteId);
    }

    window.unescoApp.hideDetailView = function() {
         // Reset background
        backgroundCanvas.style.background = defaultGradient;
        
        // Remove class to reverse transition
        body.classList.remove('detail-active');

        // Map hiding is also handled by CSS now (hopefully)
    }

    init();
});
