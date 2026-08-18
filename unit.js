const categoryInput =
    document.getElementById("category");

const fromValueInput =
    document.getElementById("from-value");

const fromUnitInput =
    document.getElementById("from-unit");

const toUnitInput =
    document.getElementById("to-unit");

const toValueInput =
    document.getElementById("to-value");

const conversionResult =
    document.getElementById("conversion-result");

const conversionDescription =
    document.getElementById("conversion-description");



const units = {

    length: {

        metre: {
            name: "Metres",
            factor: 1
        },

        kilometre: {
            name: "Kilometres",
            factor: 1000
        },

        centimetre: {
            name: "Centimetres",
            factor: 0.01
        },

        millimetre: {
            name: "Millimetres",
            factor: 0.001
        },

        inch: {
            name: "Inches",
            factor: 0.0254
        },

        foot: {
            name: "Feet",
            factor: 0.3048
        },

        yard: {
            name: "Yards",
            factor: 0.9144
        },

        mile: {
            name: "Miles",
            factor: 1609.344
        }

    },


    weight: {

        kilogram: {
            name: "Kilograms",
            factor: 1
        },

        gram: {
            name: "Grams",
            factor: 0.001
        },

        milligram: {
            name: "Milligrams",
            factor: 0.000001
        },

        pound: {
            name: "Pounds",
            factor: 0.45359237
        },

        ounce: {
            name: "Ounces",
            factor: 0.028349523125
        }

    },


    temperature: {

        celsius: {
            name: "Celsius"
        },

        fahrenheit: {
            name: "Fahrenheit"
        },

        kelvin: {
            name: "Kelvin"
        }

    }

};



function populateUnits() {

    const category =
        categoryInput.value;

    const categoryUnits =
        units[category];


    fromUnitInput.innerHTML = "";
    toUnitInput.innerHTML = "";


    Object.entries(categoryUnits).forEach(
        ([key, unit]) => {

            const fromOption =
                document.createElement("option");

            fromOption.value = key;
            fromOption.textContent = unit.name;

            fromUnitInput.appendChild(
                fromOption
            );


            const toOption =
                document.createElement("option");

            toOption.value = key;
            toOption.textContent = unit.name;

            toUnitInput.appendChild(
                toOption
            );

        }
    );


    // Set useful defaults

    if (category === "length") {

        fromUnitInput.value = "metre";
        toUnitInput.value = "kilometre";

    } else if (category === "weight") {

        fromUnitInput.value = "kilogram";
        toUnitInput.value = "pound";

    } else {

        fromUnitInput.value = "celsius";
        toUnitInput.value = "fahrenheit";

    }


    convertUnits();

}



function convertUnits() {

    const value =
        Number(fromValueInput.value);


    if (
        fromValueInput.value === "" ||
        !Number.isFinite(value)
    ) {

        toValueInput.value = "";
        conversionResult.textContent = "—";
        conversionDescription.textContent =
            "Enter a valid number.";

        return;
    }


    const category =
        categoryInput.value;

    const fromUnit =
        fromUnitInput.value;

    const toUnit =
        toUnitInput.value;


    let result;


    if (category === "temperature") {

        result =
            convertTemperature(
                value,
                fromUnit,
                toUnit
            );

    } else {

        const fromFactor =
            units[category][fromUnit].factor;

        const toFactor =
            units[category][toUnit].factor;


        // Convert to the base unit first

        const baseValue =
            value * fromFactor;


        // Convert from the base unit

        result =
            baseValue / toFactor;

    }


    const formattedResult =
        formatNumber(result);


    toValueInput.value =
        formattedResult;


    conversionResult.textContent =
        formattedResult;


    const fromName =
        units[category][fromUnit].name;

    const toName =
        units[category][toUnit].name;


    conversionDescription.textContent =
        `${formatNumber(value)} ${fromName} = ${formattedResult} ${toName}`;

}



function convertTemperature(
    value,
    from,
    to
) {

    let celsius;


    // Convert to Celsius

    if (from === "celsius") {

        celsius = value;

    } else if (from === "fahrenheit") {

        celsius =
            (value - 32) * 5 / 9;

    } else if (from === "kelvin") {

        celsius =
            value - 273.15;

    }


    // Convert Celsius to target

    if (to === "celsius") {

        return celsius;

    }

    if (to === "fahrenheit") {

        return (
            celsius * 9 / 5
        ) + 32;

    }

    if (to === "kelvin") {

        return celsius + 273.15;

    }

}



function formatNumber(number) {

    if (!Number.isFinite(number)) {
        return "—";
    }


    return new Intl.NumberFormat(
        "en-US",
        {
            maximumFractionDigits: 8
        }
    ).format(number);

}



categoryInput.addEventListener(
    "change",
    populateUnits
);

fromValueInput.addEventListener(
    "input",
    convertUnits
);

fromUnitInput.addEventListener(
    "change",
    convertUnits
);

toUnitInput.addEventListener(
    "change",
    convertUnits
);



populateUnits();