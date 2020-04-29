
// Global Variables
var _currentPage;
var _maxQuestions = 8;
var _playSound = true;

// JS For Question Moving

function openFeedbackApp() {

    // Hide opening screen
    $('#openingScreenRow').hide(100);

    // Show the first question
    $('#Question_1').show(100);

    // Show the control buttons
    $('#settingsBtns').show(100);
    $('#moveQuestionBtns').show(100);

}

function setStartPage() {
   this._currentPage = 1;
}

function movePageBack() {

    // hide current question div
    $('#Question_' + _currentPage).hide(100);

    // decrement the current page number
    this._currentPage--;

    if (this._currentPage < 1) {
        $('#openingScreenRow').show(100);
        $('#settingsBtns').hide(100);
        $('#moveQuestionBtns').hide(100);
    } else {
    // show next question div
        $('#Question_' + this._currentPage).show(100);
    }

    // show the hidden next button
    $('#btnNext:hidden').show(100);

}

function movePageForward() {

    // hide current question div
    $('#Question_' + this._currentPage).hide(100);

    // increment the current page number
    this._currentPage++

    // show next question div
    $('#Question_' + this._currentPage).show(100);

    if (this._currentPage >= this._maxQuestions) {
        // remove the next button on the last question.
        $('#btnNext').hide(100);
    }
}

// Increase font size
var fontSize = 1;

function increaseFontSize() {
    debugger;
    var allH2Elements = document.getElementsByTagName('h2');
    var allH1Elements = document.getElementsByTagName('h1');
    var body = document.getElementsByTagName('body');

    // the font can be increased 3x
    if (fontSize <= 3 && fontSize > 0) {

        if (body != undefined && body.length > 0) {
            var currentSize = window.getComputedStyle(body[0], null).getPropertyValue('font-size');
            currentSize = parseFloat(currentSize);
            body[0].style.fontSize = currentSize + 2 + 'px';
        }

        if (allH1Elements != undefined && allH1Elements.length > 0) {
            for (var i = 0; i <= allH1Elements.length - 1; i++) {
                var currentSize = window.getComputedStyle(allH1Elements[0], null).getPropertyValue('font-size');
                currentSize = parseFloat(currentSize);

                allH1Elements[i].style.fontSize = currentSize + 5 + "px";
            }
        }

        if (allH2Elements != undefined && allH2Elements.length > 0) {
            for (var i = 0; i <= allH2Elements.length - 1; i++) {

                var currentSize = window.getComputedStyle(allH2Elements[0], null).getPropertyValue('font-size');
                currentSize = parseFloat(currentSize);

                allH2Elements[i].style.fontSize = currentSize + 5 + "px";
            }
        }

        fontSize = fontSize + 1;
    }
    else {
        // return to original sizes
        if (body != undefined && body.length > 0) {
            body[0].style.fontSize = '10px';
        }

        if (allH1Elements != undefined && allH1Elements.length > 0) {
            for (var i = 0; i <= allH1Elements.length - 1; i++) {
                var currentSize = window.getComputedStyle(allH1Elements[0], null).getPropertyValue('font-size');
                currentSize = parseFloat(currentSize);

                allH1Elements[i].style.fontSize = currentSize - 15 + "px";
            }
        }

        if (allH2Elements != undefined && allH2Elements.length > 0) {
            for (var i = 0; i <= allH2Elements.length - 1; i++) {

                var currentSize = window.getComputedStyle(allH2Elements[0], null).getPropertyValue('font-size');
                currentSize = parseFloat(currentSize);

                allH2Elements[i].style.fontSize = currentSize - 15 + "px";
            }
        }

        fontSize = 1;
    }
}


function changeSound() {
    var soundBtn = document.getElementById('btnMute');

    if (_playSound == true) {
        _playSound = false;
        soundBtn.innerHTML = '<i class="fas fa-volume-up" aria-hidden="true"></i>Sound';

    }
    else {
        _playSound = true;
        soundBtn.innerHTML = '<i class="fas fa-volume-mute" aria-hidden="true"></i>Mute';
    }
}

// Scale / Pouring
function pour(itemName) {

    if (itemName == "Water") {
        var sound = document.getElementById('waterSound');
        if (sound != undefined && _playSound) {
            sound.currentTime = 7;
            sound.play();
        }
    }

    var pour = document.getElementById('pour' + itemName);
    var fill = document.getElementById('fill' + itemName);

    var paintWave = document.getElementsByClassName("paintWave");

    if (pour != undefined) {
        pour.classList.add('pour');
        pour.style.animationPlayState = "running";
    }

    if (fill != undefined) {
        fill.style.visibility = 'initial';
        fill.classList.add('fill');
        fill.style.animationPlayState = "running";
    }

    if (itemName == "Paint") {
        if (paintWave != undefined) {
            paintWave[0].style.animationPlayState = "running";
        }
    }

    $(this).one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
        function (event) {
            // Do something when the transition ends
            console.log("END");
            startConfetti();
        });

    var $element = $('.fill').bind("webkitAnimationEnd oAnimationEnd msAnimationEnd animationend", function (event) {
        console.log("animation name: " + event.originalEvent.animationName)
        if (event.originalEvent.animationName === "fillRainbowAction") {
            console.log('the event happened');
            confetti.start();

            setTimeout(function () { confetti.stop() }, 3000);

            // once filled stop the sound playing until reset
            _playSound = false;
        }
    });
}

function stop(itemName) {

    if (itemName == "Water") {
        var sound = document.getElementById('waterSound');
        if (sound != undefined) {
            sound.pause();
        }
    }

    var pour = document.getElementById('pour' + itemName);
    var fill = document.getElementById('fill' + itemName);

    var paintWave = document.getElementsByClassName("paintWave");

    if (pour != undefined) {
        pour.style.animationPlayState = "paused";
        pour.classList.remove('pour');

    }

    if (fill != undefined) {
        fill.style.animationPlayState = "paused";
    }

    // For the paint don't keep the ripple effect after pouring
    if (itemName == "Paint") {
        if (paintWave != undefined) {
            paintWave[0].style.animationPlayState = "paused";
        }
    }
}

function resetWater() {
    _playSound = true;

    var waterPot = document.getElementById('pour');
    var waterFill = document.getElementById('fill');

    if (waterPot != undefined) {
        waterPot.classList.remove('pour');
    }

    if (waterFill != undefined) {
        waterFill.classList.remove('fill');
        waterFill.style.visibility = 'hidden';
    }
}


function reset(itemName) {

    var pour = document.getElementById('pour' + itemName);
    var fill = document.getElementById('fill' + itemName);

    if (pour != undefined) {
        pour.classList.remove('pour');
    }

    if (fill != undefined) {
        fill.classList.remove('fill');
        fill.style.visibility = 'hidden';
    }
}

function paintSelected(box, colour) {
    var paintColourPots = document.getElementsByClassName("paintColour");

    if (paintColourPots != undefined) {
        for (var i = 0; i <= paintColourPots.length; i++) {
            var currentPot = paintColourPots[i];

            if (currentPot != undefined) {
                if (currentPot.classList.contains("selectedPaint")) {
                    currentPot.classList.remove("selectedPaint");
                }
            }
        }
    }

    var paint = document.getElementsByClassName('paintWave');
    var pour = document.getElementById('pourPaint');

    if (paint != undefined) {
        paint[0].style.fill = colour;
    }

    if (pour != undefined) {
        pour.style.background = colour;
    }

    box.classList.add('selectedPaint');
}

// End of Scale / Pouring

// Smiley Faces

function selectedFace(faceTypeID) {

    // find the last selected face and remove the class
    if ($(".selectedFace") != undefined && $(".selectedFace").length > 0) {
        $(".selectedFace")[0].style.animationPlayState = "paused";
        $(".selectedFace")[0].classList.remove('selectedFace');
    }

    // find the face that has been selected and set the class
    var face = document.getElementById(faceTypeID);

    if (face != undefined) {
        face.classList.add('selectedFace');
        face.style.animationPlayState = "running";
    }
}