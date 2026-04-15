let allTripsInCart = []

//Add to cart.html + delete button
fetch("http://localhost:3000/trips/cart")
  .then((response) => response.json())
  .then((data) => {
    if(data.result) {
    

    document.querySelector("#cart-container").innerHTML = "";
    for(let trip of data.cart) {
      console.log(trip)
      document.querySelector("#cart-container").innerHTML += `
            <div class="trip-card">
                <p>${trip.traject}</p>
                <p>${trip.hour}</p>
                <p>${trip.price}</p>
                <button class="delete-button" id="${trip._id}">X</button>
            </div>
        `;
    };
    document.querySelector("#cart-container").innerHTML += `
        <div id="purchase-section">
            <button id="purchase-button">Purchase</button>
        </div>`;
  }
    deleteTrip();
    addPurchase();
  });

function deleteTrip() {
  document.querySelectorAll(".delete-button").forEach((button) => {
    button.addEventListener("click", function () {
      const id = this.id;
      fetch(`http://localhost:3000/trips/cart/${id}`, { method: "DELETE" })
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            this.parentNode.remove();
          }
        });
    });
  });
}

function addPurchase() {
document.querySelector("#purchase-button").addEventListener("click", function () {
    fetch("http://localhost:3000/trips/books", { method: "POST" })
      .then(response => response.json())
      .then(data => {
        if (data.result) {
          window.location.assign("bookings.html");
        }
      });
});
}