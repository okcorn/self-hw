const body = document.querySelector("body");

const image_NUMBER = 5;

function paintImage(imgNumber){
  const image = new Image();
  image.src = `${imgNumber + 1}.jpg`;
  image.classList.add("bgImage");
  body.prepend(image);
}

//랜덤 숫자를 부르는 함수 !
function genRandom(){
  const number = Math.floor(Math.random() * image_NUMBER);
  return number;
}

function init() {
  const randomNumber = genRandom();
  paintImage(randomNumber);
}
init();