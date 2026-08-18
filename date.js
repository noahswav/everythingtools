const startDateInput = document.getElementById("start-date");
const endDateInput = document.getElementById("end-date");

const daysResult = document.getElementById("days-result");
const dateDescription = document.getElementById("date-description");


function calculateDateDifference() {

    if (
        startDateInput.value === "" ||
        endDateInput.value === ""
    ) {

        daysResult.textContent = "—";

        dateDescription.textContent =
            "Select two dates above.";

        return;
    }


    const startDate =
        parseDate(startDateInput.value);

    const endDate =
        parseDate(endDateInput.value);


    // Work out which date comes first

    const earlierDate =
        startDate <= endDate
            ? startDate
            : endDate;

    const laterDate =
        startDate <= endDate
            ? endDate
            : startDate;


    // Calculate the difference in days

    const millisecondsPerDay =
        1000 * 60 * 60 * 24;


    const difference =
        Math.round(
            (laterDate - earlierDate) /
            millisecondsPerDay
        );


    // Display result

    daysResult.textContent =
        `${formatNumber(difference)} days`;


    if (difference === 0) {

        dateDescription.textContent =
            "Both dates are the same.";

    } else if (difference === 1) {

        dateDescription.textContent =
            "The dates are 1 day apart.";

    } else {

        dateDescription.textContent =
            `The dates are ${formatNumber(difference)} days apart.`;

    }

}


// Parse YYYY-MM-DD without timezone problems

function parseDate(value) {

    const [year, month, day] =
        value.split("-").map(Number);

    return new Date(
        year,
        month - 1,
        day
    );

}


// Format numbers cleanly

function formatNumber(number) {

    return new Intl.NumberFormat("en-US")
        .format(number);

}


// Update automatically

startDateInput.addEventListener(
    "input",
    calculateDateDifference
);

endDateInput.addEventListener(
    "input",
    calculateDateDifference
);