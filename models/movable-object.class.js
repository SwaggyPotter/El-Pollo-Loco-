class MovableObject {
    x = 120;
    y = 300;
    img;
    height = 150;
    width = 100;
    speed = 0.15
    otherDirection = false;
    speedY = 0;
    acceleration = 1;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    moveRight() {
        console.log('Moving right')
    }

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed
        }, 1000 / 60)
    }


    applyGravity(){
        setInterval(()=>{
            if(this.isAboveGround() || this.speedY > 0){
                this.y -= this.speedY
                this.speedY -= this.acceleration
            }
        },1000/25)
    }

    isAboveGround(){
        return this.y < 97 ;
    }

    playAnimation(AnimationArr) {
        let i = this.currentImage % this.IMAGES_WALKING.length;
        let path = AnimationArr[i]
        this.img = this.imageCache[path]
        this.currentImage++
    }
}