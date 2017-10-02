/**
 * Listen for messages from the inject scripts' tab.
 */
chrome.extension.onMessage.addListener(
    function (request, sender, sendResponse) {
        chrome.pageAction.show(sender.tab.id);
        sendResponse();
    });


/**
 * Check the chrome sync storage for value.
 */
chrome.storage.sync.get("myKey", function (items) {
    if (typeof items === 'undefined') {
        chrome.browserAction.setBadgeText({text: ""});
    } else {
        if (typeof items.myKey === 'undefined') {
            chrome.browserAction.setBadgeText({text: ""});
        } else {
            if (items.myKey.val == "on") {
                chrome.browserAction.setBadgeText({text: ""});
            }
            if (items.myKey.val == "off") {
                chrome.browserAction.setBadgeText({text: "X"});
                chrome.browserAction.setBadgeBackgroundColor({color: "#ff4d4d"});
            }
        }
    }
});

