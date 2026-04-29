const translations = {
    en: {
        eyebrow: "For the one who makes my heart smile",
        title: "Will you be my Valentine?",
        message: "Every ordinary day feels softer, brighter, and more beautiful when I think of you.",
        yes: "Yes, forever",
        no: "No",
        hint: "Tap Yes and let the music begin.",
        accepted: "You said yes! My heart is dancing for you.",
        teasing: "Please think again...",
    },
    bn: {
        eyebrow: "যে মানুষটি আমার হৃদয় হাসায়",
        title: "তুমি কি আমার Valentine হবে?",
        message: "তোমার কথা ভাবলেই সাধারণ দিনটাও নরম, উজ্জ্বল আর সুন্দর হয়ে যায়।",
        yes: "হ্যাঁ, চিরকাল",
        no: "না",
        hint: "Yes চাপলেই গান শুরু হবে।",
        accepted: "তুমি হ্যাঁ বলেছো! আমার হৃদয় এখন তোমার জন্য নাচছে।",
        teasing: "আরেকবার ভেবে দেখো...",
    },
};

let currentLanguage = "en";
let audioContext;
let isPlaying = false;

const languageButtons = document.querySelectorAll(".lang-btn");
const translatableElements = document.querySelectorAll("[data-i18n]");
const yesButton = document.getElementById("yesBtn");
const noButton = document.getElementById("noBtn");
const answerText = document.getElementById("answerText");
const confettiLayer = document.getElementById("confettiLayer");

function setLanguage(language) {
    currentLanguage = language;
    document.documentElement.lang = language;

    translatableElements.forEach((element) => {
        const key = element.dataset.i18n;
        element.textContent = translations[language][key];
    });

    languageButtons.forEach((button) => {
        button.classList.toggle("active", button.dataset.lang === language);
    });
}

function playTone(frequency, startTime, duration) {
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(frequency, startTime);
    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(0.22, startTime + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start(startTime);
    oscillator.stop(startTime + duration);
}

function playLoveSong() {
    if (!audioContext) {
        audioContext = new AudioContext();
    }

    const notes = [
        392, 440, 523.25, 440, 659.25, 587.33, 523.25, 440,
        392, 440, 523.25, 587.33, 659.25, 783.99, 659.25,
    ];
    const now = audioContext.currentTime + 0.05;

    notes.forEach((note, index) => {
        playTone(note, now + index * 0.24, 0.22);
    });
}

function makeConfetti() {
    const colors = ["#d93d72", "#ffb347", "#36a3d9", "#48b37b", "#ffffff"];

    for (let index = 0; index < 90; index += 1) {
        const piece = document.createElement("span");
        piece.className = "confetti";
        piece.style.left = `${Math.random() * 100}%`;
        piece.style.background = colors[Math.floor(Math.random() * colors.length)];
        piece.style.animationDelay = `${Math.random() * 0.8}s`;
        piece.style.transform = `rotate(${Math.random() * 180}deg)`;
        confettiLayer.appendChild(piece);

        setTimeout(() => piece.remove(), 3600);
    }
}

function moveNoButton() {
    const maxX = window.innerWidth - noButton.offsetWidth - 12;
    const maxY = window.innerHeight - noButton.offsetHeight - 12;
    const x = Math.max(12, Math.random() * maxX);
    const y = Math.max(82, Math.random() * maxY);

    noButton.classList.add("escape");
    noButton.style.left = `${x}px`;
    noButton.style.top = `${y}px`;
    answerText.textContent = translations[currentLanguage].teasing;
}

languageButtons.forEach((button) => {
    button.addEventListener("click", () => setLanguage(button.dataset.lang));
});

yesButton.addEventListener("click", () => {
    answerText.textContent = translations[currentLanguage].accepted;
    makeConfetti();

    if (!isPlaying) {
        isPlaying = true;
        playLoveSong();
        setTimeout(() => {
            isPlaying = false;
        }, 3900);
    }
});

noButton.addEventListener("mouseenter", moveNoButton);
noButton.addEventListener("click", moveNoButton);

setLanguage(currentLanguage);
