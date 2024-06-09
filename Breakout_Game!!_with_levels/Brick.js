class Brick extends Paddle {
  constructor(x, y, w, h, points) {
    super(x, y ,w, h);
    this.points = points;
  }
  
  render() {
    push();
    strokeWeight(2);
    if (this.points === 1) {
      stroke("darkred"); // color for points 1
      fill("red"); //  color for points 1
    } else if (this.points === 2) {
      stroke("darkorange"); //color for points 2
      fill("orange"); // color for points 2
    } else if (this.points === 3) {
      stroke("darkgoldenrod"); // color for points 3
      fill("gold"); // color for points 3
    } else if (this.points === 4) {
      stroke("darkgreen"); // color for points 4
      fill("green"); // color for points 4
    } else if (this.points === 5) {
      stroke("darkblue"); // color for points 5
      fill("blue"); // color for points 5
    } else if (this.points === 6) {
      stroke("darkviolet"); // color for points 6
      fill("violet"); //color for points 6
    } else if (this.points === 7) {
      stroke("black"); // color for points 7
      fill("silver"); // color for points 7
    }
    rectMode(CENTER);
    rect(this.pos.x, this.pos.y, this.width-2, this.height-2);
    textAlign(CENTER, CENTER);
    textSize(15);
    noStroke();
    fill(255);
    text(this.points * 10, this.pos.x, this.pos.y); // brick number to points * 10
    pop();   
  }
}
