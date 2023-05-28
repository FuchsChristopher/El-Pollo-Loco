class Chicken extends MovableObjekt {
    y = 357;
    height = 65;
    width = 90;
    energy = 1;
    image_Walking = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    image_Dead = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.image_Walking);
        this.loadImages(this.image_Dead);
        this.randomSpawnPoint();
        this.randomSpeed();
        this.animate();
        this.animateTwo();
    }


    randomSpawnPoint() {
        this.x = 600 + Math.random() * 500;
    }


    randomSpeed() {
        this.speed = 0.65 + Math.random() * 0.25;
    }

    
    animate() {
        let animateInterval = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
        setInterval(() => {
            if ((this.energy == 1)) {
                this.playAnimation(this.image_Walking);
            } else {
                this.playAnimation(this.image_Dead);
                setTimeout(() => {
                    clearInterval(animateInterval);
                }, 1000 / 60);
            }
        }, 200);
    }


    chickenReturn() {
        if (this.x < -300) {
            this.randomSpawnPoint();
            this.randomSpeed();
        }
    }


    animateTwo() {
        setInterval(() => {
            this.chickenReturn();
        }, 1000 / 60);
    }

}