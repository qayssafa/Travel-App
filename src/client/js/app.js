import { getCoordinates } from './geoNames';
import { getWeatherData } from './weatherBit';
import { getImage } from './pixabay';
import { updateUI } from './ui';

export const handleSubmit = async (event) => {
    event.preventDefault();

    const location = document.getElementById('location').value;
    const date = document.getElementById('date').value;

    const locationError = document.getElementById('location-error');
    const dateError = document.getElementById('date-error');

    locationError.innerText = '';
    dateError.innerText = '';
    locationError.style.display = 'none';
    dateError.style.display = 'none';

    let hasError = false;

    if (!location) {
        locationError.innerText = 'Please enter a location.';
        locationError.style.display = 'block';
        hasError = true;
    }

    if (!date) {
        dateError.innerText = 'Please enter a departure date.';
        dateError.style.display = 'block';
        hasError = true;
    }

    if (hasError) {
        return;
    }

    try {
        const { lat, lng } = await getCoordinates(location);
        const weatherDataForDate = await getWeatherData(lat, lng, date);
        const imageUrl = await getImage(location);

        updateUI(weatherDataForDate, date, imageUrl);
    } catch (error) {
        console.error('Error fetching data:', error);
        alert('There was an error fetching the data. Please try again later.');
    }
};
