const birthDateInput = document.getElementById("birth-date");
const todayDateInput = document.getElementById("today-date");

const ageResult = document.getElementById("age-result");
const ageDescription = document.getElementById("age-description");


// Get today's date

const today = new Date();


// Format today's date for the date input

todayDateInput.value = formatDateForInput(today);


// Don't allow a future birth date

birthDateInput.max = todayDateInput.value;


function calculateAge() {

    if (
        birthDateInput.value === "" ||
        todayDateInput.value === ""
    ) {

        ageResult.textContent = "—";

        ageDescription.textContent =
            "Enter your date of birth above.";

        return;
    }


    const birthDate =
        parseDate(birthDateInput.value);

    const endDate =
        parseDate(todayDateInput.value);


    // Birth date cannot be after the calculation date

    if (birthDate > endDate) {

        ageResult.textContent = "—";

        ageDescription.textContent =
            "Your date of birth cannot be in the future.";

        return;
    }


    const age = calculateAgeDifference(
        birthDate,
        endDate
    );


    ageResult.textContent =
        `${age.years} years`;


    ageDescription.textContent =
        `${age.months} months and ${age.days} days old.`;

}


function calculateAgeDifference(start, end) {

    let years =
        end.getFullYear() - start.getFullYear();

    let months =
        end.getMonth() - start.getMonth();

    let days =
        end.getDate() - start.getDate();


    // Borrow days from the previous month

    if (days < 0) {

        months--;

        const previousMonth =
            new Date(
                end.getFullYear(),
                end.getMonth(),
                0
            );

        days += previousMonth.getDate();
    }


    // Borrow months from the previous year

    if (months < 0) {

        years--;

        months += 12;
    }


    return {
        years,
        months,
        days
    };

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


// Format a Date object as YYYY-MM-DD

function formatDateForInput(date) {

    const year =
        date.getFullYear();

    const month =
        String(date.getMonth() + 1)
            .padStart(2, "0");

    const day =
        String(date.getDate())
            .padStart(2, "0");

    return `${year}-${month}-${day}`;

}


// Recalculate when either date changes

birthDateInput.addEventListener(
    "input",
    calculateAge
);

todayDateInput.addEventListener(
    "input",
    calculateAge
);


// Run on page load

calculateAge();