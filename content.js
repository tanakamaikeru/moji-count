document.addEventListener("mouseup", function (event) {
    // Ensure that there is a selection and it is not just whitespace
    let selectedText = window.getSelection().toString();
    console.log("mousUp!!!!");
    if (selectedText.length > 0) {
        // Send the selected text to the background script for processing
        chrome.runtime.sendMessage({ action: "getSelectedText", text: selectedText });
    }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "countMoji") {
        // Ensure that the text is defined and has a valid length
        if (request.text && request.text.length >= 0) {
            displayMojiCount(request.text.length);
        }
    }
});

function displayMojiCount(count) {
    // Ensure that the counterDiv exists or create it if it does not
    let counterDiv = document.getElementById("moji-counter");

    if (!counterDiv) {
        counterDiv = document.createElement("div");
        counterDiv.id = "moji-counter";
        document.body.appendChild(counterDiv);
    }

    // Update the text content of the counterDiv
    counterDiv.textContent = `Moji: ${count}`;
    counterDiv.style.display = "block";

    // Hide the counter after a few seconds
    setTimeout(() => {
        counterDiv.style.display = "none";
    }, 3000);
}
