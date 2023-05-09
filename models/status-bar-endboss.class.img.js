class StatusBarImageBoss extends DrawableObject {
    imagesStatusBarBoss = [
        'img/7_statusbars/2_statusbar_endboss/orange.png'
    ];

    constructor() {
        super();
        this.loadImage(this.imagesStatusBarBoss);
        this.x = 485;
        this.y = 0;
        this.width = 230;
        this.height = 70;
        
    }
}