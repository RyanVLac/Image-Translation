document.getElementById("saveApiKey").addEventListener("click", () => {
    const apiKey = document.getElementById("apiKey").value;
    chrome.storage.local.set({ apiKey }, () => {
        document.getElementById('message').innerText = "API Key saved!";
    });
  });
  
document.getElementById("startButton").addEventListener("click", () => {
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "start" });
});
});
  