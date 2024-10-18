const textArea = document.getElementById("formText");
const inputText = document.getElementById("queryText");
const submitButton = document.getElementById("submitButton");
const spinner = document.getElementById("spinner");

// Disable submit button initially, if present
if (submitButton) {
    submitButton.disabled = true;
}

// Function to verify the length of input based on the element
function verifyTextLength(e) {
    console.log("Came here");
    const textarea = e.target;
    let minLength;

    // Check if it's the textArea or inputText, and set appropriate min length
    if (textarea.id === "formText") {
        minLength = 200; // Minimum 200 characters for formText
    } else if (textarea.id === "queryText") {
        minLength = 2; // Minimum 30 characters for queryText
    }

    // Enable or disable the submit button based on the text length
    if (textarea.value.length >= minLength && textarea.value.length < 100000) {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }
}

// Function to handle form submission
async function submitData(e) {
    // Prevent the default form submission
    e.preventDefault();

    // Show the spinner, if present
    if (spinner) {
        spinner.style.display = "inline-block";
    }

    // Submit the form manually
    const form = document.getElementById("summarizerForm");
    if (form) {
        form.submit(); // Submits the form to the server
    }
}

// Attach event listeners if the elements exist
if (textArea) {
    textArea.addEventListener("input", verifyTextLength);
}

if (inputText) {
    inputText.addEventListener("input", verifyTextLength);
}

if (submitButton) {
    submitButton.addEventListener("click", submitData);
}
