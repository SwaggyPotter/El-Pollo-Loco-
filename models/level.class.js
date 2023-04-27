class Level {
    enemies;
    backgrounds;
    clouds;
    level_end_x = 700;

    constructor(enemies, clouds, backgrounds) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgrounds = backgrounds;
    }
}