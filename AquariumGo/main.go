package main

import (
	"image/color"
	"log"
	"math"
	"math/rand/v2"

	"github.com/hajimehoshi/ebiten/v2"
	"github.com/hajimehoshi/ebiten/v2/ebitenutil"
)

var img *ebiten.Image

var screen_width = 320

var screen_height = 240

type Fish struct {
	actual_x float64
	actual_y float64
	x        float64
	y        float64
}

type Point struct {
	x float64
	y float64
}

type BezierCurve struct {
	P0 Point
	P1 Point
	P2 Point
}

var fish Fish
var bezier BezierCurve
var t float64 = 0

func (b *BezierCurve) generateBezierCurve(f Fish, screenWidth float64, screenHeight float64) {
	var P0 Point
	var P1 Point
	var P2 Point
	P0.x = f.x
	P0.y = f.y
	b.P0 = P0
	P1.x = math.Floor(rand.Float64() * float64(screenWidth))
	P2.x = math.Floor(rand.Float64() * float64(screenWidth))
	P1.y = math.Floor(rand.Float64() * float64(screenHeight))
	P2.y = math.Floor(rand.Float64() * float64(screenHeight))
	b.P1 = P1
	b.P2 = P2
}

func (f *Fish) generateFish(x float64, y float64) {
	f.x = x
	f.y = y
	f.actual_x = f.x
	f.actual_y = f.y
}

func init() {
	var err error
	img, _, err = ebitenutil.NewImageFromFile("78808_2.png")
	if err != nil {
		log.Fatal(err)
	}
	fish.generateFish(150, 150)
	bezier.generateBezierCurve(fish, float64(screen_width), float64(screen_height))

}

type Game struct{}

func (f *Fish) moveAlongBezierCurve(bezier *BezierCurve, screenWidth float64, screenHeight float64) {
	if t < 1 {
		var next_x float64 = math.Pow((1-t), 2)*bezier.P0.x + 2*(1-t)*t*bezier.P1.x + math.Pow(t, 2)*bezier.P2.x
		var next_y float64 = math.Pow((1-t), 2)*bezier.P0.y + 2*(1-t)*t*bezier.P1.y + math.Pow(t, 2)*bezier.P2.y
		var distanceToMoveX float64
		var directionX float64
		var distanceToMoveY float64
		var directionY float64
		if next_x < f.actual_x {
			distanceToMoveX = f.actual_x - next_x
			directionX = -1
		} else if next_x > f.actual_x {
			distanceToMoveX = next_x - f.actual_x
			directionX = 1
		}
		if next_y < f.actual_y {
			distanceToMoveY = f.y - next_y
			directionY = -1
		} else if next_y > f.actual_y {
			distanceToMoveY = next_y - f.actual_y
			directionY = 1
		}
		var next_dx = directionX * distanceToMoveX
		var next_dy = directionY * distanceToMoveY
		t = t + 0.01
		f.move(next_dx, next_dy)
	} else {
		t = 0
		f.actual_x = f.x
		f.actual_y = f.y
		bezier.generateBezierCurve(*f, screenWidth, screenHeight)
	}
}

func (f *Fish) move(dx float64, dy float64) {
	f.actual_x += dx
	if f.actual_x > float64(screen_width) {
		f.x = float64(screen_width) - 10
	} else if f.actual_x < 0 {
		f.x = 10
	} else {
		f.x = f.actual_x
	}
	f.actual_y += dy
	if f.actual_y > float64(screen_height) {
		f.y = float64(screen_height) - 10
	} else if f.actual_y < 0 {
		f.y = 10
	} else {
		f.y = f.actual_y
	}
}

func (g *Game) Update() error {
	fish.moveAlongBezierCurve(&bezier, float64(screen_width), float64(screen_height))
	return nil
}

func (g *Game) Draw(screen *ebiten.Image) {
	screen.Fill(color.RGBA{0, 0, 0xff, 0x1F})
	op := &ebiten.DrawImageOptions{}
	op.GeoM.Translate(fish.x, fish.y)
	screen.DrawImage(img, op)
}

func (g *Game) Layout(outsideWidth, outsideHeight int) (screenWidth, screenHeight int) {
	return screen_width, screen_height
}

func main() {
	ebiten.SetWindowSize(640, 480)
	ebiten.SetWindowTitle("Aquarium")
	if err := ebiten.RunGame(&Game{}); err != nil {
		log.Fatal(err)
	}
}
