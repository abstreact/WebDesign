window.addEventListener('load',()=>{
let long ;
let lat;
let temperatureDescription = document.querySelector('.temperature-description');
let temperatureDegree = document.querySelector('.temperature-degree');
let locationTimezone = document.querySelector('.location-timezone');
let longitude = document.getElementById('long').value;
let latitude = document.getElementById('lat').value;
function checkWeather(){
    
    navigator.geolocation.getCurrentPosition(position =>{
        //get long and lat from your current location
        long = position.coords.longitude;
        lat = position.coords.latitude;
        //long = longitude;
        //lat = latitude;
        console.log(long,lat)
//format:
//api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=b75243545cde5d36789f25bbcf04c254

    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=b75243545cde5d36789f25bbcf04c254`;
    
    fetch(api)
    .then(data =>{
        return data.json();
    })
    .then(data =>{
        console.log(data);
        const {temp,feels_like} = data.main;
        const {description,main} = data.weather[0];
        let {name} = data;
        //Set DOM elements from the API
        tempToC = temp - 273.15;
        feels_likeToC = feels_like - 273.15;
        temperatureDegree.textContent = tempToC.toPrecision(3);
        temperatureDescription.textContent = "Feels like: " + feels_likeToC.toPrecision(3);
        console.log(name);
        locationTimezone.textContent = name;
    })
});
}


   
});
    