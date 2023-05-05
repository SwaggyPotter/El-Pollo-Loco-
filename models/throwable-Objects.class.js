class throawbleObject extends MovableObject {
    constructor(x, y, direction) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png')
        console.log(direction)
        this.direction = direction;
        this.x = x + 120;
        this.y = y + 90;
        this.height = 80;
        this.width = 50;
        this.trow()
    }


    trow() {
        if (this.direction == false) {
            this.speedY = 10;
            this.applyGravity();
            setInterval(() => {
                this.x += 10;
            }, 50)
        }
        else if (this.direction == true) {
            this.speedY = 10;
            this.applyGravity();
            setInterval(() => {
                this.x += -10;
            }, 50)
        }
    }
}