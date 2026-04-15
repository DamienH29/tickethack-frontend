//Add to cart.html + delete button
fetch("http://localhost:3000/trips/cart")
  .then((response) => response.json())
  .then((data) => {
    data.trips.forEach((trip) => {
      document.querySelector("#cart-container").innerHTML += `
            <div class="trip-card">
                <p>${trip.traject}</p>
                <p>${trip.hour}</p>
                <p>${trip.price}</p>
                <button class="delete-button" id="${trip._id}">X</button>
            </div>
        `;
    });
    deleteTrip();
  });

function deleteTrip() {
  document.querySelectorAll(".delete-button").forEach((button) => {
    button.addEventListener("click", function () {
      const id = this.id;
      fetch(`http://localhost:3000/trips/cart/${id}`, { method: "DELETE" })
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            document.querySelector(`#${id}`).parentNode.remove();
          }
        });
    });
  });
}
