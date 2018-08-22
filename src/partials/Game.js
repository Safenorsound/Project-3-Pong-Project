import Board from './Board';
import { SVG_NS, KEYS } from '../settings';
import Paddle from './Paddle';
import Ball from './Ball';
import Score from './Score';
import Winner from './WinnerMessage';
export default class Game {
  constructor(element, width, height) {
    this.element = element;
    this.width = width;
    this.height = height;
    this.gameElement = document.getElementById(this.element);

    this.board = new Board(this.width, this.height);
    // Making Players
    this.paddleWidth = 8;
    this.paddleHeight = 56;
    this.boardGap = 10;
    this.autopause = true;
    this.player1 = new Paddle(
      this.height,
      this.paddleWidth,
      this.paddleHeight,
      this.boardGap,
      (this.height - this.paddleHeight) / 2,
      KEYS.a,
      KEYS.z,
      'player 1'
    );
    this.player2 = new Paddle(
      this.height,
      this.paddleWidth,
      this.paddleHeight,
      this.width - this.boardGap - this.paddleWidth,
      (this.height - this.paddleHeight) / 2,
      KEYS.up,
      KEYS.down,
      'player 2'
    );
    this.score1 = new Score(this.width / 2 - 50, 30, 30);
    this.score2 = new Score(this.width / 2 + 25, 30, 30);
    // Position of the winner announcement.
    this.winner = new Winner(this.width / 2 - 20, this.height / 2, 50);
    //   Stretch Goal: creating more balls.
    this.ball = new Ball(6, this.width, this.height);
    this.ball2 = new Ball(8, this.width, this.height);
    this.ball3 = new Ball(10, this.width, this.height);
    this.ball4 = new Ball(12, this.width, this.height);
    //   Keydown for pausing game
    document.addEventListener('keydown', event => {
      switch (event.key) {
        case KEYS.spaceBar:
          this.pause = !this.pause;
        // this.pause = document.getElementById().;
      }
    });
  }

  checkWinner(p1, p2, svg) {
    // Winning score
    if (p1.score >= 2) {
      // Pauses the game when a player wins.
      this.pause = !this.pause;
      this.winner.render(svg, p1.name + 'Wins!!!');
      // Winning score
    } else if (p2.score >= 2) {
      // Pauses the game when a player wins.
      this.pause = !this.pause;
      this.winner.render(svg, p2.name + 'Wins!!!');
    }
  }

  render() {
    // if (this.pause) {
    // if (this.newGame) {
    if (this.pause) {
      return;
    }
    this.gameElement.innerHTML = '';
    let svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttributeNS(null, 'width', this.width);
    svg.setAttributeNS(null, 'height', this.height);
    svg.setAttributeNS(null, 'viewBox', `0 0 ${this.width} ${this.height}`);
    this.gameElement.appendChild(svg);
    // render the board
    this.board.render(svg);
    this.player1.render(svg);
    this.player2.render(svg);
    this.ball.render(svg, this.player1, this.player2);
    this.ball2.render(svg, this.player1, this.player2);
    this.ball3.render(svg, this.player1, this.player2);
    this.ball4.render(svg, this.player1, this.player2);

    this.score1.render(svg, this.player1.score);
    this.score2.render(svg, this.player2.score);
    this.checkWinner(this.player1, this.player2, svg);
  }
  //   }
  // }
}
