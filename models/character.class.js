class Character extends MovableObjekt {
    height = 285;
    y = 150;
    speed = 10;
    world;
    image_Walking = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    image_Jumping = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    images_Idle_Short = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    images_Long_Idle_Short = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    image_Dead = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    image_Hurt = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-43.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    walking_sound = new Audio('audio/Walking.mp3');
    jumpSound = new Audio('audio/Jump_Sound.mp3');
    

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.image_Walking);
        this.loadImages(this.image_Jumping);
        this.loadImages(this.image_Dead);
        this.loadImages(this.image_Hurt);
        this.loadImages(this.images_Idle_Short);
        this.loadImages(this.images_Long_Idle_Short);
        this.applyGravity();
        this.jumpAnimation();
        this.animate();
    }


    animate() {
        setInterval(() => {
            this.walking_sound.pause();
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.walking_sound.play();
                this.otherDirection = false;
            }
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.walking_sound.play();
                this.otherDirection = true;
            }
            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
                this.jumpSound.play();
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.image_Dead);
            } else if (this.isHurt()) {
                this.playAnimation(this.image_Hurt);
            } else {
                if (this.moveLeftAndRight()) { }
            }
        }, 50);

        setInterval(() => {
            this.playIdleAnimation();
        }, 700)
    }


    playIdleAnimation() {
        if (!this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && !this.isAboveGround() && !this.isHurt() && !this.isDead()) {
            this.playAnimation(this.images_Idle_Short);
            setTimeout(() => {
                if (!this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && !this.isAboveGround() && !this.isHurt() && !this.isDead()) {
                    this.playAnimation(this.images_Long_Idle_Short);
                }
            }, 5000)
        }
    }


    moveLeftAndRight() {
        if (this.world.keyboard.RIGHT && !this.isAboveGround() || this.world.keyboard.LEFT && !this.isAboveGround()) {
            this.playAnimation(this.image_Walking);
        }
    }


    jumpAnimation() {
        setInterval(() => {
            if (this.isAboveGround())
                this.playAnimation(this.image_Jumping);
        }, 105)

    }
}