class SmallChicken extends MovableObjekt {
    y = 357;
    height = 65;
    width = 70;
    energy = 1;
    moveAnimation = false;

    image_Walking = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    image_Dead = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.image_Walking);
        this.loadImages(this.image_Dead);
        this.randomSpawnPoint();
        this.randomSpeed();
        this.animate();
        this.applyGravity();
        this.chickenJump();
    }


    randomSpawnPoint() {
        this.x = 1600 + Math.random() * 500;
    }


    randomSpeed() {
        this.speed = 4.00 + Math.random() * 0.25;
    }

    animate() {
        setInterval(() => {
                this.moveLeft();
                this.chickenReturn();
        }, 1000 / 60);

        setInterval(() => {
            if (this.energy == 1) {
                this.playAnimation(this.image_Walking);
            } else {
                this.playAnimation(this.image_Dead);
            }
        }, 100)


    }


    chickenReturn() {
        if (this.x < -300) {
            this.randomSpawnPoint();
            this.randomSpeed();
        }
    }

    chickenJump() {
        setInterval(() => {
            if (!this.isAboveGround()) {
                this.jump();
            }
        }, 3000);
    }


    jump() {
        this.speedY = 20;
    }
}