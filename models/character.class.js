class Character extends MovableObject {
    height = 340
    width = 150
    y = 96
    speed = 5;
    walkingSound = new Audio('audio/walking.mp3')
    animationCounter = 0;
    deadHurtIntervall;
    jumpImgcounter = 0;
    walkingLeft;
    walkingRight;
    jumping;
    throw;
    hurtCounter = 0;
    world;
    currentImage = 0;
    toLongInIdleCounter = 0;
    jumpSoundCounter = 0;


    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ]


    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
    ]


    IMAGES_FALLING = [
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png'
    ]


    IMAGES_LANDING = [
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ]


    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png'
    ]


    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ]

    
    TO_LONG_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ]


    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png')
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_FALLING);
        this.loadImages(this.IMAGES_LANDING);
        this.loadImages(this.TO_LONG_IDLE);
        this.applyGravity();
        this.animate();
        this.toLongInIdleChecker();
        this.bossDeadChecker();
    }


    animate() {
        this.moveRightFunc();
        this.moveLeftFunc();
        this.jumpFunc();
        this.jumpAnimationHandler();
        this.deadOrHurtChecker();
        setInterval(() => {
            if (this.world.keyboard.LEFT && !this.isAboveGround() && !this.isDead()) {
                this.walkingSound.pause();
                this.playAnimation(this.IMAGES_WALKING)
                this.toLongInIdleCounter = 0;
            }
        }, 50)
    }


    playJumpSound() {
        this.jumpSoundCounter++
        let audio = new Audio('audio/cartoon-jump-6462.mp3');
        audio.volume = (valueSound / 100)
        audio.play();
        setTimeout(() => {
            this.jumpSoundCounter = 0;
        }, 1000)
    }


    bossDeadChecker() {
        setInterval(() => {
            if (bossDead == 1) {
                clearInterval(this.deadHurtIntervall)
                clearInterval(this.jumping)
                clearInterval(this.walkingRight)
                clearInterval(this.walkingLeft)
                this.loadImage('img/2_character_pepe/1_idle/idle/I-1.png')
            }
        }, 10)
    }


    // Function for the moving right animation
    moveRightFunc() {
        this.walkingRight = setInterval(() => {
            this.walkingSound.pause();
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x * 4) {
                this.moveRight();
                this.otherDirection = false;
                this.walkingSound.volume = (valueSound / 100)
                this.walkingSound.play()
            }
            this.world.camera_x = 0 - this.x + 200
        }, 1000 / 60)
    }


    // Function for the moving left animation
    moveLeftFunc() {
        this.walkingLeft = setInterval(() => {
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.otherDirection = true;
                this.walkingSound.play()
            }
        }, 1000 / 60)
    }


    // Function for the jumping animation
    jumpFunc() {
        this.jumping = setInterval(() => {
            if (this.world.keyboard.UP && !this.isAboveGround()) {
                this.jump();
                setTimeout(() => {
                    fromeAbove = 1;
                    setTimeout(() => {
                        fromeAbove = 0;
                    }, 800)
                }, 800)
                if (this.jumpSoundCounter == 0) {
                    this.playJumpSound()
                }
            }
        }, 1000 / 60)
    }


    jumpAnimationHandler() {
        this.jumpIntervall = setInterval(() => {
            if (this.isAboveGround() && !this.isDead() && this.animationCounter < 1) {
                this.animationCounter++
                this.jumptAnimationIntervall()
                this.toLongInIdleCounter = 0;
                setTimeout(() => {
                    this.animationCounter = 0;
                }, 1600)
            }
            else if (!this.isAboveGround() && !this.isDead() && this.hurtCounter == 0 && this.toLongInIdleCounter < 10 && !this.world.keyboard.LEFT && !this.world.keyboard.RIGHT) {
                this.loadImage('img/2_character_pepe/1_idle/idle/I-1.png')
            }
        }, 50)
    }


    jumptAnimationIntervall() {
        let counter = 0;
        let jumpingAnimation = setInterval(() => {
            this.playAnimation(this.IMAGES_JUMPING)
            counter++
            if (counter == 5) {
                clearInterval(jumpingAnimation)
                counter++
                setTimeout(() => {
                    this.loadImage('img/2_character_pepe/3_jump/J-35.png')
                }, 100)
                setTimeout(() => {
                    let fallIntervall = setInterval(() => {
                        this.fallingIntervall()
                        counter++
                        if (counter == 7) {
                            clearInterval(fallIntervall)
                            this.landingIntervall(counter);
                        }
                    },50)
                }, 650)
            }
        }, 80)
    }


    fallingIntervall() {
        this.playAnimation(this.IMAGES_FALLING)
        this.loadImage('img/2_character_pepe/3_jump/J-37.png')
    }


    landingIntervall(counter) {
        setTimeout(() => {
            let landingIntervall = setInterval(() => {
                this.playAnimation(this.IMAGES_LANDING)
                counter++
                if (counter == 9) {
                    clearInterval(landingIntervall)
                }
            }, 50)
        }, 450)
    }


    deadOrHurtChecker() {
        this.deadHurtIntervall = setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD)
                setTimeout(() => {
                    this.loadImage('img/2_character_pepe/5_dead/D-56.png')
                    clearInterval(this.deadHurtIntervall)
                    clearInterval(this.jumping)
                    clearInterval(this.walkingRight)
                    clearInterval(this.walkingLeft)
                }, 200)
            }

            else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT)
                this.hurtCounter++
                this.toLongInIdleCounter = 0;
                setTimeout(() => {
                    this.hurtCounter = 0
                }, 1000)
            }

            else if (this.world.keyboard.RIGHT && !this.isAboveGround() && !this.isDead()) {
                this.playAnimation(this.IMAGES_WALKING)
                this.toLongInIdleCounter = 0;
            }
        }, 50)
    }


    //idle after 5 seconds
    toLongInIdleChecker() {
        setInterval(() => {
            if (this.toLongInIdleCounter <= 10 && this.toLongInIdleCounter >= 0) {
                this.toLongInIdleCounter++
            }
            else if (this.toLongInIdleCounter > 10) {
                this.playAnimation(this.TO_LONG_IDLE)
            }
        }, 500)
    }
}
