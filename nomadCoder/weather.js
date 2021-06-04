const weather = document.querySelector(".js-weather");
const API_KEY = "12fe13d198144f1ca935238167a64031";
const COORDS = "coords";

function getWeather(lat, lng) {
  //API 불러오기
  fetch (
    `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  ).then (function(response) {
    return response.json();
  }).then (function(json) {
    const temperature = json.main.temp;
    const place = json.name;
    weather.innerText = `${temperature}℃ @ ${place}`;
  });
};

//local storage에 위치정보 객체를 저장하는 단계(여기서는 객체를 string화 시켜서 넣어줘야 한다 ~!)
function saveCoords (coordsObj) {
 localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handelGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude : latitude,
    longitude : longitude
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("Cant access geo location");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handelGeoSuccess, handleGeoError);
}

function loadCoords () {
  //local storage에 있는걸 불러와서 변수에 저장하는 것 !
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    //string인걸 obj로 바꿔준다아 parse ~
    const parsedCoords = JSON.parse(loadedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}

function init () {
  loadCoords();
}
init();