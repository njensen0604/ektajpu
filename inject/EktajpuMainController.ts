console.log("Welcome, Ektajpu loaded.");

// check the storage for keys
chrome.storage.sync.get("myKey", function (items) {

    if (typeof items === 'undefined') {
        // console.log("- inital state: items === 'undefined'");
        activationKeys.setActivationKeyOn();
    } else {
        // console.log("- inital state: items !== 'undefined'");

        if (typeof items.myKey === 'undefined') {
            // console.log("- - inital state: items.myKey === 'undefined'");
            activationKeys.setActivationKeyOn();
        } else {

            // console.log("- - inital state: items.myKey !== 'undefined'");
            // console.log("items.myKey.val: " + items.myKey.val);

            if (items.myKey.val == "on") {
                ektajpuStartStop.start();
            };
            // if (items.myKey.val == "off") { };

        };

    };

});

// object that sets the storage key value
class ActivationKeys {

    setActivationKeyOn() {

        var save = {};
        save["myKey"] = {
            'val': "on"
        };
        chrome.storage.sync.set(save, function () {});

        // tell content script to start
        ektajpuStartStop.start();

    }

}

class EktajpuStartStop {

    // object for checking input text
    private checkInput = new EktajpuCheckInput();

    start() {
        // console.log("EktajpuStartStop start");
        console.log("Ektajpu started.");
        this.checkInput.check();
        document.addEventListener("keyup", ektajpuStartStop.elKeyUp);
    }

    stop() {
        // console.log("EktajpuStartStop stop");
        console.log("Ektajpu stopped.");
        document.removeEventListener("keyup", ektajpuStartStop.elKeyUp);
    }

    elKeyUp() {
        ektajpuStartStop.checkInput.check();
    }

}

var ektajpuStartStop = new EktajpuStartStop();

var activationKeys = new ActivationKeys();