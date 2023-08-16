class Endboss extends MovableObjekt {
    img;
    world;
    height = 400;
    width = 250;
    y = 60;
    speed = 0.15;
    triggertBossEvent = false;

    image_splash_bottle = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

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


     /**
     * Creates a instance of EnBoss.
     */
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


    /**
     * starts the boss animation and the bossEvent.
     */
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


    /**
     * this function indicates that the endBoss moves to the left.
     */
    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60)
    }


    /**
     * Plays the animation for the endBoss.
     */
    animate_2() {
        setInterval(() => {
            this.bossAnimation();
        }, 400);
    }


    /**
     * Plays the animation for the endBoss.
     */
    bossAnimation() {
        if (this.isHurt()) {
            this.bossHurt();
        } if (this.bossEnergy <= 0) {
            setInterval(() => {
                this.speed = 0;
                this.playAnimation(this.image_Dead);
            }, 1000 / 10)
            setTimeout(() => {
                this.endGame();
                toggledMusic = false;
                game_background_sound.pause();
            }, 900)
        }
    }


    /**
     * this function ensures that the game is end.
     */
    endGame() {
        for (let i = 1; i < 9999; i++) window.clearInterval(i);
        showEndScreen();
        mobileButtonsHidden();
        setTimeout(() => {
            this.restartGame();
        }, 3000)
    }


    /**
     * show the startScreen.
     */
    restartGame() {
        showStartScreen();
        test = false;
    }


    /**
     * plays the hurting Animation.2
     */
    bossHurt() {
        this.playAnimation(this.image_Hurt);
    }


    mobileButtonsHidden() {
        document.getElementById('divMobileButtouns').classList.add('d-none');
    }

}