class World {
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


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.checkForBossFight()
        this.checkForCharDead()
    }


    setWorld() {
        this.character.world = this;
    }


    hurtSoundPlay() {
        if (this.hurtSoundcounter == 0) {
            this.hurtSoundcounter++
            let audio = new Audio('audio/player-hurt.mp3');
            audio.volume = (valueSound / 100)
            audio.play();
            setTimeout(() => {
                this.hurtSoundcounter = 0;
            }, 1000)
        }
    }


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


    pauseMusic() {
        if (endBossMusic) {
            endBossMusic.pause()
        }
        if (backgroundAudio) {
            backgroundAudio.pause()
        }
    }


    increaseValue() {
        if (this.hitCounter < 10) {
            this.hitCounter++;
            this.character.x += -150
        } else {
            clearInterval(this.hitIntervall);
            this.hitCounter = 0;
        }
    }


    checkForcollision() {
        //check for collison width chicken
        this.chracterEnemyCollision();
        // fill the coinbar if you collide with a coin
        this.coinCollision();
        // fill the bottlebar if you collide with the salsabottle and delete the spawned on the map
        this.bottleCollision();
        // check for colision between bottle and enemy
        this.bottleEnemyCollisionchecker();
    }


    bottleCollision() {
        setInterval(() => {
            this.level.salsabottles.forEach((bottles) => {
                if (this.character.isColliding(bottles)) {
                    this.catchBottle(bottles);
                }
            })
        }, 1500);
    }


    coinCollision() {
        setInterval(() => {
            this.level.coins.forEach((coin) => {
                if (this.character.isColliding(coin)) {
                    this.catchCoin(coin);
                }
            })
        }, 1500);
    }


    chracterEnemyCollision() {
        this.hurtIntervall = setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy) && this.character.y > 58 && this.hurtCounter == 0) {
                    this.hurtThePlayer();
                }
                if (this.character.isColliding(enemy) && enemy instanceof Endboss) {
                    this.getBossDemage();
                }
                // kill the chicken with jumping on it
                if (this.character.isColliding(enemy) && this.character.y <= 58 && enemy instanceof chicken && fromeAbove == 1) {
                    this.jumpKillChicken(enemy, 1);
                }
                // kill little chicken with jumping on it
                if (this.character.isColliding(enemy) && this.character.y <= 58 && enemy instanceof littleChicken && fromeAbove == 1) {
                    this.jumpKillChicken(enemy, 2);
                }
            })
        }, 50);
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


    jumpKillChicken(enemy, chickenClass) {
        this.deleteObjectByXCoordinate(this.level.enemies, enemy['x'])
        this.deadChicken = new deadCicken(enemy.y, enemy.x, chickenClass);
        let audio = new Audio('audio/chicken-dead-sweet.mp3');
        audio.volume = (valueSound / 100)
        audio.play();
    }


    glasBreakSound() {
        let audio = new Audio('audio/shortGlassBreak.mp3');
        audio.volume = (valueSound / 100)
        audio.play();
    }


    killTheBoss(bottle, broke, enemy) {
        this.broke = true;
        this.bottle = new throawbleObject(enemy['x'] - 120, this.bottle['y'] - 10, this.character.otherDirection, this.broke)
        this.bossStatusBar.width -= 64;
        enemy.energy = 0;
        this.broke = false;
        bossDead = 1;
        setTimeout(() => {
            this.stopGame();
        }, 5000)
    }


    hitTheBoss(enemy, broke, bottle) {
        this.broke = true;
        this.bottle = new throawbleObject(enemy['x'] - 120, this.bottle['y'] - 10, this.character.otherDirection, this.broke)
        this.broke = false;
        enemy.hit();
        enemy.energy -= 10;
        this.bossStatusBar.width -= 64;
        this.broke = false;
        if (this.damageCounter == 0) {
            this.damageCounter = 1;
            setTimeout(() => {
                this.damageCounter = 0;
            }, 1500)
        }
    }


    killEnemy(enemy, bottle, broke) {
        this.broke = true;
        this.bottle = new throawbleObject(enemy['x'] + -100, enemy['y'] + -150, this.character.otherDirection, this.broke)
        this.broke = false;
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


    getBossDemage() {
        this.hitIntervall = setInterval(this.increaseValue(), 100)
        this.character.energy -= 10
        this.statusbar.setPercentage(this.character.energy);
    }


    hurtThePlayer() {
        this.statusbar.setPercentage(this.character.energy);
        this.character.hit();
        this.hurtCounter++;
        this.hurtSoundPlay();
        setTimeout(() => {
            this.hurtCounter = 0;
        }, 1000)
    }


    checkForBossFight() {
        this.bossFightIntervall = setInterval(() => {
            if (this.bossTrigger == 0) {
                this.bossChicken = this.level.enemies.length - 1
                if (this.character.x == this.level.enemies[this.bossChicken].x - 800) {
                    this.bossTrigger++
                    this.bossInNear = 1;
                    this.level.enemies.forEach((enemy => {
                        if (enemy instanceof Endboss) {
                            enemy.attackCombination()
                            musicOn = 2;
                            loadMusic();
                        }
                    }))
                }
            }
        }, 10)
    }


    deleteObjectByXCoordinate(arr, xCoord) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].x === xCoord) {
                arr.splice(i, 1);
                break;
            }
        }
    }


    run() {
        setInterval(() => {
            this.checkForcollision();
        }, 50)
        this.throwChecker = setInterval(() => {
            if (this.character.energy > 0) {
                this.checkTrowObjects();
            }
        }, 50)
    }


    // only trow bottles if you have some and reduct it after trow
    checkTrowObjects() {
        if (this.keyboard.D) {
            if (this.bottleInAir == 0) {
                if (this.bottleBar.percentage > 0) {
                    this.bottleBar.percentage -= 10;
                    this.bottleBar.setPercentage(this.bottleBar.percentage);
                    this.bottle = new throawbleObject(this.character.x, this.character.y, this.character.otherDirection, this.broke)
                    this.bottleInAir = 1;
                    this.swooshBottle = new Audio('audio/bottle-swosh.mp3');
                    this.swooshBottle.play();
                    this.swooshBottle.volume = (valueSound / 100)
                    setTimeout(() => {
                        this.bottleInAir = 0;
                    }, 1500)
                }
            }
        }
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.translate(this.camera_x, 0)
        //draw objects in the world background,enemies etc.
        this.drawWorldObjects()
        // draw the character
        this.drawImgOnMap(this.character)
        //draw dead chicken
        this.drawImgOnMap(this.deadChicken)
        //draw all the bars
        this.drawAllBars();
        //draw the endscreen
        this.drawEndscreen()
        this.ctx.translate(-this.camera_x, 0)
        //draw wird immer wieder aufgerufen
        let self = this;
        this.drawRequest = requestAnimationFrame(() => {
            self.draw()
        })
    }


    drawWorldObjects() {
        // draw the background
        this.theForEach(this.level.backgrounds)
        // draw the chickens
        this.theForEach(this.level.enemies)
        // draw the clouds
        this.theForEach(this.level.clouds)
        // draw the coins
        this.theForEach(this.level.coins)
        // draw the salsa bottels
        this.theForEach(this.level.salsabottles)
        // draw the bottle
        this.drawImgOnMap(this.bottle)
    }


    drawAllBars() {
        //draw the statusbar
        this.ctx.translate(-this.camera_x, 0) // back
        this.drawImgOnMap(this.statusbar)
        this.ctx.translate(this.camera_x, 0)// forward
        // draw the coinbar 
        this.ctx.translate(-this.camera_x, 0) // back
        this.drawImgOnMap(this.coinbar)
        this.ctx.translate(this.camera_x, 0)// forward
        //draw the bottle bar 
        this.ctx.translate(-this.camera_x, 0) // back
        this.drawImgOnMap(this.bottleBar)
        this.ctx.translate(this.camera_x, 0)// forward
        //draw the boss statusbar
        this.drawBossStatusbar()
    }


    drawBossStatusbar() {
        if (this.bossInNear == 1) {
            this.ctx.translate(-this.camera_x, 0) // back
            this.drawImgOnMap(this.emtyBossBar)
            this.drawImgOnMap(this.bossStatusBar)
            this.drawImgOnMap(this.bossChickenEmbleme)
            this.ctx.translate(this.camera_x, 0)// forward
        }
    }


    drawEndscreen() {
        if (bossDead == 1) {
            this.endscreen = new endscreen(bossDead);
            this.ctx.translate(-this.camera_x, 0) // back
            this.drawImgOnMap(this.endscreen)
            this.ctx.translate(this.camera_x, 0)// forward
        }
        if (this.character.energy <= 0) {
            this.endscreen = new endscreen(bossDead);
            this.ctx.translate(-this.camera_x, 0) // back
            this.drawImgOnMap(this.endscreen)
            this.ctx.translate(this.camera_x, 0)// forward
        }
    }


    theForEach(object) {
        object.forEach(o => {
            this.drawImgOnMap(o)
        })
    }


    drawImgOnMap(DM) {
        if (DM.otherDirection) {
            this.flipImage(DM)
        }
        this.ctx.drawImage(DM.img, DM.x, DM.y, DM.width, DM.height)
        if (DM.otherDirection) {
            this.flipImageBack(DM)
        }
    }


    flipImage(DM) {
        this.ctx.save();
        this.ctx.translate(DM.width, 0);
        this.ctx.scale(-1, 1);
        DM.x = DM.x * -1;
    }


    flipImageBack(DM) {
        DM.x = DM.x * -1;
        this.ctx.restore();
    }
}