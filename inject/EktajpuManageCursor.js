/**
 * This gets / sets the cursor position in TEXTAREA, INPUT, and 'contenteditable' DIVs
 */
var EktajpuManageCursor = (function () {
    function EktajpuManageCursor() {
    }
    /**
     * Get the cursor position on a focused element.
     * @param {Element} Element to check
     * @return {number} The position of the element
     */
    EktajpuManageCursor.prototype.getPosition = function (htmlElement) {
        if (htmlElement !== undefined && htmlElement !== null) {
            if (htmlElement.tagName == "TEXTAREA" || htmlElement.tagName == "INPUT")
                return htmlElement.selectionStart;
            if (htmlElement.tagName == "DIV") {
                // code sources:
                // https://stackoverflow.com/questions/4811822/get-a-ranges-start-and-end-offsets-relative-to-its-parent-container/4812022#4812022
                // https://jsfiddle.net/TjXEG/900/
                var caretOffset = 0;
                var doc = htmlElement.ownerDocument || htmlElement.document;
                var win = doc.defaultView || doc.parentWindow;
                var sel;
                if (typeof win.getSelection != "undefined") {
                    sel = win.getSelection();
                    if (sel.rangeCount > 0) {
                        var range = win.getSelection().getRangeAt(0);
                        var preCaretRange = range.cloneRange();
                        preCaretRange.selectNodeContents(htmlElement);
                        preCaretRange.setEnd(range.endContainer, range.endOffset);
                        caretOffset = preCaretRange.toString().length;
                    }
                }
                else if ((sel = doc.selection) && sel.type != "Control") {
                    var textRange = sel.createRange();
                    var preCaretTextRange = doc.body.createTextRange();
                    preCaretTextRange.moveToElementText(htmlElement);
                    preCaretTextRange.setEndPoint("EndToEnd", textRange);
                    caretOffset = preCaretTextRange.text.length;
                }
                return caretOffset;
            }
        }
        return -1;
    };
    /**
     * This will place the cursor at the specified location.
     * @param {Element} Element in which the cursor will be set
     * @param {number} New position for the cursor
     */
    EktajpuManageCursor.prototype.setPosition = function (htmlElement, newPosition) {
        if (htmlElement !== undefined && htmlElement !== null) {
            if (htmlElement.tagName == "TEXTAREA" || htmlElement.tagName == "INPUT") {
                htmlElement.setSelectionRange(newPosition, newPosition);
            }
            // if (htmlElement.tagName == "DIV") {
            //     console.log("setPosition - DIV 00 | newPosition: " + newPosition);
            //     let childNodes = htmlElement.childNodes;
            //     let txt = "";
            //     let cursorCounterStart = 0;
            //     let cursorCounterEnd = 0;
            //     let cursorPositionAdjusted = 0;
            //     let nodeCounter = 0;
            //     for (let i = 0; i < childNodes.length; i++) {
            //         // let size = 0;
            //         console.log("childNodes[i].nodeName: " + childNodes[i].nodeName);
            //         if (childNodes[i].nodeName === "#text") {
            //             cursorCounterEnd = cursorCounterStart + ( < any > childNodes[i]).nodeValue.length;
            //         } else if (childNodes[i].nodeName === "DIV") {
            //             cursorCounterEnd = cursorCounterStart + ( < any > childNodes[i]).text.length;
            //         } else {
            //             cursorCounterEnd = cursorCounterStart +( < any > childNodes[i]).text.length;
            //         }
            //         if (newPosition >= cursorCounterStart && newPosition <= cursorCounterEnd) {
            //             nodeCounter = i;
            //             cursorPositionAdjusted = newPosition - cursorCounterStart;
            //             break;
            //         }
            //         cursorCounterStart = cursorCounterEnd;
            //     }
            //     // code source: https://stackoverflow.com/questions/40632975/set-caret-position-in-a-content-editable-element
            //     // var el = document.getElementsByTagName('div')[0];
            //     var range = document.createRange();
            //     var sel = window.getSelection();
            //     range.setStart(htmlElement.childNodes[nodeCounter], cursorPositionAdjusted);
            //     range.collapse(true);
            //     sel.removeAllRanges();
            //     sel.addRange(range);
            //     ( < any > htmlElement).focus();
            // }
        }
    };
    return EktajpuManageCursor;
}());
//# sourceMappingURL=EktajpuManageCursor.js.map