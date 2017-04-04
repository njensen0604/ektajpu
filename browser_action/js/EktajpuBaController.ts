// contact the content script with a message
function contactContentScript(message: string) {
    chrome.tabs.query({
        currentWindow: true,
        active: true
    }, function (tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {
            "message": message
        });
    });
}

// the function that runs when the on button is clicked
function elEktajpuActivate() {

    contactContentScript("stop");
    activationListeners.toggleButtonInActive();
    document.querySelector("#ektajpuActivate").removeEventListener("click", elEktajpuActivate);
    activationKeys.setActivationKeyOff();

}

// the function that runs when the off button is clicked
function elEktajpuInActivate() {

    contactContentScript("start");
    activationListeners.toggleButtonActive();
    document.querySelector("#ektajpuInActivate").removeEventListener("click", elEktajpuInActivate);
    activationKeys.setActivationKeyOn();

}

// object that toggles the buttons
class ActivationListeners {

    toggleButtonActive() {

        document.querySelector("#ektajpuActivateBox").style.display = "block";
        document.querySelector("#ektajpuInActivateBox").style.display = "none";

        document.querySelector("#ektajpuActivate").addEventListener("click", elEktajpuActivate);

    }

    toggleButtonInActive() {

        document.querySelector("#ektajpuActivateBox").style.display = "none";
        document.querySelector("#ektajpuInActivateBox").style.display = "block";

        document.querySelector("#ektajpuInActivate").addEventListener("click", elEktajpuInActivate);

    }

}

// object that checks the storage
class EktajpuStorage {

    checkInitialState() {

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
                        // console.log("- - items.myKey.val == on");

                        // turn on event listeners for toggle button
                        activationListeners.toggleButtonActive();

                        // tell content script to start
                        // contactContentScript("start");

                    };
                    if (items.myKey.val == "off") {
                        // console.log("- - items.myKey.val == off");
                        // turn on event listeners for toggle button
                        activationListeners.toggleButtonInActive();
                    };

                };

            };

        });

    }

}

// object that sets the storage key value
class ActivationKeys {

    setActivationKeyOn() {

        var save = {};
        save["myKey"] = {
            'val': "on"
        };
        chrome.storage.sync.set(save, function () {});

        // turn on event listeners for toggle button
        activationListeners.toggleButtonActive();

    }

    setActivationKeyOff() {

        var save = {};
        save["myKey"] = {
            'val': "off"
        };
        chrome.storage.sync.set(save, function () {});

        activationListeners.toggleButtonInActive();

    }

}

// object that toggles the variale in storage
var activationKeys = new ActivationKeys();

// object that works with the button listeners
var activationListeners = new ActivationListeners();

// check storage and activate buttons
var ektajpuStorage = new EktajpuStorage();
ektajpuStorage.checkInitialState();




// - - - - - Localization Below for HTML

// main code source: http://stackoverflow.com/questions/25467009/internationalization-of-html-pages-for-my-google-chrome-extension

class LocalizeIt {


    replace_i18n(obj, tag) {
        let msg = tag.replace(/__MSG_(\w+)__/g, function (match, v1) {
            return v1 ? chrome.i18n.getMessage(v1) : '';
        });

        if (msg != tag) obj.innerHTML = msg;
    }

    localizeHtmlPage() {
        // Localize using __MSG_***__ data tags
        var data = document.querySelectorAll('[data-localize]');

        for (let i in data)
            if (data.hasOwnProperty(i)) {
                let obj = data[i];
                let tag = obj.getAttribute('data-localize').toString();

                this.replace_i18n(obj, tag);
            }

        // Localize everything else by replacing all __MSG_***__ tags
        var page = document.getElementsByTagName('html');

        for (let j = 0; j < page.length; j++) {
            let obj = page[j];
            let tag = obj.innerHTML.toString();

            this.replace_i18n(obj, tag);
        }
    }


}

// initialize the localization
var localizeIt = new LocalizeIt();
localizeIt.localizeHtmlPage();