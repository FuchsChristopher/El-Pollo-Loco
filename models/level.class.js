class Level {
    enemies;
    clouds;
    backgroundObjects;
    bottles;
    coins;
    level_end_x = 2200;


    /**
     * 
     * @param {*} enemies - The enemies of the level.
     * @param {*} clouds - The clouds of the level.
     * @param {*} backgroundObjects - The backgroundObjects of the level.
     * @param {*} bottles - The bottles of the level.
     * @param {*} coins - The coins of the level.
     */
    constructor(enemies, clouds, backgroundObjects, bottles, coins) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.bottles = bottles;
        this.coins = coins;
    }
}