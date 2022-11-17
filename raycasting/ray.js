class Ray {
  constructor(pos, angle) {
    this.position = pos;
    this.dir = p5.Vector.fromAngle(angle);
  }

  lookAt(x, y){
    this.dir.x = x - this.position.x;
    this.dir.y = y - this.position.y;
    this.dir.normalize();
  }

  show() {
    stroke(255);
    push();
    translate(this.position.x, this.position.y);
    line(0, 0, this.dir.x * 15, this.dir.y * 15);
    pop();
  }

  cast(wall) {
    /*
com (Px,Py) = (X1 + t(X2 - X1), Y1 + t(Y2 - Y1)) 
ou (Px,Py) = (X3 + u(X4 - X3), Y3 + u(Y4 - Y3))
Havera uma intersecao se 0 ≤ t ≤ 1 e 0 ≤ u ≤ 1  
*/

    /*
O ponto de intersecao esta dentro do primeiro segmento de linha se 0 ≤ t ≤ 1,
e esta dentro do segundo segmento de linha se 0 ≤ u ≤ 1
*/

    /*
Como estamos fazendo uso de uma reta e nao de um segmento teremos que o
ponto de intersecao esta dentro da segunda linha se u > 0
*/
    const x1 = wall.a.x;
    const y1 = wall.a.y;
    const x2 = wall.b.x;
    const y2 = wall.b.y;

    const x3 = this.position.x;
    const y3 = this.position.y;

    const x4 = this.position.x + this.dir.x;
    const y4 = this.position.y + this.dir.y;

    const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if(den == 0) return;

    const t = (((x1 - x3) * (y3 - y4)) - ((y1 - y3) * (x3 - x4))) / den;
    const u = (((x1 - x3) * (y1 - y2)) - ((y1 - y3) * (x1 - x2))) / den;

    if(t > 0 && t < 1 && u > 0){
        const ponto = createVector();
        ponto.x = x1 + t *(x2 - x1);
        ponto.y = y1 + t *(y2 - y1);
        return ponto;
    }else{
        return;
    }
  }
}
