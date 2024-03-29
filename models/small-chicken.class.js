class SmallChicken extends MovableObjekt {
    y = 357;
    height = 65;
    width = 70;
    energy = 1;
    

    image_Walking = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    image_Dead = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];


    /**
     * Creates a instance of SmallChicken.
     */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.image_Walking);
        this.loadImages(this.image_Dead);
        this.randomSpawnPoint();
        this.randomSpeed();
        this.animate();
        this.applyGravity();
        this.chickenJump();
        this.animateTwo();
    }


    /**
     * the SmallChicken spant at random place.
     */
    randomSpawnPoint() {
        this.x = 1600 + Math.random() * 500;
    }


    /**
     * the SmallChicken gets a random speed.
     */
    randomSpeed() {
        this.speed = 2.00 + Math.random() * 0.25;
    }


    /**
     * specifies which animation to played.
     */
    animate() {
        let animateIntervall = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            if (this.energy == 1) {
                this.playAnimation(this.image_Walking);
            } else {
                this.playAnimation(this.image_Dead);
                setTimeout(() => {
                    clearInterval(animateIntervall);
                }, 1000 / 60);
            }
        }, 100);
    }


    /**
     * the SmallChicken spant at random place.
     * the SmallChicken gets a random speed.
     */
    chickenReturn() {
        if (this.x < -300) {
            this.randomSpawnPoint();
            this.randomSpeed();
        }
    }

    /**
     * jumping is performed every three seconds.
     */
    chickenJump() {
        setInterval(() => {
            if (!this.isAboveGround()) {
                this.jump();
            }
        }, 3000);
    }


    /**
     * specifies which animation to played.
     */
    animateTwo() {
        setInterval(() => {
            this.chickenReturn();
        }, 1000 / 60);
    }


    /**
     * Makes the object jump.
     */
    jump() {
        this.speedY = 20;
    }
}