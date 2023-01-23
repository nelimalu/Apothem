var canvas = document.getElementById("graph");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext("2d");

// hold mouse data
var mouse = {
	pressed: false,
	x: 0,  // position on window
	y: 0,
	real_x: 0,  // position on canvas
	real_y: 0,
}

const SCROLL_SPEED = 3;
const MIN_ZOOM_CAP = -50;
const MAX_ZOOM_CAP = 100;
const NUMBER_FONT_SIZE = 20;
const LINE_COLOURS = [
	"#c74440",
	"#2d70b3",
	"#388c46",
	"#6042a6",
	"#000000"
];

/* HELPER FUNCTIONS */

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


function distance(x1, y1, x2, y2) {
	return Math.sqrt((x2 - x1) ** 2, (y2 - y1) ** 2);
}


function roundToDigits(number, digits) {
  return Number(Math.round(Number(number + 'e' + digits)) + 'e-' + digits);
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
		this.min_y = 0;
		this.max_y = 0;
	}

	getXAxisY() {
		return (canvas.height / 2) + this.y_offset;
	}

	getYAxisX() {
		return (canvas.width / 2) + this.x_offset;
	}

	drawAxes() {
		// draw axis along screen in respective locations
		let y = this.getXAxisY();
		drawLine(0, y, canvas.width, y, "black");
		drawLine(this.getYAxisX(), 0, this.getYAxisX(), canvas.height, "black");
	}

	drawXIntervals() {
		// loops from origin out and draws intervals in respective locations

		let counter = 0;  // keep track of which number to draw
		for (let i = this.getYAxisX(); i < canvas.width; i += this.scalePixels) {  // move across screen at interval rate in pixels
			// drawCircle(i, this.getXAxisY(), 10, "red");
			drawLine(i, 0, i, canvas.height, "#bdbdbd");
			if (counter != 0)
				drawText(i, this.getXAxisY() - 5, (counter * this.scaleInterval).toString(), "black", NUMBER_FONT_SIZE);
			counter++;
		}
		this.max_x = counter * (this.scaleInterval);

		counter = 0;
		for (let i = this.getYAxisX(); i >= 0; i -= this.scalePixels) {
			drawLine(i, 0, i, canvas.height, "#bdbdbd");
			if (counter != 0)
				drawText(i, this.getXAxisY() - 5, (counter * this.scaleInterval).toString(), "black", NUMBER_FONT_SIZE);
			counter--;
		}
		this.min_x = counter * (this.scaleInterval);
	}

	drawYIntervals() {
		// same as above method but for Y axis

		let counter = 0;
		for (let i = this.getXAxisY(); i < canvas.width; i += this.scalePixels) {
			drawLine(0, i, canvas.width, i, "#bdbdbd");
			drawText(this.getYAxisX() + 12, i - 5, -(counter * this.scaleInterval).toString(), "black", NUMBER_FONT_SIZE);
			counter++;
		}
		this.max_y = counter * this.scaleInterval;

		counter = 0;
		for (let i = this.getXAxisY(); i >= 0; i -= this.scalePixels) {
			drawLine(0, i, canvas.width, i, "#bdbdbd");
			drawText(this.getYAxisX() + 12, i - 5, -(counter * this.scaleInterval).toString(), "black", NUMBER_FONT_SIZE);
			counter--;
		}
		this.min_y = counter * this.scaleInterval;
	}

	drawIntervals() {
		this.drawXIntervals();
		this.drawYIntervals();
	}

	draw() {
		this.drawIntervals();
		this.drawAxes();
		this.drawLines();
	}

	update() {
		this.scalePixels = this.zoomLevel + 100;  // for mini zooming
		
		// if user zooms to far, resize the scale to fit zoom level
		if (this.zoomLevel > MAX_ZOOM_CAP) {
			this.scaleInterval *= 0.5;
			this.zoomLevel = 0;
		}
		if (this.zoomLevel < MIN_ZOOM_CAP) {
			this.scaleInterval *= 2;
			this.zoomLevel = 0;
		}

		this.draw();
	}

	drawLines() {
		// draw each equation
		[...document.querySelectorAll('.equation')].forEach((element, j) => {
			c.beginPath();
			c.lineWidth = 3;
			c.strokeStyle = LINE_COLOURS[j % LINE_COLOURS.length];  // get colour
			try {
				// USING NERDAMER LIBRARY
				// solve equation for y value
				var equation = nerdamer(element.value).solveFor('y').toString();

				// try to calculate y intercept (if it exists)
				try {
					let new_equation = element.value.replaceAll('x', '(0)');
					var y_intercept = -eval(nerdamer(nerdamer(new_equation).solveFor('y')).evaluate().toString());
				} catch (e) {
					var y_intercept = null;
				}

				// try to calculate x intercepts (if they exist)
				try {
					let new_equation = element.value.replaceAll('y', '(0)');
					//var x_intercept = nerdamer(nerdamer(new_equation).solveFor('x')).evaluate().toString();
					var x_intercept = nerdamer(new_equation).solveFor('x').toString().split(',').map(e => {
						return eval(nerdamer(e).evaluate());
					})
				} catch (e) {
					var x_intercept = null;
				}

				// console.log(x_intercept, y_intercept)
				
				let counter = 0;
				let ended_line = false;
				let prev_y = 0;

				// split the screen from left to right into 150 parts, and loop through each part
				for (let i = this.min_x; i < this.max_x; i += (this.max_x - this.min_x) / 150) {
					let new_equation = equation.replaceAll('x', `(${i})`);
					let y = eval(nerdamer(new_equation).evaluate().toString());
					// get the y value from the equation at this respective x value

					// if its visible on the screen					
					if (y < this.max_y * 2 && y > this.min_y * 2) {
						let draw_x = this.getYAxisX() + (i * (this.scalePixels / this.scaleInterval));
						let draw_y = this.getXAxisY() - (y * this.scalePixels / this.scaleInterval);
						
						// if there is a jump in the graph, end the line and continue later
						if (counter == 0)
							c.moveTo(draw_x, draw_y);
						else {
							if (Math.abs(prev_y - y) > Math.abs(this.max_y - this.min_y) / 2) {
								if (prev_y < y)
									c.lineTo(draw_x, 0);
								else
									c.lineTo(draw_x, canvas.height);
								c.moveTo(draw_x, draw_y);
							} else
								c.lineTo(draw_x, draw_y);
						}
					}
					prev_y = y;
					counter++;
				}

				c.stroke();

				// draw x intercept
				
			} catch (e) {}

			// draw the x and y intercepts

			if (x_intercept != null) {
				x_intercept.forEach((i, j) => {

					let draw_loc = this.getYAxisX() + (i * (this.scalePixels / this.scaleInterval));
					
					// if mouse is over the point, reveal x intercept
					let dist = distance(mouse.real_x, mouse.real_y, draw_loc, this.getXAxisY());
					if (dist <= 5)
						drawText(mouse.real_x, mouse.real_y - 10, `${roundToDigits(eval(i), 3)}`, "black", 24);

					// draw circle on x intercept
					drawCircle(draw_loc, this.getXAxisY(), 5, "#8d9fa9");
				})
				
			}
			// same as x intercept
			if (y_intercept != null) {
				let draw_loc = this.getXAxisY() + (y_intercept * (this.scalePixels / this.scaleInterval));
				drawCircle(this.getYAxisX(), draw_loc, 5, "#8d9fa9");

				let dist = distance(mouse.real_x, mouse.real_y, this.getYAxisX(), draw_loc);
				console.log(dist);
				if (dist <= 5)
					drawText(mouse.real_x, mouse.real_y - 10, `${roundToDigits(eval(-y_intercept), 3)}`, "black", 24);
			}
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
	let rect = canvas.getBoundingClientRect();
	mouse.x = event.x;
	mouse.y = event.y;

	mouse.real_x = event.x - rect.left;
	mouse.real_y = event.y - rect.top;

	if (mouse.pressed) {
		graph.x_offset += event.movementX;
		graph.y_offset += event.movementY;
	}
});

document.addEventListener('keydown', function (e) {
	if (![...document.querySelectorAll('.equation')].includes(document.activeElement))  // make sure we are editing equations
		return;
    if (e.code === 'Enter') {  // create new equation bar
    	let equations_list = document.getElementById("equations-list");
    	let new_input = document.createElement("input");
    	new_input.classList.add('equation');
    	new_input.spellcheck = false;
    	equations_list.appendChild(new_input);
    	new_input.focus();
    }

    if (e.code === 'Backspace') {  // if no more characters, delete the equation bar and move one up
    	let equations_list = document.getElementById("equations-list");
    	if (equations_list.children.length > 1 && document.activeElement.value.length == 0) {
    		equations_list.removeChild(document.activeElement);
    		equations_list.children[equations_list.children.length - 1].focus();
    	}
    }


});

canvas.addEventListener('mousewheel', function(event) {
	// zoom on the graph based on scroll amount
    graph.zoomLevel += event.deltaY < 0 ? SCROLL_SPEED * 1.5 : -SCROLL_SPEED;  // positive zoom in, negative zoom out
}, false);

var graph = new Graph();

function animate() {
    window.requestAnimationFrame(animate);
    // update the graph size depending on screen resizing
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - document.getElementById("navbar").clientHeight;

    // draw the graph
    graph.update();
}

animate();
