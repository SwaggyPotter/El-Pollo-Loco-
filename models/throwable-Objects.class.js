class throawbleObject extends MovableObject {

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png')
        this.x = x + 120;
        this.y = y + 90;
        this.height = 80;
        this.width = 50;
        this.trow()
    }

    trow() {
        this.speedY = 10;
        this.applyGravity();
        setInterval(() => {
            this.x += 10;
        }, 50)
    }
}