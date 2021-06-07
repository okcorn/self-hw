console.log("hello, vanilla.");
const btnContainerLeft = document.querySelector(".btnContainerLeft"),
leftBtn = btnContainerLeft.querySelector(".btnLeft"),
btnContainerRight = document.querySelector(".btnContainerRight"),
rightBtn = btnContainerRight.querySelector(".btnRight"),
container = document.querySelector("container");

const imageList = document.querySelector(".imageList"),
img = imageList.querySelector("img");

const indexButton = document.querySelector(".indexButton"),
input = indexButton.querySelector("input"),
indexImage = indexButton.querySelector(".indexImage");

let i = 1;

//index 클릭함수 발동하게끔 만들기
function moveImage1() {
  img.src = './images/image-1.png';
  imageList.prepend(img);
  document.getElementById("5").style.color="gray";
  document.getElementById("4").style.color="gray";
  document.getElementById("3").style.color="gray";
  document.getElementById("2").style.color="gray";
  document.getElementById("1").style.color="black";
  i=1;
  }

function moveImage2() {
  img.src = './images/image-2.png';
  imageList.prepend(img);
  document.getElementById("5").style.color="gray";
  document.getElementById("4").style.color="gray";
  document.getElementById("3").style.color="gray";
  document.getElementById("2").style.color="black";
  document.getElementById("1").style.color="gray";
  i=2;
}

function moveImage3() {
  img.src = './images/image-3.png';
  imageList.prepend(img);
  document.getElementById("5").style.color="gray";
  document.getElementById("4").style.color="gray";
  document.getElementById("3").style.color="black";
  document.getElementById("2").style.color="gray";
  document.getElementById("1").style.color="gray";
  i=3;
}

function moveImage4() {
  img.src = './images/image-4.png';
  imageList.prepend(img);
  document.getElementById("5").style.color="gray";
  document.getElementById("4").style.color="black";
  document.getElementById("3").style.color="gray";
  document.getElementById("2").style.color="gray";
  document.getElementById("1").style.color="gray";
  i=4;
  }

function moveImage5() {
  img.src = './images/image-5.png';
  imageList.prepend(img);
  document.getElementById("5").style.color="black";
  document.getElementById("4").style.color="gray";
  document.getElementById("3").style.color="gray";
  document.getElementById("2").style.color="gray";
  document.getElementById("1").style.color="gray";
  i=5;
}

//왼쪽으로 가는 버튼을 눌렀을때의 함수 정의하기
function moveLeft() {
  if ( i < 2) {
  img.src = './images/image-5.png';
  imageList.prepend(img);
  document.getElementById("5").style.color="black";
  document.getElementById("1").style.color="gray";
  i = 5;
} else {
  i = i-1;
  img.src = `./images/image-${i}.png`;
  imageList.prepend(img);
  document.getElementById(`${i}`).style.color="black";
  document.getElementById(`${i+1}`).style.color="gray";
}
}

//오른쪽으로 가는 버튼을 눌렀을때의 함수 정의하기
function moveRight() {
  i = 1+i;
  if ( i < 6) {
  img.src = `./images/image-${i}.png`;
  imageList.prepend(img);
  document.getElementById(`${i}`).style.color="black";
  document.getElementById(`${i-1}`).style.color="gray";
} else {
  img.src = './images/image-1.png';
  imageList.prepend(img);
  document.getElementById("1").style.color="black";
  document.getElementById("5").style.color="gray";
  i = 1;
}
}

//index버튼 클릭했을때 해당 이미지로 돌아가는 클릭 이벤트 만들기
/*function indexClick(event) {
  const btn = event.target;
  moveImage();
}*/

//왼쪽으로 가는 버튼을 눌렀을때, 이벤트 진행되게 하기
function btnClickLeft(event) {
  const btn1 = event.target;
  moveLeft();
}

//오른쪽으로 가는 버튼을 눌렀을때, 이벤트 진행되게 하기
function btnClickRight(event) {
  const btn2 = event.target;
  moveRight();
}

//이미지 버튼을 눌렀을때 다음 이미지로 선택되어지는 함수를 실행하는거야
function init() {
  leftBtn.addEventListener("click", btnClickLeft);
  rightBtn.addEventListener("click", btnClickRight);
  //indexButton.addEventListener("click", indexClick);
}
init();