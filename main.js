let holdeName = document.querySelector(".holder-name");
let nameInput = document.querySelector("#name");
let nameSpan = document.querySelector("#name + span");
let cardNumber = document.querySelector(".card-number");
let numberInput = document.querySelector("#number");
let numberSpan = document.querySelector("#number + span");
let expMonth = document.querySelector(".exp-month");
let monthInput = document.querySelector("#month");
let expYear = document.querySelector(".exp-year");
let yearInput = document.querySelector("#year");
let dateSpan = document.querySelector(".date-inputs + span");
let cvc = document.querySelector(".card-back div p");
let cvcInput = document.querySelector("#cvc");
let cvcSpan = document.querySelector("#cvc + span");
let btn = document.querySelector("#btn");
let form = document.querySelector("form");
let completed = document.querySelector(".completed");
let continuebtn = document.querySelector(".completed button");

// Inputs addEventListeners
nameInput.addEventListener(
  "input",
  () => (holdeName.innerHTML = nameInput.value)
);
numberInput.addEventListener("input", (e) => {
  e.preventDefault();

  let formatText = e.target.value;
  formatText = formatText.substring(0, 19);
  formatText = formatText
    .replace(/\s/g, "")
    .replace(new RegExp(`(.{${4}})`, "g"), "$1 ")
    .trim();

  e.target.value = formatText;

  cardNumber.textContent = e.target.value;
});
monthInput.addEventListener(
  "input",
  () => (expMonth.innerHTML = monthInput.value)
);
yearInput.addEventListener(
  "input",
  () => (expYear.innerHTML = yearInput.value)
);
cvcInput.addEventListener("input", () => (cvc.innerHTML = cvcInput.value));

//Error handeling
const showError = (input, span, msg) => {
  input.style.border = "2px red solid";
  span.textContent = msg;
};
const hideError = (input, span) => {
  input.style.border = "2px #9f90ae solid";
  span.textContent = "";
};

// Confirm button
btn.addEventListener("click", () => {
  let nameAccepted = false;
  let cardnumberAccepted = false;
  let monthAccepted = false;
  let yearAccepted = false;
  let cvcAccepted = false;

  //checking

  // Name checking
  if (nameInput.value == "") {
    showError(nameInput, nameSpan, "Can't be blank");
  } else if (
    /[0-9]/.test(nameInput.value) ||
    !/^[A-Za-z ]+$/.test(nameInput.value)
  ) {
    showError(nameInput, nameSpan, "Wrong format, letters only");
  } else {
    hideError(nameInput, nameSpan);
    nameAccepted = true;
  }

  // Cardnumber checking
  if (numberInput.value == "") {
    showError(numberInput, numberSpan, "Can't be blank");
  } else if (/[^0-9 ]/.test(numberInput.value)) {
    showError(numberInput, numberSpan, "Wrong format, numbers only");
  } else if (numberInput.value.length < 19) {
    showError(numberInput, numberSpan, "Wrong format, must be 16 numbers ");
  } else {
    hideError(numberInput, numberSpan);
    cardnumberAccepted = true;
  }

  // month checking
  if (monthInput.value == "") {
    showError(monthInput, dateSpan, "Can't be blank");
  } else if (
    parseInt(monthInput.value) <= 0 ||
    parseInt(monthInput.value) > 12
  ) {
    showError(monthInput, dateSpan, "Invalid date");
  } else if (monthInput.value.length != 2) {
    showError(monthInput, dateSpan, "must be 2 numbers");
  } else {
    hideError(monthInput, dateSpan);
    monthAccepted = true;
  }
  // year checking
  if (yearInput.value == "") {
    showError(yearInput, dateSpan, "Can't be blank");
  } else if (yearInput.value.length != 2) {
    showError(yearInput, dateSpan, "must be 2 numbers");
  } else {
    hideError(yearInput, dateSpan);
    yearAccepted = true;
  }
  // cvc checking
  if (cvcInput.value == "") {
    showError(cvcInput, cvcSpan, "Can't be blank");
  } else if (cvcInput.value.length != 3) {
    showError(cvcInput, cvcSpan, "must be 3 numbers");
  } else {
    hideError(cvcInput, cvcSpan);
    cvcAccepted = true;
  }
  if (
    nameAccepted &&
    cardnumberAccepted &&
    monthAccepted &&
    yearAccepted &&
    cvcAccepted
  ) {
    form.style.display = "none";
    completed.style.display = "flex";
  }
});
continuebtn.onclick = () => location.reload();
