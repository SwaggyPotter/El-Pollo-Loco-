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
    bossInNear = 0;
    throwChecker;
    damageCounter = 0;
    hurtCounter = 0;


    setWorld() {
        this.character.world = this;
    }


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


    checkForCharDead() {
        setInterval(() => {
            if (this.character.energy == 0 || this.character.energy < 0) {
                document.getElementById('startPic').style.display = 'flex';
                document.getElementById('startPic').src = 'img/9_intro_outro_screens/game_over/oh no you lost!.png';
                setTimeout(() => {
                    location.reload();
                }, 5000)
            }
        }, 50)
    }


    // Comment for dev: Put every set intervall function into a seperate function for better reading
    checkForcollision() {
        //check for collison width chicken
        this.hurtIntervall = setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy) && this.character.y > 58 && this.hurtCounter == 0) {
                    this.statusbar.setPercentage(this.character.energy)
                    this.character.hit()
                    this.hurtCounter++
                    setTimeout(() => {
                        this.hurtCounter = 0;
                    }, 1000)
                }
                // kill the chicken with jumping on it
                if (this.character.isColliding(enemy) && this.character.y <= 58 && enemy instanceof chicken) {
                    this.deleteObjectByXCoordinate(this.level.enemies, enemy['x'])
                    this.deadChicken = new deadCicken(enemy.y, enemy.x);
                }
            })
        }, 50);

        // fill the coinbar if you collide with a coin
        setInterval(() => {
            this.level.coins.forEach((coin) => {
                if (this.character.isColliding(coin)) {
                    this.coinbar.percentage += 20;
                    this.coinbar.setPercentage(this.coinbar.percentage);
                    this.deleteObjectByXCoordinate(this.level.coins, coin['x'])
                }
            })
        }, 1500);

        // fill the bottlebar if you collide with the salsabottle and delete the spawned on the map
        setInterval(() => {
            this.level.salsabottles.forEach((bottles) => {
                if (this.character.isColliding(bottles)) {
                    this.bottleBar.percentage += 20;
                    this.bottleBar.setPercentage(this.bottleBar.percentage);
                    this.deleteObjectByXCoordinate(this.level.salsabottles, bottles['x'])
                }
            })
        }, 1500);

        // check for colision between bottle and enemy
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (this.bottle.isColliding(enemy)) {
                    // kill normal chicken
                    if (enemy.energy == 20 && enemy instanceof chicken) {
                        this.deleteObjectByXCoordinate(this.level.enemies, enemy['x'])
                        this.broke = true;
                        this.bottle = new throawbleObject(enemy['x'] + -100, enemy['y'] + -150, this.character.otherDirection, this.broke)
                        this.broke = false;
                    }

                    else if (enemy.energy > 20 && enemy instanceof Endboss) {
                        this.broke = true;
                        this.bottle = new throawbleObject(enemy['x'] - 120, this.bottle['y'] - 10, this.character.otherDirection, this.broke)
                        enemy.hit();
                        enemy.energy -= 10;
                        this.bossStatusBar.width -= 64;
                        this.broke = false;
                    }

                    // endboss kill and hit function
                    else if (enemy.energy == 20 && enemy instanceof Endboss) {
                        this.broke = true;
                        this.bottle = new throawbleObject(this.bottle['x'], this.bottle['y'], this.character.otherDirection, this.broke)
                        this.bossStatusBar.width -= 64;
                        enemy.energy = 0;
                        this.broke = false;
                        // endscreen animation
                        document.getElementById('startPic').style.display = 'flex';
                        document.getElementById('startPic').src = 'img/9_intro_outro_screens/game_over/game over.png';
                        setTimeout(() => {
                            location.reload();
                        }, 5000)
                    }

                    // give the enemy endboss damage
                    else if (enemy.energy > 20) {
                        this.takeDamage(enemy);
                        this.broke = true;
                        this.bottle = new throawbleObject(this.bottle['x'], this.bottle['y'], this.character.otherDirection, this.broke)
                        this.broke = false;
                    }
                }
            })
        }, 200);
    }


    checkForBossFight() {
        setInterval(() => {
            this.bossChicken = this.level.enemies.length - 1
            if (this.character.x == this.level.enemies[this.bossChicken].x - 800) {
                this.bossInNear = 1;
                this.level.enemies.forEach((enemy => {
                    if (enemy instanceof Endboss) {
                        enemy.attackCombination()
                    }
                }))
            }
        }, 10)
    }


    takeDamage(enemy) {
        if (this.damageCounter == 0) {
            this.damageCounter = 1;
            enemy.energy -= 20;
            setTimeout(() => {
                this.damageCounter = 0;
            }, 1500)
        }
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
                    this.bottleBar.percentage -= 20;
                    this.bottleBar.setPercentage(this.bottleBar.percentage);
                    this.bottle = new throawbleObject(this.character.x, this.character.y, this.character.otherDirection, this.broke)
                    this.bottleInAir = 1;
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

        // draw the character
        this.drawImgOnMap(this.character)

        //draw the bos statusbar
        if (this.bossInNear == 1) {
            this.ctx.translate(-this.camera_x, 0) // back
            this.drawImgOnMap(this.emtyBossBar)
            this.drawImgOnMap(this.bossStatusBar)
            this.drawImgOnMap(this.bossChickenEmbleme)
            this.ctx.translate(this.camera_x, 0)// forward
        }

        // draw the bottle
        this.drawImgOnMap(this.bottle)

        //draw dead chicken
        this.drawImgOnMap(this.deadChicken)

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


        this.ctx.translate(-this.camera_x, 0)
        //draw wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(() => {
            self.draw()
        })
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