/**
 * @param {Array} cityData
 * @param {String} fetchBtnId
 * @param {String} errorId
 */
function GetWeatherData(cityData, fetchBtnId, errorId) {
	this.buttonId = fetchBtnId;
	this.errorId = errorId;
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
	 * Remove loader after successful/unsuccessful fetch
	 */
	this.removeLoader = () => {
		const button = document.getElementById(this.buttonId);
		button.innerHTML = '';
		button.removeAttribute('disabled');
		button.insertAdjacentText('afterbegin', 'Fetch');
	}

	/**
	 * Remove error message to prevent from stacking up in HTML
	 */
	this.removeErrorMsg = () => {
		const error = document.getElementById(this.errorId);
		error.innerHTML = '';
	}

	/**
	 * Shows error message from request
	 * @param {String}
	 */
	this.displayError = (message) => {
		const error = document.getElementById(this.errorId);

		const errorMsg = document.createElement('div');
		errorMsg.className = 'bg-danger rounded-3 text-break text-center';
		errorMsg.style.color = 'white';

		error.append(errorMsg);
		errorMsg.insertAdjacentText('afterbegin', message);
	}

	/**
	 * Get weather data from endpoint
	 * Returns array on success
	 * Throws error on failure
	 * @return array
	 */
	this.getData = async() => {
		try {
			const data = await fetch(this.url);
			const {properties: {timeseries}} =  await data.json();
			
			this.weatherData = timeseries.map(el => {
				const date = new Date(el.time).toLocaleString();

				return {
					time: date,
					airTemperature: el.data.instant.details.air_temperature,
					windSpeed: el.data.instant.details.wind_speed,
					relativeHumidity: el.data.instant.details.relative_humidity,
					windFromDirection: el.data.instant.details.wind_from_direction,
					precipitationAmount: el.data.next_1_hours?.details.precipitation_amount ?? '-',
				}
			});

			return this.weatherData;
		} catch (message) {
			this.removeErrorMsg();
			this.displayError(message);
		}
	};
}