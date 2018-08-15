import { SVG_NS } from '../settings';

export default class winner {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
  }

  // Creating text to declare the winner

  render(svg, winner) {
    let text = document.createElementNS(SVG_NS, 'text');
    text.setAttributeNS(null, 'x', this.x);
    text.setAttributeNS(null, 'y', this.y);
    text.setAttributeNS(null, 'font-size', this.size);
    text.setAttributeNS(null, 'fill', 'white');
    text.setAttributeNS(null, 'font-family', 'Silkscreen Web');
    text.textContent = winner;
    svg.appendChild(text);
  }
}
