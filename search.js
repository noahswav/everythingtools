// =========================================================
// EVERYTHINGTOOLS - TOOL SEARCH
// =========================================================


// Get the search input
const searchInput = document.getElementById("tool-search");


// Get all tool cards
const toolCards = document.querySelectorAll(".tool-card");


// Get the "no results" message
const noResults = document.getElementById("no-results");


// Search function
function searchTools() {

    // Get what the user typed
    const searchTerm = searchInput.value
        .toLowerCase()
        .trim();


    // Keep track of how many tools are visible
    let visibleTools = 0;


    // Check every tool
    toolCards.forEach(function(card) {

        // Get all the text inside the card
        const toolText = card.textContent
            .toLowerCase();


        // Show the card if it matches the search
        if (toolText.includes(searchTerm)) {

            card.style.display = "";

            visibleTools++;

        }

        // Otherwise hide it
        else {

            card.style.display = "none";

        }

    });


    // Show "no results" if nothing matched
    if (visibleTools === 0) {

        noResults.style.display = "block";

    }

    else {

        noResults.style.display = "none";

    }

}


// Run the search whenever the user types
searchInput.addEventListener(
    "input",
    searchTools
);