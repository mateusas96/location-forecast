function GetWeatherData(cityData) {
	this.cityName = cityData.name;
	this.buttonId = 'button';
	this.errorId = 'error';
	this.url = `https://api.met.no/weatherapi/locationforecast/2.0/complete?lat=${cityData.lat}&lon=${cityData.lon}`;
	this.weatherData = [];

	/**
	 * Shows loader while getting data
	 */
	this.displayLoader = () => {
		const button = document.getElementById(this.buttonId);
		button.innerHTML = '';
		button.setAttribute('disabled', 'disabled');

		const loader = document.createElement('span');
		loader.className = 'spinner-border spinner-border-sm';
		loader.role = 'status';

		button.append(loader);
		// Insert text after loader element
		loader.insertAdjacentText('afterend', ' Loading...');
	};

	/**
	 * Shows error message from request
	 */
	this.displayError = (message) => {
		const error = document.getElementById(this.errorId);

		const errorMsg = document.createElement('div');
		errorMsg.className = 'bg-danger rounded-3 text-break text-center';
		errorMsg.style.color = 'white';

		error.append(errorMsg);
		errorMsg.insertAdjacentText('afterbegin', message);
	}

	this.getData = async() => {
		this.displayLoader();

		try {
			const data = await fetch(this.url);
			const {properties} = await data.json();
			
			this.weatherData = properties.timeseries.map(el => {
				return {
					time: el.time,
					airTemperature: el.data.instant.details.air_temperature,
					windSpeed: el.data.instant.details.wind_speed,
					relativeHumidity: el.data.instant.details.relative_humidity,
					windFromDirection: el.data.instant.details.wind_from_direction,
					probabilityOfPrecipitation: el.data.next_1_hours?.details.probability_of_precipitation ?? '-',
				}
			});
		} catch (message) {
			this.displayError(message);
		}
	};
}