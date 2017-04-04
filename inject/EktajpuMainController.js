console.log("Welcome, Ektajpu loaded.");
// check the storage for keys
chrome.storage.sync.get("myKey", function (items) {
    if (typeof items === 'undefined') {
        // console.log("- inital state: items === 'undefined'");
        activationKeys.setActivationKeyOn();
    }
    else {
        // console.log("- inital state: items !== 'undefined'");
        if (typeof items.myKey === 'undefined') {
            // console.log("- - inital state: items.myKey === 'undefined'");
            activationKeys.setActivationKeyOn();
        }
        else {
            // console.log("- - inital state: items.myKey !== 'undefined'");
            // console.log("items.myKey.val: " + items.myKey.val);
            if (items.myKey.val == "on") {
                ektajpuStartStop.start();
            }
            ;
            // if (items.myKey.val == "off") { };
        }
        ;
    }
    ;
});
// object that sets the storage key value
var ActivationKeys = (function () {
    function ActivationKeys() {
    }
    ActivationKeys.prototype.setActivationKeyOn = function () {
        var save = {};
        save["myKey"] = {
            'val': "on"
        };
        chrome.storage.sync.set(save, function () { });
        // tell content script to start
        ektajpuStartStop.start();
    };
    return ActivationKeys;
}());
var EktajpuStartStop = (function () {
    function EktajpuStartStop() {
        // object for checking input text
        this.checkInput = new EktajpuCheckInput();
    }
    EktajpuStartStop.prototype.start = function () {
        // console.log("EktajpuStartStop start");
        console.log("Ektajpu started.");
        this.checkInput.check();
        document.addEventListener("keyup", ektajpuStartStop.elKeyUp);
    };
    EktajpuStartStop.prototype.stop = function () {
        // console.log("EktajpuStartStop stop");
        console.log("Ektajpu stopped.");
        document.removeEventListener("keyup", ektajpuStartStop.elKeyUp);
    };
    EktajpuStartStop.prototype.elKeyUp = function () {
        ektajpuStartStop.checkInput.check();
    };
    return EktajpuStartStop;
}());
var ektajpuStartStop = new EktajpuStartStop();
var activationKeys = new ActivationKeys();
//# sourceMappingURL=EktajpuMainController.js.map