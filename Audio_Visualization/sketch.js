// Declare variables
var mic; // Variable to store the microphone input
var colors = [ // Array of colors for the flower petals and center
  "purple",
  "green",
  "pink",
  "red",
  "white",
];

// Setup function to initialize canvas and microphone
function setup() {
  createCanvas(windowWidth, windowHeight); // Create a canvas using the size of the window
  background(100); // Set the background color to gray
  mic = new p5.AudioIn(); // Create a new AudioIn object
  mic.start(); // Start the microphone input
}

// Draw function to draw the flower based on microphone input
function draw() {
  var micLevel = mic.getLevel() * height * 3; // Get the microphone input level
  var petalSize = micLevel * 0.75; // Calculate the size of the petals
  var flowerCenterSize = micLevel * 0.5; // Calculate the size of the flower center

  // Draw petals
  fill(random(colors)); // Set fill color to a random color from the array
  for (var i = 0; i < TWO_PI; i += TWO_PI / 6) { // Loop to draw each petal
    var xOffset = cos(i) * petalSize; // Calculate the x offset of the petal
    var yOffset = sin(i) * petalSize; // Calculate the y offset of the petal
    ellipse(mouseX + xOffset, mouseY + yOffset, petalSize, petalSize); // Draw the petal
  }

  // Draw flower center
  fill(random(colors)); // Set fill color to a random color from the array
  // Draw a triangle to represent the flower center
  triangle(mouseX - flowerCenterSize / 2, mouseY + flowerCenterSize / 3, 
           mouseX + flowerCenterSize / 2, mouseY + flowerCenterSize / 3, 
           mouseX, mouseY - flowerCenterSize / 2);
}

// Function to resize the canvas when the window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // Resize the canvas to match the window size
}
