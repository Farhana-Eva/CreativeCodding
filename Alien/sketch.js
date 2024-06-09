let mic;

function setup() {
  createCanvas(400, 400);
 
  mic = new p5.AudioIn();
  mic.start();
}

function draw() {
  background(25, 25, 50, 50);
  
  // Drawing stars
  for (let i = 0; i < 90; i++) {
    let x = random(width);
    let y = random(height);
    let size = random(1, 2);
    fill(255);
    noStroke();
    ellipse(x, y, size, size);
  }
  
  // Getting microphone input
  let vol = mic.getLevel();
  
  // Drawing ray
  fill(100, 120, 180, 60);
  stroke(240, 240, 240, 20);
  strokeWeight(5);
  triangle(200, 200, 0, 400, 400, 400);
  
  // Drawing UFO
  fill(20);
  noStroke();
  ellipse(width / 2, height / 2, 350, 100);
  ellipse(width / 2, height / 2.5, 150, 150);
  
  // Drawing Window
  fill(120);
  ellipse(width / 2, height / 2.5, 110, 110);
  
  // Drawing Alien
  fill(100, 220, 50);
  stroke(80, 100, 170);
  strokeWeight(5);
  ellipse(width / 2, height / 2.5, 100, 100);
  
  // Drawing facial features
  fill(0);
  stroke(0);
  strokeWeight(2);
  ellipse(width / 2, height / 2.20, 40, vol * 200);
  ellipse(width / 2.25, height / 2.75, 30, 20);
  ellipse(width / 1.8, height / 2.75, 30, 20);
}
