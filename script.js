document.addEventListener("DOMContentLoaded", function () {
    const inputData = document.getElementById("inputData");
    const findText = document.getElementById("findText");
    const replaceWith = document.getElementById("replaceWith");
    const replaceButton = document.getElementById("replaceButton");
    const outputText = document.getElementById("outputText");
    const copyButton = document.getElementById("copyButton");

    replaceButton.addEventListener("click", function () {
        const inputText = inputData.value;
        const textToFind = findText.value;
        const replacementText = replaceWith.value;

        if (inputText && textToFind && replacementText) {
            // Use regular expression with word boundary to replace only whole words
            const regex = new RegExp("\\b" + textToFind + "\\b", "g");
            const newText = inputText.replace(regex, replacementText);
            outputText.textContent = newText;
        } else {
            outputText.textContent = "Please fill in all fields.";
        }

        // Reset copy button text after each replace operation
        copyButton.textContent = "Copy";
    });

    copyButton.addEventListener("click", function () {
        const range = document.createRange();
        range.selectNode(outputText);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);

        try {
            // Attempt to copy the selected text to the clipboard
            document.execCommand("copy");
            window.getSelection().removeAllRanges();

            // Update the copy button text on successful copy
            copyButton.textContent = "Copied!";
        } catch (err) {
            console.error("Unable to copy text to clipboard.", err);
            copyButton.textContent = "Copy";
        }

        // Reset the copy button text after a short delay
        setTimeout(function () {
            copyButton.textContent = "Copy";
        }, 2000); // Reset after 2 seconds
    });
});
