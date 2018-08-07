import { SVG_NS } from '../settings';

export default class Ball {

  constructor(radius, boardWidth, boardHeight) {
    this.radius = radius;
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.direction = 1;

    this.reset();
    this.ping = new Audio('public/sounds/pong-01.wav');
    this.pong = new Audio('public/sounds/pong-02.wav');
    this.celebrate = new Audio('public/sounds/pong-04.wav');
    this.reset();
  }

  reset() {
    this.x = this.boardWidth / 2;
    this.y = this.boardHeight / 2;
    

    this.vy = 0;
    while (this.vy === 0) {

      // Ball Movement
      this.vy = Math.floor(Math.random() * 10 - 5);
    }
    this.vx = this.direction * (6 - Math.abs(this.vy));
  }

  wallCollision() {
    const hitLeft = this.x - this.radius <= 0;
    const hitRight = this.x + this.radius >= this.boardWidth;
    const hitTop = this.y - this.radius <= 0;
    const hitBottom = this.y + this.radius >= this.boardHeight;
    
    if (hitLeft || hitRight) {
      this.vx = -this.vx;
    } else if (hitTop || hitBottom) {
      this.vy = -this.vy;
      this.pong.play();
      
    }    
  }
  togglePause() {
    this.pause = !this.pause;
  }

  // Ball.js
  paddleCollision(player1, player2) {
    // If moving toward the right end..
    if (this.vx > 0) {
      // detect player2 collision
      let paddle = player2.coordinates(
        player2.x,
        player2.y,
        player2.width,
        player2.height
        
      );

      let [leftX, rightX, topY, bottomY] = paddle;
      if (
        this.x + this.radius >= leftX &&
        //   right edge of the ball is >= left edge of the paddle
        this.x + this.radius <= rightX &&
        (this.y >= topY && this.y <= bottomY)
      ) {
        this.vx = -this.vx;
        this.ping.play();
        // bounce feature

        // the right edge of the ball is >= left edge of the paddle
      }
    } else {
      // player1 paddle collision
      let paddle = player1.coordinates(player1.x, player1.y, player1.width, player1.height);
      let [ leftX, rightX, topY, bottomY] = paddle;
      if(
          (this.x - this.radius <= rightX) &&
          (this.x - this.radius >= leftX) &&
          (this.y >= topY && this.y <= bottomY)
      ){
        this.vx = -this.vx;
        this.ping.play();
      }
    }
  }

  goal(player){
player.score++;
this.celebrate;
this.reset();
// Declaring a winner at 5 points.
// if (player.score >= 5) {
//   // this.game.Win(player);
//   if (this.player.score = 5){
//   //   document.getElementById("game");
//   //   // (innerHTML = 'player 1 wins!')
//   // } else {
//   //   // (innerHTML = 'player 2 wins!')
    
//   }
// }
  }
  
  render(svg, player1, player2){
    this.x += this.vx;
      this.y += this.vy;

    this.wallCollision();
    this.paddleCollision(player1, player2);

    const rightGoal = this.x + this.radius >= this.boardWidth;

const leftGoal =this.x -this.radius <= 0;
if(rightGoal){
    this.goal(player1);
    this.direction -1;
    this.celebrate.play();

} else if (leftGoal){
this.goal(player2);
this.direction = 1;
this.celebrate.play();
}
    // draw ball
    let circle = document.createElementNS(SVG_NS, 'circle');
    circle.setAttributeNS(null, 'r', this.radius);
    circle.setAttributeNS(null, 'cx', this.x); // x of the centre point
    circle.setAttributeNS(null, 'cy', this.y); // y of the centre point
    circle.setAttributeNS(null, 'fill', '#'+(Math.random()*0xFFFFFF<<0).toString(16));
    svg.appendChild(circle);
  }
}