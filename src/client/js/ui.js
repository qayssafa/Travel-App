export const updateUI = (weatherDataForDate, date, imageUrl) => {
    if (weatherDataForDate.datetime === date) {
        document.getElementById('weather').innerText = `Weather on ${date}: ${weatherDataForDate.weather.description}`;
    } else {
        document.getElementById('weather').innerText = `Weather on nearest date (${weatherDataForDate.datetime}): ${weatherDataForDate.weather.description}`;
    }

    let image = document.getElementById('image');
    image.style.display = 'block';
    image.src = imageUrl;
};
