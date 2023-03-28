class Character extends MovableObjekt {
    height = 285;
    y = 150;
    image_Walking = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];
    curentImage = 0;

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.image_Walking);

        this.animate();
    }


    animate() {
        setInterval(() => {
            let i = this.curentImage % this.image_Walking.length;
            let path = this.image_Walking[i];
            this.img = this.imageCache[path];
            this.curentImage++;
        }, 100);
    }


    jump() {

    }
}