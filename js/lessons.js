trigonCanvas = document.getElementById("trigCanvas");
factoringCanvas = document.getElementById("factorCanvas");
functionsCanvas = document.getElementById("funcCanvas");
if (trigonCanvas.getContext) trigonContext = trigonCanvas.getContext("2d"); else alert("Canvas element is not available");
if (factoringCanvas.getContext) factoringContext = factoringCanvas.getContext("2d"); else alert("Canvas element is not available");
if (functionsCanvas.getContext) functionsContext = functionsCanvas.getContext("2d"); else alert("Canvas element is not available");
draw(trigonCanvas,trigonContext, "Trigonometry");
draw(factoringCanvas,factoringContext, "Factoring");
draw(functionsCanvas,functionsContext, "Functions");
function draw(canvas, ctx, name, link){
	ctx.font = "30px Arial";
	ctx.textAlign = 'center';
	ctx.fillStyle = 'black';4
	ctx.fillText(name, canvas.width/2, canvas.height/2);
	canvas.addEventListener("click", on_click, false);
}
function on_click(e) {
   window.location = 
}