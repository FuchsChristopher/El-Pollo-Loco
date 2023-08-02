class World {
    character = new Character();
    endBoss = new Endboss();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    bottle = new Bottle();
    imagesStatusBarBos = new StatusBarBoss();
    imagesStatusBarBosss = new StatusBarImageBoss();
    statusBarHealth = new StatusBarHealth();
    statusBarCoin = new StatusBarCoin();
    statusBarBottle = new StatusBarBottle();
    throwableObject = [];
    lastThrow = 0;
    throwNow = 0;

    coinCollectSound = new Audio('audio/Collect_Coin.mp3');
    bottleCollectSound = new Audio('audio/Collect_Bottle.mp3');
    jumpSoundChickens = new Audio('audio/Jump2_Sound.mp3');


    /**
     * Creates a new game world.
     * @param {HTMLCanvasElement} canvas - The canvas element.
     * @param {object} keyboard - The keyboard input handler.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }


    /**
     * Sets the world reference for the character.
     */
    setWorld() {
        this.character.world = this;
    }


    /**
     * stopt all intervals.
     */
    endGame() {
        for (let i = 1; i < 9999; i++) window.clearInterval(i);
    }


    /**
     * checks collisons and throwable objects.
     */
    run() {
        setInterval(() => {
            this.checkCollisons();
            this.checkThrowableObjects();
        }, 80);
    }

    /**
     * Checks if the character throws an object.
     */
    checkThrowableObjects() {
        this.throwNow = Date.now();
        if (this.keyboard.D && this.character.bottle > 0 && this.throwNow - this.lastThrow >= 300) {
            this.setBottleStatus();
            if (this.character.otherDirection) {
                this.throwBottleLeft();
            }
            else {
                this.throwBottleRight();
            }
        }
    }

    /**
     * sets the bottle status.
     */
    setBottleStatus() {
        this.lastThrow = this.throwNow;
        this.character.bottle = this.character.bottle - 20;
        this.statusBarBottle.setPercentage(this.character.bottle);
    }


    /**
     * throws the bottle to the right.
     */
    throwBottleRight() {
        let bottle = new ThrowableObject(this.character.x + 80, this.character.y + 100, this.character.otherDirection);
        this.throwableObject.push(bottle);
    }

    /**
     * throws the bottle to the left.
     */
    throwBottleLeft() {
        let bottle = new ThrowableObject(this.character.x - 10, this.character.y + 100, this.character.otherDirection);
        this.throwableObject.push(bottle);
    }


    /**
     * check a many Collisons
     */
    checkCollisons() {
        this.collisionCharacterToEnemie();
        this.collisionCharacterToBottle();
        this.collisionCharacterToCoin();
        this.collisionCharacterToEnemieTop();
        this.collisionBottleToEnemy();
        this.collisionCharacterToEndBoss();

    }


    /**
     * Handles collisions between the bottle and enemies.
     */
    collisionBottleToEnemy() {
        this.throwableObject.forEach((bottle, i) => {
            if (bottle.isColliding(this.endBoss)) {
                this.endBoss.hitBossHard();
                this.imagesStatusBarBos.setPercentage(this.endBoss.bossEnergy);
                setTimeout(() => {
                    this.throwableObject.splice(i, 1);
                }, 200)
            }
        });
    }


    /**
     * Handles collisions between the character and enemie.
     */
    collisionCharacterToEnemie() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBarHealth.setPercentage(this.character.energy);
            }
        });
    }


    /**
     * Handles collisions between the character and top of the enemies.
     */
    collisionCharacterToEnemieTop() {
        this.level.enemies.forEach((enemy, i) => {
            if (this.character.isCollidingTop(enemy) && this.character.y < 140) {
                this.character.jump();
                this.jumpSoundChickens.play();
                enemy.energy = 0;
                setTimeout(() => {
                    this.level.enemies.splice(i, 1);
                }, 900)
            }
        });
    }


    /**
     * Handles collisions between the character and endboss.
     */
    collisionCharacterToEndBoss() {
        if (this.character.isColliding(this.endBoss)) {
            this.character.hitBoss();
            this.statusBarHealth.setPercentage(this.character.energy);
        }
    }


    /**
     * Handles collisions between the character and bottle.
     */
    collisionCharacterToBottle() {
        this.level.bottles.forEach((bottle, i) => {
            if (this.character.isColliding(bottle) && this.character.bottle !== 100) {
                this.character.collectBottle();
                this.level.bottles.splice(i, 1);
                this.statusBarBottle.setPercentage(this.character.bottle);
                this.bottleCollectSound.play();
            }
        });
    }


     /**
     * Handles collisions between the character and coin.
     */
    collisionCharacterToCoin() {
        this.level.coins.forEach((coin, i) => {
            if (this.character.isColliding(coin) && this.character.coin !== 100) {
                this.character.collectCoin();
                this.level.coins.splice(i, 1);
                this.statusBarCoin.setPercentage(this.character.coin);
                this.coinCollectSound.play();
            }
        });
    }


    /**
     * Draws the game world and its objects on the canvas.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.ctx.translate(-this.camera_x, 0);
        // ------- Space for fixed Objects -------
        this.manyStatusbars();
        this.ctx.translate(this.camera_x, 0);
        this.manyObjects();
        this.ctx.translate(-this.camera_x, 0);
        
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }


    /**
     * add a many objects: endboss, bottles, coins, enemies, throwableObjects and character.
     */
    manyObjects() {
        this.addToMap(this.endBoss);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObject);
        this.addToMap(this.character);
    }


    /**
     * add a many statusbars.
     */
    manyStatusbars() {
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.imagesStatusBarBos);
        this.addToMap(this.imagesStatusBarBosss);
    }


     /**
     * Adds an object or an array of objects to the rendering map.
     * @param {object|object[]} objects - The object(s) to be added to the map.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }


    /**
     * Adds an object to the rendering map.
     * @param {object} object - The object to be added to the map.
     */
    addToMap(mo) {
        this.ctx.save();
        if (mo instanceof ThrowableObject) {
            this.ctx.translate(mo.x + mo.width / 2, mo.y + mo.height / 2);
            this.ctx.rotate(mo.angle * Math.PI / 180);
            this.ctx.translate(-(mo.x + mo.width / 2), -(mo.y + mo.height / 2));
        }
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
        this.ctx.restore();
    }


    /**
     * Flips the image of the object horizontally.
     * @param {CanvasRenderingContext2D} ctx - The rendering context.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    /**
     * Reverts the image of the object back to its original orientation.
     * @param {CanvasRenderingContext2D} ctx - The rendering context.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}