class World {
    character = new Character();
    endBoss = new Endboss();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    imagesStatusBarBos = new StatusBarBoss();
    imagesStatusBarBosss = new StatusBarImageBoss();
    statusBarHealth = new StatusBarHealth();
    statusBarCoin = new StatusBarCoin();
    statusBarBottle = new StatusBarBottle();
    throwableObject = [];

    coinCollectSound = new Audio('audio/Collect_Coin.mp3');
    bottleCollectSound = new Audio('audio/Collect_Bottle.mp3');

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
            this.collisionCharacterToEndBoss();
        }, 80);
    }


    checkThrowableObjects() {
        if (this.keyboard.D) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObject.push(bottle);
        }
    }


    checkCollisons() {
        this.collisionCharacterToEnemie();
        this.collisionCharacterToBottle();
        this.collisionCharacterToCoin();
        this.collisionCharacterToEnemieTop();

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
                enemy.energy = 0;
                this.level.enemies.splice(i, 1);
                
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

        this.ctx.translate(-this.camera_x, 0);
        // ------- Space for fixed Objects -------
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.imagesStatusBarBos);
        this.addToMap(this.imagesStatusBarBosss);
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);
        this.addToMap(this.endBoss);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObject);

        this.ctx.translate(-this.camera_x, 0);


        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
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