let canvas;
let world;


function ini() {
    canvas = document.getElementById('canvas');
    world = new World(canvas);


    
    console.log('My Chraracter is', world.character);
}