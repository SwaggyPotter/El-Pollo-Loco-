class bossStatusbar extends DrawableObject {
    width = 320;
    height = 80;
    y = 10;
    x = 360;
    percentage = 100;


    IMAGES_STATUSBAR = [
        'img/7_statusbars/3_icons/icon_health_endboss.png', //boss icon statusbar
        'img/7_statusbars/4_bar_elements/statusbar_empty-removebg-preview.png', // emty statusbar
        'img/7_statusbars/4_bar_elements/statusbar_green-removebg-preview.png' // full statusbar
    ]


    constructor() {
        super().loadImage('img/7_statusbars/4_bar_elements/statusbar_green-removebg-preview.png')
    }


    resolveImageIndex() {
        if (this.percentage == 100 || this.percentage > 100) {
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
        else if (this.percentage < 20) {
            return 0
        }
    }
}
