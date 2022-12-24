//Two solution question doesnt work
var digitCounter = 0;
var twoSolutions = false;
var showSolution1 = true;
function solve(){
	var sideA = document.getElementById('sideA').value;
	var sideB = document.getElementById('sideB').value;
	var sideC = document.getElementById('sideC').value;
	var angleA = document.getElementById('angleA').value;
	var angleB = document.getElementById('angleB').value;
	var angleC = document.getElementById('angleC').value;

	var sideA2 = document.getElementById('sideA').value;
	var sideB2 = document.getElementById('sideB').value;
	var sideC2 = document.getElementById('sideC').value;
	var angleA2 = document.getElementById('angleA').value;
	var angleB2 = document.getElementById('angleB').value;
	var angleC2 = document.getElementById('angleC').value;

	var semiPer = 0.0;
	var numOfSides = 0;
	var numOfAngles = 0;
	var area = 0.0;
	var perimeter = 0.0;
	var medianA = 0.0;
	var medianB = 0.0;
	var medianC = 0.0;
	var bisectorA = 0.0;
	var bisectorB = 0.0;
	var bisectorC = 0.0;

	var possibleTriangle = true;

	var area2 = 0.0;
	var perimeter2 = 0.0;
	var medianA2 = 0.0;
	var medianB2 = 0.0;
	var medianC2 = 0.0;
	var bisectorA2 = 0.0;
	var bisectorB2 = 0.0;
	var bisectorC2 = 0.0;

	var boolSideA = false;
	var boolSideB = false;
	var boolSideC = false;
	var boolAngleA = false;
	var boolAngleB = false;
	var boolAngleC = false;

	var finalAngleC = 0;
	var finalSideA = 0;
	var finalSideB = 0;
	var finalSideC = 0;
	var finalAngleA = 0;
	var finalAngleB = 0;
	var finalAngleC = 0;

	if(sideA != "") {numOfSides++; boolSideA = true; finalSideA = sideA; sideA = parseFloat(sideA);}
	if(sideB != "") {numOfSides++; boolSideB = true; finalSideB = sideB; sideB = parseFloat(sideB);}
	if(sideC != "") {numOfSides++; boolSideC = true; finalSideC = sideC; sideC = parseFloat(sideC);}
	if(angleA != "") {numOfAngles++; boolAngleA = true; finalAngleA = angleA; angleA = parseFloat(angleA);}
	if(angleB != "") {numOfAngles++; boolAngleB = true; finalAngleB = angleB; angleB = parseFloat(angleB);}
	if(angleC != "") {numOfAngles++; boolAngleC = true; finalAngleC = angleC; angleC = parseFloat(angleC);}
	//Case where all three sides are unknown and all angles are known
	if((numOfAngles + numOfSides) < 3) { //Triangle is impossible
    	alert("Infinite Possibilities. Not enough information is given.");
    }
    else if(numOfSides == 0){
    	alert("At least one side length must be given.");
    }
    else if(numOfAngles + numOfSides > 3){
    	alert("Only 3 sides/angles must be specified.")
    }
    else{ //Triangle is possible
		if(numOfSides == 3){
            let temp = (Math.pow(sideB, 2) + Math.pow(sideC, 2) - Math.pow(sideA, 2)) / (2.0 * sideB * sideC);
            angleA = Math.acos(temp) * 180.0/Math.PI;
            temp = (Math.pow(sideA, 2) + Math.pow(sideC, 2) - Math.pow(sideB, 2)) / (2.0 * sideA * sideC);
            angleB = Math.acos(temp) * 180.0/Math.PI;
            temp = (Math.pow(sideB, 2) + Math.pow(sideA, 2) - Math.pow(sideC, 2)) / (2.0 * sideB * sideA);
            angleC = Math.acos(temp) * 180.0/Math.PI;
    	}
	    else if(numOfAngles == 1){ //Only 1 angle is given
	    	if(boolAngleA){ //Angle A is the angle given
				if(!boolSideA){ //Side A is missing
					sideA = Math.sqrt(Math.pow(sideB,2) + Math.pow(sideC,2) - 2 * sideB * sideC * Math.cos(angleA*Math.PI/180.0) );
					let temp = (Math.pow(sideA, 2) + Math.pow(sideC, 2) - Math.pow(sideB, 2)) / (2.0 * sideA * sideC);
		            angleB = Math.acos(temp) * 180.0/Math.PI;
		            temp = (Math.pow(sideB, 2) + Math.pow(sideA, 2) - Math.pow(sideC, 2)) / (2.0 * sideB * sideA);
		            angleC = Math.acos(temp) * 180.0/Math.PI;
				}
				else if(!boolSideB){ //Side B is missing
					if(sideA<sideC && angleA<90){ //Triangle has 2 solutions
						twoSolutions = true;
						angleC = Math.asin((sideC*Math.sin(angleA * Math.PI / 180.0)) / sideA) / (Math.PI / 180);
						angleB = 180 - angleA - angleC;
						sideB = sideA * Math.sin(angleB * Math.PI / 180.0) / Math.sin(angleA * Math.PI / 180.0);
						angleC2 = 180 - angleC;
						angleB2 = 180 - angleA2 - angleC2;
						sideB2 = sideB2 * Math.sin(angleB2 * Math.PI / 180.0) / Math.sin(angleA2 * Math.PI / 180.0);
					}
					else{
						twoSolutions = false;
						angleC = Math.asin((sideC*Math.sin(angleA * Math.PI / 180.0)) / sideA) / (Math.PI / 180);
						angleB = 180 - angleA - angleC;
						sideB = sideB * Math.sin(angleB * Math.PI / 180.0) / Math.sin(angleA * Math.PI / 180.0);
					}
				}
				else{ //Side C is missing (A and B are given)
					if(sideA<sideB && angleA<90){ //Triangle has 2 solutions
						twoSolutions = true;
						angleB = Math.asin((sideA*Math.sin(angleA * Math.PI / 180.0)) / sideA) / (Math.PI / 180);
						angleC = 180 - angleA - angleB;
						sideC = sideA * Math.sin(angleC * Math.PI / 180.0) / Math.sin(angleA * Math.PI / 180.0);
						angleB2 = 180 - angleB;
						angleC2 = 180 - angleA2 - angleB2;
						sideC2 = sideA2 * Math.sin(angleC2 * Math.PI / 180.0) / Math.sin(angleA2 * Math.PI / 180.0);
					}
					else{
						twoSolutions = false;
						angleA = Math.asin((sideA*Math.sin(angleB * Math.PI / 180.0)) / sideB) / (Math.PI / 180);
						angleC = 180 - angleB - angleA;
						sideC = sideB * Math.sin(angleC * Math.PI / 180.0) / Math.sin(angleB * Math.PI / 180.0);
					}
				}
	    	}
	    	else if(boolAngleB){ //Angle B is the angle given
	    		if(!boolSideB){ //Side B is missing (A and C are given)
					sideB = Math.sqrt(Math.pow(sideA,2) + Math.pow(sideC,2) - 2 * sideA * sideC * Math.cos(angleB*Math.PI/180.0) );
					let temp = (Math.pow(sideB, 2) + Math.pow(sideC, 2) - Math.pow(sideA, 2)) / (2.0 * sideB * sideC);
	        		angleA = Math.acos(temp) * 180.0/Math.PI;
	        		temp = (Math.pow(sideB, 2) + Math.pow(sideA, 2) - Math.pow(sideC, 2)) / (2.0 * sideB * sideA);
	        		angleC = Math.acos(temp) * 180.0/Math.PI
				}
				else if(!boolSideA){ //Side A is missing (B and C are given)
					if(sideB<sideC && angleB<90){ //Triangle has 2 solutions
						twoSolutions = true;
						angleC = Math.asin((sideC*Math.sin(angleB * Math.PI / 180.0)) / sideB) / (Math.PI / 180);
						angleA = 180 - angleB - angleC;
						sideA = sideB * Math.sin(angleA * Math.PI / 180.0) / Math.sin(angleB * Math.PI / 180.0);
						angleC2 = 180 - angleC;
						angleA2 = 180 - angleB - angleC2;
						sideA2 = sideB2 * Math.sin(angleA2 * Math.PI / 180.0) / Math.sin(angleB2 * Math.PI / 180.0);
					}
					else{
						twoSolutions = false;
						angleC = Math.asin((sideC*Math.sin(angleB * Math.PI / 180.0)) / sideB) / (Math.PI / 180);
						angleA = 180 - angleB - angleC;
						sideA = sideB * Math.sin(angleA * Math.PI / 180.0) / Math.sin(angleB * Math.PI / 180.0);
					}
				}
				else{ //Side C is missing (Side A and B are given)
					if(sideB<sideA && angleB<90){ //Triangle has 2 solutions
						twoSolutions = true;
						angleA = Math.asin((sideA*Math.sin(angleB * Math.PI / 180.0)) / sideB) / (Math.PI / 180);
						angleC = 180 - angleB - angleA;
						sideC = sideB * Math.sin(angleC * Math.PI / 180.0) / Math.sin(angleB * Math.PI / 180.0);
						angleA2 = 180 - angleA;
						angleC2 = 180 - angleB2 - angleA2;
						sideC2 = sideB2 * Math.sin(angleC2 * Math.PI / 180.0) / Math.sin(angleB2 * Math.PI / 180.0);
					}
					else{
						twoSolutions = false;
						angleA = Math.asin((sideA*Math.sin(angleB * Math.PI / 180.0)) / sideB) / (Math.PI / 180);
						angleC = 180 - angleB - angleA;
						sideC = sideB * Math.sin(angleC * Math.PI / 180.0) / Math.sin(angleB * Math.PI / 180.0);
					}
				}
	    	}
	    	else { //Angle C is the angle given
	    		if(!boolSideC){ //Side C is missing (A and B are given)
					sideC = Math.sqrt(Math.pow(sideB,2) + Math.pow(sideA,2) - 2 * sideB * sideA * Math.cos(angleC*Math.PI/180.0) );
					let temp = (Math.pow(sideB, 2) + Math.pow(sideC, 2) - Math.pow(sideA, 2)) / (2.0 * sideB * sideC);
	        		angleA = Math.acos(temp) * 180.0/Math.PI * 100;
	        		temp = (Math.pow(sideA, 2) + Math.pow(sideC, 2) - Math.pow(sideB, 2)) / (2.0 * sideA * sideC);
		            angleB = Math.acos(temp) * 180.0/Math.PI * 100;
				}
				else if (!boolSideA){ //Side A is missing (B and C are given)
					if(sideC<sideB && angleC<90){ //Triangle has 2 solutions
						twoSolutions = true;
						angleB = Math.asin((sideB*Math.sin(angleC * Math.PI / 180.0)) / sideC) / (Math.PI / 180);
						angleA = 180 - angleC - angleB;
						sideA = sideC * Math.sin(angleA * Math.PI / 180.0) / Math.sin(angleC * Math.PI / 180.0);
						angleB2 = 180 - angleB;
						angleA2 = 180 - angleB2 - angleC2;
						sideA2 = sideC2 * Math.sin(angleA2 * Math.PI / 180.0) / Math.sin(angleC2 * Math.PI / 180.0);
					}
					else{
						twoSolutions = false;
						angleB = Math.asin((sideB*Math.sin(angleC * Math.PI / 180.0)) / sideC) / (Math.PI / 180);
						angleA = 180 - angleC - angleB;
						sideA = sideC * Math.sin(angleA * Math.PI / 180.0) / Math.sin(angleC * Math.PI / 180.0);
					}
				}
				else{ //Side B is missing (A and C are given)
					if(sideA<sideC && angleA<90){ //Triangle has 2 solutions
						twoSolutions = true;
						angleA = Math.asin((sideA*Math.sin(angleC * Math.PI / 180.0)) / sideC) / (Math.PI / 180);
						angleB = 180 - angleA - angleC;
						sideB = sideC * Math.sin(angleB * Math.PI / 180.0) / Math.sin(angleC * Math.PI / 180.0);
						angleA2 = 180 - angleA;
						angleB2 = 180 - angleA2 - angleC2;
						sideB2 = sideC2 * Math.sin(angleB2 * Math.PI / 180.0) / Math.sin(angleC2 * Math.PI / 180.0);
					}
					else{
						twoSolutions = false;
						angleA = Math.asin((sideA*Math.sin(angleC * Math.PI / 180.0)) / sideC) / (Math.PI / 180);
						angleB = 180 - angleA - angleC;
						sideB = sideC * Math.sin(angleB * Math.PI / 180.0) / Math.sin(angleC * Math.PI / 180.0);
					}
				}
			}
		}
    	else if(numOfAngles == 2){ //Two angles are given
			if(boolAngleA && boolAngleB) {
				angleC = 180 - angleA - angleB; 
			}
			else if(boolAngleC && boolAngleA) {
				angleB = 180 - angleC - angleA;
			}
			else if(boolAngleC && boolAngleB) {
				angleA = 180 - angleC - angleB;
			}
    	}
		sideA = parseFloat(sideA);
		sideB = parseFloat(sideB);
		sideC = parseFloat(sideC);
		sideA2 = parseFloat(sideA2);
		sideB2 = parseFloat(sideB2);
		sideC2 = parseFloat(sideC2);

		angleA = parseFloat(angleA);
		angleB = parseFloat(angleB);
		angleC = parseFloat(angleC);
		angleA2 = parseFloat(angleA2);
		angleB2 = parseFloat(angleB2);
		angleC2 = parseFloat(angleC2);
    	if(boolSideA) {
    		sideA = parseFloat(finalSideA); 
    		sideA2 = parseFloat(finalSideA);
    	}
	    if(boolSideB) {
	    	sideB = parseFloat(finalSideB); 
	    	sideB2 = parseFloat(finalSideB);
	    }
	    if(boolSideC){ 
	    	sideC = parseFloat(finalSideC); 
	    	sideC2 = parseFloat(finalSideC);
	    }
	    if(boolAngleA){
	    	angleA = parseFloat(finalAngleA); 
	    	angleA2 = parseFloat(finalAngleA);
	    } 
	    if(boolAngleB){
	    	angleB = parseFloat(finalAngleB); 
	    	angleB2 = parseFloat(finalAngleB);
	    } 
	    if(boolAngleC){
	    	angleC = parseFloat(finalAngleC); 
	    	angleC2 = parseFloat(finalAngleC);
	    }
	    //Checking if triangles are possible
	    if(twoSolutions){
	    	if(isNaN(sideA) || isNaN(sideB) || isNaN(sideC) || isNaN(sideA2) || isNaN(sideB2) || isNaN(sideC2)) possibleTriangle = false; 
	    	else if(isNaN(angleA) || isNaN(angleB) || isNaN(angleC) || isNaN(angleA2) || isNaN(angleB2) || isNaN(angleC2)) possibleTriangle = false;
	    }
	    else{
	    	if(isNaN(sideA) || isNaN(sideB) || isNaN(sideC)) possibleTriangle = false;
	    	else if(isNaN(angleA) || isNaN(angleB) || isNaN(angleC)) possibleTriangle = false;
	    }
		if((sideA >= (sideB+sideC)) || (sideB>=(sideA+sideC)) || (sideC>=(sideA+sideB)) || !possibleTriangle){
	    	alert("Triangle is not possible. A triangle cannot be made with the given requirements.");
		}
		else{
			perimeter = sideA + sideB + sideC;
			perimeter2 = sideA2 + sideB2 + sideC2;
		    
		    semiPer = perimeter/2;
			area = Math.sqrt((semiPer) * (semiPer - sideA) * (semiPer - sideB) * (semiPer - sideC));
			semiPer = perimeter2/2;
			area2 = Math.sqrt((semiPer/2) * (semiPer - sideA2) * (semiPer - sideB2) * (semiPer - sideC2));
		    
		    medianA = Math.sqrt(2*Math.pow(sideB,2) + 2*Math.pow(sideC,2) - Math.pow(sideA,2)) / 2.0;
			medianB = Math.sqrt(2*Math.pow(sideA,2) + 2*Math.pow(sideC,2) - Math.pow(sideB,2)) / 2.0;
			medianC = Math.sqrt(2*Math.pow(sideB,2) + 2*Math.pow(sideA,2) - Math.pow(sideC,2)) / 2.0;

			medianA2 = Math.sqrt(2*Math.pow(sideB2,2) + 2*Math.pow(sideC2,2) - Math.pow(sideA2,2)) / 2.0;
			medianB2 = Math.sqrt(2*Math.pow(sideA2,2) + 2*Math.pow(sideC2,2) - Math.pow(sideB2,2)) / 2.0;
			medianC2 = Math.sqrt(2*Math.pow(sideB2,2) + 2*Math.pow(sideA2,2) - Math.pow(sideC2,2)) / 2.0;
		    
		    semiPer = perimeter/2
			bisectorA = (2/(sideB + sideC)) * Math.sqrt(sideB * sideC * semiPer * (semiPer-sideA));
			bisectorB = (2/(sideA + sideC)) * Math.sqrt(sideA * sideC * semiPer * (semiPer-sideB));
			bisectorC = (2/(sideB + sideA)) * Math.sqrt(sideB * sideA * semiPer * (semiPer-sideC));
			semiPer = perimeter2/2
			bisectorA2 = (2/(sideB2 + sideC2)) * Math.sqrt(sideB2 * sideC2 * semiPer * (semiPer-sideA2));
			bisectorB2 = (2/(sideA2 + sideC2)) * Math.sqrt(sideA2 * sideC2 * semiPer * (semiPer-sideB2));
			bisectorC2 = (2/(sideB2 + sideA2)) * Math.sqrt(sideB2 * sideA2 * semiPer * (semiPer-sideC2));

			if(digitCounter<=0){
	    		digitCounter = 0;
	    	}
			sideA = Math.round(parseFloat(sideA) * Math.pow(10,digitCounter)) / Math.pow(10,digitCounter);
		    sideB = Math.round(parseFloat(sideB) * Math.pow(10,digitCounter)) / Math.pow(10,digitCounter);
		    sideC = Math.round(parseFloat(sideC) * Math.pow(10,digitCounter)) / Math.pow(10,digitCounter);
		    angleA = Math.round(parseFloat(angleA) * Math.pow(10,digitCounter)) / Math.pow(10,digitCounter);
		    angleB = Math.round(parseFloat(angleB) * Math.pow(10,digitCounter)) / Math.pow(10,digitCounter);
		    angleC = Math.round(parseFloat(angleC) * Math.pow(10,digitCounter)) / Math.pow(10,digitCounter);

		    sideA2 = Math.round(parseFloat(sideA2) * Math.pow(10,digitCounter)) / Math.pow(10,digitCounter);
		    sideB2 = Math.round(parseFloat(sideB2) * Math.pow(10,digitCounter)) / Math.pow(10,digitCounter);
		    sideC2 = Math.round(parseFloat(sideC2) * Math.pow(10,digitCounter)) / Math.pow(10,digitCounter);
		    angleA2 = Math.round(parseFloat(angleA2) * Math.pow(10,digitCounter)) / Math.pow(10,digitCounter);
		    angleB2 = Math.round(parseFloat(angleB2) * Math.pow(10,digitCounter)) / Math.pow(10,digitCounter);
		    angleC2 = Math.round(parseFloat(angleC2) * Math.pow(10,digitCounter)) / Math.pow(10,digitCounter);

		    finalSideA = Math.round(parseFloat(finalSideA) * Math.pow(10,digitCounter)) / Math.pow(10,digitCounter);
		    finalSideB = Math.round(parseFloat(finalSideB) * Math.pow(10,digitCounter)) / Math.pow(10,digitCounter);
		    finalSideC = Math.round(parseFloat(finalSideC) * Math.pow(10,digitCounter)) / Math.pow(10,digitCounter);
		    finalAngleA = Math.round(parseFloat(finalAngleA) * Math.pow(10,digitCounter)) / Math.pow(10,digitCounter);
		    finalAngleB = Math.round(parseFloat(finalAngleB) * Math.pow(10,digitCounter)) / Math.pow(10,digitCounter);
		    finalAngleC = Math.round(parseFloat(finalAngleC) * Math.pow(10,digitCounter)) / Math.pow(10,digitCounter);

		    perimeter = Math.round(parseFloat(perimeter) * Math.pow(10,digitCounter)) / Math.pow(10,digitCounter);
		    perimeter2 = Math.round(parseFloat(perimeter2) * Math.pow(10,digitCounter)) / Math.pow(10,digitCounter);

		    area = Math.round(parseFloat(area) * Math.pow(10,digitCounter)) / Math.pow(10,digitCounter);
		    area2 = Math.round(parseFloat(area2) * Math.pow(10,digitCounter)) / Math.pow(10,digitCounter);

		    bisectorA = Math.round(parseFloat(bisectorA) * Math.pow(10,digitCounter)) / Math.pow(10,digitCounter);
		    bisectorB = Math.round(parseFloat(bisectorB) * Math.pow(10,digitCounter)) / Math.pow(10,digitCounter);
		    bisectorC = Math.round(parseFloat(bisectorC) * Math.pow(10,digitCounter)) / Math.pow(10,digitCounter);
		    bisectorA2 = Math.round(parseFloat(bisectorA2) * Math.pow(10,digitCounter)) / Math.pow(10,digitCounter);
		    bisectorB2 = Math.round(parseFloat(bisectorB2) * Math.pow(10,digitCounter)) / Math.pow(10,digitCounter);
		    bisectorC2 = Math.round(parseFloat(bisectorC2) * Math.pow(10,digitCounter)) / Math.pow(10,digitCounter);

		    medianA = Math.round(parseFloat(medianA) * Math.pow(10,digitCounter)) / Math.pow(10,digitCounter);
		    medianB = Math.round(parseFloat(medianB) * Math.pow(10,digitCounter)) / Math.pow(10,digitCounter);
		    medianC = Math.round(parseFloat(medianC) * Math.pow(10,digitCounter)) / Math.pow(10,digitCounter);
		    medianA2 = Math.round(parseFloat(medianA2) * Math.pow(10,digitCounter)) / Math.pow(10,digitCounter);
		    medianB2 = Math.round(parseFloat(medianB2) * Math.pow(10,digitCounter)) / Math.pow(10,digitCounter);
		    medianC2 = Math.round(parseFloat(medianC2) * Math.pow(10,digitCounter)) / Math.pow(10,digitCounter);
		    if((twoSolutions && showSolution1) || !twoSolutions){
		    	printOne("sideAAnswer",sideA);
		    	printOne("sideBAnswer",sideB);
		    	printOne("sideCAnswer",sideC);

		    	printOne("angleAAnswer",angleA);
		    	printOne("angleBAnswer",angleB);
		    	printOne("angleCAnswer",angleC);

		    	printOne("perimAnswer",perimeter);
		    	printOne("areaAnswer",area);

		    	printOne("medianAAnswer",medianA);
		    	printOne("medianBAnswer",medianB);
		    	printOne("medianCAnswer",medianC);

		    	printOne("bisectorAAnswer",bisectorA);
		    	printOne("bisectorBAnswer",bisectorB);
		    	printOne("bisectorCAnswer",bisectorC);
		    	/*printTwo("sideAAnswer",sideA,sideA2);
		    	printTwo("sideBAnswer",sideB,sideB2);
		    	printTwo("sideCAnswer",sideC,sideC2);

		    	printTwo("angleAAnswer",angleA,angleA2);
		    	printTwo("angleBAnswer",angleB,angleB2);
		    	printTwo("angleCAnswer",angleC,angleC2);

		    	printTwo("perimAnswer",perimeter,perimeter2);
		    	printTwo("areaAnswer",area,area2);

		    	printTwo("medianAAnswer",medianA,medianA2);
		    	printTwo("medianBAnswer",medianB,medianB2);
		    	printTwo("medianCAnswer",medianC,medianC2);

		    	printTwo("bisectorAAnswer",bisectorA,bisectorA2);
		    	printTwo("bisectorBAnswer",bisectorB,bisectorB2);
		    	printTwo("bisectorCAnswer",bisectorC,bisectorC2);*/
		    }
		    else{
		    	printOne("sideAAnswer",sideA2);
		    	printOne("sideBAnswer",sideB2);
		    	printOne("sideCAnswer",sideC2);

		    	printOne("angleAAnswer",angleA2);
		    	printOne("angleBAnswer",angleB2);
		    	printOne("angleCAnswer",angleC2);

		    	printOne("perimAnswer",perimeter2);
		    	printOne("areaAnswer",area2);

		    	printOne("medianAAnswer",medianA2);
		    	printOne("medianBAnswer",medianB2);
		    	printOne("medianCAnswer",medianC2);

		    	printOne("bisectorAAnswer",bisectorA2);
		    	printOne("bisectorBAnswer",bisectorB2);
		    	printOne("bisectorCAnswer",bisectorC2);
		    }
		}
	}
}
function printOne(name, thing){
	thing = thing.toString();
	if(thing % 1 == 0){
		thing += ".";
		thing += "0".repeat(digitCounter);
	}
	else{
		let startOfDecimal = thing.indexOf(".") + 1;
		let numOfDecimals = thing.substring(startOfDecimal).length;
		if(numOfDecimals < digitCounter) thing += "0".repeat(digitCounter-numOfDecimals);
	}
	document.getElementById(name).value = thing;
}
function printTwo(name, thing1, thing2){
	thing1 = thing1.toString();
	thing2 = thing2.toString();
	if(thing1 % 1 == 0){
		thing1 += ".";
		thing1 += "0".repeat(digitCounter);
	}
	else{
		let startOfDecimal = thing1.indexOf(".") + 1;
		let numOfDecimals = thing1.substring(startOfDecimal).length;
		if(numOfDecimals < digitCounter) thing1 += "0".repeat(digitCounter-numOfDecimals);
	}
	if(thing2 % 1 == 0){
		thing2 += ".";
		thing2 += "0".repeat(digitCounter);
	}
	else{
		let startOfDecimal = thing2.indexOf(".") + 1;
		let numOfDecimals = thing2.substring(startOfDecimal).length;
		if(numOfDecimals < digitCounter) thing1 += "0".repeat(digitCounter-numOfDecimals);
	}
	document.getElementById(name).value = thing1 + " OR " + thing2;
}
function clearField(){
	if(document.getElementById('sideA').value != "") document.getElementById('sideA').value = "";
	if(document.getElementById('sideB').value != "") document.getElementById('sideB').value = "";
	if(document.getElementById('sideC').value != "") document.getElementById('sideC').value = "";
	if(document.getElementById('angleA').value != "") document.getElementById('angleA').value = "";
	if(document.getElementById('angleB').value != "") document.getElementById('angleB').value = "";
	if(document.getElementById('angleC').value != "") document.getElementById('angleC').value = "";

	if(document.getElementById('sideAAnswer').value != "") document.getElementById('sideAAnswer').value = "";
	if(document.getElementById('sideBAnswer').value != "") document.getElementById('sideBAnswer').value = "";
	if(document.getElementById('sideCAnswer').value != "") document.getElementById('sideCAnswer').value = "";
	if(document.getElementById('angleAAnswer').value != "") document.getElementById('angleAAnswer').value = "";
	if(document.getElementById('angleBAnswer').value != "") document.getElementById('angleBAnswer').value = "";
	if(document.getElementById('angleCAnswer').value != "") document.getElementById('angleCAnswer').value = "";

	if(document.getElementById('medianAAnswer').value != "") document.getElementById('medianAAnswer').value = "";
	if(document.getElementById('medianBAnswer').value != "") document.getElementById('medianBAnswer').value = "";
	if(document.getElementById('medianCAnswer').value != "") document.getElementById('medianCAnswer').value = "";

	if(document.getElementById('bisectorAAnswer').value != "") document.getElementById('bisectorAAnswer').value = "";
	if(document.getElementById('bisectorBAnswer').value != "") document.getElementById('bisectorBAnswer').value = "";
	if(document.getElementById('bisectorCAnswer').value != "") document.getElementById('bisectorCAnswer').value = "";

	if(document.getElementById('areaAnswer').value != "") document.getElementById('areaAnswer').value = "";
	if(document.getElementById('perimAnswer').value != "") document.getElementById('perimAnswer').value = "";
	
	digitCounter = 0;
	twoSolutions = false;
	showSolution1 = true;
}
function addDigit(){
	digitCounter = parseFloat(digitCounter) + 1;
	solve();
}
function removeDigit(){
	digitCounter = parseFloat(digitCounter) - 1;
	solve();
}
function secondSolution(){
	if(showSolution1) showSolution1 = false;
	else showSolution1 = true;
	if(twoSolutions){
		solve();
	}
	else{
		alert("There is no second solution.");
	}
}