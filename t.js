const inputText = document.getElementById('inputText');
const targetLanguage = document.getElementById('targetLanguage');
const translateBtn = document.getElementById('translateBtn');
const outputText = document.getElementById('outputText');



const googleTranslateApiUrl = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&dt=t&q=';

translateBtn.addEventListener('click', () => {
    const textToTranslate = inputText.value.trim();
    const langCode = targetLanguage.value;

    if (textToTranslate) {
        const translationUrl = `${googleTranslateApiUrl}${encodeURIComponent(textToTranslate)}&tl=${langCode}`;

        fetch(translationUrl)
            .then(response => response.json())
            .then(data => {
                if (data && data[0] && data[0][0] && data[0][0][0]) {
                    outputText.value = data[0][0][0];
                } else {
                    outputText.value = "Translation failed.";
                }
            })
            .catch(error => {
                console.error("Error during translation:", error);
                outputText.value = "An error occurred during translation.";
            });
    } else {
        outputText.value = "";
    }
});