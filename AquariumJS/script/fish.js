import BezierCurve from "./beziercurve.js"


class Fish {    
    constructor(name, canvas, x, y, color, upKey) {
        this.name = name;
        this.canvas = canvas;
        this.x = x;
        this.actual_x = x;
        this.actual_y = y;
        this.y = y;
        this.t = 0;
        this.color = color;
    }
    moveAlongBezierCurve(bezier, wall_x, wall_y) {
        var distanceToMoveX = 0;
        var distanceToMoveY = 0;
        var directionX = 1;
        var directionY = 1;
        if (this.t <= 1) {
            var next_x = Math.pow((1-this.t),2)*bezier.P0.x+2*(1-this.t)*this.t*bezier.P1.x+Math.pow(this.t,2)*bezier.P2.x
            var next_y = Math.pow((1-this.t),2)*bezier.P0.y+2*(1-this.t)*this.t*bezier.P1.y+Math.pow(this.t,2)*bezier.P2.y
            if (next_x < this.actual_x) {
                distanceToMoveX = this.actual_x-next_x
                directionX = -1
            } else if (next_x > this.actual_x) {
                distanceToMoveX = next_x-this.actual_x
                directionX = 1
            }
            if (next_y < this.actual_y) {
                distanceToMoveY = this.y-next_y
                directionY = -1
            } else if (next_y > this.actual_y) {
                distanceToMoveY = next_y-this.actual_y
                directionY = 1
            }
            var next_dx = directionX*distanceToMoveX
            var next_dy = directionY*distanceToMoveY
            this.t = this.t+0.1;
            this.move(next_dx, next_dy, wall_x, wall_y)
            return bezier
        } else {
            this.actual_x = this.x;
            this.actual_y = this.y;
            this.t = 0;
            return BezierCurve.randomCurve(this.x, this.y, wall_x, wall_y);
        }
    }
    move(dx, dy, wall_x, wall_y) {
        this.actual_x = this.actual_x + dx;
        this.actual_y = this.actual_y + dy;
        if (this.actual_x > wall_x) {
            this.x = wall_x-30;
        } else if (this.actual_x < 0) {
            this.x = 30;
        } else {
            this.x = this.actual_x
        }
        if (this.actual_y > wall_y) {
            this.y = wall_y-30;
        } else if (this.actual_y < 0) {
            this.y = 30;
        } else {
            this.y = this.actual_y
        }
        return [dx,dy]
    }
    isTouchingWall(wall_x, wall_y) {
        return Math.abs(this.x - wall_x) < 30 || Math.abs(this.y - wall_y) < 30
    }
}

export default Fish;
