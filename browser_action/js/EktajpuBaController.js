// contact the content script with a message
function contactContentScript(message) {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, { "message": message });
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
var ActivationListeners = (function () {
    function ActivationListeners() {
    }
    ActivationListeners.prototype.toggleButtonActive = function () {
        document.querySelector("#ektajpuActivateBox").style.display = "block";
        document.querySelector("#ektajpuInActivateBox").style.display = "none";
        document.querySelector("#ektajpuActivate").addEventListener("click", elEktajpuActivate);
    };
    ActivationListeners.prototype.toggleButtonInActive = function () {
        document.querySelector("#ektajpuActivateBox").style.display = "none";
        document.querySelector("#ektajpuInActivateBox").style.display = "block";
        document.querySelector("#ektajpuInActivate").addEventListener("click", elEktajpuInActivate);
    };
    return ActivationListeners;
}());
// object that checks the storage
var EktajpuStorage = (function () {
    function EktajpuStorage() {
    }
    EktajpuStorage.prototype.checkInitialState = function () {
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
                        activationListeners.toggleButtonActive();
                    }
                    ;
                    if (items.myKey.val == "off") {
                        activationListeners.toggleButtonInActive();
                    }
                    ;
                }
                ;
            }
            ;
        });
    };
    return EktajpuStorage;
}());
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
        activationListeners.toggleButtonActive();
    };
    ActivationKeys.prototype.setActivationKeyOff = function () {
        var save = {};
        save["myKey"] = {
            'val': "off"
        };
        chrome.storage.sync.set(save, function () { });
        activationListeners.toggleButtonInActive();
    };
    return ActivationKeys;
}());
// object that toggles the variale in storage
var activationKeys = new ActivationKeys();
// object that works with the button listeners
var activationListeners = new ActivationListeners();
// check storage and activate buttons
var ektajpuStorage = new EktajpuStorage();
ektajpuStorage.checkInitialState();
// - - - - - Localization Below for HTML
// main code source: http://stackoverflow.com/questions/25467009/internationalization-of-html-pages-for-my-google-chrome-extension
var LocalizeIt = (function () {
    function LocalizeIt() {
    }
    LocalizeIt.prototype.replace_i18n = function (obj, tag) {
        var msg = tag.replace(/__MSG_(\w+)__/g, function (match, v1) {
            return v1 ? chrome.i18n.getMessage(v1) : '';
        });
        if (msg != tag)
            obj.innerHTML = msg;
    };
    LocalizeIt.prototype.localizeHtmlPage = function () {
        // Localize using __MSG_***__ data tags
        var data = document.querySelectorAll('[data-localize]');
        for (var i in data)
            if (data.hasOwnProperty(i)) {
                var obj = data[i];
                var tag = obj.getAttribute('data-localize').toString();
                this.replace_i18n(obj, tag);
            }
        // Localize everything else by replacing all __MSG_***__ tags
        var page = document.getElementsByTagName('html');
        for (var j = 0; j < page.length; j++) {
            var obj = page[j];
            var tag = obj.innerHTML.toString();
            this.replace_i18n(obj, tag);
        }
    };
    return LocalizeIt;
}());
// initialize the localization
var localizeIt = new LocalizeIt();
localizeIt.localizeHtmlPage();
//# sourceMappingURL=EktajpuBaController.js.map