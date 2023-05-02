class MovableObject extends DrawableObject{
    speed = 0.15
    speedY = 0;
    acceleration = 1;
    energy = 100;
    lastHit = 0;


    isColliding(DM) {
        return this.x + this.width > DM.x &&
            this.y + this.height > DM.y &&
            this.x < DM.x &&
            this.y < DM.y + DM.height
    }


    hit(){
        
        if(this.energy <= 0){
            this.energy = 0;
        }
        else{
            this.lastHit = new Date().getTime();
            this.energy -= 5;
        }
    }

    isHurt(){
        let timespassed = new Date().getTime() - this.lastHit;
        timespassed = timespassed / 1000;
        return timespassed < 1;
    }

    isDead(){
        return this.energy == 0;
    }

    


    moveRight() {
        this.x += this.speed;
    }


    moveLeft() {
        this.x -= this.speed;
    }


    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY
                this.speedY -= this.acceleration
            }
        }, 1000 / 25)
    }


    isAboveGround() {
        return this.y < 97;
    }


    playAnimation(AnimationArr) {
        let i = this.currentImage % AnimationArr.length;
        let path = AnimationArr[i]
        this.img = this.imageCache[path]
        this.currentImage++
    }


    jump() {
        this.speedY = 20;
    }



   
}