class chicken extends MovableObject {
    height = 80
    width = 70
    y = 350
    currentImage = 0;
    imageCache = {};

    IMAGES_WALKING =
        [
            'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
            'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
            'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
        ]

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')
        this.x = 200 + Math.random() * 500; // Zahl zwischen 200 und 700
        this.loadImages(this.IMAGES_WALKING);
        this.speed = 0.15 + Math.random() * 0.5;
        this.moveLeft();
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