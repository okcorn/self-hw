const startButtonElement = document.querySelector(".start-button");
const mainPageElement = document.querySelector(".main-page");
const startImageElement = document.querySelector(".start-image");
const introTextElement = document.querySelector(".intro-text");
const gamePageElement = document.querySelector(".game-page");
const gameContentElement = document.querySelector(".game-content");
const gameTimerElement = document.querySelector(".game-timer");
const solvedNumberElement = document.querySelector(".solved-number");
const itemCoverElements = document.getElementsByClassName("item-cover")
const rightPairElements = document.getElementsByClassName("item-cover" && "hidden" && "clicked");
const restartButtonElement = document.querySelector(".restart-button");

const imageNumberArray = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
const flipItems = setTimeout(selectWrongPair, 1000);

const firstPageText = "같은 동물의 숲 주민들을 찾아주세요🍄";
const FailPageText = "주민들이 기다리고 있어요😎 다시 해봅시다!";
const successPageText = "주민들을 다 찾아주셨군요!🥳";

const gameAudioSound = new Audio();
gameAudioSound.src = "/sound/main-music.mp3";

const endAudioSound = new Audio();
endAudioSound.src = "/sound/end-music.mp3";

let timer = 30;
let leftgames = 8;
let clickCounts = 0;
let selectedCardList = [];
let selectedCardInfo = {};
let isCorrect = false;

startButtonElement.addEventListener("click", handleStartButtonClick);
restartButtonElement.addEventListener("click", handleRestartButtonClick, true);

function handleStartButtonClick() {
  mainPageElement.classList.add("hidden");
  gamePageElement.classList.remove("hidden");

  showLeftTimer();
  showLeftPairs();
  showGameContents();

  gameAudioSound.play();
}

function showLeftTimer() {
  const countTime = setInterval(function () {
    timer -= 1;

    if (timer === 0) {
      clearInterval(countTime);
      showFailGamePage();
    }

    if (leftgames === 0) {
      clearInterval(countTime);
      showSuccessGamePage();
    }

    gameTimerElement.textContent = `남은 시간은 ${timer}초`;
  }, 1000);
}

function showLeftPairs() {
  solvedNumberElement.textContent = `남은 문제는 ${leftgames}개`;
}

function showGameContents() {
  shuffleArrayOrder(imageNumberArray);

  for (let i = 0; i < 16; i++) {
    const divElement = document.createElement("div");
    gameContentElement.appendChild(divElement);
    divElement.classList.add("game-list");
    divElement.innerHTML = `
    <div class="item-cover" id="${imageNumberArray[i]}"></div>
    <img src="/image/${imageNumberArray[i]}.png" alt="주민 이미지" class="item-image"/>
    `;
  }

  Array.from(itemCoverElements).forEach(element =>
    element.addEventListener("click", handlegameContentClick)
  );
}

function shuffleArrayOrder(array) {
  array.sort(() => Math.random() - 0.5);
}

function handlegameContentClick(event) {
  event.target.classList.add("hidden", "clicked");
  clickCounts += 1;
  selectedCardInfo = {
    id: event.target.id,
    info: event.target
  };
  selectedCardList.push(selectedCardInfo);

  if (selectedCardList.length === 2) {
    selectedCardList[0].id === selectedCardList[1].id ? selectRightPair() : selectWrongPair();
    selectedCardList = [];
    selectedCardInfo = {};
  }
}

function selectRightPair() {
  leftgames -= 1;
  showLeftPairs();
}

function selectWrongPair() {
  Array.from(selectedCardList).forEach(element => {
    setTimeout(() => {
      element.info.classList.remove("hidden", "clicked");
    }, 400);
  });
}

function showFailGamePage() {
  showResultGamepage();
  startImageElement.src = "/image/restart.jpeg";
  introTextElement.textContent = FailPageText;
  resetElements();
}

function showSuccessGamePage() {
  showResultGamepage();
  startImageElement.src = "/image/complete1.png";
  introTextElement.textContent = successPageText;
  resetElements();
}

function resetElements() {
  gameContentElement.innerHTML = "";
  gameTimerElement.innerHTML = "";
  solvedNumberElement.innerHTML = "";
}

function showResultGamepage() {
  gamePageElement.classList.add("hidden");
  mainPageElement.classList.remove("hidden");
  startButtonElement.classList.add("hidden");
  restartButtonElement.classList.remove("hidden");

  gameAudioSound.pause();
  gameAudioSound.currentTime = 0;
  endAudioSound.play();
}

function handleRestartButtonClick() {
  timer = 30;
  leftgames = 8;

  gamePageElement.classList.add("hidden");
  mainPageElement.classList.remove("hidden");
  startButtonElement.classList.remove("hidden");
  startImageElement.src = "/image/main.jpeg";
  introTextElement.textContent = firstPageText;
  restartButtonElement.classList.add("hidden");

  endAudioSound.pause();
  endAudioSound.currentTime = 0;

  resetElements();
}
