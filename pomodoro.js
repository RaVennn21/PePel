// Pomodoro-Timer

let focusButton = document.getElementById("focus");
let buttons = document.querySelectorAll(".btn");
let breakButton = document.getElementById("break");
let startBtn = document.getElementById("btn-start");
let reset = document.getElementById("btn-reset");
let pause = document.getElementById("btn-pause");
let time = document.getElementById("time");
let minutesElement = document.querySelector(".minutes");
let secondsElement = document.querySelector(".seconds");

let set;
let active = "focus";
let count = 59;
let paused = true;
let minCount = 24;

const updateTimeDisplay = () => {
  minutesElement.textContent = appendZero(minCount);
  minutesElement.setAttribute("data-minutes", minCount);
  secondsElement.textContent = appendZero(count);
  secondsElement.setAttribute("data-seconds", count);
};

const appendZero = (value) => (value < 10 ? `0${value}` : value);

reset.addEventListener(
  "click",
  (resetTime = () => {
    pauseTimer();
    switch (active) {
      case "short":
        minCount = 5;
        break;
      default:
        minCount = 25;
        break;
    }
    count = 0o0;
    updateTimeDisplay();
  })
);

const removeFocus = () => {
  buttons.forEach((btn) => {
    btn.classList.remove("btn-focus");
  });
};

focusButton.addEventListener("click", () => {
  removeFocus();
  focusButton.classList.add("btn-focus");
  pauseTimer();
  minCount = 25;
  count = 0o0;
  updateTimeDisplay();
});

breakButton.addEventListener("click", () => {
  active = "short";
  removeFocus();
  breakButton.classList.add("btn-focus");
  pauseTimer();
  minCount = 5;
  count = 0o0;
  updateTimeDisplay();
});

pause.addEventListener(
  "click",
  (pauseTimer = () => {
    paused = true;
    clearInterval(set);
    startBtn.classList.remove("hide");
    pause.classList.remove("show");
    reset.classList.remove("show");
  })
);

startBtn.addEventListener("click", () => {
  reset.classList.add("show");
  pause.classList.add("show");
  startBtn.classList.remove("show");
  startBtn.classList.add("hide");
  if (paused) {
    paused = false;
    updateTimeDisplay();
    set = setInterval(() => {
      count--;
      if (count < 0) {
        if (minCount > 0) {
          minCount--;
          count = 59;
        } else {
          clearInterval(set);
        }
      }
      updateTimeDisplay();
    }, 1000);
  }
});