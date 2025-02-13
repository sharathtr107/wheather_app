const apiKey = "d1845658f92b31c64bd94f06f7188c9c"; // Replace with your OpenWeather API Key

document.getElementById("search-btn").addEventListener("click", fetchWeather);

async function fetchWeather() {
    const city = document.getElementById("city-input").value;
    if (city === "") {
        alert("Please enter a city name.");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === "404") {
            document.getElementById("error-message").innerText = "City not found!";
            document.getElementById("error-message").classList.remove("hidden");
            document.getElementById("weather-info").classList.add("hidden");
        } else {
            document.getElementById("city-name").innerText = data.name;
            document.getElementById("temperature").innerText = data.main.temp;
            document.getElementById("humidity").innerText = data.main.humidity;
            document.getElementById("wind-speed").innerText = data.wind.speed;
            document.getElementById("weather-icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
            document.getElementById("description").innerText = data.weather[0].description;
            setBackground(data.weather[0].main);
            document.getElementById("error-message").classList.add("hidden");
            document.getElementById("weather-info").classList.remove("hidden");
        }
    } catch (error) {
        console.error("Error fetching weather:", error);
        document.getElementById("error-message").innerText = "Error fetching data!";
        document.getElementById("error-message").classList.remove("hidden");
    }
}
// Function to set the background based on the weather condition
function setBackground(condition) {
    const body = document.body;
    if (condition.includes("clear")) {
        body.style.backgroundImage = "url('https://www.shutterstock.com/image-vector/sun-blue-sky-bright-warm-600nw-2472495899.jpg')";
    } else if (condition.includes("cloud")) {
    body.style.backgroundImage = "url('https://images.stockcake.com/public/4/8/7/487e545c-4e5f-4189-b285-2a6184e6fe33_large/sunrise-cloudy-sky-stockcake.jpg')";
    } else if (condition.includes("rain")) {
        body.style.backgroundImage = "url('https://static.vecteezy.com/system/resources/thumbnails/042/146/518/small_2x/ai-generated-beautiful-rain-day-view-photo.jpg')";
    } else if (condition.includes("snow")) {
        body.style.backgroundImage = "url('https://media.istockphoto.com/id/1065457848/photo/happy-snowman-in-winter-secenery.jpg?s=612x612&w=0&k=20&c=ekY-cV7gcQ3baJVwOikOzrS6d73eNuR6SKOMO-03SsI=')";
    } else if (condition.includes("thunderstorm")) {
        body.style.backgroundImage = "url('https://www.shutterstock.com/shutterstock/videos/3645920725/thumb/1.jpg?ip=x480')";
    } else {
        body.style.backgroundImage = "url('https://img.freepik.com/free-vector/sky-background-video-conferencing_23-2148623068.jpg')";
    }

    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundPosition = "center";
    document.body.style.height = "100vh";  // Make sure the body takes full screen height
    document.body.style.margin = "0";  // Remove any default margin
    
}
// Temperature conversion
document.getElementById("toggle-temp").addEventListener("click", function () {
    const tempElement = document.getElementById("temperature");
    let temp = parseFloat(tempElement.innerText);

    if (this.innerText === "Convert to °F") {
        tempElement.innerText = ((temp * 9/5) + 32).toFixed(2) + " °F";
        this.innerText = "Convert to °C";
    } else {
        tempElement.innerText = ((temp - 32) * 5/9).toFixed(2) + " °C";
        this.innerText = "Convert to °F";
    }
});

