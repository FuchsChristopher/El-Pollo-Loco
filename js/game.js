let canvas;
let world;
let keyboard = new Keyboard();
let toggledMusic = false;
let game_background_sound = new Audio('audio/Background_Sound.mp3');


/**
 * The function starts the game by initializing the canvas, creating a world, and
 * animating all small and normal chickens. 
 */
function ini() {
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
 *  This function make  visible the start screen, also make this hidden
 * the canvas and otherwise make this hidden the mobile button. 
 */
function showScreen(elementId, templateFunction) {
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


function showStartScreen() {
    showScreen('canvas', showStartScreenTemplate);
}


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


function howToPlay() {
    showScreen('canvas', howToPlayTemplate);
}


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


function howToPlayClose() {
    showScreen('canvas', showStartScreen);
}


function showEndScreen() {
    showScreen('canvas', showEndScreenTemplate);
}


function showEndScreenTemplate() {
    const startEndScreen = document.getElementById('startAndEndscreen');
    startEndScreen.
        innerHTML = `
            <img class="endImg" src="img/9_intro_outro_screens/game_over/game over!.png">
        `;
}


function showLoseScreen() {
    showScreen('canvas', showLoseScreenTemplate);
}


function showLoseScreenTemplate() {
    const startLoseScreen = document.getElementById('startAndEndscreen');
    startLoseScreen.
        innerHTML = `
            <img class="endImg" src="img/9_intro_outro_screens/game_over/oh no you lost!.png">
        `;
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


window.addEventListener("orientationchange", checkOrientation);


/**
 * This function check the orientation on mobile phones or tablets
 */
function checkOrientation() {
    if (window.matchMedia("(orientation: landscape)").matches) {
        canvasPortraitScape();
        mobileButtonsHidden();
    } else {
        canvasLandScape();
        mobileButtonsSee();
    }
}


function mobileButtonsSee() {
    document.getElementById('divMobileButtouns').classList.remove('d-none');
}


function mobileButtonsHidden() {
    document.getElementById('divMobileButtouns').classList.add('d-none');
}


function canvasPortraitScape() {
    document.getElementById('canvas').style.width = '100%';
    document.getElementById('canvas').style.height = 'calc(100% - 59px)';
    document.getElementById('canvas').style.borderRadius = '25px';
}

function canvasLandScape() {
    document.getElementById('canvas').style.width = '100vw';
    document.getElementById('canvas').style.height = '100vh';
    document.getElementById('canvas').style.marginBottom = '-22px';
    document.getElementById('canvas').style.borderRadius = '0px';
}