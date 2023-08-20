let canvas;
let world;
let keyboard = new Keyboard();
let toggledMusic = false;
let game_background_sound = new Audio('audio/Background_Sound.mp3');
let test = false;

/**
 * The function starts the game by initializing the canvas, creating a world, and
 * animating all small and normal chickens. 
 */
function ini() {
    test = true;
    checkRotation();
    canvas = document.getElementById('canvas');
    iniLevel();
    world = new World(canvas, keyboard);
    hiddenEndScreen();
    StartCanvas();
    keyboradsPress(keyboard);
    buttonsPress(keyboard);
}

/**
 * With this function make you the game visible.
 */
function StartCanvas() {
    let StartCanvas = document.getElementById('canvas');
    StartCanvas.innerHTML = '';
    StartCanvas.classList.remove('d-none');
}


/**
 * With this function make you the endScreen hidden.
 */
function hiddenEndScreen() {
    let EndScreen = document.getElementById('startAndEndscreen');
    EndScreen.innerHTML = '';
    EndScreen.classList.add('d-none');
}


/**
 * In the top pane, a specific keyboard button is assigned the value false,
 * if the button is not pressed.(keyup)
 * While in the lower part the value is true,
 * when the keyboard button is pressed.(keydown)
 */
function keyboradsPress(keyboard) {
    window.addEventListener("keyup", (e) => {
        if (e.keyCode == 68) {
            keyboard.D = false;
        }
        if (e.keyCode == 40) {
            keyboard.DOWN = false;
        }
        if (e.keyCode == 39) {
            keyboard.RIGHT = false;
        }
        if (e.keyCode == 38) {
            keyboard.UP = false;
        }
        if (e.keyCode == 37) {
            keyboard.LEFT = false;
        }
        if (e.keyCode == 32) {
            keyboard.SPACE = false;
        }
    });


    window.addEventListener("keydown", (e) => {
        if (e.keyCode == 68) {
            keyboard.D = true;
        }
        if (e.keyCode == 40) {
            keyboard.DOWN = true;
        }
        if (e.keyCode == 39) {
            keyboard.RIGHT = true;
        }
        if (e.keyCode == 38) {
            keyboard.UP = true;
        }
        if (e.keyCode == 37) {
            keyboard.LEFT = true;
        }
        if (e.keyCode == 32) {
            keyboard.SPACE = true;
        }
    });
}


/**
 * When the mobile button is pressed, 
 * the value true is passed and the event is started, 
 * while not pressing it ends the event.
 */
function buttonsPress(keyboard) {
    document.getElementById('goLeft').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });

    document.getElementById('goLeft').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });

    document.getElementById('goRight').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });

    document.getElementById('goRight').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });

    document.getElementById('jumping').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    });

    document.getElementById('jumping').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });

    document.getElementById('throwBottle').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.D = true;
    });

    document.getElementById('throwBottle').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.D = false;
    });
}


/**
 * In this function, the css class 'd-none' is assigned 
 */
function showScreen(element, templateFunction) {
    const screen = document.getElementById('canvas');
    screen.
        screen
    innerHTML = '';
    screen.
        classList.add('d-none');
    const startEndScreen = document.getElementById('startAndEndscreen');
    startEndScreen.
        innerHTML = '';
    startEndScreen.
        classList.remove('d-none');
    templateFunction();
}


/**
 * In this function, the startScreen is created.
 */
function showStartScreen() {
    showScreen('canvas', showStartScreenTemplate);
}


/**
 * In this function, the startScreenTemplate is created.
 */
function showStartScreenTemplate() {
    const startScreen = document.getElementById('startAndEndscreen');
    startScreen.innerHTML = `
            <div id="cover" class="StartScreen">
                <div class="buttonContainer">
                    <div><img onclick="ini()" class="startImg" src="img/9_intro_outro_screens/start/playButton.png"></div>
                    <div onclick="toggleMusic()" id="musicImg"><img class="startImg" src="img/9_intro_outro_screens/start/audio-remove.png"></div>
                    <div onclick="howToPlay()"><img class="startImg" src="img/9_intro_outro_screens/start/question-mark.png"></div>
                </div>
                <div class="turnDiviceDiv d-none2"> Please turn your device 90 degress </div>
            </div>
        `;
}


/**
 * In this function, the howToPlay screen is created.
 */
function howToPlay() {
    showScreen('canvas', howToPlayTemplate);
}


/**
 * In this function, the howToPlayTemplate screen is created.
 */
function howToPlayTemplate() {
    const startHowToPlayScreen = document.getElementById('startAndEndscreen');
    startHowToPlayScreen.
        innerHTML = `
            <div class="questDiv">
                <div class="closeDiv" onclick="howToPlayClose()"><img class="closeImg" src="img/9_intro_outro_screens/start/x-mark.png"></div>
                <div class="howToPlayDiv">
                    <div class="howToPlayDivs"><img class="howToPlayImg" src="img/howToPlayImg/arrow-left.png">Move left</div>
                    <div class="howToPlayDivs"><img class="howToPlayImg" src="img/howToPlayImg/arrow-right.png">Move right</div>
                    <div class="howToPlayDivs"><img class="howToPlayImg" src="img/howToPlayImg/letter-d.png">Throw bottle</div>
                    <div class="howToPlayDivs"><img class="howToPlayImgSpace" src="img/howToPlayImg/myspace.png">Jump</div>
                </div>
            </div>
        `;
}


/**
 * With this function you close the howToPlayTemplate
 */
function howToPlayClose() {
    showScreen('canvas', showStartScreen);
}


/**
 * In this function, the EndScreen is created.
 */
function showEndScreen() {
    showScreen('canvas', () => setScreenTemplate('endImg', 'game over!'));
}


/**
 * In this function, the LoseScreen is created.
 */
function showLoseScreen() {
    showScreen('canvas', () => setScreenTemplate('endImg', 'oh no you lost!'));
}


/**
 * In this function, the EndScreen and LoseScreen are created using parameters.
 */
function setScreenTemplate(className, imageSrc) {
    const startEndScreen = document.getElementById('startAndEndscreen');
    startEndScreen.innerHTML = `<img class="${className}" src="img/9_intro_outro_screens/game_over/${imageSrc}.png">`;
}


/**
 * In this function switch the Images audio-add and audio-remove.
 */
function toggleMusic() {
    let container = document.getElementById('musicImg');
    if (toggledMusic) {
        toggleMusicOff(container);
    } else {
        toggleMusicOn(container);
    }
}


/**
 *  In this function start the background music.
 */
function toggleMusicOn(container) {
    toggledMusic = true;
    game_background_sound.play();
    game_background_sound.loop = true;
    container.innerHTML = `<img class="startImg" src="img/9_intro_outro_screens/start/audio-add.png">`;
}


/**
 *  In this function start the break of background music.
 */
function toggleMusicOff(container) {
    toggledMusic = false;
    game_background_sound.pause();
    container.innerHTML = `<img class="startImg" src="img/9_intro_outro_screens/start/audio-remove.png">`;
}


/**
 * This function check the orientation on the devices.
 */
function checkRotation() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && test === true) {
        canvasLandScape();
        mobileButtonsSee();
    } else {
        canvasPortraitScape();
        mobileButtonsHidden();
    }
}

// Check rotation on window resize
window.addEventListener("resize", checkRotation);


/**
 * This function makes the buttons visible
 */
function mobileButtonsSee() {
    document.getElementById('divMobileButtouns').classList.remove('d-none');
}


/**
 * This function makes the buttons invisible
 */
function mobileButtonsHidden() {
    document.getElementById('divMobileButtouns').classList.add('d-none');
}


/**
 * In this function the potrait mode is created.
 */
function canvasPortraitScape() {
    document.getElementById('canvas').style.width = '100%';
    document.getElementById('canvas').style.height = 'calc(100% - 59px)';
    document.getElementById('canvas').style.borderRadius = '25px';
}


/**
 * In this function the land mode is created.
 */
function canvasLandScape() {
    document.getElementById('canvas').style.width = '100vw';
    document.getElementById('canvas').style.height = '100vh';
    document.getElementById('canvas').style.marginBottom = '-22px';
    document.getElementById('canvas').style.borderRadius = '0px';
}