var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            "name": "Robot Romp",
            "number": 1, 
            "speed": -3,
            "gameItems": [
                { "type": "sawblade", "x": 400, "y": groundY - 50 }, // adds the saw blades into my game
                { "type": "sawblade", "x": 800, "y": groundY - 50 }, // adds the saw blades into my game
                { "type": "sawblade", "x": 1400, "y": groundY - 50 }, // adds the saw blades into my game
                { "type": "sawblade", "x": 1800, "y": groundY - 50 }, // adds the saw blades into my game
                { "type": "sawblade", "x": 2600, "y": groundY - 50 }, // adds the saw blades into my game


                {"type": "enemy", "x": 200, "y": groundY - 50}, // adds the enemy into my game 
                {"type": "enemy", "x": 500, "y": groundY - 50}, // adds the enemy into my game 
                {"type": "enemy", "x": 900, "y": groundY - 50}, // adds the enemy into my game 
                {"type": "enemy", "x": 1900, "y": groundY - 50}, // adds the enemy into my game 
                {"type": "enemy", "x": 2700, "y": groundY - 50}, // adds the enemy into my game 
                {"type": "enemy", "x": 3500, "y": groundY - 50}, // adds the enemy into my game 
                {"type": "enemy", "x": 4100, "y": groundY - 50}, // adds the enemy into my game 

                {"type": "reward", "x": 400, "y": groundY - 50}, // adds the reward into my game
                {"type": "reward", "x": 900, "y": groundY - 50}, // adds the reward into my game
                {"type": "reward", "x": 1400, "y": groundY - 50}, // adds the reward into my game
                {"type": "reward", "x": 2200, "y": groundY - 50}, // adds the reward into my game
                {"type": "reward", "x": 3200, "y": groundY - 50}, // adds the reward into my game
                {"type": "reward", "x": 3900, "y": groundY - 50}, // adds the reward into my game
                
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(false);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE

        function createSawBlade(x, y){
            var hitZoneSize = 25; // creates size of the hitzone
            var damageFromObstacle = 10; // sets the damage to the obstacle
            var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle); // create the hitzone and stores it in this variable
            sawBladeHitZone.x = x; // the x position of the hitzone
            sawBladeHitZone.y = y; // the y position of the hitzone
            game.addGameItem(sawBladeHitZone); // add hitzone to the game   

           

            var obstacleImage =draw.bitmap('img/building_blocks.png'); // drawing the image and storing in the variable
            sawBladeHitZone.addChild(obstacleImage); // add the imaghe to the hitzone so we can see it 
            
            obstacleImage.x = -57; // tweaks the image 25 pixels to the left
            obstacleImage.y = -115; // tweaks the image 25 pixels up
            //sawBladeHitZone.rotationalVelocity = 5;    
            obstacleImage.scaleX = 0.2; //control the size of the obstacle
            obstacleImage.scaleY = 0.2;  // controls the height of the obstacle

        }
    
function createEnemy(x,y){
    var enemy = game.createGameItem('enemy',25); // creating the game item and storing it in the variable enemy
    var redSquare = draw.rect(50,50,'red'); // creates rectangle and stores as redSquare
    var redSquare =draw.bitmap('img/puppy 2.png')
    redSquare.x = -25; //  x pos of the hitzone in reference in Images's x
    redSquare.y = -25; //  y pos of the hitzone in reference in Images's x
    enemy.addChild(redSquare); // add redsqaure the enemy game item


    enemy.x = x; // changes the enemies x position to x
    enemy.y = y; // changes the enemies y position to y

    enemy.scaleX = 0.1; //control the size of the enemy 
    enemy.scaleY = 0.1; // controls the height of the enemy


    game.addGameItem(enemy);// adds enemy to the game

    enemy.velocityX = -1; // causes the enemy to move 1 pixel to left on the x position 
    

    enemy.onPlayerCollision = function() { // detects if the player has collided with the enemy
        console.log('The enemy has hit Halle'); 
        game.changeIntegrity(-20); // takes away health from the enemy 
    };

    enemy.onProjectileCollision = function() { // detetcs if projectile is colliding with enemy 
        console.log('The projectile hit the Halle');
        game.changeIntegrity(5); // adds health if projectile collides with enemy 
        game.increaseScore(50); // increases score if the projectile collides with enemy 
        enemy.fadeOut(); // makes the enemy disappear if hit
    };

}
function createReward(x,y){
    var reward = game.createGameItem('reward',60); // creating the game item and storing it in the variable enemy
    var blueSquare = draw.bitmap('img/baby_bottle.png'); // creates rectangle and stores as redSquare
    blueSquare.x = -57; // controls the x value of the reward
    blueSquare.y = -60; // controls the y value of the reward
    reward.addChild(blueSquare); // add redsqaure the enemy game item

    reward.scaleX = 0.2; //control the size of the reward 
    reward.scaleY = 0.2; // controls the height of the reward

    reward.x = x; // changes the reward x position to x
    reward.y = y; // changes the reward y position to y 

    game.addGameItem(reward);// adds enemy to the game

    reward.velocityX = -1; // causes the enemy to move 1 pixel to left on the x position 
    //reward.rotationalVelocity = 5;  

    reward.onPlayerCollision = function() { // detects if the player has collided with enemy 
        console.log('The enemy has hit Halle');
        game.changeIntegrity(10);  // adds health if projectile collides with enemy 
    };

    reward.onProjectileCollision = function() { // detects if the player has collided with enemy 
        console.log('The projecctile hit the Halle');
        game.changeIntegrity(10); // adds health if projectile collides with enemy 
        game.increaseScore(10); // increase score if the projectile collides with enemy 
        reward.fadeOut(); // makes the enemy disappear if hit
    };
}

  
    for(var i = 0; i < levelData.gameItems.length; i++){  // the for loop is used to interate the sawblade, enemy, and reward
       var gameItem = levelData.gameItems[i];

       if (gameItem.type === "sawblade"){ // if saw blade is called run sawBlade fucntion 
           createSawBlade(gameItem.x, gameItem.y);
       }
        if (gameItem.type === "enemy"){ // if the enemy is called then run the enemy function
           createEnemy(gameItem.x, gameItem.y);
       }
       if (gameItem.type === "reward"){ // if the reward is called then run reward statement 
        createReward(gameItem.x, gameItem.y);
    
        }
    };

        // DO NOT EDIT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}

