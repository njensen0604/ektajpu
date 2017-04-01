console.log("Welcome, Ektajpu loaded.");
// check the storage for keys
window.onload = function () {
    chrome.storage.sync.get("myKey", function (items) {
        if (typeof items === 'undefined') {
            // console.log("- inital state: items === 'undefined'");
        }
        else {
            // console.log("- inital state: items !== 'undefined'");
            if (typeof items.myKey === 'undefined') {
                // console.log("- - inital state: items.myKey === 'undefined'");
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
};
var EktajpuStartStop = (function () {
    function EktajpuStartStop() {
        // object for checking input text
        this.checkInput = new EktajpuCheckInput();
    }
    EktajpuStartStop.prototype.start = function () {
        console.log("Ektajpu started.");
        this.checkInput.check();
        document.addEventListener("keyup", ektajpuStartStop.elKeyUp);
    };
    EktajpuStartStop.prototype.stop = function () {
        console.log("Ektajpu stopped.");
        document.removeEventListener("keyup", ektajpuStartStop.elKeyUp);
    };
    EktajpuStartStop.prototype.elKeyUp = function () {
        ektajpuStartStop.checkInput.check();
    };
    return EktajpuStartStop;
}());
var ektajpuStartStop = new EktajpuStartStop();
//# sourceMappingURL=EktajpuMainController.js.map