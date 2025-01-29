document.getElementById("transparentCanvas").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: () => {
        import(chrome.runtime.getURL("app/src/core/App.js"))
          .then((module) => {
            const app = new module.App();
            window.app = app;
            console.log("App initialized dynamically:", app);
          })
          .catch((error) => console.error("Error loading module:", error));
      }
    });
  });
});


/*
import { App } from "./app/src/core/App.js";
const app = new App();
window.app = app;
*/


