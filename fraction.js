const numeratorOneInput =
    document.getElementById("numerator-one");

const denominatorOneInput =
    document.getElementById("denominator-one");

const numeratorTwoInput =
    document.getElementById("numerator-two");

const denominatorTwoInput =
    document.getElementById("denominator-two");

const operationInput =
    document.getElementById("fraction-operation");

const fractionResult =
    document.getElementById("fraction-result");

const mixedResult =
    document.getElementById("mixed-result");

const fractionMessage =
    document.getElementById("fraction-message");



function greatestCommonDivisor(a, b) {

    a = Math.abs(a);
    b = Math.abs(b);


    while (b !== 0) {

        const remainder =
            a % b;

        a = b;
        b = remainder;

    }


    return a;
}



function simplifyFraction(
    numerator,
    denominator
) {

    if (denominator === 0) {

        return null;

    }


    // Keep the negative sign on the numerator

    if (denominator < 0) {

        numerator = -numerator;
        denominator = -denominator;

    }


    const divisor =
        greatestCommonDivisor(
            numerator,
            denominator
        );


    return {

        numerator:
            numerator / divisor,

        denominator:
            denominator / divisor

    };

}



function calculateFraction() {

    const numeratorOne =
        Number(numeratorOneInput.value);

    const denominatorOne =
        Number(denominatorOneInput.value);

    const numeratorTwo =
        Number(numeratorTwoInput.value);

    const denominatorTwo =
        Number(denominatorTwoInput.value);


    // Validate inputs

    if (
        numeratorOneInput.value === "" ||
        denominatorOneInput.value === "" ||
        numeratorTwoInput.value === "" ||
        denominatorTwoInput.value === "" ||
        !Number.isInteger(numeratorOne) ||
        !Number.isInteger(denominatorOne) ||
        !Number.isInteger(numeratorTwo) ||
        !Number.isInteger(denominatorTwo)
    ) {

        showError(
            "Enter whole numbers for all fields."
        );

        return;

    }


    // Denominators cannot be zero

    if (
        denominatorOne === 0 ||
        denominatorTwo === 0
    ) {

        showError(
            "A denominator cannot be zero."
        );

        return;

    }


    let numerator;
    let denominator;


    // Calculate

    switch (operationInput.value) {

        case "add":

            numerator =
                (numeratorOne * denominatorTwo) +
                (numeratorTwo * denominatorOne);

            denominator =
                denominatorOne * denominatorTwo;

            break;


        case "subtract":

            numerator =
                (numeratorOne * denominatorTwo) -
                (numeratorTwo * denominatorOne);

            denominator =
                denominatorOne * denominatorTwo;

            break;


        case "multiply":

            numerator =
                numeratorOne * numeratorTwo;

            denominator =
                denominatorOne * denominatorTwo;

            break;


        case "divide":

            if (numeratorTwo === 0) {

                showError(
                    "You cannot divide by zero."
                );

                return;

            }


            numerator =
                numeratorOne * denominatorTwo;

            denominator =
                denominatorOne * numeratorTwo;

            break;

    }


    const simplified =
        simplifyFraction(
            numerator,
            denominator
        );


    if (!simplified) {

        showError(
            "Something went wrong with the calculation."
        );

        return;

    }


    displayFraction(
        simplified.numerator,
        simplified.denominator
    );

}



function displayFraction(
    numerator,
    denominator
) {

    // Whole number

    if (denominator === 1) {

        fractionResult.innerHTML =
            `<span>${numerator}</span>`;

        mixedResult.textContent =
            numerator.toString();

        fractionMessage.textContent =
            "Whole number";

        return;

    }


    // Zero

    if (numerator === 0) {

        fractionResult.innerHTML =
            `<span>0</span>`;

        mixedResult.textContent =
            "0";

        fractionMessage.textContent =
            "Simplified result";

        return;

    }


    fractionResult.innerHTML = `

        <span>${numerator}</span>

        <div class="fraction-result-line"></div>

        <span>${denominator}</span>

    `;


    // Mixed number

    const absoluteNumerator =
        Math.abs(numerator);

    const wholePart =
        Math.floor(
            absoluteNumerator / denominator
        );

    const remainder =
        absoluteNumerator % denominator;


    let mixedNumber;


    if (wholePart === 0) {

        mixedNumber =
            `${numerator}/${denominator}`;

    } else if (remainder === 0) {

        mixedNumber =
            `${numerator < 0 ? "-" : ""}${wholePart}`;

    } else {

        mixedNumber =
            `${numerator < 0 ? "-" : ""}${wholePart} ${remainder}/${denominator}`;

    }


    mixedResult.textContent =
        mixedNumber;


    fractionMessage.textContent =
        "Simplified result";

}



function showError(message) {

    fractionResult.innerHTML =
        `<span>—</span>`;

    mixedResult.textContent =
        "";

    fractionMessage.textContent =
        message;

}



numeratorOneInput.addEventListener(
    "input",
    calculateFraction
);

denominatorOneInput.addEventListener(
    "input",
    calculateFraction
);

numeratorTwoInput.addEventListener(
    "input",
    calculateFraction
);

denominatorTwoInput.addEventListener(
    "input",
    calculateFraction
);

operationInput.addEventListener(
    "change",
    calculateFraction
);


// Calculate when page opens

calculateFraction();