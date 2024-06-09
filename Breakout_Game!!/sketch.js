// Declare variables for ball, paddle, bricks, game parameters
let ball;
let paddle;
let bricks = [];
let w, h;
let score = 0;
let lives = 20;
let mode = 'title'; // Set initial mode to 'title'

function setup() {
  createCanvas(windowWidth, windowHeight); // Create a canvas

  // Initialize ball at center bottom
  ball = new Ball(width / 2, height - 94);
  // Initialize paddle
  paddle = new Paddle(width / 2, height - 80, 90, 12);

  // Create bricks for level 1
  createBricks(1);
}

function draw() {
  if (mode === "title"){
    titleScreen(); // Display the title screen
  } else if (mode === "gameplay"){
    runGame(); // Run the game
  } else if (mode === "gameover"){
    gameoverScreen(); // Display the game over screen
  } else if (mode === "gamewin"){
    gamewinScreen(); // Display the game win screen
  }
}

function titleScreen(){
  background(11, 97, 26);
  textSize(100);
  textAlign(CENTER,CENTER);
  fill(random(778,255),random(0,255),random(0,255));
  text('Breakout Game!!',width/2,height/4);
  textSize(35);
  textAlign(CENTER,CENTER);
  fill(0);
  text('Press ENTER to start',width/2,height/2);
  fill(250,0,0);
  text('Get 392 points to win!',width/2,height/1.5);

  // Draw particles
  // Assuming you have ParticleSystem class for the particles
  // dust.update();
  // dust2.update();

  // Key code interaction
  if (keyCode === ENTER){
    mode = 'gameplay'; // Switch to gameplay mode when Enter is pressed
  }
}

function runGame() {
  const bkg = color("lightblue");
  background(red(bkg) / 2, green(bkg) / 2, blue(bkg) / 2); // Set background color
  
  // Display remaining lives
  for (let i = 0; i < lives; i++) {
    fill("LightPink");
    stroke("DeepPink");
    strokeWeight(3);
    circle(i * 45 + 30, 35, 30);
  }

  // Display score
  textSize(30);
  fill("coral");
  stroke(0);
  strokeWeight(4);
  text("\n\n\nScore : " + score, width - 100, height / 4 - 80);
  strokeWeight(2);
  stroke("limegreen");
  text("\n\n\nScore : " + score, width - 100, height / 4 - 80);

  // Display game title
  textSize(40);
  fill(255);
  strokeWeight(4);
  stroke("navy")
  text("\n\nBreakout Game!!", width / 2 - 10, height / 4 - 80);

  // Display author information
  textSize(15);
  strokeWeight(2);
  fill("darkorange");
  text("by : Farhana!", width - 80, height - 20);

  // Render bricks
  for (let brick of bricks) {
    brick.render();
  }
  // Render ball
  ball.render();
  // Render paddle
  paddle.render();
  // Check ball edges
  ball.edges();
  // Check if ball is out of play area
  ball.end();
  // Check if player won the game
  ball.won();

  // Update game during play
  if (gameStarted && !gameInfo && !gameOver && !gameWon) {
    paddle.update();
    ball.update();
    // Check ball-paddle collision
    ball.bounce(paddle);

    let ABBrick = false;
    // Check ball-brick collisions
    for (let i = bricks.length - 1; i >= 0; i--) {
      let brick = bricks[i];
      if (ball.colliding(brick)) {
        if (ABBrick === false) {
          ball.bounceOff(brick);
          ABBrick = true;
        }
        // Increase score
        score += brick.points;
        // Remove collided brick
        bricks.splice(i, 1);
      }
    }
  }

  // Display game over message
  if (gameOver && !gameStarted && !gameInfo && !gameWon) {
    fill("darkMagenta");
    textAlign(CENTER, CENTER);
    strokeWeight(5);
    stroke("firebrick");
    textSize(50);
    text("GAME IS OVER!!", width / 2, height / 2);
    fill("Khaki");
    textSize(20);
    text("press enter to play again!", width / 2, height / 2 + 75);
  }

  // Display game won message
  if (gameWon && !gameOver && !gameStarted && !gameInfo) {
    textAlign(CENTER, CENTER);
    textSize(70);
    stroke("Chartreuse");
    strokeWeight(6);
    fill("MediumSpringGreen");
    text("YOU WIN!!!!!", width / 2, height / 2);
    stroke(0);
    strokeWeight(3);
    text("YOU WIN!!!!!", width / 2, height / 2);
    fill("cyan");
    stroke(0);
    textSize(20);
    text("THAT WAS A GREAT ACHIEVEMENT!!!", width / 2, height / 2 - 100);
    fill("Khaki");
    text("press enter to play again!", width / 2, height / 2 + 50);
  }
}

function gameoverScreen() {
  background(255, 0, 0);
  textAlign(CENTER);
  textSize(50);
  fill(255);
  text("Game Over!", width / 2, height / 2);
}

function gamewinScreen() {
  background(0, 255, 0);
  textAlign(CENTER);
  textSize(50);
  fill(255);
  text("You Win!", width / 2, height / 2);
}

function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    paddle.setDir(1); // Move paddle right
  } else if (keyCode === LEFT_ARROW) {
    paddle.setDir(-1); // Move paddle left
  }

  if (key === ' ') {
    gameStarted = true;
    gameInfo = false;
    gameWon = false;
    gameOver = false;
  }

  if (keyCode === ENTER) {
    gameInfo = true;
    gameOver = false;
    gameStarted = false;
    gameWon = false;
    ball.reset();
    paddle.reset();
    createBricks(0);
    score = 0;
    lives = 35;
  }
}

function keyReleased() {
  paddle.setDir(0); // Stop paddle movement
}

function createBricks(level) {
  if (level === 1) {
    bricks.splice(0);
    for (let i = 0; i < 14; i++) {
      for (let j = 0; j < 7; j++) {
        w = width / 14;
        h = 20;
        bricks.push(new Brick(i * w + w / 2, j * h + h / 4 + 200, w, h, 7 - j));
      }
    }
    }
}
