chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "start") {
    console.log("Message received: start");
    alert("Please select an image on the website.");

    document.addEventListener(
      "click",
      (event) => {
        if (event.target.tagName === "IMG") {
          event.preventDefault();
          event.stopPropagation();

          if (window.selectedImage) {
            window.selectedImage.style.border = "";
          }

          window.selectedImage = event.target;
          window.selectedImage.style.border = "2px solid red";

          console.log("Red outline added to the selected image.");

          const imgSrc = window.selectedImage.src;
          chrome.runtime.sendMessage({ action: "processImage", imageUrl: imgSrc });
          console.log(`Image sent for processing: ${imgSrc}`);
        }
      },
      { once: true } 
    );
  } else if (message.action === "imageProcessed") {
    console.log("Processed image result received:", message.result);
    const resultBox = document.createElement("div");
    resultBox.innerText = `Processed Text: ${message.result}`;
    resultBox.style.position = "fixed";
    resultBox.style.top = "10px";
    resultBox.style.right = "10px";
    resultBox.style.backgroundColor = "white";
    resultBox.style.padding = "10px";
    resultBox.style.border = "1px solid black";
    resultBox.style.zIndex = "10000";
    document.body.appendChild(resultBox);
  }
});
