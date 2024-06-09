function setup() {
  createCanvas(900, 600);
}

function draw() {
  background(2300);
  fill(250,0,0)
  //red light indicator
  rect(92,305,50,30);
  fill(225,250,0);
  //yellow light indicator
  rect(600,350,8,30);
  fill(0);
  // left tyre
  ellipse(200,400,100,100);
  // right tyre
  ellipse(500,400,100,100);
  fill(100,150,200);
  //car frame starts from here
  beginShape();
  vertex(100,300);
  vertex(250,300);
  vertex(250,200);
  vertex(400,200);
  vertex(500,300);
  vertex(600,300);
  vertex(600,400);
  vertex(100,400);
  vertex(100,300);
  endShape();
  fill(225);
  // no stroke removes the stroking/outline of the shapes
  noStroke();
  // right window starts from here
  beginShape();
  vertex(350,250);
  vertex(400,250);
  vertex(450,200);
  vertex(350,300);
  vertex(350,250);
  endShape();
  rect(280,250,50,50);
  fill(0);
  // left door handle
  ellipse(300,330,15,15);
  // right door handle
  ellipse(380,330,15,15);
  fill(225,250,0);
  
}
