var angle = 0;
var desiredAngle = 0;
var deltaA;
var gameboard;
var inAnimation = false;
var boardSize = 700;
var teamColors = [[0, 0, 0], [255, 0, 0]];
var team = 0;
var peer = new Peer();
var myID;
var connection;

peer.on('open', function(id) {
  console.log('My peer ID is: ' + id);
  myID = createSpan(id);
});

peer.on('connection', dataConnection => {
  connection = dataConnection;
  connection.on('data', doExternalMove);
  console.log(connection);
});

function setup() {
  createCanvas(800, 800);
  rectMode(CORNER);
  //ellipseMode(CORNER);
  var img = loadImage('gameboard.png');
  gameboard = new GameBoard(img);
  createDiv();
  var buttonCCW = createButton('CCW', 'rotateCCW');
  var button180 = createButton('180', 'rotate180');
  var buttonCW = createButton('CW', 'rotateCW');
  buttonCW.mousePressed(rotateBoardCW);
  button180.mousePressed(rotateBoard180);
  buttonCCW.mousePressed(rotateBoardCCW);
  slider = createSlider(70, 700, 490, 7);
  input = createInput();
  button = createButton('connect');
  button.mousePressed(connectToPeer);
}

function connectToPeer() {
  var id = input.value();
  console.log(id);
  connection = peer.connect(id);
  connection.on('data', doExternalMove);
  console.log(connection);
}
function rotateBoardCW() {
  rotateBoard(90, true);
}
function rotateBoard180() {
  rotateBoard(180, true);
}
function rotateBoardCCW() {
  rotateBoard(-90, true);
}

function rotateBoard(newAngle, send) {
  if (!inAnimation) {
    //if (send) connection.send('rotate ' + newAngle);
    console.log(newAngle);
    desiredAngle = desiredAngle + radians(newAngle);
    deltaA = (desiredAngle - angle) / 50;
    inAnimation = true;
  }
}

function doExternalMove(data) {
  data = data.split(' ');
  switch (data[0]) {
    case 'add':
      gameboard.addPiece(int(data[1]), team);
      break;
    case 'rotate':
      rotateBoard(int(data[1]), false);
      break;
  }
  team = (team + 1) % 2;
}

function mouseReleased() {
  if (event.type != 'mouseup') return;
  var boardPos = (width - boardSize) / 2;
  if (
    mouseX - boardPos > 0 &&
    mouseY - boardPos > 0 &&
    mouseX - boardPos < boardSize &&
    mouseY - boardPos < boardSize
  ) {
    var col = int((mouseX - boardPos) / (boardSize / 7));
    if (gameboard.addPiece(col, team)) {
      //connection.send('add ' + col);
      team = (team + 1) % 2;
    }
  }
}

function draw() {
  boardSize = slider.value();

  background(220);
  if (abs(desiredAngle - angle) > abs(deltaA)) {
    angle = angle + deltaA;
  } else {
    if (inAnimation) {
      translateBoard(desiredAngle);
    }
    angle = desiredAngle;
    inAnimation = false;
  }
  translate(width / 2, height / 2);
  rotate(angle);
  translate(-boardSize / 2, -boardSize / 2);
  gameboard.draw();
}

function translateBoard(newA) {
  angle = 0;
  desiredAngle = 0;
  switch (newA) {
    case PI / 2:
      gameboard.rotateCW();
      break;
    case PI:
      gameboard.rotate180();
      break;
    case -PI / 2:
      gameboard.rotateCCW();
      break;
  }
  gameboard.repositionPieces();
}
