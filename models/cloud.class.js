class cloud extends MovableObject {
    y = 30
    width = 400
    height = 300


    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png')
        this.x = Math.random() * 500; // Zahl zwischen 200 und 700
        this.cloadAnimation()
    }

    
    cloadAnimation() {
        this.moveLeft()
    }
}