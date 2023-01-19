var canvas = document.getElementById("graph");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext("2d");

let equation = "y = 2sin(10)";
let x = nerdamer.solve(equation, 'y');
console.log(nerdamer.solve(equation, 'y').toString());

var mouse = {
	pressed: false,
	x: 0,
	y: 0,
}

const SCROLL_SPEED = 6;
const ZOOM_CAP = 60;
const NUMBER_FONT_SIZE = 20;


function drawLine(x1, y1, x2, y2, colour) {
	c.beginPath();
	c.moveTo(x1, y1);
	c.lineTo(x2, y2);
	c.strokeStyle = colour;
	c.stroke();
}

function drawCircle(x, y, radius, colour) {
	c.beginPath();
	c.arc(x, y, radius, 0, Math.PI * 2);
	c.fillStyle = colour;
	c.fill();
}

function drawText(x, y, message, colour, size, font="monospace") {
	c.font = size + "px " + font;
	c.fillStyle = colour;
	c.fillText(message, x - c.measureText(message).width / 2, y);
}


class Graph {
	constructor() {
		this.x_offset = 0;
		this.y_offset = 0;
		this.zoomLevel = 0;
		this.scaleInterval = 1;
		this.scalePixels = 100;
		this.min_x = 0;
		this.max_x = 0;
	}

	getXAxisY() {
		return (canvas.height / 2) + this.y_offset;
	}

	getYAxisX() {
		return (canvas.width / 2) + this.x_offset;
	}

	drawAxes() {
		let y = this.getXAxisY();
		drawLine(0, y, canvas.width, y, "black");
		drawLine(this.getYAxisX(), 0, this.getYAxisX(), canvas.height, "black");
	}

	drawXIntervals() {
		let counter = 0;
		for (let i = this.getYAxisX(); i < canvas.width; i += this.scalePixels) {
			// drawCircle(i, this.getXAxisY(), 10, "red");
			drawLine(i, 0, i, canvas.height, "#bdbdbd");
			if (counter != 0)
				drawText(i, this.getXAxisY() - 5, (counter * this.scaleInterval).toString(), "black", NUMBER_FONT_SIZE);
			counter++;
		}
		this.max_x = counter * (this.scaleInterval + 1);

		counter = 0;
		for (let i = this.getYAxisX(); i >= 0; i -= this.scalePixels) {
			drawLine(i, 0, i, canvas.height, "#bdbdbd");
			if (counter != 0)
				drawText(i, this.getXAxisY() - 5, (counter * this.scaleInterval).toString(), "black", NUMBER_FONT_SIZE);
			counter--;
		}
		this.min_x = counter * (this.scaleInterval + 1);
	}

	drawYIntervals() {
		let counter = 0;
		for (let i = this.getXAxisY(); i < canvas.width; i += this.scalePixels) {
			drawLine(0, i, canvas.width, i, "#bdbdbd");
			drawText(this.getYAxisX() + 12, i - 5, -(counter * this.scaleInterval).toString(), "black", NUMBER_FONT_SIZE);
			counter++;
		}

		counter = 0;
		for (let i = this.getXAxisY(); i >= 0; i -= this.scalePixels) {
			drawLine(0, i, canvas.width, i, "#bdbdbd");
			drawText(this.getYAxisX() + 12, i - 5, -(counter * this.scaleInterval).toString(), "black", NUMBER_FONT_SIZE);
			counter--;
		}
	}

	drawIntervals() {
		// X AXIS
		this.drawXIntervals();
		this.drawYIntervals();
	}

	draw() {
		this.drawIntervals();
		this.drawAxes();
		this.drawLines();
	}

	update() {
		this.scalePixels = this.zoomLevel + 100;
		
		// if user zooms to far, resize the scale to fit zoom level
		if (this.zoomLevel > ZOOM_CAP || this.zoomLevel < -ZOOM_CAP / 2) {
			this.scaleInterval *= this.zoomLevel < 0 ? 2 : 0.5;
			this.zoomLevel = 0;
		}

		this.draw();
	}

	drawLines() {
		[...document.querySelectorAll('.equation')].forEach((element, j) => {
			let equation = element.value;

			c.beginPath();
			c.lineWidth = 3;
			let counter = 0;
			for (let i = this.min_x; i < this.max_x; i += (this.max_x - this.min_x) / 200) {
				let y = [1];//eval(nerdamer.solve(element.value.replace('x', `(${i})`), 'y').evaluate().toString());
				
				let draw_x = this.getYAxisX() + (i * (this.scalePixels / this.scaleInterval));
				let draw_y = this.getXAxisY() - (y[0] * this.scalePixels / this.scaleInterval)

				if (counter == 0)
					c.moveTo(draw_x, draw_y);
				else
					c.lineTo(draw_x, draw_y);

				counter++;
			}

			c.stroke();
		});
	}
}

canvas.addEventListener('mousedown', (event) => {
	mouse.pressed = true;
});

canvas.addEventListener('mouseup', (event) => {
	mouse.pressed = false;
});

canvas.addEventListener('mousemove', (event) => {
	mouse.x = event.x;
	mouse.y = event.y;
	if (mouse.pressed) {
		graph.x_offset += event.movementX;
		graph.y_offset += event.movementY;
	}
});

document.addEventListener('keydown', function (e) {
	if (![...document.querySelectorAll('.equation')].includes(document.activeElement))
		return;
    if (e.code === 'Enter') {
    	let equations_list = document.getElementById("equations-list");
    	let new_input = document.createElement("input");
    	new_input.classList.add('equation');
    	new_input.spellcheck = false;
    	equations_list.appendChild(new_input);
    	new_input.focus();
    }

    if (e.code === 'Backspace') {
    	let equations_list = document.getElementById("equations-list");
    	if (equations_list.children.length > 1 && document.activeElement.value.length == 0) {
    		equations_list.removeChild(document.activeElement);
    		equations_list.children[equations_list.children.length - 1].focus();
    	}
    }


});

canvas.addEventListener('mousewheel', function(event) {
    graph.zoomLevel += event.deltaY < 0 ? SCROLL_SPEED : -SCROLL_SPEED;  // positive zoom in, negative zoom out
}, false);

var graph = new Graph();

function animate() {
    window.requestAnimationFrame(animate);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - document.getElementById("navbar").clientHeight;

    graph.update();
}

animate();
