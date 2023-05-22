class endscreen extends DrawableObject {
    x = 0;
    y = 0;
    z;
    width = canvas.width;
    height = canvas.height;

    constructor(z) {
        super().loadImage('img/9_intro_outro_screens/game_over/game over!.png')
        this.z = z;
        this.chosseEndscreen(this.z)
    }

    chosseEndscreen(z) {
        if (z == 0) {
            this.loadImage('img/9_intro_outro_screens/game_over/oh no you lost!.png')
        }
        else if (z == 1) {
            this.loadImage('img/9_intro_outro_screens/game_over/game over!.png')
        }
    }
}