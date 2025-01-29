chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "capture_screenshot") {
    chrome.tabs.captureVisibleTab(null, { format: "png" }, (dataUrl) => {
      sendResponse(dataUrl);
    });
    return true; // Keep the message channel open for async response
  }
});
