const fromSection = document.getElementById('from-Section');
const toSection = document.getElementById('to-Section');

const fromCurrencyInput = document.getElementById('from-currency');
const toCurrencyInput = document.getElementById('to-currency');


let fromCurrency = "";
let toCurrency = "";


fromSection.addEventListener("click", (event) => {

    if(event.target.matches("li.currency")) { 

        fromCurrency = event.target.dataset.currency;

        fromSection.querySelectorAll("li.currency").forEach((li) =>{

            li.style.backgroundColor = li.dataset.currency === fromCurrency ? "#833AE0" : "white";
            li.style.color = li.dataset.currency === fromCurrency ? "white" : "#C6C6C6";

        });

       getExchangeData();
    };

});

toSection.addEventListener('click', (event) => {

    if(event.target.matches("li.currency")) {

        toCurrency = event.target.dataset.currency;

        toSection.querySelectorAll("li.currency").forEach((li) => {

            li.style.backgroundColor = li.dataset.currency === toCurrency ? "#833AE0" : "white";
            li.style.color = li.dataset.currency === toCurrency ? "white" : "#C6C6C6";

        });

        getExchangeData();
    };

});

fromCurrencyInput.addEventListener('input', getExchangeData);

function getExchangeData () {

    const fromValue = fromCurrencyInput.value;

    fetch(`https://api.exchangerate.host/latest?base=${fromCurrency}&symbols=${toCurrency}`)
    .then((res) =>  res.json())
    .then((data) => {

        let rate = data.rates[toCurrency];
        let convertedValue = fromValue * rate;

        toCurrencyInput.value = convertedValue.toFixed(2);

    let valueTodayElementFirst = document.getElementById("value-today-one");
        valueTodayElementFirst.textContent = `1 ${fromCurrency} = ${rate.toFixed(4)} ${toCurrency}`;

    let reverseRate = 1/ rate;

    let valueTodayElementSecond = document.getElementById("value-today-two");
        valueTodayElementSecond.textContent = `1 ${toCurrency} = ${reverseRate.toFixed(4)} ${fromCurrency}`;

    })

    .catch((error) => {
        console.log(error);
    });

}; 