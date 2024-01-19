// Функция displayTemperature используется для отображения текущей температуры и города в HTML-документе.
function displayTemperature(response) {
  // принимает один аргумент response. Объект response - это объект, который содержит ответ на запрос, отправленный с помощью библиотеки axios. Можно использовать любое другое имя для аргумента, например, data, result, output и т.д. Однако, если использовать другое имя, его нужно будет использовать и в теле функции вместо response.
  let searchTemperature = document.querySelector("#current-temperature"); // находим элемент с идентификатором current-temperature и сохраняем его в переменной searchTemperature
  let currentTemperature = Math.round(response.data.temperature.current); // находим текущую температуру в объекте response с помощью запроса data.temperature.current и сохраняем ее в переменной currentTemperature
  searchTemperature.innerHTML = currentTemperature; // устанавливаем содержимое элемента searchTemperature равным округленной текущей температуре.
  let cityElement = document.querySelector("#current-city"); // находим в index.html элемент с идентификатором current-city и сохраняем его в переменной cityElement
  cityElement.innerHTML = response.data.city; // меняем содержимое элемента cityElement на названию города, которое мы нашли в объекте response с помощью .data.city
}

// функция принимает один аргумент event. Функция используется для поиска текущей погоды в городе, который пользователь вводит в форму поиска ("#search-input")
function search(event) {
  event.preventDefault(); // вызываем метод preventDefault() на объекте event. Это предотвращает отправку формы и перезагрузку страницы при отправке формы.
  let searchInputElement = document.querySelector("#search-input"); // находим элемент с идентификатором search-input и сохраняем его в переменной searchInputElement (функция запустилась, так как пользователь нажал кнопку и сработал наблюдатель "submit")
  let cityElement = searchInputElement.value;
  // находим значение элемента с идентификатором search-input, сохраненного в переменнной searchInputElement и сохраняем его в переменной cityElement
  let apiKey = "7b358bb45a2c3obdef533te70adb056a"; // создаем переменную apiKey, которая содержит ключ API, необходимый для получения данных о погоде (ключ копироуес с сайта поставщиков погоды в документации)
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityElement}&key=${apiKey}&units=metric`; // создаем переменную apiUrl, которая содержит URL-адрес API, используемый для получения данных о погоде (прописуем переменную ${cityElement} (в ней содержится город введенный пользователем) и ключ API (нужен для получения доступа к данным о погоде))
  axios.get(apiUrl).then(displayTemperature); // используем библиотеку axios для выполнения запроса GET к API и передачи данных в функцию displayTemperature. Axios.get(apiUrl) отправляет запрос GET к API, используя URL-адрес, который хранится в переменной apiUrl. Когда ответ от сервера будет получен, будет вызвана функция displayTemperature для обработки ответа и отображения данных на странице.
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form"); // оглашается переменная по имени searchForm, в которой прописывается результат поиска по id #search-form
searchForm.addEventListener("submit", search); // для переменной searchForm добавляется наблюдатель на событие "submit" (когда в форму вводится данные и нажимается кнопка), запускается функция search, прописання выше (обязательно).

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);

let cityElement = document.querySelector("#current-city");
console.log(cityElement);
