class MovableObject extends DrawableObject {
    speed = 0.15
    speedY = 0;
    acceleration = 1;
    energy = 100;
    lastHit = 0;
    otherDirection = false;
    awake = false;
    fromAbove = 0;


    /**
     * Check if an object is colliding.
     */
    isColliding(DM) {
        return this.x + (this.width - 50) > DM.x &&
            this.y + this.height > DM.y &&
            this.x < DM.x &&
            this.y < DM.y + DM.height
    }


    /**
     * Apply damage to the object.
     */
    hit() {
        if (this.energy <= 0) {
            this.energy = 0;
        }
        else {
            this.lastHit = new Date().getTime();
            this.energy -= 10;
        }
    }


    /**
     * Check if the object was hurt in the last second.
     * @returns - 1 second
     */
    isHurt() {
        let timespassed = new Date().getTime() - this.lastHit;
        timespassed = timespassed / 1000;
        return timespassed < 1;
    }


    /**
     * Check if the energy of the object is 0.
     * @returns - energy 0 = dead
     */
    isDead() {
        return this.energy == 0;
    }


    /**
     * Move the object to the right.
     */
    moveRight() {
        this.x += this.speed;
    }


    /**
     * Move the object to the left.
     */
    moveLeft() {
        this.x -= this.speed;
    }


    /**
     * Let the end boss move to the left.
     */
    endbossAttack() {
        setInterval(() => {
            this.moveLeft()
        })
    }


    /**
     * Pull the object to the ground
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY
                this.speedY -= this.acceleration
            }
        }, 1000 / 25)
    }


    /**
     * Pull the character to the ground
     */
    applyGravityCharacter() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY
                this.speedY -= this.acceleration
            }
        }, 22)
    }


    /**
     * Check if the object is above the ground.
     * @returns -True for bottles
     * @returns - y bigger than 97.
     */
    isAboveGround() {
        if (this instanceof throawbleObject) {
            return true;
        }
        else {
            return this.y < 97;
        }
    }


    /**
     * Loop over an array of pictures
     * @param {Array} AnimationArr - Array of pictures
     */
    playAnimation(AnimationArr) {
        let i = this.currentImage % AnimationArr.length;
        let path = AnimationArr[i]
        this.img = this.imageCache[path]
        this.currentImage++
    }


    /**
     * Function for jumping, it set the position of the character higher.
     */
    jump() {
        this.speedY = 20;
    }
}