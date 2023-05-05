 class Character extends MovableObject {
    height = 340
    width = 150
    y = 96
    speed = 5;
    walkingSound = new Audio('audio/walking.mp3')
    


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
        'img/2_character_pepe/3_jump/J-39.png',
    ]


    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',

    ]

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',
    ]

    world;
    currentImage = 0;


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
        setInterval(() => {
            this.walkingSound.pause();
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x * 4) {
                this.moveRight();
                this.otherDirection = false;
                this.walkingSound.play()

            }
            this.world.camera_x = 0 - this.x + 200


            /*################*/
            //Jumping function//
            /*###############*/
            if (this.world.keyboard.UP && !this.isAboveGround()) {
                this.jump();
            }

        }, 1000 / 60)


        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD)
            }
            else if(this.isHurt()){
                this.playAnimation(this.IMAGES_HURT)
            }
            else if (this.world.keyboard.RIGHT) {
                //walk animation
                this.playAnimation(this.IMAGES_WALKING)
            }
        }, 50)


        /*############*/
        //Moving Left//
        /*############*/
        setInterval(() => {
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.otherDirection = true;
                this.walkingSound.play()
            }
        }, 1000 / 60)


        setInterval(() => {
            if (this.world.keyboard.LEFT) {
                this.walkingSound.pause();
                //walk animation
                this.playAnimation(this.IMAGES_WALKING)
            }

            if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING)
            }
        }, 50)
    }
}
