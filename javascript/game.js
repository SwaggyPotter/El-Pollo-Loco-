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


// Start the initialization of the game.
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


// Check the screen width. If the screen is small, remove the fullscreen button.
function setFullscreenButton() {
    if (window.innerWidth > 1010) {
        document.getElementById('fullscreenBTN').style.display = 'flex';
    }
    else if (window.innerWidth < 1011) {
        document.getElementById('fullscreenBTN').style.display = 'none';
    }
}


// Show the handheld control button.
function showHandycontrolls() {
    if (window.innerWidth <= 1010) {
        addListenerHandyNormal();
        document.getElementById('handyControls').style.display = 'inline-block';
    }
}


//Add the button for window fullscreen on resize.
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


// change the boolean of the keyboard listener 
function addListenerHandyNormal() {
    let leftKey = document.getElementById('leftBtn');
    let rightKey = document.getElementById('rightBtn');
    let UpKey = document.getElementById('upBtn');
    let throwKey = document.getElementById('throwBottleBTN');
    listenerKeysTouchStart(leftKey, rightKey, UpKey, throwKey);
    listenerKeysTouchEnd(leftKey, rightKey, UpKey, throwKey);
}


// set the eventlistener for changing the value of the keyboard keys after pressing and holding
function listenerKeysTouchStart(leftKey, rightKey, UpKey, throwKey) {
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

}


// set the eventlistener for changing the value of the keyboard keys after release
function listenerKeysTouchEnd(leftKey, rightKey, UpKey, throwKey) {
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


// Set the key listner to his standart value after release
window.addEventListener('touchend', () => {
    keyboard.UP = false;
    keyboard.RIGHT = false;
    keyboard.LEFT = false;
    keyboard.D = false;
})


// Set the screen on full screen
function fullscreenListener() {
    fullscreenBTN.style.display = 'flex';
    fullscreenBTN.addEventListener('click', () => {
        toggleFullscreen(canvas);
    })
}

// fullscreen for diffrent browsers
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


//play button
function changePlayBTN2() {
    document.getElementById('startBTN').src = 'img/playBTN/playBTN.png';
}


//play button hover effect
function changePlayBTN() {
    document.getElementById('startBTN').src = 'img/playBTN/playBTN_hover.png';
}

//load the normal music and the boss music if the boss appear.
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


// Update the volume of the musik and the sounds
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


//read the slider input for the volume
slider.addEventListener("input", () => {
    valueSound = slider.value;
    updateSounds();
});



//key listener for holding
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


//key listener for release
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