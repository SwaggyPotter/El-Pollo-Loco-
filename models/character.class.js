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
        this.animate()
        this.toLongInIdleChecker()
    }


    playJumpSound() {
        this.jumpSoundCounter++
        let audio = new Audio('audio/cartoon-jump-6462.mp3');
        audio.play();
        setTimeout(() => {
            this.jumpSoundCounter = 0;
        }, 1000)
    }


    animate() {
        /*############*/
        //Moving Right//
        /*############*/
        this.walkingRight = setInterval(() => {
            this.walkingSound.pause();
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x * 4) {
                this.moveRight();
                this.otherDirection = false;
                this.walkingSound.play()
            }
            this.world.camera_x = 0 - this.x + 200
        }, 1000 / 60)


        /*################*/
        //Jumping function//
        /*###############*/
        this.jumping = setInterval(() => {
            if (this.world.keyboard.UP && !this.isAboveGround()) {
                this.jump();
                if (this.jumpSoundCounter == 0) {
                    this.playJumpSound()
                }
            }
        }, 1000 / 60)


        /*/////////////////////////////////
        //check if you dead or getting hurt
        /////////////////////////////////*/
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



        /*############*/
        //Moving Left//
        /*############*/
        this.walkingLeft = setInterval(() => {
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.otherDirection = true;
                this.walkingSound.play()
            }
        }, 1000 / 60)


        setInterval(() => {
            if (this.world.keyboard.LEFT && !this.isAboveGround() && !this.isDead()) {
                this.walkingSound.pause();
                this.playAnimation(this.IMAGES_WALKING)
                this.toLongInIdleCounter = 0;
            }
        }, 50)


        /*/////////////////////////////////////////
        handle the jump animation and the intervall
        /////////////////////////////////////////*/
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
        console.log('Jump Animation')
        let counter = 0;
        let jumpingAnimation = setInterval(() => {
            this.playAnimation(this.IMAGES_JUMPING)
            counter++
            if (counter == 5) {
                clearInterval(jumpingAnimation)
                this.loadImage('img/2_character_pepe/3_jump/J-35.png')
                setInterval(() => {
                    if (counter == 15) {
                        counter++
                        clearInterval(jumpingAnimation)
                        this.playAnimation(this.IMAGES_FALLING)
                    }
                }, 80)
            }
        }, 80)
    }

    /*//////////////////////////////////////
    start the idle animation after 5 seconds
    //////////////////////////////////////*/
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
