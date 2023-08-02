class StatusBarHealth extends DrawableObject {
    statusBarLife = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ];

    percentage = 100;


    /**
     * Creates a StatusBarHealth object.
     */
    constructor() {
        super();
        this.loadImages(this.statusBarLife);
        this.x = 35;
        this.y = 0;
        this.width = 230;
        this.height = 70;
        this.setPercentage(this.percentage);
    }


    /**
     * Sets the percentage of the StatusBarHealth and updates the image.
     * @param {*} percentage - The percentage of the StatusBarHealth.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.statusBarLife[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }


    /**
     * Returns the index of the image based on the current percentage of the StatusBarHealth.
     * @returns {number} - The index of the image.
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