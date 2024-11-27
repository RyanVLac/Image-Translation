import Tesseract from 'tesseract.js';

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.action === 'startOffscreen' && message.imageUrl) {
    try {
      console.log(`Processing image: ${message.imageUrl}`);

      // Set up Tesseract options with local paths
      const tesseractOptions = {
        logger: m => console.log(m),
        workerPath: chrome.runtime.getURL('tesseract/worker.min.js'),
        corePath: chrome.runtime.getURL('tesseract/tesseract-core.wasm.js'),
      };

      // Perform OCR using Tesseract
      Tesseract.recognize(
        message.imageUrl,
        'eng', // Specify language(s) here
        tesseractOptions
      )
        .then(({ data: { text } }) => {
          console.log('Extracted text:', text);
          // Send the text back to the background script or content script
          chrome.runtime.sendMessage({ action: 'displayText', text });
        })
        .catch(err => {
          console.error('OCR error:', err);
        });
    } catch (error) {
      console.error('Error processing image with Tesseract:', error);
    }
  }
});
