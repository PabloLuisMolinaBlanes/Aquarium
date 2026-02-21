class BezierCurve {
    constructor(P0, P1, P2) {
        this.P0 = P0;
        this.P1 = P1;
        this.P2 = P2;
    }
    static randomCurve(initial_x, initial_y, wall_x, wall_y) {
        return new BezierCurve({x: initial_x, y: initial_y},{x: Math.floor(Math.random()*wall_x), y: Math.floor(Math.random()*wall_y)},{x: Math.floor(Math.random()*wall_x), y: Math.floor(Math.random()*wall_y)});
    }
}

export default BezierCurve;