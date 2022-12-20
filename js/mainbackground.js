var canvas = document.getElementById("main-background");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext("2d");

var gradient = c.createLinearGradient(0, 0, window.innerWidth, 0);
gradient.addColorStop(0, "#f0f0f0");
gradient.addColorStop(0.5, "#f0f0f0");
gradient.addColorStop(1, "rgba(255,255,255,0)");  // 


function randint(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function distance(x1, y1, x2, y2) {
    return Math.sqrt(((y2 - y1) ** 2) + ((x2 - x1) ** 2));
}

function randintExcludeZero(min, max) {
    do {
        number = randint(min, max);
    } while (number == 0)
    return number;
}

function squish(value, in_min, in_max, out_min, out_max) {
    let inRange = in_max - in_min;
    let outRange = out_max - out_min;
    let percentage = (value - in_min) / inRange;
    return (outRange * percentage) + out_min;
}


class Ball {
    constructor(x, y, radius, x_vel, y_vel) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.x_vel = x_vel;
        this.y_vel = y_vel;
    }

    draw(balls) {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        c.fillStyle = '#000000';
        c.fill();

        for (let ball of orbs) {
            let dist = distance(ball.x, ball.y, this.x, this.y);
            if (dist < 200) {
                let opacity = squish(dist, 200, 0, 0, 1);
                c.beginPath();
                c.moveTo(ball.x, ball.y);
                c.lineTo(this.x, this.y);
                c.strokeStyle = "rgba(0,0,0," + opacity.toString() + ")";
                c.stroke();
            }
        }
    }

    update() {
        this.x += this.x_vel;
        this.y += this.y_vel;

        if (0 >= this.x || this.x >= window.innerWidth)
            this.x_vel *= -1;
        if (0 >= this.y || this.y >= window.innerHeight)
            this.y_vel *= -1;
    }

}


function generateBalls() {
    let balls = [];
    for (let i = 0; i < 75; i++) {
        let x = randint(0, canvas.width);
        let y = randint(0, canvas.height);
        let radius = 1;//randint(1, 3);
        let x_vel = randintExcludeZero(-2, 2);
        let y_vel = randintExcludeZero(-2, 2);
        balls.push(new Ball(x, y, radius, x_vel, y_vel));
    }
    return balls;
}


var orbs = generateBalls();
function animate() {
    window.requestAnimationFrame(animate);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    c.fillStyle = "#f0f0f0";
    c.fillRect(0, 0, canvas.width, canvas.height);

    for (let orb of orbs) {
        orb.draw();
        orb.update();
    }

    c.fillStyle = gradient;
    c.fillRect(0, 0, canvas.width, canvas.height);
}
animate();