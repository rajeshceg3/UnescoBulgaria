:root {
    --color-bg-start: #e0eafc;
    --color-bg-end: #cfdef3;
    --color-text-primary: #3d4a5f;
    --color-text-secondary: #7e8ba3;
    --color-accent: #a8b2d1;
    --color-shadow: rgba(126, 139, 163, 0.25);
    --font-main: 'Poppins', sans-serif;
    --transition-speed: 0.6s;
    --transition-timing: cubic-bezier(0.65, 0, 0.35, 1);
}

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: var(--font-main);
    background-color: var(--color-bg-start);
    color: var(--color-text-primary);
    height: 100vh;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
}

/* === BACKGROUND & PATTERN === */
.background-canvas {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background: linear-gradient(135deg, var(--color-bg-start), var(--color-bg-end));
    transition: background var(--transition-speed) var(--transition-timing);
}

.geometric-pattern {
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><g fill="none" stroke="%23CFDEF3" stroke-width="0.5"><path d="M0 50 L100 50 M50 0 L50 100 M0 0 L100 100 M100 0 L0 100"/></g></svg>');
    opacity: 0.5;
}

/* === MAIN CONTAINER & VIEW STATES === */
#app-container {
    width: 100%;
    height: 100%;
    position: relative;
}

#orrery-view, #detail-view {
    position: absolute;
    width: 100%;
    height: 100%;
    transition: opacity calc(var(--transition-speed) / 2) var(--transition-timing),
                transform calc(var(--transition-speed)) var(--transition-timing);
    will-change: opacity, transform;
}

/* --- ORRERY VIEW STYLING --- */
#orrery-view {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    opacity: 1;
    transform: scale(1);
}

.main-header {
    text-align: center;
    margin-bottom: 5vh;
    transform: translateY(-50px); /* Pushes header up a bit */
}

.main-header h1 {
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: 200;
    letter-spacing: 0.8em;
    text-transform: uppercase;
    margin-left: 0.8em; /* Compensate for letter spacing */
}

.main-header p {
    font-size: clamp(0.8rem, 2vw, 1rem);
    font-weight: 400;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--color-text-secondary);
    margin-top: 10px;
}

#heritage-orrery {
    position: relative;
    width: 400px;
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: slow-rotate 120s linear infinite;
}

.orrery-core {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: radial-gradient(circle at 30% 30%, #ffffff, #e0eafc 90%);
    box-shadow: 0 10px 30px var(--color-shadow), 
                inset 0 0 20px rgba(255, 255, 255, 0.5);
}

.site-node {
    position: absolute;
    width: 20px;
    height: 20px;
    background: radial-gradient(circle, #ffffff, #d1d9e6);
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    box-shadow: 0 2px 5px var(--color-shadow);
    display: flex;
    justify-content: center;
    align-items: center;
    will-change: transform;
}

.site-node:hover {
    transform: scale(1.8) !important; /* Override JS transform for hover */
    box-shadow: 0 5px 15px var(--color-shadow);
    animation-play-state: paused;
}

.site-node .node-label {
    position: absolute;
    bottom: 150%;
    font-size: 12px;
    font-weight: 600;
    color: var(--color-text-secondary);
    background: rgba(255, 255, 255, 0.7);
    padding: 3px 8px;
    border-radius: 12px;
    white-space: nowrap;
    opacity: 0;
    transform: translateY(10px);
    transition: all 0.3s ease-in-out;
    pointer-events: none;
    backdrop-filter: blur(2px);
}

.site-node:hover .node-label {
    opacity: 1;
    transform: translateY(0);
}

/* --- DETAIL VIEW STYLING --- */
#detail-view {
    opacity: 0;
    transform: scale(1.1);
    pointer-events: none;
}

.back-button {
    position: absolute;
    top: 40px;
    left: 40px;
    background: rgba(255, 255, 255, 0.5);
    border: none;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 5px 15px var(--color-shadow);
    color: var(--color-text-primary);
    transition: all 0.3s ease-in-out;
    backdrop-filter: blur(5px);
    z-index: 10;
}

.back-button:hover {
    transform: scale(1.1);
    box-shadow: 0 8px 20px var(--color-shadow);
}

.detail-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5vw;
    align-items: center;
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 5%;
    height: 100%;
}

.detail-image-container {
    width: 100%;
    height: 70vh;
    border-radius: 20px;
    background-size: cover;
    background-position: center;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
    transform: translateY(20px);
    opacity: 0;
    transition: all calc(var(--transition-speed) * 1.5) var(--transition-timing);
    will-change: transform, opacity;
}

.detail-text {
    transform: translateY(20px);
    opacity: 0;
    transition: all calc(var(--transition-speed) * 1.5) var(--transition-timing);
    transition-delay: 0.1s;
    will-change: transform, opacity;
}

#detail-title {
    font-size: clamp(2rem, 5vw, 4rem);
    font-weight: 600;
    line-height: 1.1;
    margin-bottom: 10px;
}

#detail-category {
    font-size: clamp(0.9rem, 1.5vw, 1.1rem);
    font-weight: 200;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: var(--color-text-secondary);
    margin-bottom: 30px;
}

#detail-description {
    font-size: clamp(1rem, 1.8vw, 1.1rem);
    line-height: 1.8;
    font-weight: 400;
}


/* === VIEW STATE TRANSITIONS === */
body.detail-active #orrery-view {
    opacity: 0;
    transform: scale(0.8);
    pointer-events: none;
}

body.detail-active #detail-view {
    opacity: 1;
    transform: scale(1);
    pointer-events: all;
}

body.detail-active .detail-image-container,
body.detail-active .detail-text {
    transform: translateY(0);
    opacity: 1;
}


@keyframes slow-rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

/* Responsive adjustments for smaller screens */
@media (max-width: 900px) {
    .detail-content {
        grid-template-columns: 1fr;
        grid-template-rows: 40vh auto;
        text-align: center;
        gap: 2vh;
        padding-top: 10vh;
    }
    .detail-image-container {
        height: 100%;
    }
    .back-button {
        top: 20px;
        left: 20px;
    }
    #heritage-orrery {
        transform: scale(0.8);
    }
    .main-header h1 {
        letter-spacing: 0.5em;
        margin-left: 0.5em;
    }
}
