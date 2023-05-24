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


function init() {
    initLevel();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    document.getElementById('startPic').style.display = 'none';
    document.getElementById('startBTN').style.display = 'none';
    valueSound = slider.value;
    fullscreenListener();
    addHandyKeyListener();
    addCoordinateListener();
    loadMusic();
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

function addHandyKeyListener() {

    window.addEventListener('touchstart', () => {
        // x = left 1 - 65; y = 389 - 438;
        if (screenTouchX >= 1 && screenTouchX <= 65 && screenTouchY >= (canvas.height - 245) && screenTouchY <= (canvas.height - 10)) {
            keyboard.LEFT = true;
        }

        // x = 111 - 176; y = 389 - 438; 
        if (screenTouchX >= 111 && screenTouchX <= 176 && screenTouchY >= (canvas.height - 245) && screenTouchY <= (canvas.height - 10)) {
            keyboard.RIGHT = true
        }

        // x = 65 - 118; y = 312 - 376
        if (screenTouchX >= 65 && screenTouchX <= 118 && screenTouchY >= (canvas.height - 250) && screenTouchY <= (canvas.height - 180)) {
            keyboard.UP = true;
        }


        if (screenTouchX >= window.innerWidth - 120 && screenTouchX <= window.innerWidth && screenTouchY >= (canvas.height - 250) && screenTouchY <= (canvas.height - 150)) {
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
}






function fullscreenListener() {
    fullscreenBTN.style.display = 'flex';
    fullscreenBTN.addEventListener('click', () => {
        toggleFullscreen(canvas)
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
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { // Firefox
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { // Chrome, Safari, Opera
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { // IE/Edge
            document.msExitFullscreen();
        }
    }
}


/*/////////////////////////
play button + hover effect
/////////////////////////*/

function changePlayBTN() {
    document.getElementById('startBTN').src = 'img/playBTN/playBTN_hover.png';
}


function changePlayBTN2() {
    document.getElementById('startBTN').src = 'img/playBTN/playBTN.png';
}


function loadMusic() {
    if (musicOn == 0) {
        backgroundAudio = new Audio('audio/tex-mex-delight-mexican-mariachi-113044.mp3')
        backgroundAudio.play();
        backgroundAudio.volume = (valueSound / 100)
        musicOn = 1
    }
    else if (musicOn == 2) {
        endBossMusic = new Audio('audio/enboss-music.mp3') // add new boss music
        backgroundAudio.pause()
        endBossMusic.volume = (valueSound / 100)
        endBossMusic.play()
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


/*//////////////////////////////////
key listener for holding and release
//////////////////////////////////*/

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

