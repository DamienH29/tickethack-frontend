
fetch('http://localhost:3000/trips/books')
    .then(response => response.json())
    .then(data => {
        if (data.result) {
            const container = document.querySelector('#bookings-list');
            container.innerHTML = '<h3>My bookings</h3>';

            for (let trip of data.cart) { 
                container.innerHTML += `
                    <div class="booking-item">
                        <span>${trip.traject}</span>
                        <span>${trip.hour}</span>
                        <span>${trip.price}€</span>
                        <span class="departure">Departure in ...</span>
                    </div>
                `;
            }
        }
    });


