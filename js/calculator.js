let temp = "";
var x = "";
var y = "";
var z = "";
let backEnd = "";
function del() {
	text = output.value;
	text = text.substring(0,text.length-1);
	output.value = text;
	temp = text;
	if(text.length == 0){
		temp = "";
		finalAnswer = "";
	}
}
function enterNum(num){
	output.value += num;
	backEnd += num;
}
function enterNotNum(notNum){
	output.value += notNum + " ";
	backEnd += notNum;
}
function enterOp(notNum){
	output.value += " " + notNum + " ";
	backEnd += " " + notNum + " ";
}
function equal() {
	temp = output.value;
	//try{
		storedAnswer = evaluate(temp);
		document.getElementById("answer").style.visibility = "visible";
	//}
	/*catch{
		answer.value = "MATH ERROR";
	}*/
}
function solveFor(variable){
	if(variable == 'X'){
		answer.value = "X = " + x;
	}
	else if(variable == 'Y'){
		answer.value = "Y = " + y;
	}
	else{
		answer.value = "Z = " + z;
	}
}
function evaluate(str){
	str = str.replace("√","sqrt");
	str = str.replace("π","pi");
	var finalAnswer = "";
	var hasLetter = false;
	str = str.toLowerCase();
	if(str.includes('x') || str.includes('y') || str.includes('z')) hasLetter = true;
	if(str.includes('x') && str.includes('=')){
		hasLetter = true;
		x = nerdamer(str).solveFor('x').toString();
		document.getElementById("xButton").style.visibility = "visible";
		x = x.replaceAll("sqrt","√");
		x = x.replaceAll("pi","π")
		answer.value = "X = " + x;
	}
	if(str.includes('y') && str.includes('=')){
		hasLetter = true;
		y = nerdamer(str).solveFor('y').toString();
		document.getElementById("yButton").style.visibility = "visible";
		y = y.replaceAll("sqrt","√");
		y = y.replaceAll("pi","π")
		answer.value = "Y = " + y;
	}
	if(str.includes('z') && str.includes('=')){
		hasLetter = true;
		z = nerdamer(str).solveFor('z').toString();
		if(str.includes('=')) document.getElementById("zButton").style.visibility = "visible";
		z = z.replaceAll("sqrt","√");
		z = z.replaceAll("pi","π")
		answer.value = "Z = " + z;
	}
	if(!str.includes('=')){
		finalAnswer = nerdamer(str).simplify().toString();
		if(hasLetter) answer.value = finalAnswer;
		else answer.value = eval(finalAnswer); 
	}
	else if(str.includes('=') && !hasLetter){
		alert("Only the variables X, Y, and Z can be calculated.");
	}
}
function clearAll() {
	temp = "";
	finalAnswer = "";
	output.value = "";
	backEnd = "";
	answer.value = "";
	document.getElementById("xButton").style.visibility = "hidden";
	document.getElementById("yButton").style.visibility = "hidden";
	document.getElementById("zButton").style.visibility = "hidden";
	document.getElementById("answer").style.visibility = "hidden";
}