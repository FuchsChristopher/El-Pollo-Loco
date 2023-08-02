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


    /**
     * Applies gravity to the moveable object.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }


     /**
     * Checks if the moveable object is above the ground.
     * @returns {boolean} - True if the object is above the ground, false otherwise.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } if (this instanceof SmallChicken) {
            return this.y < 357;
        } else {
            return this.y < 150;
        }
    }


    /**
     * Checks if the object is colliding with another object.
     * @param {object} object - The other object to check collision against.
     * @returns {boolean} - True if the objects are colliding, false otherwise.
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + 60 + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    }


    /**
     * Checks if the object is colliding with another objects top.
     * @param {*} object - - The other object to check collision against.
     * @returns {boolean} - True if the objects are colliding with top, false otherwise.
     */
    isCollidingTop(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.speedY <= 10 &&
            this.y < mo.y + mo.height;
    }


    /**
     * Collects a bottle, increasing the bottle count.
     */
    collectBottle() {
        this.bottle += 20;
        if(this.bottle >= 100) {
            this.bottle = 100;
        }
    }


    /**
     * Collects a coin, increasing the coin count.
     */
    collectCoin() {
        this.coin += 20;
        if (this.coin >= 100) {
            this.coin = 100;
        }
    }


    /**
     * Hits the object, reducing its health.
     */
    hit() {
        this.energy -= 0.5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Hits the object (character), reducing its health.
     */
    hitBoss() {
        this.energy -= 50;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    /**
     * Hits the object (endBoss), reducing its health.
     */
    hitBossHard() {
        this.bossEnergy -= 20;
        if (this.bossEnergy < 0) {
            this.bossEnergy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    /**
     * Checks if the object is currently hurt.
     * @returns {boolean} - True if the object is hurt, false otherwise.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; //Difference in ms
        timepassed = timepassed / 1000; //Differense in s
        return timepassed < 1;
    }


     /**
     * Checks if the object is dead (health equals zero).
     * @returns {boolean} - True if the object is dead, false otherwise.
     */
    isDead() {
        return this.energy == 0;
    }


     /**
     * Plays an animation for the object using a set of images.
     * @param {*} images - The paths to the images for the animation.
     */
    playAnimation(images) {
        let i = this.curentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.curentImage++;
    }


    /**
     * This function makes movement to the right.
     */
    moveRight() {
        this.x += this.speed;
    }


    /**
     * This function makes movement to the left.
     */
    moveLeft() {
        this.x -= this.speed;
    }


    /**
     * this function makes to jump to the air.
     */
    jump() {
        this.speedY = 23;
    }
}