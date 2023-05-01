class StatusBar extends DrawableObject {
    IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png'
    ]

    percentage = 100;

    constructor() {
        this.loadImages(this.IMAGES)
    }


    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIdex()];
        this.img = this.imageCache[path];
    }

    resolveImageIdex() {
        if (this.percentage == 100) {
            return 5
        }
        else if (this.percentage < 100 && this.percentage >= 80) {
            return 4
        }
        else if (this.percentage < 80 && this.percentage >= 60) {
            return 3
        }
        else if (this.percentage < 60 && this.percentage >= 40) {
            return 2
        }
        else if (this.percentage < 40 && this.percentage >= 20) {
            return 1
        }
        else if (this.percentage == 0) {
            return 0
        }
    }
}