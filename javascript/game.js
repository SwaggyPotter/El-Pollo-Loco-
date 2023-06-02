let canvas;
let ctx;
let world;
let keyboard = new Keyboard();
let musicOn = 0;
let backgroundAudio;
let endBossMusic;
let fullscreenBTN = document.getElementById('fullscreenBTN')
let valueSound;
let slider = document.getElementById("slider");
let fromeAbove = 0;
let bossDead = 0;
let screenIntervall;
let screenTouchX;
let screenTouchY;
let x;
let y;
let gameStartet = 0;
let timer = 0;
let timerCounter = 5;
let timerBeforeStart;


function init() {
    canvas = document.getElementById('canvas');
    initLevel();
    world = new World(canvas, keyboard);
    valueSound = slider.value;
    fullscreenListener();
    setFullscreenButton();
    showHandycontrolls();
    loadMusic();
    gameStartet = 1;
    document.getElementById('startPic').style.display = 'none';
    document.getElementById('startBTN').style.display = 'none';
}


function setFullscreenButton() {
    if (window.innerWidth > 1010) {
        document.getElementById('fullscreenBTN').style.display = 'flex';
    }
    else if (window.innerWidth < 1011) {
        document.getElementById('fullscreenBTN').style.display = 'none';
    }
}


function showHandycontrolls() {
    if (window.innerWidth <= 1010) {
        addListenerHandyNormal();
        document.getElementById('handyControls').style.display = 'inline-block';
    }
}


window.addEventListener('resize', () => {
    if (window.innerWidth < 1011 && gameStartet == 1) {
        showHandycontrolls();
        addListenerHandyNormal();
        document.getElementById('throwBottleBTN').style.display = 'inline-block';
        document.getElementById('handyControls').style.display = 'inline-block';
    }
    if (window.innerWidth < 1011 && gameStartet == 1) {
        document.getElementById('fullscreenBTN').style.display = 'none';
    }
    else if (window.innerWidth >= 1011 && gameStartet == 1) {
        document.getElementById('handyControls').style.display = 'none';
        document.getElementById('throwBottleBTN').style.display = 'none';
        document.getElementById('fullscreenBTN').style.display = 'inline-block';
    }
})


function addListenerHandyNormal() {
    let leftKey = document.getElementById('leftBtn');
    let rightKey = document.getElementById('rightBtn');
    let UpKey = document.getElementById('upBtn')
    let throwKey = document.getElementById('throwBottleBTN')
    leftKey.addEventListener('touchstart', () => {
        keyboard.LEFT = true;
    })
    rightKey.addEventListener('touchstart', () => {
        keyboard.RIGHT = true;
    })
    UpKey.addEventListener('touchstart', () => {
        keyboard.UP = true;
    })
    throwKey.addEventListener('touchstart', () => {
        keyboard.D = true;
    })
    leftKey.addEventListener('touchend', () => {
        keyboard.LEFT = false;
    })
    rightKey.addEventListener('touchend', () => {
        keyboard.RIGHT = false;
    })
    UpKey.addEventListener('touchend', () => {
        keyboard.UP = false;
    })
    throwKey.addEventListener('touchend', () => {
        keyboard.D = false;
    })
}


function addCoordinateListener() {
    canvas.addEventListener('touchstart', function (event) {
        let rect = canvas.getBoundingClientRect();
        let touch = event.touches[0];
        x = touch.clientX - rect.left;
        y = touch.clientY - rect.top;
        screenTouchX = x;
        screenTouchY = y;
    });
}


window.addEventListener('touchstart', () => {
    if (screenTouchX >= 1 && screenTouchX <= 85 && screenTouchY >= (canvas.height - 130) && screenTouchY <= (canvas.height - 10)) {
        keyboard.LEFT = true;
    }
    if (screenTouchX >= 140 && screenTouchX <= 230 && screenTouchY >= (canvas.height - 130) && screenTouchY <= (canvas.height - 10)) {
        keyboard.RIGHT = true
    }
    if (screenTouchX >= 65 && screenTouchX <= 118 && screenTouchY >= (canvas.height - 210) && screenTouchY <= (canvas.height - 140)) {
        keyboard.UP = true;
    }
    if (screenTouchX >= window.innerWidth - 120 && screenTouchX <= window.innerWidth && screenTouchY >= (canvas.height - 240) && screenTouchY <= (canvas.height - 120)) {
        keyboard.D = true;
    }
})


window.addEventListener('touchend', () => {
    screenTouchX = null;
    screenTouchY = null;
    keyboard.UP = false;
    keyboard.RIGHT = false;
    keyboard.LEFT = false;
    keyboard.D = false;
})


function fullscreenListener() {
    fullscreenBTN.style.display = 'flex';
    fullscreenBTN.addEventListener('click', () => {
        toggleFullscreen(canvas)
        addCoordinateListener();
    })
}


function toggleFullscreen(canvas) {
    if (!document.fullscreenElement) {
        if (canvas.requestFullscreen) {
            canvas.requestFullscreen();
        } else if (canvas.mozRequestFullScreen) { // Firefox
            canvas.mozRequestFullScreen();
        } else if (canvas.webkitRequestFullscreen) { // Chrome, Safari, Opera
            canvas.webkitRequestFullscreen();
        } else if (canvas.msRequestFullscreen) { // IE/Edge
            canvas.msRequestFullscreen();
        }
    }
}


//play button + hover effect
function changePlayBTN() {
    document.getElementById('startBTN').src = 'img/playBTN/playBTN_hover.png';
}


function changePlayBTN2() {
    document.getElementById('startBTN').src = 'img/playBTN/playBTN.png';
}


function loadMusic() {
    if (musicOn == 0) {
        backgroundAudio = new Audio('audio/tex-mex-delight-mexican-mariachi-113044.mp3')
        backgroundAudio.addEventListener('canplay', () => {
            backgroundAudio.play();
        })
        backgroundAudio.volume = (valueSound / 100)
        musicOn = 1
    }
    else if (musicOn == 2) {
        endBossMusic = new Audio('audio/enboss-music.mp3') // add new boss music
        endBossMusic.play()
        backgroundAudio.pause()
        endBossMusic.volume = (valueSound / 100)
        musicOn++;
    }
}


function updateSounds() {
    setInterval(() => {
        if (backgroundAudio) {
            valueSound = slider.value;
            backgroundAudio.volume = (valueSound / 100)

        }
        if (endBossMusic) {
            valueSound = slider.value;
            endBossMusic.volume = (valueSound / 100)
        }
    }, 10)
}


slider.addEventListener("input", () => {
    valueSound = slider.value;
    updateSounds()
});



//key listener for holding and release
window.addEventListener("keydown", (e) => {
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