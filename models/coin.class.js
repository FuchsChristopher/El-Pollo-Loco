class Coin extends MovableObjekt {
    height = 150;
    width = 150;
    y = 282;
    img;

    images_Coins = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];


    constructor() {
        super();
        this.selectImage();
        this.loadImage(this.img);
        this.x = 300 + Math.random() * 2100;
        this.y = 200 + Math.random() * 150;
    }

    selectImage() {
        let index = Math.floor(Math.random() * 2);
        this.img = this.images_Coins[index];
    }
}