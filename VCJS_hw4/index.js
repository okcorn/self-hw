console.log("hello, vanilla.");
const gameStart = document.querySelector(".gameStart"),
gameBtn = gameStart.querySelector(".gameBtn"),
numberInput = document.querySelector(".numberInput"),
userInput = numberInput.querySelector("input"),
result = document.querySelector(".result"),
resultList = result.querySelector("ul"),
li = document.createElement('li'),
span = document.createElement('span'),
gameReStart = document.querySelector(".gameReStart"),
restartBtn = gameReStart.querySelector("input");

let realNum = "",
currentArray = "",
realArray = "",
countNum =0;

let limitation = new Array();
let limit = new Array();

//게임리셋하는 함수
function resetGame() {
  currentValue = "";
  realNum = "";
  currentArray = "";
  realArray = "";
  limitation= [];
  countNum = 0;
  resultList.removeChild(li);
  userInput.disabled = false;
  restartBtn.style.visibility = "hidden";
  randomNum();
}

//결과값 나오게 하는 함수
function resultShow(currentValue) {
currentArray = currentValue.split('');
realArray = realNum.split('');
resultList.appendChild(li);
li.appendChild(span);

for (let i = 0; i<3; i++) {
  if (currentArray.includes(realArray[i])) {
    countNum++;
  } else {}
}

if (countNum === 3 ) {
  let strike = 0;
  for (let i = 0; i<3; i++) {
       if (currentArray[i] === realArray[i]) {strike++}
       else {}
     }
     span.innerText = `${currentValue} = ${strike}S ${3-strike}B`;
     countNum = countNum-3;
     let limit = limitation.push(currentValue);
     if (currentValue === realNum) {
      span.innerText = `정답입니다 ! ${currentValue} = ${strike}S ${3-strike}B`;
      restartBtn.style.visibility = "visible";
     } else {}
     }
else if (countNum === 2) {
  let strike = 0;
  for (let i = 0; i<3; i++) {
  if (currentArray[i] === realArray[i]) {strike++}
       else {}
  }
    span.innerText = `${currentValue} = ${strike}S ${2-strike}B`;
    countNum = countNum-2;
    let limit  = limitation.push(currentValue);
  }
else if (countNum === 1) {
  let strike = 0;
  for (let i = 0; i<3; i++) {
  if (currentArray[i] === realArray[i]) {strike++}
       else {}
  }
    span.innerText = `${currentValue} = ${strike}S ${1-strike}B`;
    countNum = countNum-1;
    let limit = limitation.push(currentValue);
  }
else {
  span.innerText = `Failed`;
  let limit = limitation.push(currentValue);
  }

if (limitation.length === 10) {
  alert('더이상 진행할 수 없습니다!');
  userInput.disabled = true;
  restartBtn.style.visibility = "visible";
  span.innerText = `정답은 ${realNum}`;
}

}

//숫자 만드는 함수
function randomNum() {
  realNum = Math.floor(Math.random()*1000);
  if (realNum > 99) {
    realNum = String(realNum)
  }  else if ( 10 <= realNum < 100) {
    realNum = `0${realNum}`;
    realNum = String(realNum)
  }  else {
    realNum = `00${realNum}`;
    realNum = String(realNum)
  }
}

//유저가 입력한 숫자값 저장하는 함수
function handleSubmit (event) {
  event.preventDefault();
  currentValue = String(userInput.value);
  //showResult(currentValue);
  console.log(currentValue);
  userInput.value ="";
  if (currentValue.length !== 3) {
   limitation.pop();
   alert('세자리 숫자로 다시 입력해주세요!')
   return limitation;
  } else {}
  resultShow(currentValue);
}

function makeNum (event) {
  const btn = event.target;
  randomNum();
}

function reset (event) {
  const btn2 = event.target;
  resetGame();
}

function init() {
  randomNum();
  gameBtn.addEventListener("click", makeNum);
  numberInput.addEventListener("submit", handleSubmit);
  restartBtn.addEventListener("click", reset);
}

init();
