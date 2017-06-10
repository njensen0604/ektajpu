class EktajpuCheckInput {

    private charactersConvertFrom: string[] = ["CX", "Cx", "cx", "GX", "Gx", "gx", "HX", "Hx", "hx", "JX", "Jx", "jx", "SX", "Sx", "sx", "UX", "Ux", "ux"];
    private charactersConvertTo: string[] = ["Ĉ", "Ĉ", "ĉ", "Ĝ", "Ĝ", "ĝ", "Ĥ", "Ĥ", "ĥ", "Ĵ", "Ĵ", "ĵ", "Ŝ", "Ŝ", "ŝ", "Ŭ", "Ŭ", "ŭ"];

    /**
     * Checks for focus, extracts text.
     */
    check() {
        let qSelAll = document.querySelectorAll("input:focus");
        if (qSelAll.length < 1) {
            qSelAll = document.querySelectorAll("textarea:focus");
            if (qSelAll.length < 1) {
                qSelAll = document.querySelectorAll('[contenteditable="true"]:focus');
            }
        }
        if (qSelAll.length > 0) {
            this.checkList(qSelAll);
        }
    }

    /**
     * Checks the list of HTML elements for TEXTAREA, INPUT, and contenteditable.
     * @param arrayToCheck List of items returned from a query select.
     */
    private checkList(arrayToCheck: any) {

        // cycle through list of input elements
        for (let i = 0; i < arrayToCheck.length; i++) {

            // skip if the element is a password input box
            let theType = arrayToCheck[i].getAttribute("type");
            if (theType !== null) {
                if (theType.toLowerCase() == "password") continue;
            }

            // check the sentence for special characters
            let checkSentenceResult;
            if (arrayToCheck[i].tagName == "TEXTAREA" || arrayToCheck[i].tagName == "INPUT")
                checkSentenceResult = this.checkSentence(arrayToCheck[i].value);
            if (arrayToCheck[i].tagName == "DIV")
                checkSentenceResult = this.checkSentence(arrayToCheck[i].innerHTML);

            if (checkSentenceResult != null) {

                // get the cursor pos
                let oldPos;
                let diff;
                if (arrayToCheck[i].tagName == "TEXTAREA" || arrayToCheck[i].tagName == "INPUT") {
                    oldPos = arrayToCheck[i].selectionStart;
                    diff = oldPos - (arrayToCheck[i].value.length - checkSentenceResult.length);
                }
                // if (arrayToCheck[i].tagName == "DIV") {
                //     oldPos = this.getCurorPositionWithin(arrayToCheck[i]);
                //     diff = oldPos - (arrayToCheck[i].innerHTML.length - checkSentenceResult.length);
                // }

                // update text in gui
                if (arrayToCheck[i].tagName == "TEXTAREA" || arrayToCheck[i].tagName == "INPUT")
                    arrayToCheck[i].value = checkSentenceResult;
                if (arrayToCheck[i].tagName == "DIV")
                    arrayToCheck[i].innerHTML = checkSentenceResult;

                // set the cursor pos
                if (arrayToCheck[i].tagName == "TEXTAREA" || arrayToCheck[i].tagName == "INPUT") {
                    arrayToCheck[i].setSelectionRange(diff, diff);
                }
                // if (arrayToCheck[i].tagName == "DIV") {
                //     this.set_mouse(arrayToCheck[i], diff);
                // }

            }

        }

    }

    // private getCurorPositionWithin(element) {
    //     let caretOffset = 0;
    //     if (typeof window.getSelection != "undefined") {
    //         var range = window.getSelection().getRangeAt(0);
    //         var preCaretRange = range.cloneRange();
    //         preCaretRange.selectNodeContents(element);
    //         preCaretRange.setEnd(range.endContainer, range.endOffset);
    //         caretOffset = preCaretRange.toString().length;
    //     } else if (typeof document.selection != "undefined" && document.selection.type != "Control") {
    //         var textRange = document.selection.createRange();
    //         var preCaretTextRange = document.body.createTextRange();
    //         preCaretTextRange.moveToElementText(element);
    //         preCaretTextRange.setEndPoint("EndToEnd", textRange);
    //         caretOffset = preCaretTextRange.text.length;
    //     }
    //     return caretOffset;
    // }

    // private set_mouse(element, position: number) {

    //     let el = element.childNodes[0];

    //     var range = document.createRange();
    //     var sel = window.getSelection();

    //     range.setStart(el, position);
    //     range.collapse(true);
    //     sel.removeAllRanges();
    //     sel.addRange(range);

    // }


    /**
     * Checks text from HTML element.
     * @param sentence String to convert.
     * @return String Converted text.
     */
    private checkSentence(sentence: string) {

        let numberOfChanges: number = 0;

        // cycle through string from input box
        let valTextOrig: string = sentence;
        let valTextNew: string = "";
        let posCharEnd: number = 0;
        let skip: boolean = false;
        for (let pos = 0; pos < valTextOrig.length; pos++) {
            if (skip == true && pos <= posCharEnd) {
                continue;
            } else {
                skip = false;
            }
            let valTextTemp = "";
            // loop through character list
            for (let i = 0; i < this.charactersConvertFrom.length; i++) {
                posCharEnd = (pos + this.charactersConvertFrom[i].length) - 1;
                let charSet: string = valTextOrig.substr(pos, this.charactersConvertFrom[i].length);
                if (charSet == this.charactersConvertFrom[i]) {
                    skip = true;
                    numberOfChanges++;
                    valTextNew += this.charactersConvertTo[i];
                    break;
                }
            }
            if (skip == true) continue;
            // add char to new string
            valTextNew += valTextOrig[pos];
        }
        // set new text on gui
        if (numberOfChanges > 0) {
            return valTextNew;
        }
    }
}