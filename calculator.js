// Find DOM element and hold onto it, so we don't have to search for it
// every time we use it.
const calcForm = document.getElementById("calc-form");
const amountBox = document.getElementById("loan-amount");
const yearsBox = document.getElementById("loan-years");
const rateBox = document.getElementById("loan-rate");
const display = document.getElementById("calc-monthly-payment");
const errors = document.getElementById("error-messages");


/** Check that form input values are valid (i.e. positive numbers).
 * If not, render error message(s).
 * Return true if all inputs are valid, else false.
 */

function validateData() {
  errors.innerHTML = "";
  if (!(Number(amountBox.value) > 0)) {
    const amtErr = document.createElement("h3");
    amtErr.innerHTML = "Loan amount must be a positive number";
    errors.append(amtErr);
  }
  if (!(Number(yearsBox.value) > 0)) {
    const amtErr = document.createElement("h3");
    amtErr.innerHTML = "Term in Years must be a positive number";
    errors.append(amtErr);
  }
  if (!(Number(rateBox.value) > 0)) {
    const amtErr = document.createElement("h3");
    amtErr.innerHTML = "Yearly Rate must be a positive number";
    errors.append(amtErr);
  }

  return (Number(amountBox.value) > 0
          && Number(yearsBox.value) > 0
          && Number(rateBox.value) > 0);

}


/** Get form values and return as `{amount, years, rate}`.
 *
 * Example output: `{"amount": 10000, "years": 10, "rate": 4.5}`.
 *
 * */

function getFormValues() {
  return {
    amount: Number(amountBox.value),
    years: Number(yearsBox.value),
    rate: Number(rateBox.value),
  };
}


/** Calculate monthly payment and return exact amount. */

function calcMonthlyPayment(amount, years, rate) {
  return ((amount * rate / 1200) / (1 - Math.pow(1 + rate / 1200, -years * 12)));
}


/** Validate form data, get form values, calculate payment,
 * convert to 2-decimal places, and update UI. */

function getFormValuesAndDisplayResults() {
  const isValid = validateData();
  if (isValid) {
    const { amount, years, rate } = getFormValues();
    const amt = calcMonthlyPayment(amount, years, rate);
    display.innerText = "$" + amt.toFixed(2);
  } else {
    display.innerText = "";
  }
}


/** Set initial form values and show initial results. Called at app start. */

function setInitialValues() {
  // use the default values in the provided screenshot
  amountBox.value = 10000;
  yearsBox.value = 10;
  rateBox.value = 4.5;
  getFormValuesAndDisplayResults();
}


/** Start: set form defaults & display; attach form submit event listener. */

function start() {
  setInitialValues();

  calcForm.addEventListener("submit", function (evt) {
    evt.preventDefault();
    getFormValuesAndDisplayResults();
  });
}

start();