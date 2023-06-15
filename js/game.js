let canvas;
let world;
let keyboard = new Keyboard();
let toggledMusic = false;
let game_background_sound = new Audio('audio/Background_Sound.mp3');

function ini() {
    canvas = document.getElementById('canvas');
    iniLevel();
    world = new World(canvas, keyboard);

    let EndScreen = document.getElementById('startAndEndscreen');
    EndScreen.innerHTML = '';
    EndScreen.classList.add('d-none');
    let StartCanvas = document.getElementById('canvas');
    StartCanvas.innerHTML = '';
    StartCanvas.classList.remove('d-none');
}


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


document.getElementById('goLeft').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.LEFT = true;
});

document.getElementById('goLeft').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.LEFT = false;
});

document.getElementById('moveRight').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.RIGHT = true;
});

document.getElementById('moveRight').addEventListener('touchend', (e) => {
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


function showStartScreen() {
    let StartScreen = document.getElementById('canvas');
    StartScreen.innerHTML = '';
    StartScreen.classList.add('d-none');
    let startEndScreen = document.getElementById('startAndEndscreen');
    startEndScreen.innerHTML = '';
    startEndScreen.classList.remove('d-none');
    showStartScreenTemplate();
}


function showStartScreenTemplate() {
    let StartScreen = document.getElementById('startAndEndscreen');
    StartScreen.innerHTML = `
    <div class="StartScreen">
        <div class="buttonContainer">
        <div><img onclick="ini()" class="playButtonImg" src="img/9_intro_outro_screens/start/playButton.png"></div>
        <div onclick="toggleMusic()" id="musicImg"><img class="soundButton" src="img/9_intro_outro_screens/start/audio-remove.png"></div>
        <div onclick="howToPlay()"><img class="questMarker" src="img/9_intro_outro_screens/start/question-mark.png"></div>
        </div>
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
    container.innerHTML = `<img class="soundButton" src="img/9_intro_outro_screens/start/audio-add.png">`;
}


function toggleMusicOff(container) {
    toggledMusic = false;
    game_background_sound.pause();
    container.innerHTML = `<img class="soundButton" src="img/9_intro_outro_screens/start/audio-remove.png">`;
}
