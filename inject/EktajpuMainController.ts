var printIt = new EktajpuPrintIt("Welcome, Ektajpu loaded.");

var isActive: boolean = false;

// listen for keys
window.onload = function() {

    // object for checking input text
    var checkInput = new EktajpuCheckInput();
    checkInput.check();

    document.addEventListener("keyup", function(e) {

        if (isActive == false) {
          isActive = true;
          checkInput.check();
          isActive = false;
        }

    });

}
