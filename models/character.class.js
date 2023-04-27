class Character extends MovableObject {
    height = 340
    width = 150
    y = 96
    imageCache = {};
    speed = 5;
    walkingSound = new Audio('audio/walking.mp3')

    IMAGES_WALKING =
        [
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
    world;
    currentImage = 0;

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png')
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.applyGravity();
        this.animate()
    }

    loadImages(img) {
        img.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    animate() {
        /*############*/
        //Moving Right//
        /*############*/
        setInterval(() => {
            this.walkingSound.pause();
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x * 4) {
                this.x += this.speed;
                this.otherDirection = false;
                this.walkingSound.play()
            }
            this.world.camera_x = 0 - this.x + 200


            /*################*/
            //Jumping function//
            /*###############*/
            if (this.world.keyboard.UP && !this.isAboveGround()) {
                this.speedY = 20;
            }
            
        }, 1000 / 60)
        setInterval(() => {
            if (this.world.keyboard.RIGHT) {
                //walk animation
                this.playAnimation(this.IMAGES_WALKING)
            }
        }, 50)


        /*############*/
        //Moving Left//
        /*############*/
        setInterval(() => {
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.x -= this.speed;
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
