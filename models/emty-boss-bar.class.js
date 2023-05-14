class emtyBossBar extends DrawableObject {
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
        super().loadImage('img/7_statusbars/4_bar_elements/statusbar_empty-removebg-preview.png')
    }
}