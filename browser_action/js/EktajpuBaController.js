/**
 * Contact the content-script with a message.
 * @param message This message is passed to the content-script.
 */
function contactContentScript(message) {
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
/**
 * Functionality that runs when the on-button is clicked.
 */
function elEktajpuActivate() {
    contactContentScript("stop");
    activationListeners.toggleButtonInActive();
    document.querySelector("#ektajpuActivate").removeEventListener("click", elEktajpuActivate);
    activationKeysBrowserAction.setActivationKeyOff();
}
/**
 * Functionality that runs when the off-button is clicked.
 */
function elEktajpuInActivate() {
    contactContentScript("start");
    activationListeners.toggleButtonActive();
    document.querySelector("#ektajpuInActivate").removeEventListener("click", elEktajpuInActivate);
    activationKeysBrowserAction.setActivationKeyOn();
}
/**
 * Handles the buttons' actions.
 */
var ActivationListeners = (function () {
    function ActivationListeners() {
    }
    /**
     * Enables functionality and alters buttons.
     */
    ActivationListeners.prototype.toggleButtonActive = function () {
        document.querySelector("#ektajpuActivateBox").style.display = "block";
        document.querySelector("#ektajpuInActivateBox").style.display = "none";
        document.querySelector("#ektajpuActivate").addEventListener("click", elEktajpuActivate);
        chrome.browserAction.setBadgeText({ text: "" });
    };
    /**
     * Disables functionality and alters buttons.
     */
    ActivationListeners.prototype.toggleButtonInActive = function () {
        document.querySelector("#ektajpuActivateBox").style.display = "none";
        document.querySelector("#ektajpuInActivateBox").style.display = "block";
        document.querySelector("#ektajpuInActivate").addEventListener("click", elEktajpuInActivate);
        chrome.browserAction.setBadgeText({ text: "X" });
    };
    return ActivationListeners;
}());
/**
 * Check the chrome sync storage for value.
 */
var EktajpuStorage = (function () {
    function EktajpuStorage() {
    }
    /**
     * Checks and sets the chrome sync storage value.
     */
    EktajpuStorage.prototype.checkInitialState = function () {
        chrome.storage.sync.get("myKey", function (items) {
            if (typeof items === 'undefined') {
                activationKeysBrowserAction.setActivationKeyOn();
            }
            else {
                if (typeof items.myKey === 'undefined') {
                    activationKeysBrowserAction.setActivationKeyOn();
                }
                else {
                    if (items.myKey.val == "on") {
                        activationListeners.toggleButtonActive();
                    }
                    if (items.myKey.val == "off") {
                        activationListeners.toggleButtonInActive();
                    }
                }
            }
        });
    };
    return EktajpuStorage;
}());
/**
 * This stores whether the functionality is on or off,
 * in the chrome sync storage.
 */
var ActivationKeysBrowserAction = (function () {
    function ActivationKeysBrowserAction() {
    }
    /**
     * Sets to on in the chrome sync storage.
     */
    ActivationKeysBrowserAction.prototype.setActivationKeyOn = function () {
        var save = {};
        save["myKey"] = {
            'val': "on"
        };
        chrome.storage.sync.set(save, function () {
        });
        // turn on event listeners for toggle button
        activationListeners.toggleButtonActive();
    };
    /**
     * Sets to off in the chrome sync storage.
     */
    ActivationKeysBrowserAction.prototype.setActivationKeyOff = function () {
        var save = {};
        save["myKey"] = {
            'val': "off"
        };
        chrome.storage.sync.set(save, function () {
        });
        activationListeners.toggleButtonInActive();
    };
    return ActivationKeysBrowserAction;
}());
// object that toggles the variable in storage
var activationKeysBrowserAction = new ActivationKeysBrowserAction();
// object that works with the button listeners
var activationListeners = new ActivationListeners();
// check storage and activate buttons
var ektajpuStorage = new EktajpuStorage();
ektajpuStorage.checkInitialState();
// - - - - - Localization Below for HTML
/**
 * Using localizations in the browser action.
 * Main code source: http://stackoverflow.com/questions/25467009/internationalization-of-html-pages-for-my-google-chrome-extension
 */
var LocalizeIt = (function () {
    function LocalizeIt() {
    }
    /**
     * This replaces text with localizations.
     * @param obj HTML element
     * @param tag HTML tag to replace
     */
    LocalizeIt.prototype.replace_i18n = function (obj, tag) {
        var msg = tag.replace(/__MSG_(\w+)__/g, function (match, v1) {
            return v1 ? chrome.i18n.getMessage(v1) : '';
        });
        if (msg != tag)
            obj.innerHTML = msg;
    };
    /**
     * This searches the html document to localize.
     */
    LocalizeIt.prototype.localizeHtmlPage = function () {
        // Localize using __MSG_***__ data tags
        var data = document.querySelectorAll('[data-localize]');
        for (var i in data) {
            if (data.hasOwnProperty(i)) {
                var obj = data[i];
                var tag = obj.getAttribute('data-localize').toString();
                this.replace_i18n(obj, tag);
            }
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
