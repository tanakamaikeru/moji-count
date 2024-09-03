chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getSelectedText") {
        chrome.tabs.sendMessage(sender.tab.id, { action: "countMoji", text: request.text });
    }
});
