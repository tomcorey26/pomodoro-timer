const buttons = document.querySelectorAll(".buttons");
const timer = document.getElementById("timer");
const start = document.getElementById("start");
const pause = document.getElementById("pause");
const reset = document.getElementById("reset");

const settings = {
  working: 25,
  break: 5,
  longBreak: 10
};

//set timer from settings
timer.innerHTML = `${settings.working}:00`;

let countdown;
function startTimer(e) {
  const now = Date.now();
  const then = now + settings.working * 60 * 1000;
  let minutesLeft = settings.working;
  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);

    //increment minute
    if (secondsLeft % 60 === 59) minutesLeft--;

    //check if completed
    if (secondsLeft <= 0) clearInterval(countdown);

    //add to dom
    console.log(secondsLeft);
    if (secondsLeft < 10) {
      timer.innerHTML = `${minutesLeft}:0${secondsLeft % 60}`;
    } else {
      timer.innerHTML = `${minutesLeft}:${secondsLeft % 60}`;
    }

    console.log(minutesLeft, ":", secondsLeft % 60);
  }, 1000);
}

function pauseTimer() {
  clearInterval(countdown);
}
start.addEventListener("click", startTimer);
pause.addEventListener("click", pauseTimer);
