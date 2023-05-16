class deadCicken extends DrawableObject {
    y;
    x;
    chickenClass;
    width;
    height;

    constructor(y, x, chickenClass) {
        super().loadImage('img/3_enemies_chicken/chicken_normal/2_dead/dead.png')
        this.chickenClass = chickenClass;
        this.y = y - 50;
        this.x = x;

        if (this.chickenClass == 1) {
            this.loadImage('img/3_enemies_chicken/chicken_normal/2_dead/dead.png')
            this.y = y + 20;
            this.x = x;
            this.width = 110;
            this.height = 60;
        }

        else if (this.chickenClass == 2) {
            this.loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png')
            this.y = y + 50;
            this.x = x;
            this.width = 130;
            this.height = 40;
        }
    }
}