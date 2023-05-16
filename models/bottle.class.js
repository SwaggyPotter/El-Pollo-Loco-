class SalsaBottle extends MovableObject {
    height = 80
    width = 70
    y = 350


    IMAGES_SALSABOTTLE = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ]


    constructor() {
        super().loadImage(this.rdmBottlePos())
        this.x = 200 + Math.random() * 1500;
        this.loadImages(this.IMAGES_SALSABOTTLE);
    }


    rdmBottlePos() {
        let rdmNumer = Math.floor(Math.random() * 10)
        if (rdmNumer <= 5) {
            return 'img/6_salsa_bottle/1_salsa_bottle_on_ground.png';
        }
        else if (rdmNumer > 5) {
            return 'img/6_salsa_bottle/2_salsa_bottle_on_ground.png';
        }
    }
}