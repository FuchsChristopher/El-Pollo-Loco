class StatusBarCoin extends DrawableObject {
    
    statusBarCash = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ];

    percentage = 0;


    /**
     * Creates a status bar for coins object.
     */
    constructor() {
        super();
        this.loadImages(this.statusBarCash);
        this.x = 35;
        this.y = 50;
        this.width = 230;
        this.height = 70;
        this.setPercentage(this.percentage);
    }


    /**
     * Sets the percentage of the coin status and updates the image.
     * @param {*} percentageBottle - The percentage of the coin status.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.statusBarCash[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }


    /**
     * Returns the index of the image based on the current percentage of the coin status.
     * @returns {*} - The index of the image.
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
}