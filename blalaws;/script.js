const url = 'https://imdb8.p.rapidapi.com/auto-complete?q=game%20';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '9a5fa6ca8bmsh12749b139003d67p1ac138jsn4d11a6d386b6',
		'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}