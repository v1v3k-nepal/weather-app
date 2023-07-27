const apiURL = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q='
const apiKey = '548e5f6281e647b962a1088da1db742b';

const searchBox = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const errorMsg = document.getElementById('error');
// const weatherDescription = document.querySelector(".weather-description");

async function fetchWeatherData(city){
    const response = await fetch(apiURL+ city+ `&appid=${apiKey}`);
    const data = await response.json();
    console.log(data);

    if(data.cod==404){
        document.querySelector(".message").innerHTML = "City Not Found, Please Re-check the spelling";
        setTimeout(()=>{
            document.querySelector(".message").innerHTML = '';
            // errorMsg.classList.remove("message");
        }, 3000);
    }

    document.querySelector(".weather-description").innerHTML = data.weather[0].description;
    document.querySelector(".temp").innerHTML = data.main.temp +"°C";
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " Km/hr";
    document.querySelector(".feelsLike").innerHTML = data.main.feels_like + "°C";
    document.querySelector(".visibility").innerHTML = data.visibility/1000 + " Km";
    document.querySelector(".temp_min").innerHTML = data.main.temp_min + "°C";
    document.querySelector(".temp_max").innerHTML = data.main.temp_max + "°C";


    const sunrise = Number.parseInt(data.sys.sunrise);
    const sunset = Number.parseInt(data.sys.sunset);
    const currentTime = Number.parseInt(data.dt);

    const sunriseTimestampMs = new Date(sunrise * 1000);
    const sunsetTimestampMs = new Date(sunset * 1000);
    const currentTimestampMs = new Date(currentTime * 1000);
    console.log(currentTimestampMs.toLocaleTimeString());
    console.log(sunriseTimestampMs.toLocaleTimeString());
    console.log(sunsetTimestampMs.toLocaleTimeString());

    document.querySelector(".sunrise_time").innerHTML = sunriseTimestampMs.toLocaleTimeString();
    document.querySelector(".sunset_time").innerHTML = sunsetTimestampMs.toLocaleTimeString();


    if(currentTime>sunrise && currentTime<sunset){

        const expressionDay = data.weather[0].main;

    switch(expressionDay){
        case "Clear":{
            weatherIcon.src = "./assets/clear.png";
            break;
        }

        case "Clouds":{
            weatherIcon.src = "./assets/clouds.png";
            break;
        }

        case "Drizzle":{
            weatherIcon.src = "./assets/drizzle.png";
            break;
        }

        case "Mist":{
            weatherIcon.src = "./assets/mist.png";
            break;
        }

        case "Rain":{
            weatherIcon.src = "./assets/rain.png";
            break;
        }

        case "Snow":{
            weatherIcon.src = "./assets/snow.png";
            break;
        }     

    }

}

    // console.log(data.dt>=data.sys.sunset && data.dt<=data.sys.sunrise);

    else{   //Night Time

        const expressionNight = data.weather[0].main;

        switch(expressionNight){
            case "Clear":{
                weatherIcon.src = "./assets/clear_night.png";
                break;
            }
    
            case "Clouds":{
                weatherIcon.src = "./assets/cloud_night.png";
                break;
            }
    
            case "Drizzle":{
                weatherIcon.src = "./assets/drizzle_night.png";
                break;
            }
    
            case "Mist":{
                weatherIcon.src = "./assets/mist_night.png";
                break;
            }
    
            case "Rain":{
                weatherIcon.src = "./assets/rain_night.png";
                break;
            }
    
            case "Snow":{
                weatherIcon.src = "./assets/snow_night.png";
                break;
            }     
    
        }
    }


}

fetchWeatherData("kathmandu");  //Default Loading

searchButton.addEventListener("click", ()=>{
    fetchWeatherData(searchBox.value);
})

searchBox.addEventListener('keypress', function(event){
    if(event.key=="Enter"){
        fetchWeatherData(searchBox.value);
    }
})