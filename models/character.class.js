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
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
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


    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png')
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.applyGravity();
        this.animate()
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


        this.jumping = setInterval(() => {
            /*################*/
            //Jumping function//
            /*###############*/
            if (this.world.keyboard.UP && !this.isAboveGround()) {
                this.jump();
            }
        }, 1000 / 60)


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
                setTimeout(() => {
                    this.hurtCounter = 0
                }, 1000)
            }

            else if (this.world.keyboard.RIGHT && !this.isAboveGround() && !this.isDead()) {
                //walk animation
                this.playAnimation(this.IMAGES_WALKING)
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
            }
        }, 50)


        this.jumpIntervall = setInterval(() => {
            if (this.isAboveGround() && !this.isDead() && this.animationCounter < 1) {
                this.animationCounter++
                this.playAnimation(this.IMAGES_JUMPING)
                setTimeout(() => {
                    this.loadImage('img/2_character_pepe/3_jump/J-37.png')
                    setTimeout(() => {
                        this.animationCounter = 0;
                    }, 1000)
                }, 10)
            }
            else if (!this.isAboveGround() && !this.isDead() && this.hurtCounter == 0) {
                this.loadImage('img/2_character_pepe/1_idle/idle/I-1.png')
            }
        }, 550)
    }
}
