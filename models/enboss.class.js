class Endboss extends MovableObject {
    imageCache = {};
    height = 380
    width = 270
    currentImage = 0;
    y = 90

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
        ]




    constructor() {
        super().loadImage('img/4_enemie_boss_chicken/1_walk/G1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = 400;
        this.animate()
    }

    loadImages(img) {
        img.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING)
        }, 200)
    }

}