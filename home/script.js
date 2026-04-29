const translations = {
  en: {
    eyebrow: "For the one who makes my heart smile",
    title: "Will you be my Valentine?",
    message:
      "Every ordinary day feels softer, brighter, and more beautiful when I think of you.",
    yes: "Yes, forever",
    no: "No",
    hint: "Tap Yes and let the music begin.",
    detailOneLabel: "Plan",
    detailOneText: "Unlimited smiles",
    detailTwoLabel: "Bonus",
    detailTwoText: "Free annoying texts",
    detailThreeLabel: "Terms",
    detailThreeText: "No return policy",
    funnyNote:
      "Warning: saying Yes may cause random smiling, extra attention, and suspiciously cute good morning messages.",
    accepted:
      "Approved. Your lifetime premium love subscription has started.",
    missingSong:
      "Song file missing. Add your MP3 as assets/sitaare.mp3, then tap Yes again.",
    noLines: [
      "The No button has left the meeting.",
      "No is currently unavailable. Please select Yes.",
      "Careful, the button is shy.",
      "That option needs manager approval. Manager says Yes.",
    ],
  },
  bn: {
    eyebrow: "যে মানুষটি আমার হৃদয় হাসায়",
    title: "তুমি কি আমার Valentine হবে?",
    message:
      "তোমার কথা ভাবলেই সাধারণ দিনটাও নরম, উজ্জ্বল আর সুন্দর হয়ে যায়।",
    yes: "হ্যাঁ, চিরকাল",
    no: "না",
    hint: "Yes চাপলেই গান শুরু হবে।",
    detailOneLabel: "প্ল্যান",
    detailOneText: "আনলিমিটেড হাসি",
    detailTwoLabel: "বোনাস",
    detailTwoText: "ফ্রি বিরক্তিকর টেক্সট",
    detailThreeLabel: "শর্ত",
    detailThreeText: "ফেরত নেওয়া হবে না",
    funnyNote:
      "সতর্কতা: Yes বললে হঠাৎ হাসি, বেশি আদর, আর সন্দেহজনক কিউট good morning message আসতে পারে।",
    accepted:
      "Approved. তোমার lifetime premium love subscription শুরু হয়ে গেছে।",
    missingSong:
      "গানের ফাইল পাওয়া যায়নি। তোমার MP3 ফাইলটি assets/sitaare.mp3 নামে রাখো, তারপর আবার Yes চাপো।",
    noLines: [
      "No button meeting থেকে বের হয়ে গেছে।",
      "No এখন unavailable. Yes চাপা বেশি ভালো।",
      "এই button টা একটু লজ্জা পায়।",
      "এই option manager approval চায়. Manager বলেছে Yes.",
    ],
  },
};

let currentLanguage = "en";
let isPlaying = false;
let noAttemptCount = 0;

const languageButtons = document.querySelectorAll(".lang-btn");
const loveSongAudio = document.getElementById("loveSongAudio");
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

function playLoveSong() {
  if (!loveSongAudio) {
    return;
  }

  loveSongAudio.loop = false;
  loveSongAudio.volume = 0.9;
  loveSongAudio.currentTime = 0;

  loveSongAudio.play().catch(() => {
    answerText.textContent = translations[currentLanguage].missingSong;
    isPlaying = false;
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
  const lines = translations[currentLanguage].noLines;

  noButton.classList.add("escape");
  noButton.style.left = `${x}px`;
  noButton.style.top = `${y}px`;
  answerText.textContent = lines[noAttemptCount % lines.length];
  noAttemptCount += 1;
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
  }
});

loveSongAudio.addEventListener("ended", () => {
  isPlaying = false;
});

loveSongAudio.addEventListener("error", () => {
  if (isPlaying) {
    answerText.textContent = translations[currentLanguage].missingSong;
    isPlaying = false;
  }
});

noButton.addEventListener("mouseenter", moveNoButton);
noButton.addEventListener("click", moveNoButton);

setLanguage(currentLanguage);
