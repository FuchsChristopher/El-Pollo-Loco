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
        </div>
    </div>
    `;
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


function toggleMusic() {
    let container = document.getElementById('musicImg');
    if(toggledMusic) {
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
