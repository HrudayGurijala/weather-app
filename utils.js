const request = require("request");

const getWeather = (location,key, callback) => {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${key}`;

  request(url, (error, response) => {
    if (error) {
      return callback("Unable to connect to weather service", undefined);
    }
    if (response.statusCode === 400) {
      return callback("Location Not Found", undefined);
    }
    const responseObj = JSON.parse(response.body);
    const currentWeather = responseObj.days[0];
    const weatherResponse = {
      temperature: currentWeather.temp,
      humidity: currentWeather.humidity,
      description: currentWeather.description,
      address: responseObj.address,
    };
    callback(undefined, weatherResponse);
  });
};

module.exports = {
  getWeather,
};
