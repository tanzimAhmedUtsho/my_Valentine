const noBtn = document.getElementById("no-btn");
const yesBtn = document.getElementById("yes-btn");
const question = document.getElementById("question");
const imgDisplay = document.getElementById("image-display");

// 'না' বাটনটি মাউস নিলেই দূরে সরে যাবে
noBtn.addEventListener("mouseover", () => {
  const x = Math.floor(Math.random() * (window.innerWidth - noBtn.offsetWidth));
  const y = Math.floor(
    Math.random() * (window.innerHeight - noBtn.offsetHeight),
  );

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
});

// 'হ্যাঁ' ক্লিক করলে যা হবে
yesBtn.addEventListener("click", () => {
  question.innerHTML = "আমি জানতাম তুমি 'হ্যাঁ' বলবে! ভালোবাসি! 🥰";
  imgDisplay.src =
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ29pZzZ0ZzR0ZzR0ZzR0ZzR0ZzR0ZzR0ZzR0ZzR0JpbmcmZXA9djFfaW50ZXJuYWxfZ2lmX2J5X2lkJmN0PWc/KztT2c4u8mYYUiCiEE/giphy.gif";
  noBtn.style.display = "none"; // না বাটনটি ভ্যানিশ হয়ে যাবে
});
