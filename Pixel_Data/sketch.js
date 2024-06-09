// Declare variables for the image and mouse coordinates
var img, x, y;

// Preload function to load the image before setup
function preload() {
  img = loadImage("3.jpg"); // Load the image
}

// Setup function to initialize canvas and background
function setup() {
  createCanvas (400, 400); // Create a canvas of size 400x400 pixels
  background(0); // Set the background color to black
  noStroke(); // Disable stroke for drawing shapes
}

// Draw function to update the canvas
function draw() {
  background(0); // Set the background color to black
  
  // Update the variables x and y with the current mouse position
  x = mouseX;
  y = mouseY;
  
  // Display the loaded image at position (0, 0)
  image(img, 0, 0);
  
  // Get the color of the pixel at the mouse position
  var c = get(x, y);
  
  // Set the fill color to the color obtained from the pixel
  fill(c);
  
  // Draw an ellipse at the current mouse position with a diameter of 100 pixels
  ellipse(x, y, 100, 100);
}
