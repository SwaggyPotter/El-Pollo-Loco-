class Endboss extends MovableObject {
    imageCache = {};
    height = 380
    width = 270
    currentImage = 0;
    y = 90
    theIntervall;
    speed = 3;
    awake = false;
    attackCounter = 0;
    attackSoundcounter = 0;


    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ]


    IMAGES_ANGRY = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ]


    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ]


    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ]


    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ]


    constructor() {
        super().loadImage('img/4_enemie_boss_chicken/5_dead/G26.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ANGRY);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 2500;
        this.animate()
    }


    animate() {
        this.theIntervall = setInterval(() => {
            if (bossDead == 1) {
                clearInterval(this.theIntervall)
            }
            if (bossDead == null) {
                clearInterval(this.theIntervall)
            }
            if (this.awake == true && !this.isDead()) {
                this.attackStack();//attack combination of the boss chicken
            }
            if (this.isHurt() && this.awake == true) {
                this.playAnimation(this.IMAGES_HURT);// hurt the boss if he is awake
            }
            else if (this.isDead() && this.awake == true) {
                this.killTheBoss();// kill the boss animation if he was awake and get killed
            }
        }, 230)
    }


    /**
     * Preload the arrays with the images for the animation
     * 
     * @param {*} img - Array of images
     */
    loadImages(img) {
        img.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


    /**
     * Perform the die aniamtion of the boss chicken
     */
    killTheBoss() {
        this.playAnimation(this.IMAGES_DEAD)
        setTimeout(() => {
            clearInterval(this.theIntervall)
            this.loadImage('img/4_enemie_boss_chicken/5_dead/G26.png')
        }, 230)
    }


    /**
     * Boolean if you in the near of the boss
     */
    attackCombination() {
        this.awake = true;
    }


    /**
     * Start the diffrent attacks
     */
    attackStack() {
        if (this.attackCounter == 0) {
            this.attack1();
        }
        else if (this.attackCounter == 1) {
            this.attack2();
        }
        else if (this.attackCounter == 2) {
            this.attack3();
        }
    }


    attack1() {
        this.speed = 3;
        this.moveLeft()
        this.playAnimation(this.IMAGES_WALKING)
        setTimeout(() => {
            this.attackCounter = 1;
            this.attackSoundcounter = 0;
        }, 2000)
    }


    attack2() {
        this.playAnimation(this.IMAGES_ANGRY)
        setTimeout(() => {
            this.attackCounter = 2
            if (this.attackSoundcounter == 0) {
                this.moveLeft();
                let audio = new Audio('audio/boss-attack.mp3');
                audio.play();
                audio.volume = (valueSound / 100)
                this.attackSoundcounter++
            }
        }, 2000)
    }


    attack3() {
        this.playAnimation(this.IMAGES_ATTACK);
        this.moveLeft()
        this.speed = 30;
        setTimeout(() => {
            this.attackCounter = 0
        }, 2000)
    }
}