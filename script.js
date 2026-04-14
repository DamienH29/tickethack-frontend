//Change value of date input
const today = new Date().toISOString().split('T')[0];
document.querySelector("#date-input").value = today;