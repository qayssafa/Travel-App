const pixabayUrl = 'https://pixabay.com/api/';
const pixabayApiKey = '45443724-213a2bcc866fe224962860f0a';

export const getImage = async (location) => {
    const response = await fetch(`${pixabayUrl}?key=${pixabayApiKey}&q=${location}&image_type=photo`);
    const data = await response.json();

    if (data.hits.length > 0) {
        return data.hits[0].webformatURL;
    } else {
        throw new Error('No image found for this location.');
    }
};
