// Declaring variables
let birdX, birdY;
let cBeak, cBody, cWing;
let dX, speed, daySpd, birdMinY, birdMaxY;
let west, up;
let flyCnt, dayCnt, yCnt;
let skyR, skyG, skyB;
let dayR, dayG, dayB;
let ngtR, ngtG, ngtB;
let rdmNum, rdmX, rdmY, rdmRad, rdmR, rdmG, rdmB, rdmAlp;
let tempAlp;
let localF;
let dimSpd;

// Setup function - runs once at the beginning
function setup() { 
  // Creating a canvas with a size of 600x600 pixels
  createCanvas(windowWidth, windowHeight);

  // Initializing variables
  west = true;
  up = true;
  flyCnt = 0;
  dayCnt = 0;
  yCnt = 0;
  birdX = width/2;
  birdY = 250;
  birdMaxY = birdY + 10;
  birdMinY = birdY - 10;
  daySpd = 0.4;
  dX = 1;

  // Setting colors for bird's features
  cBeak = color(255, 0, 0); // Red beak
  cBody = color(255, 255, 0); // Yellow body
  cWing = color(255, 0, 255); // Magenta wings

  // Setting colors for day and night
  dayR = 235;
  dayG = 192;
  dayB = 215;
  ngtR = 104;
  ngtG = 21;
  ngtB = 66;
  
  // Initializing sky color (change these values for a different background color)
  skyR = 100; // Red component
  skyG = 200; // Green component
  skyB = 255; // Blue component

  // Setting the speed of color transition
  dimSpd = 50;
} 

// Draw function - runs repeatedly to draw the animation
function draw() { 
  
  // Drawing the background with the current sky color
  background(skyR, skyG, skyB);
  
  // Drawing background shapes
  drawShapes();
  
  // Generating random positions, colors, and alphas for bubbles
  localF = frameCount % dimSpd;
  if (localF == 0 ) {
    rdmNum = random(5, 20);
    rdmAlp = [];
    rdmX = [];
    rdmY = [];
    rdmRad = [];
    rdmR = [];
    rdmG = [];
    rdmB = [];
    for (let i = 0; i < rdmNum; i++) {
      rdmAlp.push(random(20, 100));
      rdmX.push(random(0, width));
      rdmY.push(random(0, height));
      rdmRad.push(random(30, 250));
      rdmR.push(random(0, 255));
      rdmG.push(random(0, 255));
      rdmB.push(random(0, 255));
    }
  }
  
  // Drawing the bubbles with fading effect
  for (let i = 0; i < rdmNum; i++) {
    if (localF < (dimSpd / 2)) tempAlp = map(localF, 0, (dimSpd / 2 - 1), 0, rdmAlp[i]);
    else if (localF >= (dimSpd / 2)) tempAlp = map(localF, (dimSpd / 2), (dimSpd - 1), rdmAlp[i], 0);
    noStroke();
    fill(rdmR[i], rdmG[i], rdmB[i], tempAlp);
    ellipse(rdmX[i], rdmY[i], rdmRad[i], rdmRad[i]);
  }
  
  // Flying towards west
  if (west) {	
    push();
    translate(birdX, birdY);
    westNoWings();
  
    // Move until the bird reaches the destination   
    if (birdX < mouseX) birdX += dX * speed;
    
    // Fluttering wings
    if (flyCnt >= 0 && flyCnt < 10) {  // Upwing for 10 frames
      westWingUp();  
      flyCnt++;
    } else if (flyCnt >= 10 && flyCnt < 20) {	// Downwing for 10 frames
      westWingDown();
      flyCnt++;
      if (flyCnt == 20) flyCnt = 0;
    }
    
    // Bouncing up and down while flying
    if (birdY == birdMaxY) up = false;
    else if (birdY == birdMinY) up = true;
    if (up) {
      birdY++;
    } else if (!up) {
      birdY--;
    }
  	
  	pop();
  } // westend
  
  // Flying towards east
  if (!west) {
    push();
    translate(birdX, birdY);
    eastNoWings();
    
    // Move until the bird reaches the destination
    if (birdX > mouseX) birdX -= dX * speed;

    // Fluttering wings
    if (flyCnt >= 0 && flyCnt < 10) {  // Upwing for 10 frames
      eastWingUp();  
      flyCnt++;
    } else if (flyCnt >= 10 && flyCnt < 20) {	// Downwing for 10 frames
      eastWingDown();
      flyCnt++;
      if (flyCnt == 20) flyCnt = 0;
    }
    
    if (birdY == birdMaxY) up = false;
    else if (birdY == birdMinY) up = true;
    if (up) {
      birdY++;
    } else if (!up) {
      birdY--;
    }
  	
  	pop();
  } // eastend
      
  // Tracking the mouse pointer and calculating bird's speed
  dX = mouseX - birdX;
  speed = map(dX, 0, width, 0, 0.05);
  if (dX > 0) west = true;
  if (dX < 0) west = false;
  
  // Changing sky color based on day and night transition
  if (((skyR >= dayR) && (skyG >= dayG) && (skyB >= dayB)) || ((skyR <= ngtR) && (skyG <= ngtG) && (skyB <= ngtB))) 
    daySpd *= -1;
  
  if (((daySpd < 0) && (skyR != ngtR)) || ((daySpd > 0) && (skyR != dayR))) skyR += daySpd;
  if (((daySpd < 0) && (skyG != ngtG)) || ((daySpd > 0) && (skyG != dayG))) skyG += daySpd;
  if (((daySpd < 0) && (skyB != ngtB)) || ((daySpd > 0) && (skyB != dayB))) skyB += daySpd;
  
  // Logging mouse coordinates
  console.log(mouseX, " ", mouseY);
  
}

// Function to draw background shapes
function drawShapes() {
  // Stars
  fill(255); // White stars
  let starSize = 5; // Size of the stars
  let numStars = width * height / 10000; // Adjust density based on canvas size
  for (let i = 0; i < numStars; i++) {
    let x = random(width);
    let y = random(height);
    star(x, y, starSize, starSize * 2, 5);
  }
}

// Function to draw a star
function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

// Function to draw bird without wings facing west
function westNoWings() {
  noStroke();
  
  // Beak
  fill(cBeak);
  triangle(150, 20, 80, 15, 80, 30);
  
  // Head
  fill(cBody);
  ellipse(70, 25, 70, 50); // Modified body shape
 
  // Body
  arc(0, 0, 150, 150, 0, PI);
  
  // Eye
  fill(255);
  arc(75, 15, 25, 25, 0, PI);
  
  // Iris
  fill(0);
  arc(75, 15, 16, 16, 0, PI);
}

// Function to draw bird's upwing facing west
function westWingUp() {
  push();
  translate(20, 20);
  
  // Wing up
  rotate(PI/4);
  fill(cWing);
  arc(-50, 0, 100, 100, 0, PI);
  pop();
}

// Function to draw bird's downwing facing west
function westWingDown() {
  push();
  translate(0, 20);
  
  // Wing down
  rotate(PI/4);
  fill(cWing);
  arc(50, 0, 100, 100, 0, PI);
  pop();
}

// Function to draw bird without wings facing east
function eastNoWings() {
  noStroke();
  
  // Beak
  fill(cBeak);
  triangle(-150, 20, -80, 15, -80, 30);
  
  // Head
  fill(cBody);
  ellipse(-70, 25, 70, 50); // Modified body shape
 
  // Body
  arc(0, 0, 150, 150, 0, PI);
  
  // Eye
  fill(255);
  arc(-75, 15, 25, 25, 0, PI);
  
  // Iris
  fill(0);
  arc(-75, 15, 16, 16, 0, PI);
}

// Function to draw bird's upwing facing east
function eastWingUp() {
  push();
  translate(-20, 20);
  
  // Wing up
  rotate(PI/-4);
  fill(cWing);
  arc(50, 0, 100, 100, 0, PI);
  pop();
}

// Function to draw bird's downwing facing east
function eastWingDown() {
  push();
  translate(0, 20);
  
  // Wing down
  rotate(PI/-4);
  fill(cWing);
  arc(-50, 0, 100, 100, 0, PI);
  pop();
}
