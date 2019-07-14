const buttons = document.querySelectorAll(".buttons");
const timer = document.getElementById("timer");
const start = document.getElementById("start");
const pause = document.getElementById("pause");
const reset = document.getElementById("reset");

const settings = {
  workingMinutes: 25,
  break: 5,
  longBreak: 10
};

//set timer from settings
timer.innerHTML = `${settings.workingMinutes}:00`;

//globals
let countdown;
let currentTime = settings.workingMinutes;

function startTimer() {
  const now = Date.now();
  const then = now + currentTime * 60 * 1000;
  let minutesLeft = Math.floor(currentTime);
  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    currentTime = secondsLeft;
    //increment minute
    if (secondsLeft % 60 === 59) minutesLeft--;

    //check if completed
    if (secondsLeft <= 0) clearInterval(countdown);

    //add to dom
    updateTime(minutesLeft, secondsLeft);
  }, 1000);
}

function updateTime(minutes, seconds) {
  if (seconds < 10) {
    timer.innerHTML = `${minutes}:0${seconds % 60}`;
  } else {
    timer.innerHTML = `${minutes}:${seconds % 60}`;
  }
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
