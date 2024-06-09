var x = 100;
var y = 100;
var trail = []; 

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(220); // Clear the canvas each frame

  // Draw mouse trails
  for (var i = 0; i < trail.length; i++) {
    var trailPos = trail[i];
    var trailSize = map(i, 0, trail.length, 10, 100); // Adjust the size based on the trail length
    var a = random(0, 255);
    var b = random(0, 255);
    var c = random(0, 255);
    fill(a, b, c, 50);
    ellipse(trailPos.x, trailPos.y, trailSize, trailSize);
  }

  // Add current mouse position to the trail array
  trail.push({ x: mouseX, y: mouseY });

  // If the trail array gets too long, remove the oldest position
  if (trail.length > 50) {
    trail.shift();
  }

  // Draw shapes based on mouse state
  if (mouseIsPressed) {
    var m= random(0, 255);
    var n= random(0, 255);
    var o = random(0, 255);
    fill(m, n, o, 50);
    y = y + 0.2;
    rect(mouseX - y / 2, mouseY - y / 2, y, y);
  } else {
    x = x + 0.5;
    var a1 = random(0, 255);
    var b1 = random(0, 255);
    var c1 = random(0, 255);
    fill(a1, b1, c1, 50);
    ellipse(mouseX, mouseY, x, x);
  }
}
