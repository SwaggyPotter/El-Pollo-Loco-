class Level {
    enemies;
    backgrounds;
    clouds;
    coins;
    salsabottles;
    level_end_x = 700;

    constructor(enemies, clouds, backgrounds, coins, salsabottles) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgrounds = backgrounds;
        this.coins = coins;
        this.salsabottles = salsabottles;
    }
}