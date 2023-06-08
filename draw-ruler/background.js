let pageWidth = window.innerWidth;
let pageHeight = window.innerHeight;

let clicked = false;

let x = 0,
  y = 0;

let boxcss = "";
let labelcss = "";

let tabClicked = false;

function disableBrowserAction(tabId) {
  chrome.tabs.executeScript(tabId, { file: "CloseRuler.js" });
}

function enableBrowserAction(tabId) {
  chrome.tabs.executeScript(tabId, { file: "Ruler.js" });
}

function updateState(tabId) {
  if (!tabClicked) {
    tabClicked = true;
    enableBrowserAction(tabId);
  } else {
    tabClicked = false;
    disableBrowserAction(tabId);
  }
}

if (chrome.browserAction) {
  chrome.browserAction.onClicked.addListener((tab) => {
    updateState(tab.id);
  });
}
