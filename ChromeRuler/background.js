var Tabclicked = false;
disableBrowserAction();

function disableBrowserAction(tabId) {
  chrome.tabs.executeScript(tabId, { file: "CloseRuler.js" }, function () {
    console.log("ruler disabled");
  });
}

function enableBrowserAction(tabId) {
  chrome.tabs.executeScript(tabId, { file: "Ruler.js" }, function () {
    console.log("Ruler active");
  });
}

function updateState() {
  if (Tabclicked == false) {
    Tabclicked = true;
    enableBrowserAction();
  } else {
    Tabclicked = false;
    disableBrowserAction();
  }
}

//chrome.pageAction.onClicked.addListener(updateState);

chrome.browserAction.onClicked.addListener(function (tabId) {
  updateState(tabId);
});
