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


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }


    setWorld() {
        this.character.world = this;
    }


    endGame() {
        for (let i = 1; i < 9999; i++) window.clearInterval(i);
    }


    run() {
        setInterval(() => {
            this.checkCollisons();
            this.checkThrowableObjects();
        }, 80);
    }


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


    setBottleStatus() {
        this.lastThrow = this.throwNow;
        this.character.bottle = this.character.bottle - 20;
        this.statusBarBottle.setPercentage(this.character.bottle);
    }


    throwBottleRight() {
        let bottle = new ThrowableObject(this.character.x + 80, this.character.y + 100, this.character.otherDirection);
        this.throwableObject.push(bottle);
    }

    throwBottleLeft() {
        let bottle = new ThrowableObject(this.character.x - 10, this.character.y + 100, this.character.otherDirection);
        this.throwableObject.push(bottle);
    }


    checkCollisons() {
        this.collisionCharacterToEnemie();
        this.collisionCharacterToBottle();
        this.collisionCharacterToCoin();
        this.collisionCharacterToEnemieTop();
        this.collisionBottleToEnemy();
        this.collisionCharacterToEndBoss();

    }


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


    collisionCharacterToEnemie() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBarHealth.setPercentage(this.character.energy);
            }
        });
    }


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


    collisionCharacterToEndBoss() {
        if (this.character.isColliding(this.endBoss)) {
            this.character.hitBoss();
            this.statusBarHealth.setPercentage(this.character.energy);
        }
    }


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


    manyObjects() {
        this.addToMap(this.endBoss);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObject);
        this.addToMap(this.character);
    }


    manyStatusbars() {
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.imagesStatusBarBos);
        this.addToMap(this.imagesStatusBarBosss);
    }


    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

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


    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}