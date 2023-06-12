class Endboss extends MovableObjekt {
    img;
    world;
    height = 400;
    width = 250;
    y = 60;
    speed = 0.15;
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

    image_Hurt = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    image_Dead = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    constructor() {
        super().loadImage('img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.image_Alert);
        this.loadImages(this.image_Walking);
        this.loadImages(this.image_Hurt);
        this.loadImages(this.image_Dead);
        this.x = 2500;
        this.animate();
        this.animate_2();
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
        }, 1000 / 60)
    }


    animate_2() {
        setInterval(() => {
           this.bossAnimation();
        }, 400);
    }


    bossAnimation() {
        if (this.isHurt()) {
            this.bossHurt();
        } if (this.bossEnergy <= 0) {
            setInterval(() => {
                this.playAnimation(this.image_Dead);
            }, 1000 / 10)
            
            setTimeout(() => {
                this.endGame();
                toggledMusic = false;
                game_background_sound.pause();
            }, 900)   
        }
    }


    endGame() {
        for (let i = 1; i < 9999; i++) window.clearInterval(i);
        showEndScreen();
        setTimeout(() => {
           this.restartGame();
        }, 3000)
    }


    restartGame() {
        showStartScreen();
    }


    bossHurt() {
        this.playAnimation(this.image_Hurt);
    }
}