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


    //check for collison width chicken
    checkForcollision(enemies) {
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy)) {
                    this.statusbar.setPercentage(this.character.energy)
                    this.character.hit()
                }
            })
        }, 500);
    }


    run() {
        setInterval(() => {
            this.checkForcollision()
            this.checkTrowObjects()
        }, 200)
    }


    checkTrowObjects() {
        if (this.keyboard.D) {
            this.bottle = new throawbleObject(this.character.x, this.character.y)
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