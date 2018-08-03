import {SVG_NS} from '../settings';

export default class Paddle {
    constructor(boardHeight, width, height, x, y, up, down) {
      this.boardHeight = boardHeight;
      this.width = width;
      this.height = height;
      this.x = x;
      this.y = y;
      this.speed = 10;
      this.score = 0;

      document.addEventListener("keydown", event => {
        // console.log(event);
        switch (event.key) {
            case up:
              this.up();
              break;
            case down:
              this.down();
              break;
        }
      });
    }
    // End of Constructor

    up(){
        this.y = Math.max(this.y - this.speed, this.width);
    }

    down(){
        this.y = Math.min(this.y + this.speed, this.boardHeight - this.height - this.width);
    }

    render(svg){

        let rect = document.createElementNS( SVG_NS, 'rect');
        rect.setAttributeNS(null, 'fill', 'white');
        rect.setAttributeNS(null, 'width', this.width);
        rect.setAttributeNS(null, 'height', this.height);
        rect.setAttributeNS(null, 'x', this.x);
        rect.setAttributeNS(null, 'y', this.y);
        svg.appendChild(rect);
    }
    //...
  }