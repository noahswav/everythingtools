const priceInput = document.getElementById("price");
const discountInput = document.getElementById("discount");

const finalPrice = document.getElementById("final-price");
const savings = document.getElementById("savings");


function calculateDiscount() {

    const price = Number(priceInput.value);
    const discount = Number(discountInput.value);


    // Check the inputs

    if (
        priceInput.value === "" ||
        discountInput.value === "" ||
        !Number.isFinite(price) ||
        !Number.isFinite(discount) ||
        price < 0 ||
        discount < 0 ||
        discount > 100
    ) {

        finalPrice.textContent = "—";

        savings.textContent =
            "Enter a price and a discount between 0% and 100%.";

        return;
    }


    // Calculate the amount saved

    const amountSaved =
        price * (discount / 100);


    // Calculate the final price

    const salePrice =
        price - amountSaved;


    // Display results

    finalPrice.textContent =
        formatMoney(salePrice);


    savings.textContent =
        `You save ${formatMoney(amountSaved)}`;

}


function formatMoney(number) {

    return new Intl.NumberFormat("en-US", {

        style: "currency",

        currency: "USD",

        minimumFractionDigits: 2,

        maximumFractionDigits: 2

    }).format(number);

}


// Update instantly when typing

priceInput.addEventListener(
    "input",
    calculateDiscount
);

discountInput.addEventListener(
    "input",
    calculateDiscount
);


// Run when page loads

calculateDiscount();