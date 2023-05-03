class Level {
    enemies;
    backgrounds;
    clouds;
    coins;
    level_end_x = 700;
    

    constructor(enemies, clouds, backgrounds, coins) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgrounds = backgrounds;
        this.coins = coins;
    }
}