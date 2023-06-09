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


    /**
     * End the game if the character die
     */
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


    /**
     * Stop the game and all the intervalls
     */
    stopGame() {
        this.resetEnemys()
        gameStartet = 0;
        musicOn = 0;
        clearInterval(this.hurtIntervall)
        clearInterval(this.bossFightIntervall)
        clearInterval(idleIntervall)
        this.hideObjects()
    }


    resetEnemys() {
        if (bossDead == 0) {
            this.level.enemies[this.bossChicken].energy = 0;
        }
        bossDead = 0;
        this.pauseMusic()
        this.character.energy = 100;
        this.bossInNear = 0;
        this.level.enemies = [];
        this.bottleBar.percentage = 0;
    }


    hideObjects() {
        document.getElementById('startPic').style.visibility = 'visible';
        document.getElementById('startBTN').style.visibility = 'visible';
        document.getElementById('canvas').style.visibility = 'hidden';
        document.getElementById('handyControls').style.visibility = 'hidden';
        document.getElementById('tutorialContainer').style.display = 'none';
        document.getElementById('fullscreenBTN').style.display = 'none';
        document.getElementById('musicContainer').style.display = 'none';
    }


    /**
     * Collect the bottle on the ground if it collide with the character
     * 
     * @param {object} bottles 
     */
    catchBottle(bottles) {
        this.bottleBar.percentage += 10;
        this.bottleBar.setPercentage(this.bottleBar.percentage);
        this.deleteObjectByXCoordinate(this.level.salsabottles, bottles['x'])
        let audio = new Audio('audio/coin-catch.mp3');
        audio.volume = (valueSound / 100)
        audio.play();
    }


    /**
     * Collect the coin if it collider with the character
     * 
     * @param {object} coin 
     */
    catchCoin(coin) {
        this.coinbar.percentage += 20;
        this.coinbar.setPercentage(this.coinbar.percentage);
        this.deleteObjectByXCoordinate(this.level.coins, coin['x'])
        let audio = new Audio('audio/coin-catch.mp3');
        audio.volume = (valueSound / 100)
        audio.play();
    }


    /**
     * Draw the world
     */
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


    /**
     * Draw the objects and enemies in the world
     */
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


    /**
     * Draw the Statusbars 
     */
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


    /**
     * Draw the bos statusbar
     */
    drawBossStatusbar() {
        if (this.bossInNear == 1) {
            this.ctx.translate(-this.camera_x, 0) // back
            this.drawImgOnMap(this.emtyBossBar)
            this.drawImgOnMap(this.bossStatusBar)
            this.drawImgOnMap(this.bossChickenEmbleme)
            this.ctx.translate(this.camera_x, 0)// forward
        }
    }


    /**
     * Draw the endscreen
     */
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


    /**
     * Draw the given picture 
     * 
     * @param {object} object - the givin picture
     */
    theForEach(object) {
        object.forEach(o => {
            this.drawImgOnMap(o)
        })
    }


    /**
     * handle the picture reflection based on the moving direction
     * 
     * @param {object} DM - an Image
     */
    drawImgOnMap(DM) {
        if (DM.otherDirection) {
            this.flipImage(DM)
        }
        this.ctx.drawImage(DM.img, DM.x, DM.y, DM.width, DM.height)
        if (DM.otherDirection) {
            this.flipImageBack(DM)
        }
    }


    /**
     * Reflect the givin picture
     * 
     * @param {object} DM - picture
     */
    flipImage(DM) {
        this.ctx.save();
        this.ctx.translate(DM.width, 0);
        this.ctx.scale(-1, 1);
        DM.x = DM.x * -1;
    }


    /**
     * Reflect the picture back
     * 
     * @param {object} DM - picture
     */
    flipImageBack(DM) {
        DM.x = DM.x * -1;
        this.ctx.restore();
    }
}