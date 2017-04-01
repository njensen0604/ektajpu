class EktajpuCheckInput {

    private charactersConvertFrom: string[] = ["CX", "Cx", "cx", "GX", "Gx", "gx", "HX", "Hx", "hx", "JX", "Jx", "jx", "SX", "Sx", "sx", "UX", "Ux", "ux"];
    private charactersConvertTo: string[] = ["Ĉ", "Ĉ", "ĉ", "Ĝ", "Ĝ", "ĝ", "Ĥ", "Ĥ", "ĥ", "Ĵ", "Ĵ", "ĵ", "Ŝ", "Ŝ", "ŝ", "Ŭ", "Ŭ", "ŭ"];


    check() {

        // check all input boxes with focus
        let qSelAll = document.querySelectorAll("input:focus");
        this.checkList(qSelAll);

        // check all textarea boxes with focus
        let qSelAllTa = document.querySelectorAll("textarea:focus");
        this.checkList(qSelAllTa);

    }

    private checkList(arrayToCheck: any) {

        // cycle through list of input elements
        for (let i = 0; i < arrayToCheck.length; i++) {

            // check the sentence for special characters
            let checkSentenceResult = this.checkSentence(arrayToCheck[i].value);
            if (checkSentenceResult != null) {

                // get the cursor pos
                let oldPos = arrayToCheck[i].selectionStart;
                let diff = oldPos - (arrayToCheck[i].value.length - checkSentenceResult.length);

                // update text in gui
                arrayToCheck[i].value = checkSentenceResult;

                // set the cursor pos
                arrayToCheck[i].setSelectionRange(diff, diff);

            }

        }

    }

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