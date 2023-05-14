let canvas;
let ctx;
let world;
let keyboard = new Keyboard();
let musicOn = 0;

function init() {
    initLevel();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    document.getElementById('startPic').style.display = 'none';
    document.getElementById('startBTN').style.display = 'none';
}

function changePlayBTN(){
    document.getElementById('startBTN').src = 'img/playBTN/playBTN_hover.png';
}

function changePlayBTN2(){
    document.getElementById('startBTN').src = 'img/playBTN/playBTN.png';
}

function loadMusic() {
    if (musicOn == 0) {
        new Audio('audio/tex-mex-delight-mexican-mariachi-113044.mp3').play()
        musicOn = 1

    }
}

window.addEventListener("keydown", (e) => {
    loadMusic();
    if (e['keyCode'] == 39) {
        keyboard.RIGHT = true;
    }
    if (e['keyCode'] == 37) {
        keyboard.LEFT = true;
    }
    if (e['keyCode'] == 38) {
        keyboard.UP = true;
    }
    if (e['keyCode'] == 40) {
        keyboard.DOWN = true;
    }
    if (e['keyCode'] == 32) {
        keyboard.SPACE = true;
    }
    if (e['keyCode'] == 68) {
        keyboard.D = true;
    }
})


window.addEventListener("keyup", (e) => {
    if (e['keyCode'] == 39) {
        keyboard.RIGHT = false;
    }
    if (e['keyCode'] == 37) {
        keyboard.LEFT = false;
    }
    if (e['keyCode'] == 38) {
        keyboard.UP = false;
    }
    if (e['keyCode'] == 40) {
        keyboard.DOWN = false;
    }
    if (e['keyCode'] == 32) {
        keyboard.SPACE = false;
    }
    if (e['keyCode'] == 68) {
        keyboard.D = false;
    }
})