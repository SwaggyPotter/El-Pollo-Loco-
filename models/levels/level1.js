let level1;
function initLevel() {
    level1 = new Level(
        [
            new chicken(),
            new chicken(),
            new chicken(),
            new chicken(),
            new chicken(),
            new littleChicken(),
            new littleChicken(),
            new littleChicken(),
            new littleChicken(),
            new Endboss()
        ],

        [
            new cloud()
        ],

        [
            /*#####################*/
            /*###Left background###*/
            /*#####################*/
            new Background('img/5_background/layers/air.png', -719, 0),
            new Background('img/5_background/layers/3_third_layer/2.png', -719, 0),
            new Background('img/5_background/layers/2_second_layer/2.png', -719, 0),
            new Background('img/5_background/layers/1_first_layer/2.png', -719, 0),

            new Background('img/5_background/layers/air.png', -719 * 2, 0),
            new Background('img/5_background/layers/3_third_layer/1.png', -719 * 2, 0),
            new Background('img/5_background/layers/2_second_layer/1.png', -719 * 2, 0),
            new Background('img/5_background/layers/1_first_layer/1.png', -719 * 2, 0),

            /*####################*/
            /*###Mid background###*/
            /*####################*/
            new Background('img/5_background/layers/air.png', 0, 0),
            new Background('img/5_background/layers/3_third_layer/1.png', 0, 0),
            new Background('img/5_background/layers/2_second_layer/1.png', 0, 0),
            new Background('img/5_background/layers/1_first_layer/1.png', 0, 0),

            /*######################*/
            /*###Right background###*/
            /*######################*/
            new Background('img/5_background/layers/air.png', 719, 0),
            new Background('img/5_background/layers/3_third_layer/2.png', 719, 0),
            new Background('img/5_background/layers/2_second_layer/2.png', 719, 0),
            new Background('img/5_background/layers/1_first_layer/2.png', 719, 0),

            new Background('img/5_background/layers/air.png', 719 * 2, 0),
            new Background('img/5_background/layers/3_third_layer/1.png', 719 * 2, 0),
            new Background('img/5_background/layers/2_second_layer/1.png', 719 * 2, 0),
            new Background('img/5_background/layers/1_first_layer/1.png', 719 * 2, 0),

            new Background('img/5_background/layers/air.png', 719 * 3, 0),
            new Background('img/5_background/layers/3_third_layer/2.png', 719 * 3, 0),
            new Background('img/5_background/layers/2_second_layer/2.png', 719 * 3, 0),
            new Background('img/5_background/layers/1_first_layer/2.png', 719 * 3, 0),


            new Background('img/5_background/layers/air.png', 719 * 4, 0),
            new Background('img/5_background/layers/3_third_layer/1.png', 719 * 4, 0),
            new Background('img/5_background/layers/2_second_layer/1.png', 719 * 4, 0),
            new Background('img/5_background/layers/1_first_layer/1.png', 719 * 4, 0),

        ],

        /*######################*/
        /*###coins in the map###*/
        /*######################*/

        [
            new Coins(),
            new Coins(),
            new Coins(),
            new Coins(),
            new Coins()
        ],

        /*##############################*/
        /*###salsa bottles in the map###*/
        /*##############################*/

        [
            new SalsaBottle(),
            new SalsaBottle(),
            new SalsaBottle(),
            new SalsaBottle(),
            new SalsaBottle(),
            new SalsaBottle(),
            new SalsaBottle(),
            new SalsaBottle(),
            new SalsaBottle(),
            new SalsaBottle()
        ]
    )
};