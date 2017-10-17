// test for sites that are incompatible
// Skipping Facebook
if (!/^(?:(?:http|https):\/\/)?(?:www.)?facebook.com\/?/i.test(window.location.host)) {

    /**
     * Listens for messages from the browser-action (popup).
     */
    chrome.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {
            if (request.message === "start") {
                ektajpuStartStop.start();
            }
            if (request.message === "stop") {
                ektajpuStartStop.stop();
            }
        }
    );

}