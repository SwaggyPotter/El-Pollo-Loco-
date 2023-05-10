class Endboss extends MovableObject {
    imageCache = {};
    height = 380
    width = 270
    currentImage = 0;
    y = 90
    theIntervall;
    speed = 2;
    awake = false;

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


    loadImages(img) {
        img.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


    attackCombination() {
        this.awake = true;
    }

    attackCounter = 0;
    animate() {
        this.theIntervall = setInterval(() => {
            // only walk if the boss is awake not dead and not hurt
            if (this.awake == true && !this.isDead() && !this.isHurt()) {
                if (this.attackCounter == 0) {
                    this.speed = 3;
                    this.moveLeft()
                    this.playAnimation(this.IMAGES_WALKING)
                    setTimeout(() => {
                        this.attackCounter = 1;
                    }, 2000)
                }
                else if (this.attackCounter == 1) {
                    this.playAnimation(this.IMAGES_ANGRY)
                    setTimeout(() => {
                        this.attackCounter = 2
                    }, 2000)
                }
                else if (this.attackCounter == 2) {
                    this.playAnimation(this.IMAGES_ATTACK);
                    this.moveLeft()
                    this.speed = 10;
                    setTimeout(() => {
                        this.attackCounter = 0
                    }, 2000)
                }
            }
            // kill the boss if he was awake and killed
            else if (this.isDead() && this.awake == true) {
                this.playAnimation(this.IMAGES_DEAD)
                setTimeout(() => {
                    clearInterval(this.theIntervall)
                    this.loadImage('img/4_enemie_boss_chicken/5_dead/G26.png')
                }, 230)
            }
            // hurt the boss if he is awake
            else if (this.isHurt() && this.awake == true) {
                this.playAnimation(this.IMAGES_HURT)
            }
        }, 230)
    }

}