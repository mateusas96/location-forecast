const testsTable = document.getElementById('testsTableBody');
const testingData = {
	cityName: 'Las Vegas',
	lat: 36.1146,
	lon: -115.1728,
}

/**
 * Check if data fetching from API works correclty
 */
check_api_fetch = async() => {
	let success;

	try {
		const weatherData = new GetWeatherData(testingData, 'button', 'error');
		await weatherData.getData();
		success = true;
	} catch (error) {
		success = false;
	}

	const testResults = {
		name: 'API Fetch Check',
		input: '-',
		testResult: success,
		expectedResult: true,
	};

	addRowToTestTable(testResults);
}

check_if_probability_of_rain_is_number = async() => {
	const weatherData = new GetWeatherData(testingData, 'button', 'error');
	const data = await weatherData.getData();

	data.forEach(el => {
		addRowToTestTable({
			name: `Check If Probability Of Rain Is Number`,
			input: el.precipitationAmount,
			testResult: typeof el.precipitationAmount,
			expectedResult: 'number',
		});
	});
}

/**
 * Adds row to test table
 * @param {object} testData
 * @param {HTMLTableElement} testTable
 */
addRowToTestTable = (testData) => {
	const row = testsTable.insertRow();
	row.className = testData.testResult === testData.expectedResult ? 'bg-success' : 'bg-danger';

	row.insertCell().innerHTML = testData.name;
	row.insertCell().innerHTML = testData.input;
	row.insertCell().innerHTML = testData.testResult;
	row.insertCell().innerHTML = testData.expectedResult;
	row.insertCell().innerHTML = testData.testResult === testData.expectedResult ? 'True' : 'False';
}

check_api_fetch();
check_if_probability_of_rain_is_number();