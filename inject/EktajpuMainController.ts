console.log("Welcome, Ektajpu loaded.");

// check the storage for keys
window.onload = function () {

    chrome.storage.sync.get("myKey", function (items) {

        if (typeof items === 'undefined') {
            // console.log("- inital state: items === 'undefined'");
        } else {
            // console.log("- inital state: items !== 'undefined'");

            if (typeof items.myKey === 'undefined') {
                // console.log("- - inital state: items.myKey === 'undefined'");
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

}

class EktajpuStartStop {

    // object for checking input text
    private checkInput = new EktajpuCheckInput();

    start() {
        console.log("Ektajpu started.");
        this.checkInput.check();
        document.addEventListener("keyup", ektajpuStartStop.elKeyUp);
    }

    stop() {
        console.log("Ektajpu stopped.");
        document.removeEventListener("keyup", ektajpuStartStop.elKeyUp);
    }

    elKeyUp() {
        ektajpuStartStop.checkInput.check();
    }

}

var ektajpuStartStop = new EktajpuStartStop();