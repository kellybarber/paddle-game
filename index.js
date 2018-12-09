let canvas, canvasContext;

const boardColor   = 'black';
const ballColor    = 'white';
const paddleColor  = 'white';
const paddleLength  = 100;
const paddleWidth  = 10;
const paddleCenter = paddleLength / 2;
const paddleGap    = 60;   // Distance from bottom of canvas to paddle

let ballSpeedX   = 5;   // Increment for ball position on X axis
let ballSpeedY   = 5;   // Increment for ball position on Y axis
let ballX        = 75;  // Ball position on X axis
let ballY        = 75;  // Ball position on Y axis
let paddleX      = 400;  // Paddle's position on the X axis

window.onload = () => {
  canvas        = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');

  // Set game re-render at a defined frame rate
  const framesPerSecond = 30;
  setInterval(updateAll, 1000/framesPerSecond);

  // Listen for mouse move
  canvas.addEventListener('mousemove', updateMousePosition);
};

function updateAll() {
  drawAll();
  moveAll();
}

function drawAll() {
  drawGameBoard(0, 0, canvas.width, canvas.height, boardColor);
  drawBall(ballX, ballY, 10, ballColor);
  drawPaddle(paddleX, canvas.height - paddleGap, paddleLength, paddleWidth, paddleColor);
}

function drawGameBoard(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
  canvasContext.fillStyle = fillColor;
  canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}

function drawBall(centerX, centerY, radius, fillColor) {
  canvasContext.fillStyle = fillColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
  canvasContext.fill();
}

function drawPaddle(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
  canvasContext.fillStyle = fillColor;
  canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}

function moveAll() {
  ballX += ballSpeedX;  // Add the ball speed num to its canvas position on the X axis
  ballY += ballSpeedY;  // Add the ball speed num to its canvas position on the Y axis

  if (ballX < 0)             ballSpeedX *= -1;  //  Bounce off of X canvas start  --> Left
  if (ballX > canvas.width)  ballSpeedX *= -1;  //  Bounce off of X canvas end    --> Right
  if (ballY < 0)             ballSpeedY *= -1;  //  Bounce off of Y canvas start  --> Top
  if (ballY > canvas.height) ballSpeedY *= -1;  //  Bounce off of Y canvas end    --> Bottom

  const paddleBottomEdgeY = canvas.height - paddleGap;
  const paddleTopEdgeY    = paddleBottomEdgeY + paddleWidth;
  const paddleLeftEdgeX   = paddleX;
  const paddleRightEdgeX  = paddleX + paddleLength;

  // Ball is above bottom edge of paddle & below the top edge & inside the left side & inside the right side
  if ( ballY > paddleBottomEdgeY && ballY < paddleTopEdgeY && ballX > paddleLeftEdgeX && ballX < paddleRightEdgeX ) {
    const paddleCenterX = paddleX + paddleCenter;  // The center of the paddle in relation to the X axis
    const distFromCenterX = ballX - paddleCenterX;   // The distance of the ball from the center of the paddle

    ballSpeedY *= -1;                     // Bounce the ball back up
    ballSpeedX = distFromCenterX * 0.35;  // Change ball speed to stronger angle as it gets further from center of paddle
  }
}

function updateMousePosition(e) {
  const rect = canvas.getBoundingClientRect();
  const root = document.documentElement;

  // Paddle position: X axis mouse position - distance of canvas from left side of page - distance user has scrolled
  const mouseX = e.clientX - rect.left - root.scrollLeft;

  paddleX = mouseX - paddleCenter;
}

function ballReset() {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
}
