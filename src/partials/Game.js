import Board from './Board';
import { SVG_NS, KEYS } from '../settings';
import Paddle from './Paddle';
import Ball from './Ball';
import Score from './Score';
import Message from './Message';

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
      'player1'
    );
    this.player2 = new Paddle(
      this.height,
      this.paddleWidth,
      this.paddleHeight,
      this.width - this.boardGap - this.paddleWidth,
      (this.height - this.paddleHeight) / 2,
      KEYS.up,
      KEYS.down,
      'player2'
    );

    this.score1 = new Score(this.width / 2 - 50, 30, 30);
    this.score2 = new Score(this.width / 2 + 25, 30, 30);

    this.ball = new Ball(6, this.width, this.height);

    //   Keydown for pausing game
    document.addEventListener('keydown', event => {
      switch (event.key) {
        case KEYS.spaceBar:
		  this.pause = !this.pause;
		  this.pause = document.getElementById().innerHTML = 'pause'
			//   this.togglePause();
			//   this.message = new Message(
			// 	this.width / 2,
			// 	this.height / 2,
			// 	35,
			// 	' ','Unpause = spacebar'
			//   )
      }
    });
  }

  render() {
    if (this.pause) {
		// this.message = new Message(this.width / 2, this.height / 2, 35, 'Paused!', 'Press space to continue');
		
      if (this.newGame) {
		if (this.pause) {
			document.getElementById('pause').innerHTML = 'play?'
			document.getElementById('footer').classList.add('highlight');
			return;
		} else {
			document.getElementById(this.pause).innerHTML = 'pause'
			document.getElementById('footer').classList.remove('highlight');
		}
			this.board.render(svg);

		  this.newGame = !this.newGame;
		  this.createGameElements();
		  this.message = new Message(this.width / 2, this.height / 2, 35, 'Ready?', 'Press space to continue');
		  this.setInitialProperties();
		  '', 'Spacebar = pause';

		  
      }
      // be sure to empty out the last frame before re-rendering
      this.gameElement.innerHTML = '';
      let svg = document.createElementNS(SVG_NS, 'svg');
      svg.setAttributeNS(null, 'width', this.width);
      svg.setAttributeNS(null, 'height', this.height);
      svg.setAttributeNS(null, 'viewBox', `0 0 ${this.width} ${this.height}`);
      this.gameElement.appendChild(svg);
      this.message = new Message(
        this.width / 2,
        this.height / 2,
        35,
        '', 'Spacebar = pause'
      );

      // render the board
      this.board.render(svg);
      this.player1.render(svg);
      this.player2.render(svg);
      this.ball.render(svg, this.player1, this.player2);
      this.message.render(svg);
      this.score1.render(svg, this.player1.score);
	  this.score2.render(svg, this.player2.score);
	//   if (this.pause) {
	// 	this.message = new Message(0, 0, 0, 'press spacebar to start', '');
	// } else {
	// 	this.message = new Message(this.width / 2, this.height / 2, 35, 'Paused!', 'Press space to continue');
	// }
    }
  }
}