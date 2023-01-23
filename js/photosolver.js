function handleImage(event, file) {
	if (file.type != "image/jpeg")  // make sure image is jpg
		return;
	let img = document.getElementById("problem-image");
	let reader = new FileReader();

	reader.onload = event => {
		img.src = reader.result;
	}
	reader.readAsDataURL(file);  // convert image to html element

    
    sendToAPI(file);  // send image to the api
}


function readChildren(solution) {
	// reading api response

	let out = ""
	if (solution.hasOwnProperty("children")) {
		for (let child of solution.children) {
			if (child.type == 'var')
				out += child.value + " = ";
			else if (child.type == 'negative') {
				for (let child2 of child.children) {
					out += "-" + child2.value
				}
			} else if (child.type == 'const')
				out += child.value
		}
	}
	else {
		out += solution.value;
	}
	return out;	
}


function sendToAPI(file) {
	const data = new FormData();
	data.append("locale", "en");
	data.append("image", file, file.name);  // append image to a POST form

	const options = {
		method: 'POST',  // set type to POST
		headers: {  // API key
			'X-RapidAPI-Key': 'aba9aee096mshdcd25c721744154p14d9c3jsn8c2559ad5434',
			'X-RapidAPI-Host': 'photomath1.p.rapidapi.com'
		},
		body: data
	};

	// update messate to say calculating
	document.getElementById("solution").innerHTML = "Solution: <br><strong>Calculating...</strong>"


	// send image to api
	fetch('https://photomath1.p.rapidapi.com/maths/solve-problem', options)
		.then(response => {console.log(response); return response.json()})
		.then(response => {  // for reading promise
			console.log(response)
			let groups = response.result.groups;
			// parse response
			for (let group of groups) {
				if (group.type == 'vertical') {
					let solution = group.entries[0].preview.content.solution;
					equation = readChildren(solution);  // find solution
					break;
				}
			}
			console.log(equation);
			// update solution
			document.getElementById("solution").innerHTML = "Solution: <br><strong>" + equation + "</strong>";
		})
		.catch(err => console.error(err));
		
}