import { SVG_NS } from "../settings";

// Ball.js
export default class Ball {
  constructor(radius, boardWidth, boardHeight) {
    this.radius = radius;
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.direction = 1;

    this.reset();
  }

  // loop runs 60 times a second.
  render(svg) {

    this.x += this.vx;
    this.y += this.vy;
    // draw ball
    let circle = document.createElementNS(SVG_NS, "circle");
    circle.setAttributeNS(null, "r", this.radius);
    circle.setAttributeNS(null, "cx", this.x); // control the ball movement
    circle.setAttributeNS(null, "cy", this.y); // control the ball movement
    circle.setAttributeNS(null, "fill", "white");
    svg.appendChild(circle);
  }

  //   This resets the ball after a player scores a goal.
  reset() {
    this.x = this.boardWidth / 2;
    this.y = this.boardHeight / 2;
    this.vy = Math.floor(Math.random() * 10 - 5);
    this.vx = this.direction * (6 - Math.abs(this.vy));
  }
}
