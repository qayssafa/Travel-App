const weatherBitUrl = 'https://api.weatherbit.io/v2.0/forecast/daily';
const weatherBitApiKey = 'a68acd1d27b544048bb9619f57038eec';

export const getWeatherData = async (lat, lng, date) => {
    const response = await fetch(`${weatherBitUrl}?lat=${lat}&lon=${lng}&key=${weatherBitApiKey}`);
    const data = await response.json();

    let weatherDataForDate = data.data.find(entry => entry.datetime === date);

    if (!weatherDataForDate) {
        weatherDataForDate = data.data.reduce((prev, curr) => {
            return (Math.abs(new Date(curr.datetime) - new Date(date)) < Math.abs(new Date(prev.datetime) - new Date(date)) ? curr : prev);
        });
    }

    return weatherDataForDate;
};
