// Click on Tickethack to go there
document.querySelector("#title").addEventListener("click", function () {
  window.location.assign("index.html");
});

// Click on Cart to go there
document.querySelector("#cart").addEventListener("click", function () {
  window.location.assign("cart.html");
});

// Click on Bookings to go there
document.querySelector("#bookings").addEventListener("click", function () {
  window.location.assign("bookings.html");
});

//Add to cart.html + delete button
fetch("http://localhost:3000/trips/cart")
  .then((response) => response.json())
  .then((data) => {
    if(data.result) {
    document.querySelector("#cart-container").innerHTML = `
      <p>My cart</p>
      <div id="trip-cards"></div>
      <div id="footer-cart">
        <p id="cart-total">Total : <span></span>€</p>
        <button id="purchase-button">Purchase</button>
      </div>
    `;
    for(let trip of data.cart) {
      document.querySelector("#trip-cards").innerHTML += `
            <div class="trip-card">
                <p>${trip.traject}</p>
                <p>${trip.hour}</p>
                <p>${trip.price}</p>
                <button class="delete-button" id="${trip._id}">X</button>
            </div>
        `;
    };
  }
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
            this.parentNode.remove();
          }
        });
    });
  });
}
