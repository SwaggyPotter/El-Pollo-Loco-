class Coins extends MovableObject {
    height = 80
    width = 70
    y = 350


    IMAGES_COIN = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png',
    ]


    constructor() {
        super().loadImage('img/8_coin/coin_1.png')
        this.x = 200 + Math.random() * 1500; // Zahl zwischen 200 und 700
        this.loadImages(this.IMAGES_COIN);
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate()
    }


    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COIN)
        }, 200)
    }
}