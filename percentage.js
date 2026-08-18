const percentageInput = document.getElementById("percentage");
const numberInput = document.getElementById("number");

const result = document.getElementById("result");
const resultDescription = document.getElementById("result-description");


function calculatePercentage() {

    const percentage = Number(percentageInput.value);
    const number = Number(numberInput.value);


    // Make sure both inputs contain numbers

    if (
        percentageInput.value === "" ||
        numberInput.value === "" ||
        !Number.isFinite(percentage) ||
        !Number.isFinite(number)
    ) {

        result.textContent = "—";

        resultDescription.textContent =
            "Enter numbers above to calculate.";

        return;
    }


    // The actual calculation

    const answer = (percentage / 100) * number;


    // Display the answer

    result.textContent = formatNumber(answer);


    resultDescription.textContent =
        `${formatNumber(percentage)}% of ${formatNumber(number)} is ${formatNumber(answer)}.`;

}


function formatNumber(number) {

    return new Intl.NumberFormat("en-US", {
        maximumFractionDigits: 10
    }).format(number);

}


// Recalculate whenever the user types

percentageInput.addEventListener(
    "input",
    calculatePercentage
);

numberInput.addEventListener(
    "input",
    calculatePercentage
);


// Calculate when the page first loads

calculatePercentage();