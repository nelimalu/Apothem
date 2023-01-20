function handleImage(evt) {
	let tgt = evt.target || window.event.srcElement
    let files = tgt.files;
    console.log(files[0]);
    console.log(files[0].name)
    sendToAPI(files[0]);
}


function sendToAPI(file) {
	const data = new FormData();
	data.append("locale", "en");
	data.append("image", file, file.name);

	const options = {
		method: 'POST',
		headers: {
			'X-RapidAPI-Key': 'aba9aee096mshdcd25c721744154p14d9c3jsn8c2559ad5434',
			'X-RapidAPI-Host': 'photomath1.p.rapidapi.com'
		},
		body: data
	};

	fetch('https://photomath1.p.rapidapi.com/maths/solve-problem', options)
		.then(response => response.json())
		.then(response => console.log(response))
		.catch(err => console.error(err));
}