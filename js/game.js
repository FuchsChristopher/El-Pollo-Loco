let canvas;
let world;
let keyboard = new Keyboard();
let toggledMusic = false;
let game_background_sound = new Audio('audio/Background_Sound.mp3');
let test = false;

function ini() {
    test = true;
    canvas = document.getElementById('canvas');
    iniLevel();
    world = new World(canvas, keyboard);
    let EndScreen = document.getElementById('startAndEndscreen');
    EndScreen.innerHTML = '';
    EndScreen.classList.add('d-none');
    let StartCanvas = document.getElementById('canvas');
    StartCanvas.innerHTML = '';
    StartCanvas.classList.remove('d-none');
    keyboradsPress(keyboard);
    buttonsPress(keyboard);
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



function showStartScreen() {
    let canvasScreen = document.getElementById('canvas');
    canvasScreen.innerHTML = '';
    canvasScreen.classList.add('d-none');
    let startEndScreen = document.getElementById('startAndEndscreen');
    startEndScreen.innerHTML = '';
    startEndScreen.classList.remove('d-none');
    let divMobileButtons = document.getElementById('divMobileButtouns');
    divMobileButtons.classList.add('d-none');
    showStartScreenTemplate();
}


function showStartScreenTemplate() {
    let StartScreen = document.getElementById('startAndEndscreen');
    StartScreen.innerHTML = `
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
    let howToPlayScreen = document.getElementById('canvas');
    howToPlayScreen.innerHTML = '';
    howToPlayScreen.classList.add('d-none');
    let startHowToPlayScreen = document.getElementById('startAndEndscreen');
    startHowToPlayScreen.innerHTML = '';
    startHowToPlayScreen.classList.remove('d-none');
    howToPlayTemplate();
}


function howToPlayTemplate() {
    let startHowToPlayScreen = document.getElementById('startAndEndscreen');
    startHowToPlayScreen.innerHTML = `
    <div class="questDiv">
        <div class="closeDiv" onclick="howToPlayClose()"><img class="closeImg" src="img/9_intro_outro_screens/start/x-mark.png"></div>
        <div class="howToPlayDiv">
            <div class="howToPlayDivs"><img class="howToPlayImg" src="img/howToPlayImg/arrow-left.png">Move left</div>
            <div class="howToPlayDivs"><img class="howToPlayImg" src="img/howToPlayImg/arrow-right.png">Move right</div>
            <div class="howToPlayDivs"><img class="howToPlayImg" src="img/howToPlayImg/letter-d.png">Throw botlte</div>
            <div class="howToPlayDivs"><img class="howToPlayImgSpace" src="img/howToPlayImg/myspace.png">Jump</div>
        </div>
    </div>
    `
}


function howToPlayClose() {
    let howToPlayScreen = document.getElementById('canvas');
    howToPlayScreen.innerHTML = '';
    howToPlayScreen.classList.remove('d-none');
    let startHowToPlayScreen = document.getElementById('startAndEndscreen');
    startHowToPlayScreen.innerHTML = '';
    startHowToPlayScreen.classList.add('d-none');
    showStartScreen();
}


function showEndScreen() {
    let endScreen = document.getElementById('canvas');
    endScreen.innerHTML = '';
    endScreen.classList.add('d-none');
    let startEndScreen = document.getElementById('startAndEndscreen');
    startEndScreen.innerHTML = '';
    startEndScreen.classList.remove('d-none');
    showEndScreenTemplate();
}

function showEndScreenTemplate() {
    let startEndScreen = document.getElementById('startAndEndscreen');
    startEndScreen.innerHTML = `
    <img class="endImg" src="img/9_intro_outro_screens/game_over/game over!.png">
    `
}


function showLoseScreen() {
    let loseScreen = document.getElementById('canvas');
    loseScreen.innerHTML = '';
    loseScreen.classList.add('d-none');
    let startloseScreen = document.getElementById('startAndEndscreen');
    startloseScreen.innerHTML = '';
    startloseScreen.classList.remove('d-none');
    showLoseScreenTemplate();
}

function showLoseScreenTemplate() {
    let startLoseScreen = document.getElementById('startAndEndscreen');
    startLoseScreen.innerHTML = `
    <img class="endImg" src="img/9_intro_outro_screens/game_over/oh no you lost!.png">
    `
}


function toggleMusic() {
    let container = document.getElementById('musicImg');
    if (toggledMusic) {
        toggleMusicOff(container);
    } else {
        toggleMusicOn(container);
    }
}


function toggleMusicOn(container) {
    toggledMusic = true;
    game_background_sound.play();
    game_background_sound.loop = true;
    container.innerHTML = `<img class="startImg" src="img/9_intro_outro_screens/start/audio-add.png">`;
}


function toggleMusicOff(container) {
    toggledMusic = false;
    game_background_sound.pause();
    container.innerHTML = `<img class="startImg" src="img/9_intro_outro_screens/start/audio-remove.png">`;
}


function checkOrientation() {
    if (window.matchMedia("(orientation: landscape)").matches) {
      canvasPortraitScape();
      document.getElementById('divMobileButtouns').classList.add('d-none');
  
    } else if (test == true) {
      canvasLandScape();
      document.getElementById('divMobileButtouns').classList.remove('d-none');
  
    }
  }
  
  window.addEventListener("orientationchange", checkOrientation);
  
  function canvasPortraitScape() {
    document.getElementById('canvas').style.width = '100%';
    document.getElementById('canvas').style.height = 'calc(100% - 59px)';
    document.getElementById('canvas').style.borderRadius = '15px';
  }
  
  function canvasLandScape() {
    document.getElementById('canvas').style.width = '100vw';
    document.getElementById('canvas').style.height = '100vh';
    document.getElementById('canvas').style.marginBottom = '-22px';
    document.getElementById('canvas').style.borderRadius = '0px';
  }
  