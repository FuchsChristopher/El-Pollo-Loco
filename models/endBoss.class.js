class Endboss extends MovableObjekt {
    img;
    world;
    height = 400;
    width = 250;
    y = 60; 
    triggertBossEvent = false;

    image_Alert = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    image_Walking = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    constructor() {
        super().loadImage('img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.image_Alert);
        this.loadImages(this.image_Walking);
        this.x = 2500;
        this.animate();
        this.randomSpeed();
    }


    randomSpeed() {
        this.speed = 0.15;
    }


    animate() {
        setInterval(() => {
            if (world.character.x >= 2000 && !this.triggertBossEvent) {
                this.playAnimation(this.image_Alert);
                setTimeout(() => {
                    this.triggertBossEvent = true;
                }, 2000)
            } else if (this.triggertBossEvent) {
                this.playAnimation(this.image_Walking);
                this.moveLeft();
            }
        }, 200);
    }


    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
        
    }
}