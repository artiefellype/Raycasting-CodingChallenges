// Ray casting coding train

let walls = [];
let ray;
let particle;

function setup(){
    createCanvas(800, 800);
    for(let i = 0; i < 5; i++){
        let x1 = random(width);
        let x2 = random(width);
        let y1 = random(height);
        let y2 = random(height);
        walls[i] = new RayLine(x1,y1,x2,y2);
    }

    walls[5] = new RayLine(800, 0, 0, 0);
    walls[6] = new RayLine(0, 800, 0, 0);
    walls[7] = new RayLine(800, 0, 800, 800);
    walls[8] = new RayLine(0, 800, 800, 800);



    
    particle = new Particle();
}

function draw(){
    background(0);
    for( let wall of walls){
        wall.show();
    }
    
    particle.update(mouseX, mouseY);
    particle.show();
    particle.look(walls);
    
}