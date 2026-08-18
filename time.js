const hoursOneInput =
    document.getElementById("hours-one");

const minutesOneInput =
    document.getElementById("minutes-one");

const hoursTwoInput =
    document.getElementById("hours-two");

const minutesTwoInput =
    document.getElementById("minutes-two");

const operationInput =
    document.getElementById("operation");

const timeResult =
    document.getElementById("time-result");

const timeTotal =
    document.getElementById("time-total");


function calculateTime() {

    const hoursOne =
        Number(hoursOneInput.value);

    const minutesOne =
        Number(minutesOneInput.value);

    const hoursTwo =
        Number(hoursTwoInput.value);

    const minutesTwo =
        Number(minutesTwoInput.value);


    // Check inputs

    if (
        hoursOneInput.value === "" ||
        minutesOneInput.value === "" ||
        hoursTwoInput.value === "" ||
        minutesTwoInput.value === "" ||
        !Number.isFinite(hoursOne) ||
        !Number.isFinite(minutesOne) ||
        !Number.isFinite(hoursTwo) ||
        !Number.isFinite(minutesTwo) ||
        hoursOne < 0 ||
        hoursTwo < 0 ||
        minutesOne < 0 ||
        minutesOne > 59 ||
        minutesTwo < 0 ||
        minutesTwo > 59
    ) {

        timeResult.textContent = "—";

        timeTotal.textContent =
            "Enter valid hours and minutes.";

        return;
    }


    // Convert everything to minutes

    const firstTotalMinutes =
        (hoursOne * 60) + minutesOne;

    const secondTotalMinutes =
        (hoursTwo * 60) + minutesTwo;


    let resultMinutes;


    // Add or subtract

    if (operationInput.value === "add") {

        resultMinutes =
            firstTotalMinutes + secondTotalMinutes;

    } else {

        resultMinutes =
            firstTotalMinutes - secondTotalMinutes;

    }


    // Don't display negative time

    if (resultMinutes < 0) {

        timeResult.textContent = "—";

        timeTotal.textContent =
            "The result cannot be negative.";

        return;
    }


    // Convert minutes back into hours and minutes

    const hours =
        Math.floor(resultMinutes / 60);

    const minutes =
        resultMinutes % 60;


    // Build readable result

    const hourText =
        hours === 1
            ? "hour"
            : "hours";

    const minuteText =
        minutes === 1
            ? "minute"
            : "minutes";


    if (hours === 0 && minutes === 0) {

        timeResult.textContent =
            "0 minutes";

    } else if (hours === 0) {

        timeResult.textContent =
            `${minutes} ${minuteText}`;

    } else if (minutes === 0) {

        timeResult.textContent =
            `${hours} ${hourText}`;

    } else {

        timeResult.textContent =
            `${hours} ${hourText} ${minutes} ${minuteText}`;

    }


    timeTotal.textContent =
        `${resultMinutes.toLocaleString()} minutes total`;

}


// Update whenever something changes

hoursOneInput.addEventListener(
    "input",
    calculateTime
);

minutesOneInput.addEventListener(
    "input",
    calculateTime
);

hoursTwoInput.addEventListener(
    "input",
    calculateTime
);

minutesTwoInput.addEventListener(
    "input",
    calculateTime
);

operationInput.addEventListener(
    "change",
    calculateTime
);


// Calculate on page load

calculateTime();