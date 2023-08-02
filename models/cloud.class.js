class Cloud extends MovableObjekt {
    y = 20;
    width = 500;
    height = 250;


    /**
     * Creates a instance of Cloud.
     */
    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.randomSpawnPoint();
        this.animate();
    }

    /**
     * the Cloud spant at random place.
     */
    randomSpawnPoint() {
        this.x = Math.random() * 500;
    }

    /**
     * the moveleft function is played
     */
    animate() {
        this.moveLeft();
    }

    /**
     * the clouds move left
     * and the function cloudReturn is played.
     */
    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
            this.cloudReturn();
        }, 1000 / 60);
    }

    /**
     * the function randomSpawnPoint is played
     * if the x coordinate is -500px.
     */
    cloudReturn() {
        if (this.x < -500) {
            this.randomSpawnPoint();
        }
    }
}