var searchInput = document.getElementById("search");
var searchBtn = document.querySelector(".btn");
var day1 = document.getElementById("day1");
var day2 = document.getElementById("day2");
var day3 = document.getElementById("day3");
var cityName = document.getElementById("city");
var temp = document.getElementById("temp");

var daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

getData();

function getDayName(offset) {
    var today = new Date();
    var targetDate = new Date(today);
    targetDate.setDate(today.getDate() + offset);
    return daysOfWeek[targetDate.getDay()];
}


async function getData(city = "Cairo") {
    var response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=eb2576b388cd45d383e222922240512&q=${city}&days=3&aqi=no&alerts=no`);
    var data = await response.json();
    setData(data);
    console.log(data);
}

searchBtn.addEventListener("click", () => getData(searchInput.value));
searchInput.addEventListener("input", () => getData(searchInput.value || "Cairo"));

function setData(data) {
    let weather = document.getElementById("weather");
    weather.innerHTML = `<div class="col-md-4">
                <div class="card bg-dark text-white p-4 ">
                    <div class="card-header p-2 d-flex justify-content-between">
                        <h6>${data.forecast.forecastday[0].date}</h6>
                        <h6>${getDayName(0)}</h6>
                    </div>
                    <div class="card-body">
                        <span class="fw-bold text-muted" id="city">${data.location.name}</span>
                        <h2 id="temp"class="fw-bold mt-3" >${data.current.temp_c + "°C"}</h2>                        
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card bg-dark text-white p-4">
                    <div class="card-header p-2">
                        <h6 class="text-center" >${getDayName(1)}</h6>
                    </div>
                    <div class="card-body">
                        <span class="fw-bold text-dark" id="city">City</span>
                        <h2 id="temp"class="fw-bold mt-3" >${data.forecast.forecastday[1].day.maxtemp_c + "°C"}</h2>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card bg-dark text-white p-4">
                    <div class="card-header p-2">
                        <h6 class="text-center">${getDayName(2)}</h6>
                    </div>
                    <div class="card-body">
                        <span class="fw-bold text-dark" id="city">City</span>
                        <h2 id="temp"class="fw-bold mt-3" >${data.forecast.forecastday[2].day.maxtemp_c + "°C"}</h2>
                    </div>
                </div>
            </div>

            `
}
