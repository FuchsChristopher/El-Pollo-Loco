class StatusBarBoss extends DrawableObject {

    imagesStatusBarBoss = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png'
    ];

    percentage = 100;


    /**
     * Creates a status bar for StatusBarBoss object.
     */
    constructor() {
        super();
        this.loadImages(this.imagesStatusBarBoss);
        this.x = 490;
        this.y = 0;
        this.width = 230;
        this.height = 70;
        this.setPercentage(this.percentage);
        this.otherDirection = true;
    }


    /**
     * Sets the percentage of the StatusBarBoss status and updates the image.
     * @param {*} percentageBottle - The percentage of the StatusBarBoss status.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.imagesStatusBarBoss[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }


    /**
     * Returns the index of the image based on the current percentage of the StatusBarBoss status.
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