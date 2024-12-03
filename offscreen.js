import Tesseract from 'tesseract.js';

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.action === 'startOffscreen' && message.imageUrl) {
    try {
      console.log(`Processing image: ${message.imageUrl}`);

      const tesseractOptions = {
        logger: m => console.log(m),
        workerPath: chrome.runtime.getURL('tesseract/worker.min.js'),
        corePath: chrome.runtime.getURL('tesseract/tesseract-core.wasm.js'),
      };

      Tesseract.recognize(
        message.imageUrl,
        'eng', 
        tesseractOptions
      )
        .then(({ data: { text } }) => {
          console.log('Extracted text:', text);
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
