class Cloud extends MovableObjekt {
    y = 20;
    width = 500;
    height = 250;

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.randomSpawnPoint();
        this.animate();
    }


    randomSpawnPoint() {
        this.x = Math.random() * 500;
    }

    animate() {
        this.moveLeft();
    }


    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
            this.cloudReturn();
        }, 1000 / 60);
    }


    cloudReturn() {
        if (this.x < -500) {
            this.randomSpawnPoint();
        }
    }
}