import { handleSubmit } from './app';

jest.mock('./geoNames', () => ({
    getCoordinates: jest.fn(),
}));
jest.mock('./weatherBit', () => ({
    getWeatherData: jest.fn(),
}));
jest.mock('./pixabay', () => ({
    getImage: jest.fn(),
}));
jest.mock('./ui', () => ({
    updateUI: jest.fn(),
}));

describe('handleSubmit', () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <form id="travel-form">
                <select id="location" name="location" required>
                    <option value="" disabled selected>Select a location</option>
                    <option value="New York">New York</option>
                </select>
                <span id="location-error" class="error-message"></span>

                <input type="date" id="date" name="date">
                <span id="date-error" class="error-message"></span>

                <button type="submit" id="generate">Get Info</button>
            </form>
        `;
    });

    afterEach(() => {
        jest.clearAllMocks(); 
    });

    it('displays error messages if location or date is missing', async () => {
        const event = { preventDefault: jest.fn() };

        await handleSubmit(event);

        expect(document.getElementById('location-error').innerText).toBe('Please enter a location.');
        expect(document.getElementById('location-error').style.display).toBe('block');
        expect(document.getElementById('date-error').innerText).toBe('Please enter a departure date.');
        expect(document.getElementById('date-error').style.display).toBe('block');
    });

    it('calls APIs and updates UI when location and date are provided', async () => {
        const event = { preventDefault: jest.fn() };

        document.getElementById('location').value = 'New York';
        document.getElementById('date').value = '2024-08-15';

        const mockCoordinates = { lat: 40.7128, lng: -74.0060 };
        const mockWeatherData = { description: 'Clear skies' };
        const mockImageUrl = 'http://example.com/image.jpg';

        require('./geoNames').getCoordinates.mockResolvedValue(mockCoordinates);
        require('./weatherBit').getWeatherData.mockResolvedValue(mockWeatherData);
        require('./pixabay').getImage.mockResolvedValue(mockImageUrl);

        await handleSubmit(event);

        expect(require('./geoNames').getCoordinates).toHaveBeenCalledWith('New York');
        expect(require('./weatherBit').getWeatherData).toHaveBeenCalledWith(40.7128, -74.0060, '2024-08-15');
        expect(require('./pixabay').getImage).toHaveBeenCalledWith('New York');
        expect(require('./ui').updateUI).toHaveBeenCalledWith(mockWeatherData, '2024-08-15', mockImageUrl);
    });

    it('handles errors gracefully', async () => {
        const event = { preventDefault: jest.fn() };

        document.getElementById('location').value = 'New York';
        document.getElementById('date').value = '2024-08-15';

        require('./geoNames').getCoordinates.mockRejectedValue(new Error('API error'));

        global.alert = jest.fn(); 

        await handleSubmit(event);

        expect(global.alert).toHaveBeenCalledWith('There was an error fetching the data. Please try again later.');
    });
});
