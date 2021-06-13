console.log("hello, vanilla.");

const lastBtn = document.querySelector(".lastBtn"),
lastMonth = lastBtn.querySelector(".lastMonth"),
nextBtn = document.querySelector(".nextBtn"),
nextMonth = nextBtn.querySelector(".nextMonth");

const current = document.querySelector(".current"),
day = current.querySelector(".day"),
date = current.querySelector(".date");

const nowYear = document.querySelector(".nowYear"),
month = nowYear.querySelector(".month"),
year = nowYear.querySelector(".year");

const monthContent = document.querySelector(".monthContent"),
oneWeekmain = monthContent.querySelector(".oneWeekmain"),
oneWeek = monthContent.querySelector(".oneWeek"),
oneWeek1 = monthContent.getElementsByClassName("oneWeek")
Week1 = oneWeekmain.querySelectorAll(".Week");

const contentbody = document.getElementById('contentbody'),
tr = contentbody.querySelector('tr');
const trTag = document.getElementsByTagName("tr"),
newRow = contentbody.insertRow(),
tdTag = document.getElementsByTagName("td");
let rowIndex = tr.rowIndex;

let today = new Date(),
currentday = today.getDay(),
currentdate = today.getDate(),
currentmonth = today.getMonth(),
currentyear = today.getFullYear(),
thisMonth = new Date(currentyear, currentmonth, 1);

const monthArray = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
const dayArray = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const daycount = {
 JAN:31, FEB:28, MAR:31, APR:30, MAY:31, JUN:30, JUL:31, AUG:31, SEP:30, OCT:31, NOV:30, DEC:31
};

function btnClickTd (event) {
  const btn2 = event.target;
  //console.log(btn2.innerText, dayArray[btn2.cellIndex]);
  day.innerHTML = dayArray[btn2.cellIndex];
  date.innerHTML = btn2.innerText;
}

//달력을 초기화하는 함수
function removeLine () {
  let weekNum = document.querySelectorAll("#newWeek").length
   for (let i=0; i < weekNum; i++) {
    contentbody.removeChild(contentbody.childNodes[2]);
    }
  oneWeekmain.getElementsByClassName("Week").innerHTML = " ";
}

function moveLeft() {
  removeLine();
  if ( 1 <= today.getMonth() < 12 ) {
    today = new Date(currentyear, currentmonth - 1, 1);
    currentday = today.getDay();
    currentdate = today.getDate();
    currentmonth = today.getMonth();
    //currentyear를 명시해줘야 한다!!
    currentyear = today.getFullYear();
    thisMonth = new Date(currentyear, currentmonth, 1);
    dateShow();
    calendarShow();
    addDates();
  } else if (today.getMonth() = 0) {
    currentyear = currentyear - 1;
    today = new Date(currentyear, 0, 1);
    thisMonth = new Date(currentyear, currentmonth, 1);
    currentday = today.getDay();
    currentdate = today.getDate();
    currentmonth = today.getMonth();
    thisMonth = new Date(currentyear, currentmonth, 1);
    dateShow();
    calendarShow();
    addDates();
  } else {};
}

function moveRight() {
  removeLine();
    if ( 1 <= today.getMonth() < 12 ) {
    today = new Date(currentyear, currentmonth + 1, 1);
    currentday = today.getDay();
    currentdate = today.getDate();
    currentmonth = today.getMonth();
    //currentyear를 명시해줘야 한다!!
    currentyear = today.getFullYear();
    thisMonth = new Date(currentyear, currentmonth, 1);
    dateShow();
    calendarShow();
    addDates();
  } else if (today.getMonth() = 0) {
    currentyear = currentyear + 1;
    today = new Date(currentyear, 0, 1);
    thisMonth = new Date(currentyear, currentmonth, 1);
    currentday = today.getDay();
    currentdate = today.getDate();
    currentmonth = today.getMonth();
    thisMonth = new Date(currentyear, currentmonth, 1);
    dateShow();
    calendarShow();
    addDates();
  } else {};
}


//왼쪽으로 가는 버튼을 눌렀을때, 이벤트 진행되게 하기
function btnClickLeft(event) {
  const btn = event.target;
  moveLeft();
}

//오른쪽으로 가는 버튼을 눌렀을때, 이벤트 진행되게 하기
function btnClickRight(event) {
  const btn1 = event.target;
  moveRight();
}

function addDates() {
 let thisMonthDay = thisMonth.getDay();
 let differ = Number(document.getElementById(thisMonth.getDay()).id)-1
 let thisTotalDates = Object.values(daycount)[currentmonth];

for (let i = 0; i <7; i++) {
    if ( i < thisMonthDay) {
      document.getElementById(i).innerHTML = " ";
    } else if (i == thisMonthDay) {
      continue;
    } else {
      document.getElementById(i).innerHTML = `${i-differ}`;
    }
}
for (let i=2; i<7; i++) {
    contentbody.insertRow().className = "oneWeek";
    trTag[i].className= "oneWeek";
    trTag[i].id= "newWeek";
    trTag[i].insertCell(0).innerHTML = Number(trTag[i-1].cells[6].innerHTML)+1;
    for (let j = 1; j <7; j++) {
      trTag[i].insertCell(j).innerHTML = Number(trTag[i].cells[`${j-1}`].innerHTML) + 1;
    }
}
for (let i = 5; i <7 ; i++) {
  for (let j = 0; j<7 ;j++) {
    if (Number(trTag[i].cells[j].innerText) > thisTotalDates ) {
      trTag[i].cells[j].style.visibility = "hidden";
    } else {}
  }
}
}

function calendarShow() {
  document.getElementById(thisMonth.getDay()).innerHTML = "1";
}

function dateShow() {
  day.innerHTML = dayArray[currentday];
  date.innerHTML = `${currentdate}`;
  month.innerHTML = monthArray[currentmonth];
  year.innerHTML = `${currentyear}`;
}

function init() {
  dateShow();
  calendarShow();
  addDates();
  lastMonth.addEventListener("click", btnClickLeft);
  nextMonth.addEventListener("click", btnClickRight);
  contentbody.addEventListener("click", btnClickTd);
}

init();