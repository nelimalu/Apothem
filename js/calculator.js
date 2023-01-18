let temp = "";
		let storedAnswer = "";
		function enterNum(num){
			output.value += num;
		}
		function equal() {
			temp = output.value;
			output.value += " = ";
			try{
				storedAnswer = evaluate(temp);
				output.value = storedAnswer;
			}
			catch{
				output.value = "MATH ERROR";
			}
		}
		function evaluate(str){
			let finalAnswer = str;
			finalAnswer = finalAnswer.replace("π", "Math.PI");
			finalAnswer = finalAnswer.replace("x", "*");
			finalAnswer = finalAnswer.replace("÷", "/");
			finalAnswer = finalAnswer.replace("√", "Math.sqrt");
			finalAnswer = finalAnswer.replace("^", "**");
			finalAnswer = finalAnswer.replace("Sin", "Math.sin");
			finalAnswer = finalAnswer.replace("Cos", "Math.cos");
			finalAnswer = finalAnswer.replace("Tan", "Math.tan");
			return eval(finalAnswer);
		}
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
		function clearAll() {
			temp = "";
			finalAnswer = "";
			output.value = "";
		}