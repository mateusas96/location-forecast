/**
 * @param {Array} weatherData
 * @param {String} weatherDataId
 * @param {String} weatherDataTableId
 */
function DisplayWeatherData(weatherData, weatherDataId, weatherDataTableId) {
	this.data = weatherData;
	this.weatherElId = weatherDataId;
	this.tableId = weatherDataTableId;

	/**
	 * Creates table in which data is displayed
	 */
	this.displayData = async() => {
		const weatherBlock = document.getElementById(this.weatherElId);

		const data = await fetch('/components/weatherData.html');
		const html = await data.text();

		weatherBlock.innerHTML = '';
		weatherBlock.innerHTML = html;

		const table = document.getElementById(this.tableId);
		
		this.data.forEach(item => {
			const newRow = document.createElement('div');
			newRow.className = 'row row-cols-3 row-cols-sm-6 text-center';
			table.append(newRow);

			const newCol1 = document.createElement('div'); 
			const newCol2 = document.createElement('div'); 
			const newCol3 = document.createElement('div'); 
			const newCol4 = document.createElement('div'); 
			const newCol5 = document.createElement('div'); 
			const newCol6 = document.createElement('div');

			[newCol1, newCol2, newCol3, newCol4, newCol5, newCol6].forEach(col => {
				col.className = 'col border border-dark';
			});

			newCol1.innerHTML = item.time;
			newCol2.innerHTML = item.airTemperature;
			newCol3.innerHTML = item.relativeHumidity;
			newCol4.innerHTML = item.windSpeed;
			newCol5.innerHTML = item.windFromDirection;
			newCol6.innerHTML = item.precipitationAmount;

			newRow.append(newCol1, newCol2, newCol3, newCol4, newCol5, newCol6);
		});
	}
}