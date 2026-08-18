const minimumInput = document.getElementById("minimum");
const maximumInput = document.getElementById("maximum");

const generateButton =
    document.getElementById("generate-button");

const randomResult =
    document.getElementById("random-result");

const randomMessage =
    document.getElementById("random-message");

const copyButton =
    document.getElementById("copy-button");


function generateRandomNumber() {

    const minimum =
        Number(minimumInput.value);

    const maximum =
        Number(maximumInput.value);


    // Check that both inputs contain valid numbers

    if (
        minimumInput.value === "" ||
        maximumInput.value === "" ||
        !Number.isFinite(minimum) ||
        !Number.isFinite(maximum)
    ) {

        randomResult.textContent = "—";

        randomMessage.textContent =
            "Enter a minimum and maximum number.";

        return;
    }


    // Make sure the minimum isn't larger than the maximum

    if (minimum > maximum) {

        randomResult.textContent = "—";

        randomMessage.textContent =
            "Minimum must be less than or equal to maximum.";

        return;
    }


    // Generate an inclusive random whole number

    const randomNumber =
        Math.floor(
            Math.random() * (maximum - minimum + 1)
        ) + minimum;


    randomResult.textContent =
        randomNumber.toLocaleString();


    randomMessage.textContent =
        `Random number between ${minimum.toLocaleString()} and ${maximum.toLocaleString()}.`;

}


// Copy the result

async function copyResult() {

    const value =
        randomResult.textContent;


    if (
        value === "—" ||
        value === ""
    ) {
        return;
    }


    try {

        await navigator.clipboard.writeText(
            value.replace(/,/g, "")
        );

        copyButton.textContent = "Copied!";


        setTimeout(() => {

            copyButton.textContent = "Copy";

        }, 1200);

    } catch (error) {

        copyButton.textContent = "Copy failed";


        setTimeout(() => {

            copyButton.textContent = "Copy";

        }, 1200);

    }

}


generateButton.addEventListener(
    "click",
    generateRandomNumber
);


copyButton.addEventListener(
    "click",
    copyResult
);