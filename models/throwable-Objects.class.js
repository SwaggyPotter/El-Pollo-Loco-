class throawbleObject extends MovableObject {
    height = 80;
    width = 70;
    y;
    broke = false;
    animationCounter = 0;
    splashAnimation;


    BOTTLE_SPIN = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];


    BOTTLE_BROKE = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ]


    constructor(x, y, direction, broke) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png')
        this.loadImages(this.BOTTLE_SPIN);
        this.loadImages(this.BOTTLE_BROKE);
        this.direction = direction;
        this.x = x + 50;
        this.y = y + 100;
        this.broke = broke;
        this.trow()
        this.animate();
    }


    /**
     * Animate the bottle rotation and the splash animation if it brokes
     */
    animate() {
        if (this.broke == undefined) {
            setInterval(() => {
                this.playAnimation(this.BOTTLE_SPIN)
            }, 50)
        }
        else if (this.broke == false) {
            setInterval(() => {
                this.playAnimation(this.BOTTLE_SPIN)
            }, 50)
        }
        else if (this.broke == true) {
            if (this.animationCounter == 0) {
                this.bottleBrokeAnimation()
            }
        }
    }


    /**
     * Play the split animation
     */
    bottleBrokeAnimation() {
        this.animationCounter++
        this.speedY = 0;
        this.splashAnimation = setInterval(() => {
            this.playAnimation(this.BOTTLE_BROKE)
        }, 50)
        setTimeout(() => {
            this.animationCounter = 0;
        }, 1000)
        setTimeout(() => {
            clearInterval(this.splashAnimation);
            this.loadImage('img/emptyPNG.png');
        }, 350)
    }


    /**
     * Function checkout the direction the player is looking and apply the gravity
     */
    trow() {
        if (this.direction == false && this.broke == false) {
            this.throwRight()
        }
        else if (this.direction == true && this.broke == false) {
            this.throwLeft()
        }
        else {
            this.nothing()
        }
    }


    nothing() {
        this.speedY = 0;
        this.applyGravity();
        setInterval(() => {
            this.x += 0;
        }, 50)
    }


    throwLeft() {
        this.speedY = 10;
        this.applyGravity();
        setInterval(() => {
            this.x += -10;
        }, 50)
    }


    throwRight() {
        this.speedY = 10;
        this.applyGravity();
        setInterval(() => {
            this.x += 10;
        }, 50)
    }
}