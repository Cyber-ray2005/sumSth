const textArea = document.getElementById("formText");
const submitButton = document.getElementById("submitButton");

submitButton.disabled = true;

function verifyTextLength(e) {
    // The e.target property gives us the HTML element that triggered the event, which in this case is the textarea. We save this to a variable called 'textarea'
    const textarea = e.target;
    
    // Verify the TextArea value.
    if (textarea.value.length > 200 && textarea.value.length < 100000) {
        // Enable the button when text area has value.
        submitButton.disabled = false;
    } else {
        // Disable the button when text area is empty.
        submitButton.disabled = true;
    }
    }
    
    const spinner = document.getElementById("spinner");
    async function submitData(e) {
        // Show the spinner
        spinner.style.display = "inline-block"; // Show spinner
    
        // Prevent default form submission to allow for loading
        e.preventDefault();
    
        // Submit the form manually
        const form = document.getElementById("summarizerForm");
        form.submit(); // This will submit the form normally to the server
    
        // The spinner will remain visible while waiting for the server response
        // If the response takes too long, you might consider adding a timeout or loading message
    }

textArea.addEventListener("input", verifyTextLength);
submitButton.addEventListener("click", submitData);

