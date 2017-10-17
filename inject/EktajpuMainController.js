/**
 * Sets the chrome sync storage key value.
 */
var ActivationKeys = (function () {
    function ActivationKeys() {
    }
    /**
     * Sets the chrome sync storage key value.
     */
    ActivationKeys.prototype.setActivationKeyOn = function () {
        var save = {};
        save["myKey"] = {
            'val': "on"
        };
        chrome.storage.sync.set(save, function () {
        });
        ektajpuStartStop.start();
    };
    return ActivationKeys;
}());
/**
 * Toggles the listener for user typing.
 */
var EktajpuStartStop = (function () {
    function EktajpuStartStop() {
        this.checkInput = new EktajpuCheckInput();
    }
    /**
     * Starts the listener for user typing.
     */
    EktajpuStartStop.prototype.start = function () {
        console.log("Ektajpu started.");
        this.checkInput.check();
        document.addEventListener("keyup", ektajpuStartStop.elKeyUp);
    };
    /**
     * Stops the listener for user typing.
     */
    EktajpuStartStop.prototype.stop = function () {
        console.log("Ektajpu stopped.");
        document.removeEventListener("keyup", ektajpuStartStop.elKeyUp);
    };
    /**
     * Runs a check on the text.
     */
    EktajpuStartStop.prototype.elKeyUp = function () {
        ektajpuStartStop.checkInput.check();
    };
    return EktajpuStartStop;
}());
// test for sites that are incompatible
// Skipping Facebook
if (!/^(?:(?:http|https):\/\/)?(?:www.)?facebook.com\/?/i.test(window.location.host)) {
    console.log("naaj 1");
    var ektajpuStartStop = new EktajpuStartStop(), activationKeys = new ActivationKeys();
    console.log("Welcome, Ektajpu loaded.");
    /**
     * Check the chrome sync storage for value.
     */
    chrome.storage.sync.get("myKey", function (items) {
        if (typeof items === 'undefined') {
            activationKeys.setActivationKeyOn();
        }
        else {
            if (typeof items.myKey === 'undefined') {
                activationKeys.setActivationKeyOn();
            }
            else {
                if (items.myKey.val == "on") {
                    ektajpuStartStop.start();
                }
            }
        }
    });
}
//# sourceMappingURL=EktajpuMainController.js.map