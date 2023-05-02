class throawbleObject extends MovableObject {
    constructor() {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.trow(110, 110)
    }

    trow(x, y) {
        this.x = x;
        this.y = y;
        this.height = 80;
        this.width = 50;
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            this.x += 10;
        }, 50)
    }
}