const geoNamesUrl = 'http://api.geonames.org/searchJSON?q=';
const geoNamesApiKey = 'qayssafa';

export const getCoordinates = async (location) => {
    const response = await fetch(`${geoNamesUrl}${location}&maxRows=1&username=${geoNamesApiKey}`);
    const data = await response.json();

    if (data.geonames.length > 0) {
        const { lat, lng } = data.geonames[0];
        return { lat, lng };
    } else {
        throw new Error('Location not found.');
    }
};
