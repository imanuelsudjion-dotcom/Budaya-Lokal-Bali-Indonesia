/* ================= AUDIO ================= */
const audio = document.getElementById("kecakAudio");
const audioBtn = document.getElementById("audioBtn");

audio.volume = 0.5;

function tryPlay() {
    audio.play().catch(() => {
        audioBtn.style.display = "block";
    });
}
window.addEventListener("load", tryPlay);

audioBtn.addEventListener("click", () => {
    audio.play();
    audioBtn.style.display = "none";
});

/* ================= PARTICLES ================= */
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
}
resize();
window.addEventListener("resize", resize);

let fire = [];

function spawn() {
    fire.push({
        x: Math.random() * canvas.width,
        y: canvas.height,
        speed: Math.random() * 1 + 0.5,
        r: Math.random() * 3 + 1,
        a: Math.random() * 0.5 + 0.2
    });
    if (fire.length > 200) fire.shift();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    fire.forEach(p => {
        p.y -= p.speed;
        ctx.fillStyle = rgba(255,120,0,${p.a});
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
    });
}

function loop() {
    spawn();
    draw();
    requestAnimationFrame(loop);
}
loop();

/* ================= REVEAL ON SCROLL ================= */
const reveals = document.querySelectorAll(".reveal");

function scrollReveal() {
    reveals.forEach(r => {
        if (r.getBoundingClientRect().top < innerHeight - 120) {
            r.classList.add("show");
        }
    });
}
window.addEventListener("scroll", scrollReveal);
scrollReveal();

/* ================= PARALLAX HERO ================= */
const heroImg = document.getElementById("heroImg");

document.addEventListener("mousemove", e => {
    const moveX = (e.clientX / innerWidth - 0.5) * 20;
    const moveY = (e.clientY / innerHeight - 0.5) * 14;

    heroImg.style.transform = scale(1.2) translate(${moveX}px, ${moveY}px);
});

/* ================= GOOGLE MAPS ================= */
const mapFrame = document.getElementById("mapFrame");

const maps = {
    "uluwatu":
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3944.196!2d115.0849!3d-8.8294",
    "gwk":
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3944.621!2d115.1667!3d-8.8097",
    "batu":
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3945.098!2d115.2799!3d-8.7983"
};

document.querySelectorAll(".mapBtn").forEach(btn => {
    btn.addEventListener("click", () => {
        const loc = btn.dataset.map;
        mapFrame.innerHTML = <iframe src="${maps[loc]}" loading="lazy"></iframe>;
    });
});