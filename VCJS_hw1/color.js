const body = document.querySelector("body"),
      colortitle = document.querySelector(".title"),
      colorinfo = colortitle.querySelector("h1"),
      colorBtn = document.querySelector("input");

const hexcode = 6;

//랜덤한 hexcode를 만들어내는 함수
function randomMaker () {
  const randomColor = "0123456789ABCDEF";
  let randomstring = '';
  for (let i=0; i<hexcode; i++) {
  let randomNum = Math.floor(Math.random() * randomColor.length);
  randomstring += randomColor.substring(randomNum,randomNum+1);
}
return randomstring;
}

//body와 h1태그를 수정하는 함수
function changeColor() {
  let color = randomMaker();
  let colorcode = "#" + color;
  colorinfo.innerText = `HEX COLOR : ${colorcode}`;
  document.body.style.backgroundColor = `${colorcode}` ;
}

//버튼을 클릭할때 컬러를 바꾸는 함수를 부르는 함수
function btnClick(event) {
  event.preventDefault();
  const btn = event.target;
  changeColor();
}

function init() {
  colorBtn.addEventListener("click", btnClick);
}
init();