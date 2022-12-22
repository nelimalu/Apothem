var canvas = document.getElementById("graph");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext("2d");


class Equation {
	constructor(equation) {
		this.equation = equation;
	}

	draw() {
		
	}
}


function animate() {
    window.requestAnimationFrame(animate);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;


}
animate();
