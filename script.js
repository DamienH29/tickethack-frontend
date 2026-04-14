//Change value of date input
const today = new Date().toISOString().split('T')[0];
document.querySelector("#date-input").value = today;


document.querySelector('#search-button').addEventListener('click', function() {
    const departure = document.querySelector('#departure-input').value;
    const arrival = document.querySelector('#arrival-input').value;
    fetch(`http://localhost:3000/trips/${departure}/${arrival}`) 
        .then(response => response.json())
        .then(data => {
            document.querySelector("#response-container").innerHTML += `
            <div class="cityContainer">
                <p class="name">${data.weather.cityName}</p>
                <p class="description">${data.weather.decription}</p>
                <img class="weatherIcon" src="images/${data.weather.main}.png" />
                <div class="temperature">
                    <p class="tempMin">${data.weather.tempMin}</p>
                    <span>-</span>
                    <p class="tempMax">${data.weather.tempMax}</p>
                </div>
                <button class="deleteCity" id=${data.weather.cityName}>Delete</button>
                </div>
            ` 
        })
        .catch(error => console.error('Erreur:', error));
});