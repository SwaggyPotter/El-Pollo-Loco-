class World_extension {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = -100;
    statusbar = new StatusBar;
    coinbar = new Coinbar;
    broke = false;
    bottle = new throawbleObject();
    bottleBar = new BottleBar();
    bottleInAir = 0;
    deadChicken = new deadCicken();
    bossChicken = this.level.enemies.length - 1
    bossStatusBar = new bossStatusbar();
    emtyBossBar = new emtyBossBar();
    bossChickenEmbleme = new bossBarChickenEmbleme();
    endscreen = new endscreen(bossDead);
    handyController = new handyControl();
    handyBottleThrowBTN = new bottleThrowHandy((canvas.width - 120));
    bossInNear = 0;
    throwChecker;
    damageCounter = 0;
    hurtCounter = 0;
    hurtSoundcounter = 0;
    bossTrigger = 0;
    hitCounter = 0;
    hitIntervall;
    swooshBottle;
    bossFightIntervall;


    checkForCharDead() {
        let charIntervall = setInterval(() => {
            if (this.character.energy == 0 || this.character.energy < 0) {
                setTimeout(() => {
                    this.stopGame();
                }, 5000)
                clearInterval(charIntervall)
            }
        }, 50)
    }


    stopGame() {
        if (bossDead == 0) {
            this.level.enemies[this.bossChicken].energy = 0;
        }
        gameStartet = 0;
        bossDead = 0;
        this.pauseMusic()
        this.character.energy = 100;
        this.bossInNear = 0;
        this.level.enemies = [];
        this.bottleBar.percentage = 0;
        musicOn = 0;
        clearInterval(this.hurtIntervall)
        clearInterval(this.bossFightIntervall)
        clearInterval(idleIntervall)
        document.getElementById('startPic').style.visibility = 'visible';
        document.getElementById('startBTN').style.visibility = 'visible';
    }


    catchBottle(bottles) {
        this.bottleBar.percentage += 10;
        this.bottleBar.setPercentage(this.bottleBar.percentage);
        this.deleteObjectByXCoordinate(this.level.salsabottles, bottles['x'])
        let audio = new Audio('audio/coin-catch.mp3');
        audio.volume = (valueSound / 100)
        audio.play();
    }


    catchCoin(coin) {
        this.coinbar.percentage += 20;
        this.coinbar.setPercentage(this.coinbar.percentage);
        this.deleteObjectByXCoordinate(this.level.coins, coin['x'])
        let audio = new Audio('audio/coin-catch.mp3');
        audio.volume = (valueSound / 100)
        audio.play();
    }


    bottleEnemyCollisionchecker() {
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (this.bottle.isColliding(enemy)) {
                    this.glasBreakSound()
                    if (enemy.energy == 20 && enemy instanceof chicken) {
                        this.deleteObjectByXCoordinate(this.level.enemies, enemy['x'])
                        this.killEnemy(enemy, this.broke, this.bottle)
                    }
                    if (enemy.energy == 20 && enemy instanceof littleChicken) {
                        this.deleteObjectByXCoordinate(this.level.enemies, enemy['x'])
                        this.killEnemy(enemy, this.broke, this.bottle)
                    }
                    else if (enemy.energy > 20 && enemy instanceof Endboss) {
                        this.hitTheBoss(enemy, this.broke, this.bottle)
                    }
                    else if (enemy.energy == 20 && enemy instanceof Endboss) {
                        this.killTheBoss(this.bottle, this.broke, enemy)
                    }
                }
            })
        }, 200);
    }
}