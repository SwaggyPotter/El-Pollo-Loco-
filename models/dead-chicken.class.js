class deadCicken extends DrawableObject {
    y;
    x;


    constructor(y, x) {
        super().loadImage('img/3_enemies_chicken/chicken_normal/2_dead/dead.png')
        this.y = y -50;
        this.x = x;
    }
}