const textInput = document.getElementById("text-input");

const wordCount = document.getElementById("word-count");
const characterCount = document.getElementById("character-count");
const characterNoSpaces = document.getElementById("character-no-spaces");
const sentenceCount = document.getElementById("sentence-count");
const paragraphCount = document.getElementById("paragraph-count");


function updateCounter() {

    const text = textInput.value;


    // Characters

    characterCount.textContent =
        text.length;


    // Characters without spaces

    characterNoSpaces.textContent =
        text.replace(/\s/g, "").length;


    // Words

    const trimmedText =
        text.trim();

    const words =
        trimmedText === ""
            ? []
            : trimmedText.split(/\s+/);

    wordCount.textContent =
        words.length;


    // Sentences

    const sentences =
        trimmedText === ""
            ? []
            : trimmedText
                .split(/[.!?]+/)
                .filter(sentence => sentence.trim() !== "");

    sentenceCount.textContent =
        sentences.length;


    // Paragraphs

    const paragraphs =
        trimmedText === ""
            ? []
            : trimmedText
                .split(/\n\s*\n/)
                .filter(paragraph => paragraph.trim() !== "");

    paragraphCount.textContent =
        paragraphs.length;

}


textInput.addEventListener(
    "input",
    updateCounter
);


updateCounter();