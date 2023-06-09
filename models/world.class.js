class World extends World_extension {
    constructor(canvas, keyboard) {
        super().ctx = canvas.getContext('2d');
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


    /**
     * Play a sound if you get hurt
     */
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


    /**
     * Paused the music
     */
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


    /**
     * Check for collision with everything in the world
     */
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


    /**
     * Check for collision with dropped bottles in the world
     */
    bottleCollision() {
        setInterval(() => {
            this.level.salsabottles.forEach((bottles) => {
                if (this.character.isColliding(bottles)) {
                    this.catchBottle(bottles);
                }
            })
        }, 1500);
    }


    /**
     * Check for collision with spawned coins in the world
     */
    coinCollision() {
        setInterval(() => {
            this.level.coins.forEach((coin) => {
                if (this.character.isColliding(coin)) {
                    this.catchCoin(coin);
                }
            })
        }, 1500);
    }


    /**
     * Delete the killed chicken ant play a sound for killing it
     * @param {object} enemy 
     * @param {*} chickenClass 
     */
    jumpKillChicken(enemy, chickenClass) {
        this.deleteObjectByXCoordinate(this.level.enemies, enemy['x'])
        this.deadChicken = new deadCicken(enemy.y, enemy.x, chickenClass);
        let audio = new Audio('audio/chicken-dead-sweet.mp3');
        audio.volume = (valueSound / 100)
        audio.play();
    }


    /**
     * Play glass breaking sound
     */
    glasBreakSound() {
        let audio = new Audio('audio/shortGlassBreak.mp3');
        audio.volume = (valueSound / 100)
        audio.play();
    }


    /**
     * Break the bottle on the coordinates where she hit the chicken, and delete the boss chicken. Set the boss hp on 0.
     * Stop the game
     * 
     * @param {object} bottle 
     * @param {boolean} broke
     * @param {object} enemy 
     */
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


    /**
     * Gave the boss demage. Spawn a broke animation on the position where the bottle hit the chicken
     * 
     * @param {object} enemy 
     * @param {boolean} broke 
     * @param {object} bottle 
     */
    hitTheBoss(enemy, broke, bottle) {
        this.broke = true;
        this.bottle = new throawbleObject(enemy['x'] - 50, this.bottle['y'] - 10, this.character.otherDirection, this.broke)
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


    /**
     * Function for playing the broke bottle animation
     * 
     * @param {object} enemy 
     * @param {boolean} broke 
     * @param {object} bottle 
     */
    killEnemy(enemy, bottle, broke) {
        this.broke = true;
        this.bottle = new throawbleObject(enemy['x'] + -50, enemy['y'] + -150, this.character.otherDirection, this.broke)
        this.broke = false;
    }


    /**
     * Get extra damage from the boss
     */
    getBossDemage() {
        this.hitIntervall = setInterval(this.increaseValue(), 100)
        this.character.energy -= 10
        this.statusbar.setPercentage(this.character.energy);
    }


    /**
     * Get normal damage from chicken every second
     */
    hurtThePlayer() {
        this.statusbar.setPercentage(this.character.energy);
        this.character.hit();
        this.hurtCounter++;
        this.hurtSoundPlay();
        setTimeout(() => {
            this.hurtCounter = 0;
        }, 1000)
    }


    /**
     * If the character is in the near of the boss start attacking, the music changed, and the heal bar appear
     */
    checkForBossFight() {
        this.bossFightIntervall = setInterval(() => {
            if (this.bossTrigger == 0) {
                this.bossChicken = this.level.enemies.length - 1
                if (this.character.x == this.level.enemies[this.bossChicken].x - 800) {
                    this.bossTrigger++
                    this.bossInNear = 1;
                    this.level.enemies.forEach((enemy => {
                        this.startAttackCombination(enemy)
                    }))
                }
            }
        }, 10)
    }


    /**
     * Start the attack combination if you in near of the endboss
     * 
     * @param {object} enemy - the boss chicken
     */
    startAttackCombination(enemy) {
        if (enemy instanceof Endboss) {
            enemy.attackCombination()
            musicOn = 2;
            loadMusic();
        }
    }


    /**
     * Function for deleting objects by his cordinates in an array
     * 
     * @param {Array} arr - Array of the enemy objects
     * @param {number} xCoord - x coordinate of the shoosen object
     */
    deleteObjectByXCoordinate(arr, xCoord) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].x === xCoord) {
                arr.splice(i, 1);
                break;
            }
        }
    }


    /**
     * Start checking for collissions and thrown objects
     */
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


    /**
     * only trow bottles if you have some and reduct it after trow
     */
    checkTrowObjects() {
        if (this.keyboard.D) {
            if (this.bottleInAir == 0) {
                if (this.bottleBar.percentage > 0) {
                    this.bottleReduct()
                }
            }
        }
    }


    /**
     * Reduct the bottles, 
     * update the bottle bar, 
     * play the throw sound, 
     * set time out for throwing
     */
    bottleReduct() {
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


    /**
     * Check for collision between character and chicken
     */
    bottleEnemyCollisionchecker() {
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (this.bottle.isColliding(enemy)) {
                    this.glasBreakSound()
                    this.bottleCollisionOptions(enemy);
                }
            })
        }, 200);
    }


    bottleCollisionOptions(enemy) {
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


    /**
     * Check for collision between character and enemy
     */
    chracterEnemyCollision() {
        this.hurtIntervall = setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                this.chracterEnemyCollisionOptions(enemy)
            })
        }, 50);
    }


    chracterEnemyCollisionOptions(enemy) {
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
    }
}