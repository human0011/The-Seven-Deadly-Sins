const sins = [
    {
        name: "PRIDE",
        latin: "SUPERBIA",
        image: "pride.png",
        slug: "pride",
        color: "#bd63ff",
        glow: "#8500ff",
        owner: "Belongs to Gladerick Cyruz Pragatos",
        description: "Pride is excessive admiration of oneself. It is the belief that you are superior to others, refusing to accept your flaws, and placing your own importance above everything else. Pride blinds you to your imperfections.",
        quote: '"The higher you stand, the harder you fall."'
    },
    {
        name: "GREED",
        latin: "AVARITIA",
        image: "greed.png",
        slug: "greed",
        color: "#ffd34e",
        glow: "#b87913",
        owner: "Belongs to Raphael James Iglesias",
        description: "Greed is an insatiable desire for wealth, possessions, and power. No matter how much you have, it is never enough. It turns valuable things into obsessions and makes people sacrifice others for personal gain.",
        quote: '"A heart that always wants more will never be full."'
    },
    {
        name: "LUST",
        latin: "LUXURIA",
        image: "lust.png",
        slug: "lust",
        color: "#ff4d9a",
        glow: "#b80058",
        owner: "Belongs to Alexander Rain Cabusao",
        description: "Lust is an overwhelming desire for physical pleasure. It allows attraction and temptation to overpower reason, respect, and self-control.",
        quote: '"Desire can consume the one who feeds it."'
    },
    {
        name: "ENVY",
        latin: "INVIDIA",
        image: "envy.png",
        slug: "envy",
        color: "#45ff65",
        glow: "#087c25",
        owner: "Belongs to Rafael David Gregorio",
        description: "Envy is the painful feeling of wanting what someone else has. Instead of appreciating your own blessings, you become consumed by comparison, jealousy, and resentment toward another person's happiness or success.",
        quote: '"Comparison is the thief of contentment."'
    },
    {
        name: "GLUTTONY",
        latin: "GULA",
        image: "gluttony.png",
        slug: "gluttony",
        color: "#ff9a32",
        glow: "#a84b08",
        owner: "Belongs to Jet Brian Villanueva",
        description: "Gluttony is the excessive consumption of food, drink, or anything that provides pleasure. It is the inability to recognize when enough is enough, allowing indulgence to become more important than moderation.",
        quote: '"Too much of a good thing can become a poison."'
    },
    {
        name: "WRATH",
        latin: "IRA",
        image: "wrath.png",
        slug: "wrath",
        color: "#ff3030",
        glow: "#a00000",
        owner: "Belongs to Ethan Rivera",
        description: "Wrath is intense anger that overwhelms judgment. It creates the desire to hurt, punish, or destroy. When anger takes control, reason disappears and even the innocent can become victims.",
        quote: '"Anger is a fire that can burn its owner."'
    },
    {
        name: "SLOTH",
        latin: "ACEDIA",
        image: "sloth.png",
        slug: "sloth",
        color: "#258bff",
        glow: "#064caa",
        owner: "Belongs to Mark Francis Bernardo",
        description: "Sloth is more than simply being lazy. It is spiritual and emotional apathy, neglecting responsibilities, avoiding meaningful effort, and refusing to act even when action is necessary.",
        quote: '"The greatest journey can be lost by never taking the first step."'
    }
];

/* ELEMENTS */

const intro = document.getElementById("intro");
const startButton = document.getElementById("startButton");
const home = document.getElementById("home");
const sinPage = document.getElementById("sinPage");
const orbit = document.getElementById("orbit");

const backButton = document.getElementById("backButton");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");

let currentIndex = -1;

/* PARTICLES */

function createParticles() {
    const container = document.getElementById("particles");

    for (let i = 0; i < 45; i++) {
        const particle = document.createElement("span");

        particle.className = "particle";
        particle.style.left = Math.random() * 100 + "%";

        particle.style.setProperty(
            "--duration",
            (5 + Math.random() * 9) + "s"
        );

        particle.style.setProperty(
            "--delay",
            (-Math.random() * 12) + "s"
        );

        container.appendChild(particle);
    }
}

/* CHANGE PARTICLE COLOR */

function setParticleColor(color) {
    document.documentElement.style.setProperty(
        "--particle-color",
        color
    );
}

/* INTRO BUTTON */

startButton.addEventListener("click", () => {
    intro.classList.add("intro-exit");

    setTimeout(() => {
        intro.hidden = true;
        home.hidden = false;
        home.style.animation = "screenEnter .9s ease both";
    }, 650);
});

/* CREATE SEVEN CLICKABLE SKULLS */

function createSinButtons() {
    const radius = 42;

    sins.forEach((sin, index) => {
        const angle = (index * 360 / 7) - 90;
        const radians = angle * Math.PI / 180;

        const x = 50 + radius * Math.cos(radians);
        const y = 50 + radius * Math.sin(radians);

        const button = document.createElement("button");

        button.type = "button";
        button.className = "sin-button";

        button.style.left = x + "%";
        button.style.top = y + "%";

        button.style.setProperty("--sin-glow", sin.glow);
        button.style.setProperty("--delay", (index * -.4) + "s");

        button.setAttribute("aria-label", "Enter " + sin.name);

        const image = document.createElement("img");

        image.src = sin.image;
        image.alt = sin.name;
        image.draggable = false;

        button.appendChild(image);

        button.addEventListener("click", () => {
            openSin(index);
        });

        orbit.appendChild(button);
    });
}

/* OPEN SIN */

function openSin(index) {
    currentIndex = index;

    const sin = sins[index];

    history.pushState(
        { sinIndex: index },
        "",
        "#" + sin.slug
    );

    showSin(sin, index);
}

/* SHOW SIN */

function showSin(sin, index) {
    home.hidden = true;
    intro.hidden = true;
    sinPage.hidden = false;

    sinPage.style.setProperty("--sin-accent", sin.color);
    sinPage.style.setProperty("--sin-glow", sin.glow);

    setParticleColor(sin.color);

    /* Restart page animation */
    sinPage.style.animation = "none";
    void sinPage.offsetWidth;
    sinPage.style.animation = "";

    /* Artwork */
    document.getElementById("detailImage").src = sin.image;
    document.getElementById("detailImage").alt = sin.name;

    /* Information */
    document.getElementById("sinTitle").textContent = sin.name;
    document.getElementById("sinLatin").textContent = sin.latin;
    document.getElementById("sinOwner").textContent = sin.owner;
    document.getElementById("sinDescription").textContent = sin.description;
    document.getElementById("sinQuote").textContent = sin.quote;

    document.getElementById("sinNumber").textContent =
        "SIN NUMBER " + (index + 1);

    document.getElementById("artNumber").textContent =
        "0" + (index + 1);

    /* Previous and next */
    prevButton.disabled = index === 0;
    nextButton.disabled = index === sins.length - 1;

    /* Reset detail scroll */
    sinPage.querySelector(".detail-layout").scrollTop = 0;
}

/* RETURN HOME */

function showHome() {
    currentIndex = -1;

    sinPage.hidden = true;
    intro.hidden = true;
    home.hidden = false;

    setParticleColor("#bd63ff");

    window.scrollTo(0, 0);
}

/* BACK */

function goBack() {
    if (location.hash) {
        history.back();
    } else {
        showHome();
    }
}

/* PREVIOUS */

function previousSin() {
    if (currentIndex > 0) {
        openSin(currentIndex - 1);
    }
}

/* NEXT */

function nextSin() {
    if (currentIndex < sins.length - 1) {
        openSin(currentIndex + 1);
    }
}

/* BUTTON EVENTS */

backButton.addEventListener("click", goBack);
prevButton.addEventListener("click", previousSin);
nextButton.addEventListener("click", nextSin);

/* KEYBOARD CONTROLS */

document.addEventListener("keydown", event => {
    if (sinPage.hidden) return;

    if (event.key === "Escape") goBack();
    if (event.key === "ArrowLeft") previousSin();
    if (event.key === "ArrowRight") nextSin();
});

/* BROWSER BACK BUTTON */

window.addEventListener("popstate", () => {
    const slug = location.hash.replace("#", "");

    if (!slug) {
        showHome();
        return;
    }

    const index = sins.findIndex(sin => sin.slug === slug);

    if (index !== -1) {
        currentIndex = index;
        showSin(sins[index], index);
    } else {
        showHome();
    }
});

/* INITIALIZE */

createParticles();
createSinButtons();
setParticleColor("#bd63ff");

/* DIRECT LINK SUPPORT */

const initialSlug = location.hash.replace("#", "");

if (initialSlug) {
    const index = sins.findIndex(sin => sin.slug === initialSlug);

    if (index !== -1) {
        currentIndex = index;
        showSin(sins[index], index);
    }
}

