const title = document.querySelector("#title");
const timeDisplay = document.querySelector("#time");
const scoreDisplay = document.querySelector("#points");
const scoreValue = document.querySelector("#scoreValue");
const startButton = document.querySelector("#startButton");
const mainContainer = document.querySelector("#mainContainer");
const finishDisplay = document.querySelector("#finishDisplay");
const body = document.querySelector("body");

let score;
let time;
let intervalId;

function updateScore() {
  score++;
  scoreDisplay.textContent = score;
}
function updateTime() {
  if(time > 0){
    time++;
    timeDisplay.textContent = time;
  }
}

const scheduledHearts = new Set();

function createHeart() {
  const typeHeart = Math.floor(Math.random() * 3);

  const heart = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  heart.setAttribute("class", "heart pop-up");
  heart.setAttribute("width", "20");
  heart.setAttribute("height", "17");
  heart.setAttribute("viewBox", "0 0 20 17");
  heart.setAttribute("fill", "none");

  let auxLeft = 0;
  while (auxLeft <= 60)
    auxLeft = Math.random() * mainContainer.clientWidth - 60;
  let auxTop = 0;
  while (auxTop <= 90) auxTop = Math.random() * mainContainer.clientHeight - 60;
  heart.style.left = `${auxLeft}px`;
  heart.style.top = `${auxTop}px`;

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute(
    "d",
    "M10 4.69431C8 -0.000122309 1 0.499878 1 6.49991C1 12.4999 10 17.5001 10 17.5001C10 17.5001 19 12.4999 19 6.49991C19 0.499878 12 -0.000122309 10 4.69431Z"
  );
  if (typeHeart == 0) {
    path.setAttribute("fill", "#36B9CC");
  } else {
    path.setAttribute("fill", "#CF68FF");
  }
  path.setAttribute("stroke", "#E9E9E9");
  path.setAttribute("stroke-width", "2");
  path.setAttribute("stroke-linecap", "round");
  path.setAttribute("stroke-linejoin", "round");

  heart.appendChild(path);

  const lifeTime = Math.floor(Math.random() * 2000) + 1000;

  scheduledHearts.add(heart);

  setTimeout(() => {
    heart.classList.remove("pop-up");
    heart.classList.add("fade-out");
    setTimeout(() => {
      if (scheduledHearts.has(heart)) {
        mainContainer.removeChild(heart);
        scheduledHearts.delete(heart);
        scoreDisplay.textContent = score;
        timeDisplay.textContent = time;
      }
    }, 100);
  }, lifeTime);

  heart.addEventListener("click", () => {
    heart.classList.remove("pop-up");
    heart.classList.add("pop-out");
    setTimeout(() => {
      if (scheduledHearts.has(heart)) {
        mainContainer.removeChild(heart);
        scheduledHearts.delete(heart);
        updateScore();
        if (typeHeart == 0) {
          updateTime();
        }
      }
    }, 290);
  });
  mainContainer.appendChild(heart);
}

const start = () => {
  scoreDisplay.textContent = 0;
  timeDisplay.textContent = 60;
  for (var i = 1; i < 30; i++)
      window.clearInterval(i);
  score = 0;
  time = 60;
  finishDisplay.style.top = "130%";
  console.log("hola");
  title.style.left = 0;
  title.style.transform = "translateX(10px)";
  timeDisplay.style.opacity = 1;
  scoreDisplay.style.opacity = 1;
  startButton.style.opacity = 0;
  setTimeout(() => {
    startButton.style.display = "none";
  }, 500);

  const heartInterval = () => {
    if (time <= 0) {
      clearInterval(interval);
      clearInterval(intervalId);
      finishGame();
    } else {
      console.log("tanda")
      let aux = Math.random() * 3;
      for (let i = 0; i < aux; i++) {
        createHeart();
      }

      let newInterval;
      if (score < 20) {
        newInterval = 1000;
      } else if (score < 40) {
        newInterval = 900;
      } else if (score < 60) {
        newInterval = 800;
      } else if (score < 80) {
        newInterval = 750;
      } else {
        newInterval = 700;
      }

      clearInterval(intervalId);
      intervalId = setInterval(heartInterval, newInterval);
    }
  };
  if(time > 0) intervalId = setInterval(heartInterval, 1000);

  const interval = setInterval(() => {
    time--;
    timeDisplay.textContent = time;
    if (time <= 0) {
      clearInterval(interval);
    }
  }, 1000);
};

const finishGame = () => {
  scoreValue.textContent = score;
  finishDisplay.style.top = "20%";
  title.style.left = "50%";
  title.style.transform = "translateX(-50%)";
  timeDisplay.style.opacity = 0;
  scoreDisplay.style.opacity = 0;
  startButton.style.display = "flex";
  setTimeout(() => {
    startButton.style.opacity = 1;
  }, 100);
};

startButton.addEventListener("click", () => {
  start();
});
