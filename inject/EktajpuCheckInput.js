var EktajpuCheckInput = (function () {
    function EktajpuCheckInput() {
        this.charactersConvertFrom = ["CX", "Cx", "cx", "GX", "Gx", "gx", "HX", "Hx", "hx", "JX", "Jx", "jx", "SX", "Sx", "sx", "UX", "Ux", "ux"];
        this.charactersConvertTo = ["Ĉ", "Ĉ", "ĉ", "Ĝ", "Ĝ", "ĝ", "Ĥ", "Ĥ", "ĥ", "Ĵ", "Ĵ", "ĵ", "Ŝ", "Ŝ", "ŝ", "Ŭ", "Ŭ", "ŭ"];
    }
    EktajpuCheckInput.prototype.check = function () {
        // check all input boxes with focus
        var qSelAll = document.querySelectorAll("input:focus");
        this.checkList(qSelAll);
        // check all textarea boxes with focus
        var qSelAllTa = document.querySelectorAll("textarea:focus");
        this.checkList(qSelAllTa);
    };
    // check the list of elements found from the query
    EktajpuCheckInput.prototype.checkList = function (arrayToCheck) {
        // cycle through list of input elements
        for (var i = 0; i < arrayToCheck.length; i++) {
            // skip if the element is a password input box
            var theType = arrayToCheck[i].getAttribute("type");
            if (theType !== null) {
                if (theType.toLowerCase() == "password")
                    continue;
            }
            // check the sentence for special characters
            var checkSentenceResult = this.checkSentence(arrayToCheck[i].value);
            if (checkSentenceResult != null) {
                // get the cursor pos
                var oldPos = arrayToCheck[i].selectionStart;
                var diff = oldPos - (arrayToCheck[i].value.length - checkSentenceResult.length);
                // update text in gui
                arrayToCheck[i].value = checkSentenceResult;
                // set the cursor pos
                arrayToCheck[i].setSelectionRange(diff, diff);
            }
        }
    };
    // check text from box
    EktajpuCheckInput.prototype.checkSentence = function (sentence) {
        var numberOfChanges = 0;
        // cycle through string from input box
        var valTextOrig = sentence;
        var valTextNew = "";
        var posCharEnd = 0;
        var skip = false;
        for (var pos = 0; pos < valTextOrig.length; pos++) {
            if (skip == true && pos <= posCharEnd) {
                continue;
            }
            else {
                skip = false;
            }
            var valTextTemp = "";
            // loop through character list
            for (var i = 0; i < this.charactersConvertFrom.length; i++) {
                posCharEnd = (pos + this.charactersConvertFrom[i].length) - 1;
                var charSet = valTextOrig.substr(pos, this.charactersConvertFrom[i].length);
                if (charSet == this.charactersConvertFrom[i]) {
                    skip = true;
                    numberOfChanges++;
                    valTextNew += this.charactersConvertTo[i];
                    break;
                }
            }
            if (skip == true)
                continue;
            // add char to new string
            valTextNew += valTextOrig[pos];
        }
        // set new text on gui
        if (numberOfChanges > 0) {
            return valTextNew;
        }
    };
    return EktajpuCheckInput;
}());
//# sourceMappingURL=EktajpuCheckInput.js.map