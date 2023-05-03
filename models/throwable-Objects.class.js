class throawbleObject extends MovableObject {

    constructor(x,y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png')
        this.trow(this.x,this.y)
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