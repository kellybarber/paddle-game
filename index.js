let canvas, canvasContext;

let ballX      = 75;  // Ball position on X axis
let ballY      = 75;  // Ball position on Y axis
let ballSpeedX = 5;   // Increment for ball position on X axis
let ballSpeedY = 5;   // Increment for ball position on Y axis

window.onload = () => {
  canvas        = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');

  const framesPerSecond = 30;
  setInterval(updateAll, 1000/framesPerSecond);
};

function updateAll() {
  drawAll();
  moveAll();
}

function drawAll() {
  // Draw Canvas
  canvasContext.fillStyle = 'black';
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);

  // Draw Ball
  canvasContext.fillStyle = 'white';
  canvasContext.beginPath();
  canvasContext.arc(ballX, ballY, 10, 0, Math.PI * 2, true);
  canvasContext.fill();
}

function moveAll() {
  ballX += ballSpeedX;  // Add the ball speed num to its canvas position on the X axis
  ballY += ballSpeedY;  // Add the ball speed num to its canvas position on the Y axis

  if (ballX < 0)             ballSpeedX *= -1;  //  Bounce off of X canvas start
  if (ballX > canvas.width)  ballSpeedX *= -1;  //  Bounce off of X canvas end
  if (ballY < 0)             ballSpeedY *= -1;  //  Bounce off of Y canvas start
  if (ballY > canvas.height) ballSpeedY *= -1;  //  Bounce off of Y canvas end
}
