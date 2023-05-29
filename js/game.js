let canvas;
let world;
let keyboard = new Keyboard();

function ini() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);

    let EndScreen = document.getElementById('startAndEndscreen');
    EndScreen.innerHTML = '';
    EndScreen.classList.add('d-none');
    console.log('My Chraracter is', world.character);
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
