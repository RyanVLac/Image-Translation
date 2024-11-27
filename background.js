chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.action === 'startOffscreen' && message.imageUrl) {
    await ensureOffscreenDocument();
    // Forward the message to the offscreen document
    chrome.runtime.sendMessage(message);
  }
  return true;
});

async function ensureOffscreenDocument() {
  const existingOffscreen = await chrome.offscreen.hasDocument();
  if (existingOffscreen) return;

  await chrome.offscreen.createDocument({
    url: 'offscreen.html',
    reasons: ['BLOBS'],
    justification: 'Process image using Tesseract.js in an offscreen document',
  });
}
