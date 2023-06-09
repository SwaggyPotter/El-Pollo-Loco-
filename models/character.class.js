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
    fromeAbove = 0;
    

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
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-34.png',
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


    NORMAL_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
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
        this.loadImages(this.NORMAL_IDLE);
        this.applyGravityCharacter();
        this.animate();
        this.toLongInIdleChecker();
        this.bossDeadChecker();
    }


    /**
    * Execute the jump, play the jump sound, and let us know if the character came from above.
    */
    jumpFunc() {
        this.jumping = setInterval(() => {
            if (this.world.keyboard.UP && !this.isAboveGround()) {
                this.jump();
                setTimeout(() => {
                    fromeAbove = 1;
                    setTimeout(() => {
                        fromeAbove = 0;
                    }, 450)
                }, 450)
                if (this.jumpSoundCounter == 0) {
                    this.playJumpSound()
                }
            }
        }, 1000 / 60)
    }


    /**
     * Instant normal idle animation
    * Play the 'too long' idle animation after 5 seconds.
    */
    toLongInIdleChecker() {
        idleIntervall = setInterval(() => {
            if (this.toLongInIdleCounter <= 20 && this.toLongInIdleCounter >= 0 && !this.isDead() && !this.isAboveGround() && !this.isHurt() && !this.world.keyboard.LEFT && !this.world.keyboard.RIGHT) {
                this.toLongInIdleCounter++
                this.playAnimation(this.NORMAL_IDLE)
            }
            else if (this.toLongInIdleCounter > 20) {
                this.playAnimation(this.TO_LONG_IDLE)
            }
        }, 250)
    }


    /**
     * Handle all the character animations.
     */
    animate() {
        this.moveRightFunc();
        this.moveLeftFunc();
        this.jumpFunc();
        this.jumpAnimationHandler();
        this.deadOrHurtChecker();
        this.setCharacterInIdle();
    }


    /**
     * Play the idle animation 
     */
    setCharacterInIdle() {
        setInterval(() => {
            if (this.world.keyboard.LEFT && !this.isAboveGround() && !this.isDead() && !this.isHurt()) {
                this.walkingSound.pause();
                this.playAnimation(this.IMAGES_WALKING)
                this.toLongInIdleCounter = 0;
                this.normalIdlecounter = 0;
            }
        }, 50)
    }


    /**
     * Play the jump sound 
     */
    playJumpSound() {
        this.jumpSoundCounter++
        let audio = new Audio('audio/cartoon-jump-6462.mp3');
        audio.volume = (valueSound / 100)
        audio.play();
        setTimeout(() => {
            this.jumpSoundCounter = 0;
        }, 1000)
    }


    /**
     * If the boss is dead, clear all active intervals that are moving the character to freeze its movement.
     */
    bossDeadChecker() {
        setInterval(() => {
            if (bossDead == 1) {
                clearInterval(this.deadHurtIntervall)
                clearInterval(this.jumping)
                clearInterval(this.walkingRight)
                clearInterval(this.walkingLeft)
            }
        }, 10)
    }


    /**
    * Function for the moving right animation.
    */
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


    /**
    * Function for the moving left animation
    */
    moveLeftFunc() {
        this.walkingLeft = setInterval(() => {
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.otherDirection = true;
                this.walkingSound.play()
            }
        }, 1000 / 60)
    }


    /**
    * Handle the animation for jumping
    */
    jumpAnimationHandler() {
        this.jumpIntervall = setInterval(() => {
            if (this.isAboveGround() && !this.isDead() && this.animationCounter < 1 && !this.isHurt()) {
                this.animationCounter++
                this.jumptAnimationIntervall()
                this.toLongInIdleCounter = 0;
                setTimeout(() => {
                    this.animationCounter = 0;
                }, 900)
            }
        }, 50)
    }


    /**
     * Play the animation with the pictures in the diffrent arrays
     */
    jumptAnimationIntervall() {
        let counter = 0;
        let jumpingAnimation = setInterval(() => {
            this.playAnimation(this.IMAGES_JUMPING)
            counter++
            if (counter == 5) {
                clearInterval(jumpingAnimation)
                counter++
                this.loadImage('img/2_character_pepe/3_jump/J-35.png')
                setTimeout(() => {
                    this.fallAndLandingIntervall(counter)
                }, 200)
            }
        }, 50)
    }


    /**
     * 
     * @param {number} counter - The counter from jumptAnimationIntervall for playing the animation
     */
    fallAndLandingIntervall(counter) {
        let fallIntervall = setInterval(() => {
            this.fallingIntervall()
            counter++
            if (counter == 7) {
                clearInterval(fallIntervall);
                this.landingIntervall(counter);
            }
        }, 100)
    }


    /**
     * Playing the two pictures of the falling array
     */
    fallingIntervall() {
        this.playAnimation(this.IMAGES_FALLING);
        this.loadImage('img/2_character_pepe/3_jump/J-37.png');
    }


    /**
     * 
     * @param {number} counter - The counter from jumptAnimationIntervall for playing the animation
     */
    landingIntervall(counter) {
        setTimeout(() => {
            let landingIntervall = setInterval(() => {
                this.playAnimation(this.IMAGES_LANDING);
                counter++;
                if (counter == 9) {
                    clearInterval(landingIntervall);
                }
            }, 100)
        }, 150)
    }


    /**
     * Play the animation for getting hurt or dying
     */
    deadOrHurtChecker() {
        this.deadHurtIntervall = setInterval(() => {
            if (this.isDead()) {
                this.killHim()
            }
            else if (this.isHurt()) {
                this.hurtHim();
            }
            else if (this.world.keyboard.RIGHT && !this.isAboveGround() && !this.isDead()) {
                this.playAnimation(this.IMAGES_WALKING)
                this.toLongInIdleCounter = 0;
            }
        }, 50)
    }


    /**
     * The animation for getting killed
     */
    killHim() {
        this.playAnimation(this.IMAGES_DEAD)
        setTimeout(() => {
            this.loadImage('img/2_character_pepe/5_dead/D-56.png')
            this.clearAllIntervalls();
        }, 200)
    }


    /**
     * The animation for getting hurt
     */
    hurtHim() {
        this.playAnimation(this.IMAGES_HURT)
        this.hurtCounter++
        this.toLongInIdleCounter = 0;
        setTimeout(() => {
            this.hurtCounter = 0
        }, 1000)
    }


    /**
     * Clear all animation intervalls after dying
     */
    clearAllIntervalls() {
        clearInterval(this.deadHurtIntervall)
        clearInterval(this.jumping)
        clearInterval(this.walkingRight)
        clearInterval(this.walkingLeft)
    }
}