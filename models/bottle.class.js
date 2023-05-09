class Bottle extends MovableObjekt {
    height = 75;
    width = 75;
    y = 352;
    img;

    images_Bottles = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];


    constructor() {
        super();
        this.selectImage();
        this.loadImage(this.img);
        this.x = 100 + Math.random() * 2100;
    }

    selectImage() {
        let index = Math.floor(Math.random() * 2);
        this.img = this.images_Bottles[index];
    }
}