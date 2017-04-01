// this watches for messages from the popup
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.message === "start") {
        ektajpuStartStop.start();
    }
    if (request.message === "stop") {
        ektajpuStartStop.stop();
    }
});
//# sourceMappingURL=EktajpuMessageWatch.js.map