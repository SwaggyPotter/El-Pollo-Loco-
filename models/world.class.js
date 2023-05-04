class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = -100;
    statusbar = new StatusBar;
    coinbar = new Coinbar;
    bottle = new throawbleObject();
    bottleBar = new BottleBar();
    bottleInAir = 0;


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
    }


    // Comment for dev: Put every set intervall function into a seperate function for better reading
    checkForcollision() {
        //check for collison width chicken
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy)) {
                    this.statusbar.setPercentage(this.character.energy)
                    this.character.hit()
                }
            })
        }, 1500);

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
                    console.log(enemy)
                }
            })
        }, 200);
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
            this.checkForcollision()
            this.checkTrowObjects()
        }, 200)
    }

    // only trow bottles if you have some and reduct it after trow
    checkTrowObjects() {
        if (this.keyboard.D) {
            if (this.bottleInAir == 0) {
                if (this.bottleBar.percentage > 0) {
                    this.bottleBar.percentage -= 20;
                    this.bottleBar.setPercentage(this.bottleBar.percentage);
                    this.bottle = new throawbleObject(this.character.x, this.character.y)
                    this.bottleInAir = 1;
                    setTimeout(() => {
                        this.bottleInAir = 0;
                    }, 1500)
                }
                else {
                    console.log('keine flaschen')
                }
            }
            else {
                console.log('nicht so schnell')
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

        // draw the bottle 

        this.drawImgOnMap(this.bottle)

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


        DM.drawFrame(this.ctx)
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