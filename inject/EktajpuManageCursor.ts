/**
 * This gets / sets the cursor position in TEXTAREA, INPUT, and 'contenteditable' DIVs
 */
class EktajpuManageCursor {

    /**
     * Get the cursor position on a focused element.
     * @param {Element} Element to check
     * @return {number} The position of the element
     */
    getPosition(htmlElement: Element) {

        if (htmlElement !== undefined && htmlElement !== null) {

            if (htmlElement.tagName == "TEXTAREA" || htmlElement.tagName == "INPUT")
                return ( < HTMLInputElement > htmlElement).selectionStart;

            if (htmlElement.tagName == "DIV") {

                // code sources:
                // https://stackoverflow.com/questions/4811822/get-a-ranges-start-and-end-offsets-relative-to-its-parent-container/4812022#4812022
                // https://jsfiddle.net/TjXEG/900/
                var caretOffset = 0;
                var doc = htmlElement.ownerDocument || ( < any > htmlElement).document;
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
                } else if ((sel = doc.selection) && sel.type != "Control") {
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
    }

    /**
     * This will place the cursor at the specified location.
     * @param {Element} Element in which the cursor will be set
     * @param {number} New position for the cursor
     */
    setPosition(htmlElement: Element, newPosition: number) {

        if (htmlElement !== undefined && htmlElement !== null) {

            if (htmlElement.tagName == "TEXTAREA" || htmlElement.tagName == "INPUT") {
                ( < HTMLInputElement > htmlElement).setSelectionRange(newPosition, newPosition);
            }

            if (htmlElement.tagName == "DIV") {
                this.cycleThroughDiv(htmlElement, newPosition);
            }

        }

    }

    /**
     * Cycles through contenteditable div elements for text nodes.
     * @param htmlElement div element to cycle through.
     * @param newPosition The position to stop at.
     */
    private cycleThroughDiv(htmlElement: Element, newPosition: number) {

        let charCount = 0;
        let childNodes = htmlElement.childNodes;

        // for each child node: div
        for (let i = 0; i < childNodes.length; i++) {

            if (childNodes[i].nodeName === "#text") {
                charCount += ( < any > childNodes[i]).length;
            } else {
                newPosition = newPosition - charCount;
                charCount = 0;
                charCount += this.cycleThroughDiv(< Element > childNodes[i], newPosition);
            }

            if (charCount >= newPosition) {
                this.setTheCursor(< Element > childNodes[i], (charCount - (charCount - newPosition)));
                return 0;
            }
        }
        return charCount;
    }

    /**
     * This sets the cursor at a specific position in an editablecontent div.
     * @param htmlElement div element to cycle through.
     * @param newPosition The position to stop at.
     */
    private setTheCursor(htmlElement: Element, newPosition: number) {

        // code source: https://stackoverflow.com/questions/40632975/set-caret-position-in-a-content-editable-element
        // var el = document.getElementsByTagName('div')[0];
        var range = document.createRange();
        var sel = window.getSelection();
        range.setStart(htmlElement, newPosition);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);

    }

}