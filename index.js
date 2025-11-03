const countryList = {
  AED: "AE",
  AFN: "AF",
  ALL: "AL",
  AMD: "AM",
  ANG: "NL",
  AOA: "AO",
  ARS: "AR",
  AUD: "AU",
  BDT: "BD",
  BGN: "BG",
  BRL: "BR",
  CAD: "CA",
  CHF: "CH",
  CLP: "CL",
  CNY: "CN",
  COP: "CO",
  CZK: "CZ",
  DKK: "DK",
  EGP: "EG",
  EUR: "FR",
  GBP: "GB",
  HKD: "HK",
  HUF: "HU",
  IDR: "ID",
  ILS: "IL",
  INR: "IN",
  ISK: "IS",
  JPY: "JP",
  KRW: "KR",
  KWD: "KW",
  LKR: "LK",
  MAD: "MA",
  MXN: "MX",
  MYR: "MY",
  NOK: "NO",
  NZD: "NZ",
  OMR: "OM",
  PHP: "PH",
  PKR: "PK",
  PLN: "PL",
  QAR: "QA",
  RUB: "RU",
  SAR: "SA",
  SEK: "SE",
  SGD: "SG",
  THB: "TH",
  TRY: "TR",
  TWD: "TW",
  USD: "US",
  VND: "VN",
  ZAR: "ZA",
};

// DOM Elements
const dropdowns = document.querySelectorAll("select");
const btn = document.getElementById("submit");
const fromCurr = document.getElementById("from");
const toCurr = document.getElementById("to");
const output = document.querySelector(".output");
const input = document.querySelector(".input");
const swapIcon = document.querySelector(".exchange-icon");

// Populate dropdowns
for (let select of dropdowns) {
  for (let currCode in countryList) {
    let option = document.createElement("option");
    option.value = currCode;
    option.textContent = currCode;
    if (select.id === "from" && currCode === "USD") option.selected = true;
    if (select.id === "to" && currCode === "INR") option.selected = true;
    select.appendChild(option);
  }
  select.addEventListener("change", (e) => updateFlag(e.target));
}

function updateFlag(element) {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
}

// Swap currencies
swapIcon.addEventListener("click", () => {
  let temp = fromCurr.value;
  fromCurr.value = toCurr.value;
  toCurr.value = temp;

console.log(output.innerHTML)

let arr1 = output.innerHTML.split('=');

    output.textContent = `${arr1[1]} = ${arr1[0]}`;

  updateFlag(fromCurr);
  updateFlag(toCurr);
});

// ---------- Animate Output ----------
function animateOutput() {
  output.classList.add("animate");
  setTimeout(() => output.classList.remove("animate"), 300);
}

// ---------- Convert Currency ----------
btn.addEventListener("click", async () => {
  let amount = parseFloat(input.value);
  if (isNaN(amount) || amount <0){
    amount = 1;
    document.querySelector(".input").value = '1'
  } 

  const from = fromCurr.value;
  const to = toCurr.value;

  // ✅ Updated API (more reliable and works globally)
  const URL = `https://open.er-api.com/v6/latest/${from}`;

  try {
    const res = await fetch(URL);
    if (!res.ok) throw new Error("Network response was not ok");

    const data = await res.json();

    if (!data.rates || !data.rates[to]) {
      throw new Error(`No exchange rate found for ${to}`);
    }

    const rate = data.rates[to];
    const converted = (amount * rate).toFixed(2);
    output.textContent = `${amount} ${from} = ${converted} ${to}`;
    animateOutput();
  } catch (err) {
    console.error(err);
    output.textContent = "⚠️ Error fetching exchange rates. Try again.";
  }
});

// ---------- Dark Mode Toggle ----------
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = themeToggle.querySelector("i");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  // Switch icon
  if (document.body.classList.contains("dark")) {
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
  } else {
    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");
  }
});
