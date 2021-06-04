
//class, 태그를 쉽게 변수화하는 단계
const toDoForm = document.querySelector(".js-todoForm"),
  toDoinput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-todoli");

//class를 추가하기 쉽게 만들기 (헷갈리지 않도록)
const TODOS_LS = "toDos";

//할일들의 빈 배열을 만든 것
let toDos = [];

//할일을 지우는 함수
function deleteToDo (event) {
  // event.target = 이벤트가 일어날 객체
  const btn = event.target;
  const li = btn.parentNode;
  //todolist에서 버튼이 눌린 list의 자식을 없애버리기
  toDoList.removeChild(li);
  //filter = 참인 요소들을 모아서 새로운 배열을 만드는 것
  //여기에서는 function(todo)값이 true인 것들을 모아서 새로 만드는거지 & 없어진 li의 id값이 todo의 id값과 다르다면, 살려두는 것
  const cleanToDos = toDos.filter(function(toDo){
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}

//할일들을 local storage에 저장시키는것 + string화 시킴
function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos))
}

//text를 입력하면, li를 만들어서 화면에 나타나게 하는 함수 
function paintToDo (text) {
  const li  = document.createElement("li");
  const delBtn = document.createElement("button");
  delBtn.innerText = "X";
  delBtn.addEventListener("click", deleteToDo);
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text : text,
    id : newId
  };
  toDos.push(toDoObj);
  saveToDos();
}

//입력창에 넣으면, 이벤트(리스트가 생성되는 것)가 실행되게끔하기
function handleSubmit (event) {
  //기본적인 디폴트값으로 만들기
  event.preventDefault();
  //toinput(위에서 정의한 input태그)의 value를 정의함
  const currentValue = toDoinput.value;
  paintToDo(currentValue);
  toDoinput.value ="";
}

//local storage에 있는 todo들을 화면에 불러오게 하는 것
function loadToDos() {
  const LoadedToDos = localStorage.getItem(TODOS_LS);
  if (LoadedToDos !== null) {
    //parse = string을 객체화 시키는 것
    const parsedToDos = JSON.parse(LoadedToDos)
    //parsedToDos에 있는 각각의 요소들을 괄호안의 함수로 실행시키는 것
    parsedToDos.forEach(function(toDo) {
      paintToDo(toDo.text);
    });
    } else{}
  }

function init () {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit)
}
init();
