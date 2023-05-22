class MovableObjekt extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    bossEnergy = 150;
    lastHit = 0;
    bottle = 0;
    coin = 0;
    offset = {
        top: 0,
        bottom: 0,
        right: 0,
        left: 0
    }


    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }


    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } if (this instanceof SmallChicken) {
            return this.y < 357;
        } else {
            return this.y < 150;
        }
    }


    /*isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y + 65 &&
            this.x < mo.x &&
            this.y < mo.y + mo.height
    }*/


    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + 60 + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    }


    isCollidingTop(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.speedY <= 10 &&
            this.y < mo.y + mo.height;
    }


    /*isCollidingTop(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height
    }*/


    collectBottle() {
        this.bottle += 20;
        if(this.bottle >= 100) {
            this.bottle = 100;
        }
    }


    collectCoin() {
        this.coin += 20;
        if (this.coin >= 100) {
            this.coin = 100;
        }
    }



    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    hitBoss() {
        this.energy -= 50;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    hitBossHard() {
        this.bossEnergy -= 10;
        if (this.bossEnergy < 0) {
            this.bossEnergy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; //Difference in ms
        timepassed = timepassed / 1000; //Differense in s
        return timepassed < 1;
    }


    isDead() {
        return this.energy == 0;
    }


    playAnimation(images) {
        let i = this.curentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.curentImage++;
    }


    moveRight() {
        this.x += this.speed;
    }


    moveLeft() {
        this.x -= this.speed;
    }


    jump() {
        this.speedY = 30;
    }
}