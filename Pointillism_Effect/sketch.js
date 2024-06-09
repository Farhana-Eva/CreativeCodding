// Declare variables for the image and coordinates
var img, x, y;

// Preload function to load the image before setup
function preload() {
  img = loadImage("4.jpg"); // Load the image
}

// Setup function to initialize canvas and other settings
function setup() {
  createCanvas(400, 400); // Create a canvas of size 400x400 pixels
  noStroke(); // Disable stroke for drawing shapes
}

// Draw function to update the canvas
function draw() {
  // Generate random coordinates within the canvas
  x = random(width);
  y = random(height);
  
  // Get the color of the pixel at the random coordinates from the image
  var c = img.get(x, y);
  
  // Set the fill color to the color obtained from the pixel with a reduced opacity
  fill(c[0], c[1], c[2], 200);
  
  // Set the rectangle mode to center
  rectMode(CENTER);
  
  // Draw a rectangle at the random coordinates with a size of 30x30 pixels
  rect(x, y, 30, 30);
}
