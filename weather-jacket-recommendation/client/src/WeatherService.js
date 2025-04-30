import axios from 'axios';

// Open-Meteo forecast endpoint is used even for current weather
const BASE_URL = 'https://api.open-meteo.com/v1/forecast';

const fetchWeatherData = async (lat, lon) => {
    try {
        // Construct the URL with Open-Meteo parameters
        // - latitude, longitude: required location
        // - current: specify the current weather variables you want
        //   - apparent_temperature: This is the "feels like" temperature
        //   - rain: Amount of rain in the current interval
        // - temperature_unit: set to celsius for metric
        // - precipitation_unit: set to mm for metric rain
        const params = {
            latitude: lat,
            longitude: lon,
            current: 'apparent_temperature,rain', // Request feels_like temp and rain
            temperature_unit: 'celsius',        // Ensure metric temperature
            precipitation_unit: 'mm'            // Ensure metric precipitation
            // You could add more parameters here if needed later, e.g., 'weather_code'
        };

        // Use axios.get with the params object - axios handles query string construction
        const response = await axios.get(BASE_URL, { params });

        console.log("Open-Meteo Raw Response:", response.data); // Good for debugging

        // Return the data - the structure will be different from OpenWeatherMap
        return response.data;

    } catch (error) {
        console.error("Error fetching weather data from Open-Meteo:", error);
        // Handle different types of Axios errors if needed
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error("Error Response Data:", error.response.data);
            console.error("Error Response Status:", error.response.status);
        } else if (error.request) {
            // The request was made but no response was received
            console.error("Error Request:", error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error Message:', error.message);
        }
        return null; // Return null on error, as before
    }
};

export { fetchWeatherData };