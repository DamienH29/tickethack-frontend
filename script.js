//Change value of date input
const today = new Date().toISOString().split('T')[0];
document.querySelector("#date-input").value = today;


document.querySelector('#search-button').addEventListener('click', function() {
    const departure = document.querySelector('#departure-input').value;
    const arrival = document.querySelector('#arrival-input').value;
    const date = document.querySelector('#date-input').value;

    fetch(`http://localhost:3000/trips/${departure}/${arrival}/${date}`) 
        .then(response => response.json())
        .then(data => {
            document.querySelector("#response-container").innerHTML = ""
            if(!data.result) {
                document.querySelector("#response-container").innerHTML += `
                    <div>
                        <img src="./images/notfound.png" id="notfound" />
                        <h4 id="not_found_text">No trip found.</h4>
                    </div>` 
            } else {
                for(let elem of data.trips) {
                const newDate = elem.date.slice(11, 16)

                document.querySelector("#response-container").innerHTML += `
                    <div>
                        <p id="traject-response">${elem.departure}>${elem.arrival}</p>
                        <p id="hour-response">${newDate}</p>
                        <p id="price-response">${elem.price}€</p>
                        <button id="book-button">Book</button>
                    </div>
            ` 
        }}     
        })
        .catch(error => console.error('Erreur:', error));
});