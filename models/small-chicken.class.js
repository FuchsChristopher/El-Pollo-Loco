class SmallChicken extends MovableObjekt {
    y = 357;
    height = 65;
    width = 90;
    image_Walking = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.image_Walking);
        this.randomSpawnPoint();
        this.randomSpeed();
        this.animate();
        this.applyGravity();
    }


    randomSpawnPoint() {
        this.x = 60 + Math.random() * 500;
        setInterval(() => {
            this.jump();
        }, 2000);
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
            this.playAnimation(this.image_Walking);
        }, 200);
    }


    chickenReturn() {
        if (this.x < -300) {
            this.randomSpawnPoint();
            this.randomSpeed();
        }
    }
}