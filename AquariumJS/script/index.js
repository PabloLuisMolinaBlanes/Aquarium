import Fish from "./fish.js"
import BezierCurve from "./beziercurve.js"

var canvas = document.querySelector('canvas')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

var c = canvas.getContext('2d')

const DX = 4
const DY = 4

var fish = new Fish("Fish1", canvas, 200, 400, "white")
var bezier = BezierCurve.randomCurve(fish.x, fish.y, canvas.width, canvas.height);
/*var dot0 = new Fish("Fish1", canvas, bezier.P0.x, bezier.P0.y, "blue")
var dot1 = new Fish("Fish1", canvas, bezier.P1.x, bezier.P1.y, "yellow")
var dot2 = new Fish("Fish1", canvas, bezier.P2.x, bezier.P2.y, "red")*/


function updateFish() {
    bezier = fish.moveAlongBezierCurve(bezier, canvas.width, canvas.height);
    /*
    dot0.x = bezier.P0.x
    dot0.y = bezier.P0.y
    dot1.x = bezier.P1.x
    dot1.y = bezier.P1.y
    dot2.x = bezier.P2.x
    dot2.y = bezier.P2.y
    */
    console.log(bezier)
}

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0,0, window.innerWidth, window.innerHeight)
    /* Ball methods */
    c.beginPath()
    c.arc(fish.x, fish.y, 5, 0, Math.PI*2, false)
    c.strokeStyle = fish.color
    c.lineWidth = 20
    c.stroke()
    /*
    c.beginPath()
    c.arc(dot0.x, dot0.y, 5, 0, Math.PI*2, false)
    c.strokeStyle = dot0.color
    c.lineWidth = 20
    c.stroke()
    c.beginPath()
    c.arc(dot1.x, dot1.y, 5, 0, Math.PI*2, false)
    c.strokeStyle = dot1.color
    c.lineWidth = 20
    c.stroke()
    c.beginPath()
    c.arc(dot2.x, dot2.y, 5, 0, Math.PI*2, false)
    c.strokeStyle = dot2.color
    c.lineWidth = 20
    c.stroke()
    */
}

setInterval(updateFish, 100);

animate()