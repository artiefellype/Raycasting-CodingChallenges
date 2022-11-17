class Particle {
  constructor() {
    this.pos = createVector(width / 2, height / 2);
    this.rays = [];
    for (let i = 0; i < 360; i += 2) {
      this.rays.push(new Ray(this.pos, radians(i)));
    }
  }

  update(x, y) {
    this.pos.set(x, y);
  }

  look(walls) {
    for (let ray of this.rays) {
      let closest = null;
      let record = Infinity;
      for (let wall of walls) {
        let ponto = ray.cast(wall);
        if (ponto) {
          const distance = p5.Vector.dist(this.pos, ponto);
          if (distance < record) {
            record = distance;
            closest = ponto;
          }
        }
      }
      if (closest) {
        stroke(255, 100);
        line(this.pos.x, this.pos.y, closest.x, closest.y);
      }
    }
  }

  show() {
    fill(255);
    ellipse(this.pos.x, this.pos.y, 16);
    for (let ray of this.rays) {
      ray.show();
    }
  }
}
