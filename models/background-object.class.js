class BackgroundObject extends MovableObjekt {

    width = 720;
    height = 480;

    /**
     * Contructs a new background object.
     * @param {*} imagePath - the path to the image of the background object.
     * @param {*} x - the initial x coordinate of the background object.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}