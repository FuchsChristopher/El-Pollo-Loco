class ThrowableObject extends MovableObjekt {
    

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


    trow() {
        this.speedY = 30;
        this.applyGravity();

        setInterval(() => {
            this.bottleDirection();
        }, 1000 / 60)
    }


    bottleDirection() {
            if (this.otherDirection) {
                this.x -= 10;
            } else {
                this.x +=10;   
            } this.angle += this.rotationSpeed;
            
    }
}