// The following text method was adapted methods from the following project: https://github.com/htichcock/RED-web-dev-project-03/tree/master/src/partials

import {
    SVG_NS,
  } from '../settings';
  import ScoreBoard from './Score';
  
  export default class Message extends ScoreBoard {
    constructor(x, y, size, message, sub) {
      super(x, y, size);
      this.message = message;
      this.subMessage = sub;
    }
  
    render(svg) {
      let text = document.createElementNS(SVG_NS, 'text');
      text.setAttributeNS(null, 'text-anchor', 'middle');
      text.setAttributeNS(null, 'alignment-baseline', 'central');
      text.setAttributeNS(null, 'x', this.x);
      text.setAttributeNS(null, 'y', this.y);
      text.setAttributeNS(null, 'font-size', this.size)
      text.setAttributeNS(null, 'fill', `#FFF`);
      let subText = document.createElementNS(SVG_NS, 'text');
      subText.setAttributeNS(null, 'text-anchor', 'middle');
      subText.setAttributeNS(null, 'alignment-baseline', 'central');
      subText.setAttributeNS(null, 'x', this.x);
      subText.setAttributeNS(null, 'y', this.y + this.size);
      subText.setAttributeNS(null, 'font-size', this.size / 2)
      subText.setAttributeNS(null, 'fill', `#FFF`
    )
    ;   
      text.innerHTML = `${this.message}`
      subText.innerHTML = `${this.subMessage}`
      svg.appendChild(text);
      svg.appendChild(subText); 
    }
  }