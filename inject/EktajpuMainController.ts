console.log("Welcome, Ektajpu loaded.");

/**
 * Check the chrome sync storage for value.
 */
chrome.storage.sync.get("myKey", function (items) {
    if (typeof items === 'undefined') {
        activationKeys.setActivationKeyOn();
    } else {
        if (typeof items.myKey === 'undefined') {
            activationKeys.setActivationKeyOn();
        } else {
            if (items.myKey.val == "on") {
                ektajpuStartStop.start();
            };
        };
    };
});

/**
 * Sets the chrome sync storage key value.
 */
class ActivationKeys {

    /**
     * Sets the chrome sync storage key value.
     */
    setActivationKeyOn() {
        var save = {};
        save["myKey"] = {
            'val': "on"
        };
        chrome.storage.sync.set(save, function () {});
        ektajpuStartStop.start();
    }
}

/**
 * Toggles the listener for user typing.
 */
class EktajpuStartStop {

    private checkInput = new EktajpuCheckInput();

    /**
     * Starts the listener for user typing.
     */
    start() {
        console.log("Ektajpu started.");
        this.checkInput.check();
        document.addEventListener("keyup", ektajpuStartStop.elKeyUp);
    }

    /**
     * Stops the listener for user typing.
     */
    stop() {
        console.log("Ektajpu stopped.");
        document.removeEventListener("keyup", ektajpuStartStop.elKeyUp);
    }

    /**
     * Runs a check on the text.
     */
    elKeyUp() {
        ektajpuStartStop.checkInput.check();
    }

}

var ektajpuStartStop = new EktajpuStartStop(),
    activationKeys = new ActivationKeys();