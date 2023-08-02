class ThrowableObject extends MovableObjekt {
    
    /**
     * Creates a throwable object.
     * @param {*} x - The x-coordinate of the throwable object.
     * @param {*} y - The y-coordinate of the throwable object.
     * @param {*} otherDirection - Indicates if the throwable object should move in the other direction.
     */
    constructor(x, y, otherDirection) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.x = x;
        this.y = y;
        this.otherDirection = otherDirection;
        this.height = 70;
        this.width = 60;
        this.angle = 0;
        this.rotationSpeed = 20;
        this.trow();
    }


    /**
     * inserts gravity and checks the direction of the bottle.
     */
    trow() {
        this.speedY = 15;
        this.applyGravity();

        setInterval(() => {
            this.bottleDirection();
        }, 1000 / 60)
    }


    /**
     * if other direction is true then the x coordinate is subtracted.
     * if otherdirection is false then the x coordinate is calculated on it.
     */
    bottleDirection() {
            if (this.otherDirection) {
                this.x -= 10;
            } else {
                this.x += 10;   
            } this.angle += this.rotationSpeed;
            
    }
}