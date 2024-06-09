// Declare variables for ball, paddle, bricks, game parameters
let ball;
let paddle;
let bricks = [];
let w, h;
let gameStarted = false;
let gameInfo = true;
let gameOver = false;
let gameWon = false;
let score = 0;
let lives = 35;

function setup() {
  createCanvas(windowWidth, windowHeight);

  ball = new Ball(width / 2, height - 94);
  paddle = new Paddle(width / 2, height - 80, 90, 12);
}

function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    paddle.setDir(1);
  } else if (keyCode === LEFT_ARROW) {
    paddle.setDir(-1);
  }

  if (key == "1") {
    createBricks(1);
  } else if (key == "2") {
    createBricks(2);
  }

  if (keyCode === ENTER) {
    // Start the game when ENTER is pressed
    if (gameInfo) {
      startGame();
    }
    // Restart the game when ENTER is pressed after game over or win
    if (gameOver || gameWon) {
      restartGame();
    }
  }

  if (key === ' ') {
    // Start the game when SPACE is pressed
    if (gameInfo) {
      startGame();
    }
  }
}

function keyReleased() {
  paddle.setDir(0);
}

function draw() {
  const bkg = color("lightblue");
  background(red(bkg) / 2, green(bkg) / 2, blue(bkg) / 2);

  if (gameInfo) {
    displayTitleScreen();
  } else if (gameStarted && !gameOver && !gameWon) {
    // Display game elements when the game is running
    displayGameElements();
  } else if (gameOver) {
    displayGameOverScreen();
  } else if (gameWon) {
    displayGameWonScreen();
  }
}

function startGame() {
  gameInfo = false;
  gameOver = false;
  gameWon = false;
  ball.reset();
  paddle.reset();
  createBricks(1); // Create bricks for level 1
  score = 0;
  lives = 35;
  gameStarted = true;
}

function restartGame() {
  startGame();
}

function displayTitleScreen() {
  textSize(60);
  textAlign(CENTER, CENTER);
  fill(255);
  stroke(0);
  strokeWeight(4);
  text("Breakout Game", width / 2, height / 3);

  textSize(30);
  text("Press ENTER or SPACE to start", width / 2, height / 2);
  text("Use arrow keys to move the paddle", width / 2, height / 2 + 50);
  text("Press 1 or 2 to toggle levels", width / 2, height / 2 + 100);
}

function displayGameElements() {
  // Display game elements here
  for (let i = 0; i < lives; i++) {
    fill("LightPink");
    stroke("DeepPink");
    strokeWeight(3);
    circle(i * 45 + 30, 35, 30);
  }

  textSize(30);
  fill("coral");
  stroke(0);
  strokeWeight(4);
  text("\n\n\nScore : " + score, width - 100, height / 4 - 80);
  strokeWeight(2);
  stroke("limegreen");
  text("\n\n\nScore : " + score, width - 100, height / 4 - 80);

  textSize(40);
  fill(255);
  strokeWeight(4);
  stroke("navy");
  text("\n\n\Breakout Game!!", width / 2 - 10, height / 4 - 80);

  textSize(15);
  strokeWeight(2);
  fill("darkorange");
  text("by : Farhana!", width - 80, height - 20);

  for (let brick of bricks) {
    brick.render();
  }
  ball.render();
  paddle.render();
  ball.edges();
  ball.end();
  ball.won();

  if (gameInfo && !gameStarted && !gameOver && !gameWon) {
    textAlign(CENTER, CENTER);
    textSize(20);
    fill("LightGoldenRodYellow");
    strokeWeight(3);
    stroke(0);
    text(
      "use the arrow keys to move the paddle",
      width / 2,
      height / 2 + 50
    );
    text("use 1 and 2 to toggle levels", width / 2, height / 2 + 75);
    fill("Khaki");
    text("Press Space to start the game!!", width / 2, height / 2 + 100);
    ball.pos.x = paddle.pos.x;
  }

  //ball.update();

  if (gameStarted && !gameInfo && !gameOver && !gameWon) {
    paddle.update();
    ball.update();
    ball.bounce(paddle);

    let ABBrick = false;
    for (let i = bricks.length - 1; i >= 0; i--) {
      let brick = bricks[i];
      if (ball.colliding(brick)) {
        if (ABBrick === false) {
          ball.bounceOff(brick);
          ABBrick = true;
        }
        score += brick.points;
        bricks.splice(i, 1);
      }
    }
  }

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

function displayGameOverScreen() {
  textSize(40);
  textAlign(CENTER, CENTER);
  fill(255);
  stroke(0);
  strokeWeight(4);
  text("GAME OVER", width / 2, height / 2 - 50);
  textSize(20);
  text("Press ENTER to play again", width / 2, height / 2 + 50);
}

function displayGameWonScreen() {
  textSize(40);
  textAlign(CENTER, CENTER);
  fill(255);
  stroke(0);
  strokeWeight(4);
  text("CONGRATULATIONS! YOU WIN!", width / 2, height / 2 - 50);
  textSize(20);
  text("Press ENTER to play again", width / 2, height / 2 + 50);
}

function createBricks(level) {
  if (level === 1) {
    bricks.splice(0);
    for (let i = 0; i < 14; i++) {
      for (let j = 0; j < 7; j++) {
        w = width / 14;
        h = 15;
        bricks.push(new Brick(i * w + w / 2, j * h + h / 2 + 200, w, h, 7 - j));
      }
    }
  } else if (level === 2) {
    bricks.splice(0);
    for (let j = 0; j < 14; j++) {
      for (let i = 0; i < j + 1; i++) {
        w = width / 14;
        h = 15;
        bricks.push(new Brick(i * w + w / 2, j * h + h / 2 + 200, w, h, (2 * (14 - i) - 1) % 8));
      }
    }
  }
}

