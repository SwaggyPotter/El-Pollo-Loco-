class throawbleObject extends MovableObject {

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png')
        this.x = x;
        this.y = y;
        this.height = 80;
        this.width = 50;
        this.trow()
    }

    trow() {
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            this.x += 10;
        }, 50)
    }
}