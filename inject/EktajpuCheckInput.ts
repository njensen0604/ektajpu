/**
 * Finds the element with focus.
 * Checks the text for character conversions.
 */
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
                if (qSelAll.length < 1)
                    qSelAll = document.querySelectorAll('[contenteditable=true]:focus');
                if (qSelAll.length < 1)
                    qSelAll = document.querySelectorAll('[contenteditable]:focus');
            }
        }
        if (qSelAll.length > 0) {
            this.checkList(qSelAll);
        }
    }

    /**
     * Checks the list of HTML elements for type: TEXTAREA, INPUT, and contenteditable.
     * @param {NodeList} arrayToCheck List of items returned from a query select.
     */
    private checkList(arrayToCheck: NodeList) {

        // cycle through list of input elements
        for (let i = 0; i < arrayToCheck.length; i++) {

            // get single element
            let elem: Element = < Element > arrayToCheck[i];

            // skip if the element is a password
            let theType = elem.getAttribute("type");
            if (theType !== null) {
                if (theType.toLowerCase() == "password") continue;
            }

            // check the sentence for special characters
            let sentenceLengthOrig: number;
            let sentenceLengthDiff: number;
            let checkSentenceResult: string;
            if (elem.tagName == "TEXTAREA" || elem.tagName == "INPUT") {
                sentenceLengthOrig = ( < HTMLInputElement > elem).value.length;
                if (sentenceLengthOrig > 0) {
                    checkSentenceResult = this.checkSentence(( < HTMLInputElement > elem).value);
                }
            }
            // if (elem.tagName == "DIV") {
            //     sentenceLengthOrig = elem.innerHTML.length;
            //     if (sentenceLengthOrig > 0) {
            //         checkSentenceResult = this.checkSentence(elem.innerHTML);
            //     }
            // }

            if (checkSentenceResult !== undefined) {

                // get the length difference between the new and old text
                sentenceLengthDiff = (sentenceLengthOrig - checkSentenceResult.length);

                if (sentenceLengthDiff > 0) {

                    // get the cursor pos
                    let manageCursor = new EktajpuManageCursor();

                    // set the cursor pos
                    if (elem.tagName == "TEXTAREA" || elem.tagName == "INPUT") {

                        // get the new cursor position
                        let newPos: number = manageCursor.getPosition(elem) - sentenceLengthDiff;

                        // update the gui
                        ( < HTMLInputElement > elem).value = checkSentenceResult;

                        // set the cursor at new position
                        manageCursor.setPosition(elem, newPos);

                    } else if (elem.tagName == "DIV") {

                        // // get the new cursor position
                        // let newPos: number = manageCursor.getPosition(elem) - sentenceLengthDiff;

                        // // update the gui
                        // // elem.innerHTML = checkSentenceResult;

                        // // set the cursor at new position
                        // manageCursor.setPosition(elem, newPos);

                    }

                }

            }

        }

    }


    /**
     * Checks text from HTML element.
     * @param {string} sentence String to convert.
     * @return {string} Converted text or original if nothing was changed.
     */
    private checkSentence(sentence: string) {

        let numberOfChanges: number = 0;

        // cycle through string from input box
        let valTextNew: string = "";
        let posCharEnd: number = 0;
        let skip: boolean = false;

        for (let pos = 0; pos < sentence.length; pos++) {
            if (skip == true && pos <= posCharEnd) {
                continue;
            } else {
                skip = false;
            }
            let valTextTemp: string = "";
            // loop through character list
            for (let i = 0; i < this.charactersConvertFrom.length; i++) {
                posCharEnd = (pos + this.charactersConvertFrom[i].length) - 1;
                let charSet: string = sentence.substr(pos, this.charactersConvertFrom[i].length);
                if (charSet == this.charactersConvertFrom[i]) {
                    skip = true;
                    numberOfChanges++;
                    valTextNew += this.charactersConvertTo[i];
                    break;
                }
            }
            if (skip == true) continue;
            // add char to new string
            valTextNew += sentence[pos];
        }

        // set new text on gui
        if (numberOfChanges > 0) {
            return valTextNew;
        }
        return sentence;
    }
}