class bottleThrowHandy extends MovableObject {
    x;
    y = 350;
    width = 90;
    height = 100;

    constructor(x) {
        super().loadImage('img/Handy_Buttons/bottle_throw_btn.png');
        this.x = x;
    }
}