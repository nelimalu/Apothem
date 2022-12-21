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
	var numOfSides = 0;
	var numOfAngles = 0;
	var boolSideA = false;
	var boolSideB = false;
	var boolSideC = false;
	var boolAngleA = false;
	var boolAngleB = false;
	var twoSolutions = false;

	var finalAngleC = 0;
	var finalSideA = 0;
	var finalSideB = 0;
	var finalSideC = 0;
	var finalAngleA = 0;
	var finalAngleB = 0;
	var finalAngleC = 0;

	if(sideA != null) {numOfSides++; boolSideA = true; finalSideA = sideA;}
	if(sideB != null) {numOfSides++; boolSideB = true; finalSideB = sideB;}
	if(sideC != null) {numOfSides++; boolSideC = true; finalSideC = sideC;}
	if(angleA != null) {numOfAngles++; boolAngleA = true; finalAngleA = angleA;}
	if(angleB != null) {numOfAngles++; boolAngleA = true; finalAngleB = angleB;}
	if(angleC != null) {numOfAngles++; boolAngleA = true; finalAngleC = angleC;}

	//Case where all three sides are unknown and all angles are known
	if(numOfSides == 0 || (numOfAngles<2 && numOfSides<2)) { //Triangle is impossible
    	alert("Infinite Possibilities. Not enough information is given.");
    }
    else{ //Triangle is possible
		if(numOfSides == 3){
            let temp = (Math.pow(sideB, 2) + Math.pow(sideC, 2) - Math.pow(sideA, 2)) / (2.0 * sideB * sideC);
            angleA = Math.round(Math.acos(temp) * 180.0/Math.PI * 100) / 100.0;
            temp = (Math.pow(sideA, 2) + Math.pow(sideC, 2) - Math.pow(sideB, 2)) / (2.0 * sideA * sideC);
            angleB = Math.round(Math.acos(temp) * 180.0/Math.PI * 100) / 100.0;
            temp = (Math.pow(sideB, 2) + Math.pow(sideA, 2) - Math.pow(sideC, 2)) / (2.0 * sideB * sideA);
            angleC = Math.round(Math.acos(temp) * 180.0/Math.PI * 100) / 100.0;
        }
        else if(numOfAngles == 1){ //Only 1 angle is given
        	if(boolAngleA){ //Angle A is the angle given
    			if(!boolSideA){ //Side A is missing
    				sideA = Math.sqrt(Math.pow(sideB,2) + Math.pow(sideC,2) - 2 * sideB * sideC * Math.cos(angleA*Math.PI/180.0) );
    				let temp = (Math.pow(sideA, 2) + Math.pow(sideC, 2) - Math.pow(sideB, 2)) / (2.0 * sideA * sideC);
		            angleB = Math.round(Math.acos(temp) * 180.0/Math.PI * 100) / 100.0;
		            temp = (Math.pow(sideB, 2) + Math.pow(sideA, 2) - Math.pow(sideC, 2)) / (2.0 * sideB * sideA);
		            angleC = Math.round(Math.acos(temp) * 180.0/Math.PI * 100) / 100.0;
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
						else{
							angleC = Math.asin((sideC*Math.sin(angleA * Math.PI / 180.0)) / sideA * 180.0 / Math.PI);
							angleB = 180 - angleA - angleC;
							sideB = sideA * Math.sin((angleB * Math.PI / 180.0) / Math.sin(angleA * Math.PI / 180.0));
						}
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
						else{
							angleB = Math.asin((sideC*Math.sin(angleA * Math.PI / 180.0)) / sideA * 180.0 / Math.PI);
							angleC = 180 - angleA - angleB;
							sideC = sideA * Math.sin((angleC * Math.PI / 180.0) / Math.sin(angleA * Math.PI / 180.0));
						}
					}
    			}
        	}
        	else if(boolAngleB){ //Angle B is the angle given
        		if(!boolSideB){ //Side B is missing (A and C are given)
    				sideB = Math.sqrt(Math.pow(sideA,2) + Math.pow(sideC,2) - 2 * sideA * sideC * Math.cos(angleB*Math.PI/180.0) );
    				let temp = (Math.pow(sideB, 2) + Math.pow(sideC, 2) - Math.pow(sideA, 2)) / (2.0 * sideB * sideC);
            		angleA = Math.round(Math.acos(temp) * 180.0/Math.PI * 100) / 100.0;
            		temp = (Math.pow(sideB, 2) + Math.pow(sideA, 2) - Math.pow(sideC, 2)) / (2.0 * sideB * sideA);
            		angleC = Math.round(Math.acos(temp) * 180.0/Math.PI * 100) / 100.0;
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
						else{
							angleC = Math.asin((sideC*Math.sin(angleB * Math.PI / 180.0)) / sideB * 180.0 / Math.PI);
							angleA = 180 - angleB - angleC;
							sideA = sideB * Math.sin((angleA * Math.PI / 180.0) / Math.sin(angleB * Math.PI / 180.0));
						}
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
						else{
							angleA = Math.asin((sideA*Math.sin(angleB * Math.PI / 180.0)) / sideB * 180.0 / Math.PI);
							angleC = 180 - angleB - angleA;
							sideC = sideB * Math.sin((angleC * Math.PI / 180.0) / Math.sin(angleB * Math.PI / 180.0));
						}
					}
    			}
        	}
        	else {
        		if(!boolSideC){ //Side C is missing (A and B are given)
    				sideC = Math.sqrt(Math.pow(sideB,2) + Math.pow(sideA,2) - 2 * sideB * sideA * Math.cos(angleC*Math.PI/180.0) );
    				let temp = (Math.pow(sideB, 2) + Math.pow(sideC, 2) - Math.pow(sideA, 2)) / (2.0 * sideB * sideC);
            		angleA = Math.round(Math.acos(temp) * 180.0/Math.PI * 100) / 100.0;
            		temp = (Math.pow(sideA, 2) + Math.pow(sideC, 2) - Math.pow(sideB, 2)) / (2.0 * sideA * sideC);
		            angleB = Math.round(Math.acos(temp) * 180.0/Math.PI * 100) / 100.0;
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
						else{
							angleC = Math.asin((sideC*Math.sin(angleB * Math.PI / 180.0)) / sideB * 180.0 / Math.PI);
							angleA = 180 - angleB - angleC;
							sideA = sideB * Math.sin((angleA * Math.PI / 180.0) / Math.sin(angleB * Math.PI / 180.0));
						}
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
						else{
							angleA = Math.asin((sideA*Math.sin(angleC * Math.PI / 180.0)) / sideC * 180.0 / Math.PI);
							angleB = 180 - angleA - angleC;
							sideB = sideC * Math.sin((angleB * Math.PI / 180.0) / Math.sin(angleC * Math.PI / 180.0));
						}
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
        /*else if(numOfAngles == 3) {

        }*/
    }
    sideA = parseFloat(sideA);
    sideB = parseFloat(sideB);
    sideC = parseFloat(sideC);
    angleA = parseFloat(angleA);
    angleB = parseFloat(angleB);
    angleC = parseFloat(angleC);
	if((sideA > (sideB+sideC)) || (sideB>(sideA+sideC)) || (sideC>(sideA+sideB))){
    	alert("Triangle is not possible. A triangle cannot be made with the given requirements.");
	}
}