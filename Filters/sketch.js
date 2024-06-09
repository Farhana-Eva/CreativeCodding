var img;

function preload() {
  // Preload the image
  img = loadImage("2-2.jpg");
}

function setup () {
  // Create the canvas
  createCanvas (400, 400);
  // Set the background color to black
  background(0);
}

function draw() {
  // Set the background color to black
  background(0);
  // Display the image
  image(img, 0, 0);
  
  // Map the mouseX value to a range between 2 and 20
  var v = map(mouseX, 0, width, 2, 20);
  // Apply the POSTERIZE filter to the canvas using the mapped value
  filter(POSTERIZE, v);
}
