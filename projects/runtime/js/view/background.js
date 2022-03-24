var background = function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        /* Error Checking - DO NOT DELETE */
        if(!app) {
            throw new Error("Invalid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }
        
        // useful variables
        var canvasWidth = app.canvas.width;
        var canvasHeight = app.canvas.height;
        var groundY = ground.y;
        
        // container which will be returned
        var background;
        
        // ANIMATION VARIABLES HERE:
        var tree;
        var buildings = [];

        // called at the start of game and whenever the page is resized
        // add objects for display in background. draws each image added to the background once
        function render() {
            background.removeAllChildren();

            // TODO: 2 - Part 2
            // this fills the background with a obnoxious yellow
            // you should modify this to suit your game
            var backgroundFill = draw.rect(canvasWidth,groundY,'pink');
            background.addChild(backgroundFill);
            
            // TODO: 3 - Add a moon and starfield
            var moon = draw.bitmap('img/moon.png');// created a var called moon. draw.bitmap draws the moon and stores it in the variable
             moon.x = canvasWidth  - 300; // control the left and right of the position of the moon
             moon.y = groundY  - 450; // controls the up and down position of moon
             moon.scaleX = 0.5; //changes the x scale of the moons
             moon.scaleY = 0.5; // changes y scale of the moon
             background.addChild(moon);// adds the moon to the bachground

                //everytime this loop runs it creates a circle with a randome x and y respective to the canavs and is added to the 
             for (var i = 0; i <= 100; i++){
                var circle = draw.circle(10,'white','LightGray',2); // creates a variable called circle that holds each circle
                circle.x = canvasWidth*Math.random(); // multiplies canvasWidth * a random decimal between .1 and .99 and assigns it to circle.x
                circle.y = groundY*Math.random(); // multiplies groundY * a random decimal between .1 and .99 and assigns it to circle.y
                background.addChild(circle); // adds the circle to the Background
             }
            
            // TODO 5: Part 1 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
            for(var i=0;i<5;++i) {
                var buildingHeight = 300; // creates a variable called buildingHeight that holds the height of the building in pixels
                var building = draw.rect(75,buildingHeight,'LightGray','Black',1); // creates a variable called building that holds the data for the drawbuilding
                building.x = 200*i; // positions the x of each building 200 pixels from the next building on each loop
                building.y = groundY-buildingHeight; // sets the y of the building off of groundY - buildingHeight
                background.addChild(building); // adds the building to the background so it can be seen 
                buildings.push(building); // pushes each individual building to the buildings array
            }
            
            // TODO 4: Part 1 - Add a tree
           tree = draw.bitmap('img/tree.png'); // reasssigns the drawn image tree to the variable tree
            tree.x = 600; // assigns an X value to the tree
            tree.y = groundY - 100; //assigns an= Y vale to the tree
             tree.scaleX = 0.5; //changes the x scale of the moons
             tree.scaleY = 0.5; // changes y scale of the moon
             background.addChild(tree); // adds tree to the background
         
            
        } // end of render function - DO NOT DELETE
        
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            
            // TODO 4: Part 2 - Move the tree!
            tree.x = tree.x - 1; // taking the value of tree.X (x position) and decreasing by 1 pixel every time the updatefunction runs

             if(tree.x < -200) {
                tree.x = canvasWidth;
            }
            
            // TODO 5: Part 2 - Parallax
            for (var i = 0; i < buildings.length; i++) {
                buildings[i].x = buildings[i].x - 0.5; // moves the buildings x position by .5 pixels`
                if(buildings[i].x < 0) { // check to see if the building's x pos is off the left side and if it is it resets it to the right side
                    buildings[i].x = canvasWidth;
                }
            }

        } // end of update function - DO NOT DELETE
        
        
        
        /* Make a createjs Container for the background and let it know about the render and upate functions*/
        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        /* make the background able to respond to resizing and timer updates*/
        app.addResizeable(background);
        app.addUpdateable(background);
        
        /* render and return the background */
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}
