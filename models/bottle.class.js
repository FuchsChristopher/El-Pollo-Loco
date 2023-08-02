class Bottle extends MovableObjekt {
    height = 75;
    width = 75;
    y = 352;
    img;

    images_Bottles = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];


    /**
     * craete a bottle object.
     * the x coordinate of the bottle.
     */
    constructor() {
        super();
        this.selectImage();
        this.loadImage(this.img);
        this.x = 100 + Math.random() * 2100;
    }

    /**
     * sets the image of the bottle.
     */
    selectImage() {
        let index = Math.floor(Math.random() * 2);
        this.img = this.images_Bottles[index];
    }
}