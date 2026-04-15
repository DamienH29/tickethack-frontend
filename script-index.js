//Change value of date input
const today = new Date().toISOString().split("T")[0];
document.querySelector("#date-input").value = today;

// Query all trips from DB that match the search inputs and pull them on index.html
document.querySelector("#search-button").addEventListener("click", function () {
  const departure = document.querySelector("#departure-input").value;
  const arrival = document.querySelector("#arrival-input").value;
  const date = document.querySelector("#date-input").value;

  fetch(`http://localhost:3000/trips/${departure}/${arrival}/${date}`)
    .then((response) => response.json())
    .then((data) => {
      document.querySelector("#response-container").innerHTML = "";
      if (!data.result) {
        document.querySelector("#response-container").innerHTML += `
                    <div>
                        <img src="./images/notfound.png" id="notfound" />
                        <h4 id="not_found_text">No trip found.</h4>
                    </div>`;
      } else {
        for (let elem of data.trips) {
          const newDate = elem.date.slice(11, 16);

          document.querySelector("#response-container").innerHTML += `
                    <div class="trip-card">
                        <p class="traject-response">${elem.departure}>${elem.arrival}</p>
                        <p class="hour-response">${newDate}</p>
                        <p class="price-response">${elem.price}€</p>
                        <button class="book-button">Book</button>
                    </div>
            `;
        }
      }
      addButton();
    })
    .catch((error) => console.error("Erreur:", error));
});

// Get a trip from the list and add it to the cart list
function addButton() {
document.querySelectorAll(".book-button").forEach((button) => {
  button.addEventListener("click", function () {
    const trip = {
      traject: this.closest(".trip-card").querySelector(".traject-response").textContent,
      hour: this.closest(".trip-card").querySelector(".hour-response").textContent,
      price: this.closest(".trip-card").querySelector(".price-response").textContent,
    };

    fetch("http://localhost:3000/trips/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(trip),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          window.location.assign("cart.html");
        }
      });
  });
});
};