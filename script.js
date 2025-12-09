window.addEventListener("DOMContentLoaded", () => {

    // ELEMENTS
    const audio = document.getElementById("kecakAudio");
    const audioBtn = document.getElementById("audioBtn");
    const heroImg = document.getElementById("heroImg");
    const canvas = document.getElementById("particles");
    const ctx = canvas.getContext("2d");
    const reveals = document.querySelectorAll(".reveal");
    const mapButtons = document.querySelectorAll(".mapBtn");
    const mapFrame = document.getElementById("mapFrame");

    // ================
    // AUDIO BUTTON
    // ================
    audioBtn.addEventListener("click", () => {
        audio.play();
        audioBtn.innerText = "Playing...";
    });

    // ================
    // PARTICLES
    // ================
    function resize() {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
    }
    resize();
    addEventListener("resize", resize);

    let particles = [];

    function spawnParticle() {
        particles.push({
            x: Math.random() * canvas.width,
            y: canvas.height + 10,
            r: Math.random() * 3 + 1,
            speed: Math.random() * 1 + 0.5
        });
        if (particles.length > 200) particles.shift();
    }

    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.y -= p.speed;
            ctx.fillStyle = "rgba(255,140,0,0.7)";
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
        });
    }

    function loop() {
        spawnParticle();
        drawParticles();
        requestAnimationFrame(loop);
    }
    loop();

    // ================
    // PARALLAX HERO
    // ================
    document.addEventListener("mousemove", e => {
        const x = (e.clientX / innerWidth - 0.5) * 20;
        const y = (e.clientY / innerHeight - 0.5) * 15;
        heroImg.style.transform = scale(1.2) translate(${x}px, ${y}px);
    });

    // ================
    // REVEAL SCROLL
    // ================
    function revealScroll() {
        const vh = innerHeight;
        reveals.forEach(el => {
            if (el.getBoundingClientRect().top < vh - 100) {
                el.classList.add("show");
            }
        });
    }
    revealScroll();
    addEventListener("scroll", revealScroll);

    // ================
    // MAP BUTTONS
    // ================
    const mapLookup = {
        uluwatu: "Uluwatu Temple Bali",
        gwk: "GWK Cultural Park Bali",
        batu: "Batu Bulan Bali"
    };

    mapButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const loc = mapLookup[btn.dataset.map];
            mapFrame.innerHTML = `
                <iframe 
                    src="https://www.google.com/maps?q=${encodeURIComponent(loc)}&output=embed"
                    width="100%" height="300" style="border:0;" loading="lazy"></iframe>
            `;
        });
    });

});