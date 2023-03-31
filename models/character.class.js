class Character extends MovableObjekt {
    height = 285;
    y = 150;
    speed = 10;
    image_Walking = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];
    world;

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.image_Walking);

        this.animate();
    }


    animate() {
        //Chraracter moves Right
        setInterval(() => {
            if (this.world.keyboard.RIGHT) {
                this.x += this.speed;
                this.otherDirection = false;
            }
            if (this.world.keyboard.LEFT) {
                this.x -= this.speed;
                this.otherDirection = true;
            }
            this.world.camera_x = -this.x;
        }, 1000 / 60);

        //Walk animation
        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                let i = this.curentImage % this.image_Walking.length;
                let path = this.image_Walking[i];
                this.img = this.imageCache[path];
                this.curentImage++;
            }
        }, 50);
    }


    jump() {

    }
}