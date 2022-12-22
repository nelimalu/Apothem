//Area and Medians are Wrong... FIX!
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
	var twoSolutions = false;

	var finalAngleC = 0;
	var finalSideA = 0;
	var finalSideB = 0;
	var finalSideC = 0;
	var finalAngleA = 0;
	var finalAngleB = 0;
	var finalAngleC = 0;
	if(sideA != "") {numOfSides++; boolSideA = true; finalSideA = sideA;}
	if(sideB != "") {numOfSides++; boolSideB = true; finalSideB = sideB;}
	if(sideC != "") {numOfSides++; boolSideC = true; finalSideC = sideC;}
	if(angleA != "") {numOfAngles++; boolAngleA = true; finalAngleA = angleA;}
	if(angleB != "") {numOfAngles++; boolAngleA = true; finalAngleB = angleB;}
	if(angleC != "") {numOfAngles++; boolAngleA = true; finalAngleC = angleC;}
	console.log(numOfSides);
	console.log(numOfAngles);
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
					if(sideA<sideC && angleA<=90){ //Triangle has 2 solutions
						twoSolutions = true;
						angleC = Math.asin((sideC*Math.sin(angleA * Math.PI / 180.0)) / sideA * 180.0 / Math.PI);
						angleB = 180 - angleA - angleC;
						sideB = sideA * Math.sin((angleB * Math.PI / 180.0) / Math.sin(angleA * Math.PI / 180.0));
						angleC2 = 180 - angleC;
						angleB2 = 180 - angleA2 - angleC2;
						sideB2 = sideA2 * Math.sin((angleB2 * Math.PI / 180.0) / Math.sin(angleA2 * Math.PI / 180.0));
					}
					else{
							angleC = Math.asin((sideC*Math.sin(angleA * Math.PI / 180.0)) / sideA * 180.0 / Math.PI);
							angleB = 180 - angleA - angleC;
							sideB = sideA * Math.sin((angleB * Math.PI / 180.0) / Math.sin(angleA * Math.PI / 180.0));
					}
				}
				else{ //Side C is missing (A and B are given)
					if(sideA<sideB && angleA<=90){ //Triangle has 2 solutions
						twoSolutions = true;
						angleB = Math.asin((sideB*Math.sin(angleA * Math.PI / 180.0)) / sideA * 180.0 / Math.PI);
						angleC = 180 - angleA - angleB;
						sideC = sideA * Math.sin((angleC * Math.PI / 180.0) / Math.sin(angleA * Math.PI / 180.0));
						angleB2 = 180 - angleB;
						angleC2 = 180 - angleA2 - angleB2;
						sideC2 = sideA2 * Math.sin((angleC2 * Math.PI / 180.0) / Math.sin(angleA2 * Math.PI / 180.0));
					}
					else{
							angleB = Math.asin((sideC*Math.sin(angleA * Math.PI / 180.0)) / sideA * 180.0 / Math.PI);
							angleC = 180 - angleA - angleB;
							sideC = sideA * Math.sin((angleC * Math.PI / 180.0) / Math.sin(angleA * Math.PI / 180.0));
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
					if(sideB<sideC && angleB<=90){ //Triangle has 2 solutions
						twoSolutions = true;
						angleC = Math.asin((sideC*Math.sin(angleB * Math.PI / 180.0)) / sideB * 180.0 / Math.PI);
						angleA = 180 - angleB - angleC;
						sideA = sideB * Math.sin((angleA * Math.PI / 180.0) / Math.sin(angleB * Math.PI / 180.0));
						angleC2 = 180 - angleC;
						angleA2 = 180 - angleB2 - angleC2;
						sideA2 = sideB2 * Math.sin((angleA2 * Math.PI / 180.0) / Math.sin(angleB2 * Math.PI / 180.0));
					}
					else{
							angleC = Math.asin((sideC*Math.sin(angleB * Math.PI / 180.0)) / sideB * 180.0 / Math.PI);
							angleA = 180 - angleB - angleC;
							sideA = sideB * Math.sin((angleA * Math.PI / 180.0) / Math.sin(angleB * Math.PI / 180.0));
					}
				}
				else{ //Side C is missing (Side A and B are given)
					if(sideB<sideA && angleB<=90){ //Triangle has 2 solutions
						twoSolutions = true;
						angleA = Math.asin((sideA*Math.sin(angleB * Math.PI / 180.0)) / sideB * 180.0 / Math.PI);
						angleC = 180 - angleB - angleA;
						sideC = sideB * Math.sin((angleC * Math.PI / 180.0) / Math.sin(angleB * Math.PI / 180.0));
						angleA2 = 180 - angleA;
						angleC2 = 180 - angleB2 - angleA2;
						sideC2 = sideB2 * Math.sin((angleC2 * Math.PI / 180.0) / Math.sin(angleB2 * Math.PI / 180.0));
					}
					else{
							angleA = Math.asin((sideA*Math.sin(angleB * Math.PI / 180.0)) / sideB * 180.0 / Math.PI);
							angleC = 180 - angleB - angleA;
							sideC = sideB * Math.sin((angleC * Math.PI / 180.0) / Math.sin(angleB * Math.PI / 180.0));
					}
				}
	    	}
	    	else {
	    		if(!boolSideC){ //Side C is missing (A and B are given)
					sideC = Math.sqrt(Math.pow(sideB,2) + Math.pow(sideA,2) - 2 * sideB * sideA * Math.cos(angleC*Math.PI/180.0) );
					let temp = (Math.pow(sideB, 2) + Math.pow(sideC, 2) - Math.pow(sideA, 2)) / (2.0 * sideB * sideC);
	        		angleA = Math.acos(temp) * 180.0/Math.PI * 100;
	        		temp = (Math.pow(sideA, 2) + Math.pow(sideC, 2) - Math.pow(sideB, 2)) / (2.0 * sideA * sideC);
		            angleB = Math.acos(temp) * 180.0/Math.PI * 100;
				}
				else if (!boolSideA){ //Side A is missing (B and C are given)
					if(sideC<sideB && angleC<=90){ //Triangle has 2 solutions
						twoSolutions = true;
						angleB = Math.asin((sideB*Math.sin(angleC * Math.PI / 180.0)) / sideC * 180.0 / Math.PI);
						angleA = 180 - angleB - angleC;
						sideA = sideC * Math.sin((angleA * Math.PI / 180.0) / Math.sin(angleC * Math.PI / 180.0));
						angleB2 = 180 - angleB2;
						angleA2 = 180 - angleB2 - angleC2;
						sideA2 = sideC2 * Math.sin((angleA2 * Math.PI / 180.0) / Math.sin(angleC2 * Math.PI / 180.0));
					}
					else{
							angleC = Math.asin((sideC*Math.sin(angleB * Math.PI / 180.0)) / sideB * 180.0 / Math.PI);
							angleA = 180 - angleB - angleC;
							sideA = sideB * Math.sin((angleA * Math.PI / 180.0) / Math.sin(angleB * Math.PI / 180.0));
					}
				}
				else{ //Side B is missing (A and C are given)
					if(sideC<sideA && angleC<=90){ //Triangle has 2 solutions
						twoSolutions = true;
						angleA = Math.asin((sideA*Math.sin(angleC * Math.PI / 180.0)) / sideC * 180.0 / Math.PI);
						angleB = 180 - angleA - angleC;
						sideB = sideC * Math.sin((angleB * Math.PI / 180.0) / Math.sin(angleC * Math.PI / 180.0));
						angleA2 = 180 - angleA;
						angleB2 = 180 - angleA2 - angleC2;
						sideB2 = sideC2 * Math.sin((angleB2 * Math.PI / 180.0) / Math.sin(angleC2 * Math.PI / 180.0));
					}
					else{
							angleA = Math.asin((sideA*Math.sin(angleC * Math.PI / 180.0)) / sideC * 180.0 / Math.PI);
							angleB = 180 - angleA - angleC;
							sideB = sideC * Math.sin((angleB * Math.PI / 180.0) / Math.sin(angleC * Math.PI / 180.0));
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
}
    sideA = parseFloat(sideA);
    sideB = parseFloat(sideB);
    sideC = parseFloat(sideC);
    angleA = parseFloat(angleA);
    angleB = parseFloat(angleB);
    angleC = parseFloat(angleC);

    if(boolSideA) sideA = parseFloat(finalSideA); sideA2 = parseFloat(finalSideA);
    if(boolSideB) sideB = parseFloat(finalSideB); sideB2 = parseFloat(finalSideB);
    if(boolSideC) sideC = parseFloat(finalSideC); sideC2 = parseFloat(finalSideC);
    if(boolAngleA) angleA = parseFloat(finalAngleA); angleA2 = parseFloat(finalAngleA);
    if(boolAngleB) angleB = parseFloat(finalAngleB); angleB2 = parseFloat(finalAngleB);
    if(boolAngleC) angleC = parseFloat(finalAngleC); angleC2 = parseFloat(finalAngleC);
	if((sideA > (sideB+sideC)) || (sideB>(sideA+sideC)) || (sideC>(sideA+sideB))){
    	alert("Triangle is not possible. A triangle cannot be made with the given requirements.");
	}
	else{
		perimeter = sideA + sideB + sideC;
		perimeter2 = sideA2 + sideB2 + sideC2;
	    semiPer = perimeter/2;
		area = Math.sqrt((semiPer/2) * (semiPer - sideA) * (semiPer - sideB) * (semiPer - sideC));
		semiPer = perimeter2/2;
		area2 = Math.sqrt((semiPer/2) * (semiPer - sideA2) * (semiPer - sideB2) * (semiPer - sideC2));
	    medianA = Math.sqrt(2*sideB*sideB + 2*sideC*sideC - sideA*sideA) / 4;
		medianB = Math.sqrt(2*sideA*sideA + 2*sideC*sideC - sideB*sideB) / 4;
		medianC = Math.sqrt(2*sideB*sideB + 2*sideA*sideA - sideC*sideC) / 4;

		medianA2 = Math.sqrt(2*sideB2*sideB2 + 2*sideC2*sideC2 - sideA2*sideA2) / 4;
		medianB2 = Math.sqrt(2*sideA2*sideA2 + 2*sideC2*sideC2 - sideB2*sideB2) / 4;
		medianC2 = Math.sqrt(2*sideB2*sideB2 + 2*sideA2*sideA2 - sideC2*sideC2) / 4;
	    semiPer = perimeter/2
		bisectorA = (2/(sideB + sideC)) * Math.sqrt(sideB * sideC * semiPer * (semiPer-sideA));
		bisectorB = (2/(sideA + sideC)) * Math.sqrt(sideA * sideC * semiPer * (semiPer-sideB));
		bisectorC = (2/(sideB + sideA)) * Math.sqrt(sideB * sideA * semiPer * (semiPer-sideC));

		semiPer = perimeter2/2
		bisectorA2 = (2/(sideB2 + sideC2)) * Math.sqrt(sideB2 * sideC2 * semiPer * (semiPer-sideA2));
		bisectorB2 = (2/(sideA2 + sideC2)) * Math.sqrt(sideA2 * sideC2 * semiPer * (semiPer-sideB2));
		bisectorC2 = (2/(sideB2 + sideA2)) * Math.sqrt(sideB2 * sideA2 * semiPer * (semiPer-sideC2));
	    if(twoSolutions){
	    	console.log("Side a: " + sideA + " OR " + sideA2);
	    	console.log("Side b: " + sideB + " OR " + sideB2);
	    	console.log("Side c: " + sideC + " OR " + sideC2);
	    	console.log("Angle A: " + angleA + " OR " + angleA2);
	    	console.log("Angle B: " + angleB + " OR " + angleB2);
	    	console.log("Angle C: " + angleC + " OR " + angleC2);
	    	console.log("Perimeter: " + perimeter + " OR " + perimeter2);
	    	console.log("Area: " + area + " OR " + area2);
	    	console.log("Median of a: " + medianA + " OR " + medianA2);
	    	console.log("Median of b: " + medianB + " OR " + medianB2);
	    	console.log("Median of c: " + medianC + " OR " + medianC2);
	    	console.log("Bisector of A: " + bisectorA + " OR " + bisectorA2);
	    	console.log("Bisector of B: " + bisectorB + " OR " + bisectorB2);
	    	console.log("Bisector of C: " + bisectorC + " OR " + bisectorC2);
	    }
	    else{
	    	console.log("Side a: " + sideA);
	    	console.log("Side b: " + sideB);
	    	console.log("Side c: " + sideC);
	    	console.log("Angle A: " + angleA);
	    	console.log("Angle B: " + angleB);
	    	console.log("Angle C: " + angleC);
	    	console.log("Perimeter: " + perimeter);
	    	console.log("Area: " + area);
	    	console.log("Median of a: " + medianA);
	    	console.log("Median of b: " + medianB);
	    	console.log("Median of c: " + medianC);
	    	console.log("Bisector of A: " + bisectorA);
	    	console.log("Bisector of B: " + bisectorB);
	    	console.log("Bisector of C: " + bisectorC);
	    }
	}
}
function clear(){
	document.getElementById('sideA').value = "";
	document.getElementById('sideB').value = "";
	document.getElementById('sideC').value = "";
	document.getElementById('angleA').value = "";
	document.getElementById('angleB').value = "";
	document.getElementById('angleC').value = "";
}