var BOX_WIDTH = 50;
var BOX_HEIGHT = 50;
var MAX_BOX_WIDTH = 500;
var MAX_BOX_HEIGHT = 500;
var main = document.getElementById('game');
var moveBoxes;
var boxNumber = 5;
var changeX;
var changeY;

var randomNumber = function(max, min) {
  return Math.random() * (max - min);
};

function Background(element) {
  this.box = '';
  this.boxes = [];
  this.mainElement = element;
  var that = this;

  this.create = function() {

    this.mainElement.style.width = MAX_BOX_WIDTH+'px';
    this.mainElement.style.height = MAX_BOX_HEIGHT+'px';
    this.mainElement.style.position = 'relative';
    this.mainElement.style.backgroundColor = 'lightblue';

      for (var x = 0; x < boxNumber; x++) {
        that.box = new Box(that.mainElement);
        that.box.create();
        that.boxes.push(that.box);
      }

      moveBoxes = setInterval(function() {
        for (var x = 0; x < that.boxes.length; x++) {
          that.boxes[x].collisionCheck(that.boxes);
          that.boxes[x].move();
        }
      }, 10);

     

    }
  };

  function Box(parentElement) {
  this.mainElement = parentElement;
  this.width = BOX_WIDTH;
  this.height = BOX_HEIGHT;
  this.div = '';
  this.x = 0;
  this.y = 0;
  this.dx = 0;
  this.dy = 0;
  this.speed;

  var that = this;

  this.create = function() {
    this.y = randomNumber(MAX_BOX_HEIGHT-BOX_HEIGHT, 0);
    this.x = randomNumber(MAX_BOX_WIDTH-BOX_WIDTH, 0);
    this.dx = 1;
    this.dy = 1;
    this.speed = randomNumber(1, 5);
    this.div = document.createElement('div');
    var that = this;

    this.div.style.width = BOX_WIDTH+'px';
    this.div.style.height = BOX_HEIGHT+'px';
    this.div.style.position = 'absolute';
    this.div.style.background = 'red';
    // adding ant
    var image = document.createElement('img');
    this.div.appendChild(image);
    image.setAttribute('src','images/ant.gif');
    image.style.height = BOX_HEIGHT+'px';
    image.style.width = BOX_WIDTH+'px';

    main.appendChild(this.div);

    boxWidth = parseInt(this.div.style.width);
    boxHeight = parseInt(this.div.style.height);

    this.div.style.top = this.y + 'px';
    this.div.style.left = this.x + 'px';
  };

  this.move = function() {
    // opposite boundary of boxes
    boxX = this.x + boxWidth;
    boxY = this.y + boxHeight;
    // boundary collision
    if (boxX >= MAX_BOX_WIDTH) {

      this.dx = 1;
    } else if (that.x <= 0) {

      this.dx = -1;
    }
    if (boxY >= MAX_BOX_HEIGHT) {

      this.dy = 1;
    } else if (that.y <= 0) {

      this.dy = -1;
    }

    this.x = this.x + this.speed * this.dx;
    this.y = this.y + this.speed * this.dy;
    this.div.style.left = this.x + 'px';
    this.div.style.top = this.y + 'px';
  };

  this.collisionCheck = function(boxes) {

    for (var x = 0; x < boxes.length; x++) {

      var avoid = boxes.indexOf(this);
      //boxes collision
      if (avoid === x) {
        //do nothing;
      } else {
        if (this.x <= boxes[x].x + boxes[x].width &&
          this.x + this.width >= boxes[x].x &&
          this.y <= boxes[x].y + boxes[x].height &&
          this.height + this.y >= boxes[x].y) {
        //box direction
          if (this.x > boxes[x].x) {

            this.dx = -1;
            boxes[x].dx = 1;

            if (this.y > boxes[x].y) {

              this.dy = -1;
              boxes[x].dy = 1;
            } else {

              boxes[x].dy = -1;
              this.dy = 1;
            }
          } else {

            boxes[x].dx = -1;
            this.dx = 1;

            if (this.y > boxes[x].y) {

              this.dy = -1;
              boxes[x].dy = 1;
            } else {

              boxes[x].dy = -1;
              this.dy = 1;
            }
          }
        }
      }
    }
  };
}

var newGame = new Background(main);
newGame.create();
