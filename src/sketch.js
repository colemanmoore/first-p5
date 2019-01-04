import p5 from 'p5';

const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = 500;
const BG_COLOR = '#fae';
const STARTING_RADIUS = 100;
const BALL_COUNT = 20;
const OPACITY = 199;

new p5(p => {

    let flashingBalls;

    p.setup = () => {
        p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
        flashingBalls = new Array(BALL_COUNT);
        for (let i=0; i<flashingBalls.length; i++) {
            flashingBalls[i] = new FlashingBall(p.random(p.width), p.random(p.height));
        }
    };

    p.draw = () => {
        p.background(BG_COLOR);
        flashingBalls.forEach(ball => {
            ball.move();
            ball.redraw();
        });
    };

    class FlashingBall {

        constructor(startX, startY) {
            this._x = startX;
            this._y = startY;
            this._width = STARTING_RADIUS;
            this._height = STARTING_RADIUS;
            this._shades = [
                p.color(170, 187, 204, OPACITY),
                p.color(79, 212, 255, OPACITY),
                p.color(221, 185, 170, OPACITY),
                p.color(255, 221, 221, OPACITY)
            ];
        }

        move() {
            this._x = (this._x + 1) % (p.width + this._width);
            this._y = this._y + ((5 * p.cos(this._x/9))) * p.noise(0.05, 0.6);
        }

        morph() {
            this._width = (11 * p.random()) * p.sin(this._x/15) + STARTING_RADIUS;
            this._height = (9 * p.random()) * p.sin(this._x/15) + STARTING_RADIUS;
        }

        changeColor() {
            const idx = p.round(this._x/7) % 4;
            this._shade = this._shades[idx];
        }

        redraw() {
            this.changeColor();
            this.morph();
            p.fill(this._shade);
            p.noStroke();
            p.ellipse(this._x, this._y, this._width, this._height);
        }
    }

}, 'sketch');