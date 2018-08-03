import { SVG_NS } from "../settings";

export default class Score {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
  }
  //...

  render(svg, score,) {
    // try using svg text element here, take a ook at the other render methods e.g. paddle for ideas as well as google for svg text elements_
    let text = document.createElementNS(SVG_NS, "text");
    text.setAttributeNS(null, "x", this.x);
    text.setAttributeNS(null, "y", this.y);
    text.setAttributeNS(null, "font-size", this.size);
    text.setAttributeNS(null, "fill", "white");
    text.setAttributeNS(null, "font-family", "Silkscreen Web");
    text.textContent = score;
    svg.appendChild(text);
  }
}
