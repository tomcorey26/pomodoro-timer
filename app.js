const buttons = document.querySelectorAll(".buttons");
const timer = document.getElementById("timer");
const start = document.getElementById("start");
const pause = document.getElementById("pause");
const reset = document.getElementById("reset");
const breakDiv = document.querySelector(".break");
const count = document.getElementById("count");

const settings = {
  workingMinutes: 1,
  break: 5,
  longBreak: 10
};

//set timer from settings
timer.innerHTML = `${settings.workingMinutes}:00`;

//globals
let countdown;
let currentTime = settings.workingMinutes;
let onBreak = false;
let pomoCount = 0;

count.innerHTML = pomoCount;

function startTimer() {
  const now = Date.now();

  //convert to milliseconds
  const then = now + currentTime * 60 * 1000;

  let minutesLeft = Math.floor(currentTime);
  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    currentTime = secondsLeft;
    //increment minute
    if (secondsLeft % 60 === 59) minutesLeft--;

    //check if completed
    if (secondsLeft <= 0) {
      playSound();
      if (onBreak) {
        breakDiv.style.display = "none";
        currentTime = settings.workingMinutes;
        onBreak = false;
      } else {
        pomoCount++;
        breakDiv.style.display = "block";

        if (pomoCount % 4 === 0) {
          currentTime = settings.longBreak;
        } else {
          currentTime = settings.break;
          onBreak = true;
        }
      }
      updateTime(currentTime, 0);
      clearInterval(countdown);
    } else {
      //add to dom
      updateTime(minutesLeft, secondsLeft);
    }
  }, 1000);
}

function updateTime(minutes, seconds) {
  count.innerHTML = pomoCount;
  if (seconds < 10) {
    timer.innerHTML = `${minutes}:0${seconds % 60}`;
  } else {
    timer.innerHTML = `${minutes}:${seconds % 60}`;
  }
}

function playSound() {
  let audio = new Audio(
    "http://www.ffmages.com/ffvii/ost/disc-1/11-fanfare.mp3"
  );

  setTimeout(() => {
    audio.play();

    setTimeout(() => {
      audio.pause();
      audio.currentTime = 0;
    }, 10000);
  }, 1000);
}

function pauseTimer() {
  console.log(currentTime);
  currentTime = currentTime / 60;
  clearInterval(countdown);
}

function resetTimer() {
  clearInterval(countdown);
  timer.innerHTML = `${settings.workingMinutes}:00`;
  currentTime = settings.workingMinutes;
}
start.addEventListener("click", startTimer);
pause.addEventListener("click", pauseTimer);
reset.addEventListener("click", resetTimer);
