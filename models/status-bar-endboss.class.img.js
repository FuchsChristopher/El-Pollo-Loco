class StatusBarImageBoss extends DrawableObject {
    imagesStatusBarBoss = [
        'img/7_statusbars/3_icons/icon_health_endboss.png'
    ];


    /**
     * Creates a status bar for StatusBarImageBoss object.
     */
    constructor() {
        super();
        this.loadImage(this.imagesStatusBarBoss);
        this.x = 666;
        this.y = 8;
        this.width = 60;
        this.height = 70;
        
    }
}