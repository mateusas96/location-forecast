const cities = {
	vilnius: {
		lat: 54.6872,
		lon: 25.2797,
	},
	warsaw: {
		lat: 52.2370,
		lon: 21.0175,
	},
	london: {
		lat: 51.5098,
		lon: -0.1180,
	},
	stockholm: {
		lat: 59.3293,
		lon: 18.0686,
	},
	helsinki: {
		lat: 60.1699,
		lon: 24.9384,
	},
	dublin: {
		lat: 53.3501,
		lon: -6.2661,
	},
	oslo: {
		lat: 59.9139,
		lon: 10.7522,
	},
};

const fetchCity = () => {
	const city = cities[document.getElementById('cities').value];
	if (!city) return;
	displayData(city);
};

const displayData = async(city) => {
	const weatherData = new GetWeatherData(city, 'button', 'error');
	const displayWeatherData = new DisplayWeatherData(await weatherData.getData(), 'weatherData', 'weatherDataTable');
	displayWeatherData.displayData();
	weatherData.removeLoader();
}