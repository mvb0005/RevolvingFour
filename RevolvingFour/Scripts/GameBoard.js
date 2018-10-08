function GameBoard(img) {
  this.pieces = new Array(7).fill(null).map(x => Array(7).fill(null));
  this.img = img;
  this.pieceFalling = Object;
  this.pieceFalling.isFalling = () => {
    return false;
  };
  this.newPos;

  this.draw = () => {
    noStroke();
    for (var i in this.pieces) {
      for (var j in this.pieces[i]) {
        if (this.pieces[i][j] !== null) {
          this.pieces[i][j].draw();
        }
      }
    }
    image(this.img, 0, 0, boardSize, boardSize);
  };

  this.transpose = function() {
    for (var i = 0; i < this.pieces.length; i++) {
      for (var j = i; j < this.pieces[0].length; j++) {
        var x = this.pieces[i][j];
        this.pieces[i][j] = this.pieces[j][i];
        this.pieces[j][i] = x;
      }
    }
  };

  this.rotateCCW = function() {
    this.transpose();
    this.reverseRows();
  };

  this.rotateCW = function() {
    this.reverseRows();
    this.transpose();
  };

  this.rotate180 = function() {
    this.reverseCols();
    this.reverseRows();
  };

  this.reverseRows = function() {
    this.pieces.reverse();
  };

  this.reverseCols = function() {
    for (var i = 0; i < this.pieces.length; i++) {
      this.pieces[i].reverse();
    }
  };

  this.checkVertical = function() {
    var o = [];
    for (var i in this.pieces) {
      for (var j = 0; j < this.pieces[i].length - 3; j++) {
        var s = 0;
        if (this.pieces[i][j] != null) {
          for (
            var dj = j + 1;
            dj < 7 &&
            this.pieces[i][dj] != null &&
            this.pieces[i][dj].team == this.pieces[i][j].team;
            dj++
          ) {
            //console.log(s);
            s += this.pieces[i][dj].team ? 1 : -1;
          }
          if (abs(s) >= 3) {
            o.push(this.pieces[i].slice(j, dj));
            break;
          }
        }
      }
    }
    return o;
  };
  this.checkHorizontal = function() {
    var o = [];
    for (var i in this.pieces) {
      for (var j = 0; j < this.pieces[i].length - 3; j++) {
        var s = 0;
        if (this.pieces[j][i] != null) {
          for (
            var dj = j + 1;
            dj < 7 &&
            this.pieces[dj][i] != null &&
            this.pieces[dj][i].team == this.pieces[j][i].team;
            dj++
          ) {
            //console.log(s);
            s += this.pieces[dj][i].team ? 1 : -1;
          }
          if (abs(s) >= 3) {
            var temp = [];
            for (var t = j; t < dj; t++) {
              temp.push(this.pieces[t][i]);
            }
            o.push(temp);
            break;
          }
        }
      }
    }
    return o;
  };
  this.checkUpwardDiag = () => {
    var o = [];
    for (var i = 0; i < 4; i++) {
      for (var j = 0; i + j - 3 < 7; j++) {
        var s = 0;
        if (this.pieces[i][j] != null) {
          for (
            var d = j + 1;
            i + d < 7 &&
            this.pieces[i + d][j + d] != null &&
            this.pieces[i][j].team == this.pieces[i + d][j + d].team;
            d++
          ) {
            s += this.pieces[i + d][j + d].team ? 1 : -1;
          }
          if (abs(s) >= 3) {
            var temp = [];
            for (var t = j; t < d; t++) {
              temp.push(this.pieces[i + t][j + t]);
            }
            o.push(temp);
            break;
          }
        }
      }
    }
    return o;
  };
  this.repositionPieces = () => {
    for (var i in this.pieces) {
      var c = 0;
      for (var j in this.pieces[i]) {
        if (this.pieces[i][j] != null) {
          this.pieces[i][j].updatePos(i, j, c);
          if (j != c) {
            this.pieces[i][c] = this.pieces[i][j];
            this.pieces[i][j] = null;
          }
          c++;
        }
      }
    }
  };
  this.addPiece = (col, color) => {
    var ty = this.pieces[col].indexOf(null);
    console.log(ty);
    if (ty >= 0) {
      var p = new Piece(col, 7, ty, team);
      this.pieces[col][ty] = p;
      this.pieceFalling = p;
      return true;
    }
    return false;
  };
}

function Piece(x, y, targetY, team) {
  this.velocity = 0;
  this.acceleration = 0.005;
  this.targetY = targetY;
  this.x = x;
  this.y = y;
  this.team = team;

  this.draw = () => {
    if (abs(this.y - this.targetY) > this.velocity) {
      this.velocity += this.acceleration;
      this.y -= this.velocity;
    } else {
      this.y = this.targetY;
      this.velocity = 0;
    }
    noStroke();
    fill(teamColors[team][0], teamColors[team][1], teamColors[team][2]);
    var psize = boardSize / 7;
    ellipse(
      this.x * psize + psize / 2,
      (6 - this.y) * psize + psize / 2,
      boardSize / 7
    );
  };

  this.isFalling = () => {
    return false;
    return this.y != this.targetY;
  };

  this.updatePos = (newX, newY) => {
    this.x = newX;
    this.y = newY;
    this.targetY = this.y;
  };
  this.updatePos = (newX, newY, targetY) => {
    this.x = newX;
    this.y = newY;
    this.targetY = targetY;
  };
}
