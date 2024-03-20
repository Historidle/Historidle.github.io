let startTime;
let timerInterval;
let elapsedTime;
let totalElapsedTime = 0;
let attemptsCount = 0;

const storedTotalElapsedTime = parseInt(localStorage.getItem("totalElapsedTime"));
const storedAttemptsCount = parseInt(localStorage.getItem("attemptsCount"));
if (!isNaN(storedTotalElapsedTime) && !isNaN(storedAttemptsCount)) {
  totalElapsedTime = storedTotalElapsedTime;
  attemptsCount = storedAttemptsCount;
}

function startTimer() {
  startTime = Date.now();
  timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
  const currentTime = Date.now();
  elapsedTime = currentTime - startTime;
  const minutes = Math.floor(elapsedTime / 60000);
  const seconds = Math.floor((elapsedTime % 60000) / 1000);
  document.getElementById("timeDisplay").textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function stopTimer() {
  clearInterval(timerInterval);
}

function calculateAverageTime() {
  totalElapsedTime += elapsedTime;
  attemptsCount++;
  const averageElapsedTime = totalElapsedTime / attemptsCount;
  const averageMinutes = Math.floor(averageElapsedTime / 60000);
  const averageSeconds = Math.floor((averageElapsedTime % 60000) / 1000);
  document.getElementById("averageTime").textContent = `${averageMinutes}:${averageSeconds < 10 ? '0' : ''}${averageSeconds}`;
}

const inputCountry = document.getElementById("inputcountry");
const sliderContainer = document.getElementById("sliderContainer");
const yearText = document.getElementById("yearText");
const slider = document.getElementById("myRange");
const submitButton = document.getElementById("submitButton");
const guessFeedback = document.getElementById("guessFeedback");
const congratsBox = document.getElementById("congratsBox");
const shareToTwitterButton = document.querySelector(".shareToTwitter");
const shareToRedditButton = document.querySelector(".shareToReddit");
const shareToFacebookButton = document.querySelector(".shareToFacebook");

inputCountry.addEventListener("input", function() {
  validateInput();
});

submitButton.addEventListener("click", function() {
  submitGuess();
});

slider.addEventListener("input", function() {
  updateSliderValue();
});

// Add an event listener to the editable text input field
yearText.addEventListener("input", function() {
  // Update the slider value to match the value of the editable text
  slider.value = yearText.value;
});

function validateInput() {
  const inputValue = inputCountry.value.trim().toLowerCase();
  const isCorrect = inputValue === "burgundy";
  if (isCorrect) {
    inputCountry.disabled = true;
    sliderContainer.style.display = "flex";
    yearText.style.display = "block";
    startTimer();
  }
}

function submitGuess() {
  const guessedYear = parseInt(yearText.value);
  if (guessedYear === 1678) {
    stopTimer();
    calculateAverageTime();
    showCongratsBox();
    localStorage.setItem("totalElapsedTime", totalElapsedTime);
    localStorage.setItem("attemptsCount", attemptsCount);
    submitButton.disabled = true;
  } else {
    guessFeedback.textContent = "Wrong answer";
    setTimeout(function() {
      guessFeedback.textContent = "";
    }, 1000);
  }
}

function updateSliderValue() {
  yearText.value = slider.value;
}

function showCongratsBox() {
  congratsBox.style.display = "flex";
}

function closeCongratsBox() {
  congratsBox.style.display = "none";
}

function shareToTwitter() {
  const historidleURL = "https://historidle.github.io";
  const tweetText = `I just completed Historidle in ${document.getElementById("timeDisplay").textContent}! Try at: ${historidleURL}`;
  const tweetURL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
  window.open(tweetURL, "_blank");
}

shareToTwitterButton.addEventListener("click", shareToTwitter);

function shareToReddit() {
  const historidleURL = "https://historidle.github.io";
  const redditText = `I just completed Historidle in ${document.getElementById("timeDisplay").textContent}! Try at: ${historidleURL}`;
  const redditURL = `https://www.reddit.com/submit?url=${encodeURIComponent(historidleURL)}&title=${encodeURIComponent(redditText)}`;
  window.open(redditURL, "_blank");
}

shareToRedditButton.addEventListener("click", shareToReddit);

function shareToFacebook() {
  const historidleURL = "https://historidle.github.io";
  const facebookURL = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(historidleURL)}`;
  window.open(facebookURL, "_blank");
}

shareToFacebookButton.addEventListener("click", shareToFacebook);
