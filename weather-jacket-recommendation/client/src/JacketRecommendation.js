import React, { useState, useEffect } from 'react';
import { fetchWeatherData } from './WeatherService';

const JacketRecommendation = () => {
    const [recommendation, setRecommendation] = useState('');
    const [needJacket, setNeedJacket] = useState('Loading...');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const startTime = Date.now();
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            try {
                const weatherData = await fetchWeatherData(latitude, longitude);
                const feelsLike = weatherData?.main?.feels_like;
                const hasRain = weatherData?.rain != null;

                let jacketRecommendation = ""; // Default
                let needJacketResponse = "YES";

                if (hasRain && feelsLike <= 8) {
                    jacketRecommendation = "wear a waterproof winter jacket";
                } else if (hasRain) {
                    jacketRecommendation = "rain jacket";
                } else if (feelsLike > 20) {
                    jacketRecommendation = "no jacket";
                    needJacketResponse = "NO";
                } else if (feelsLike <= 20 && feelsLike > 15) {
                    jacketRecommendation = "long sleeve shirt or sweatshirt";
                } else if (feelsLike <= 15 && feelsLike > 10) {
                    jacketRecommendation = "light jacket or sweatshirt";
                } else if (feelsLike <= 10 && feelsLike > 0) {
                    jacketRecommendation = "medium jacket";
                } else if (feelsLike <= 0) {
                    jacketRecommendation = "winter jacket";
                }

                setRecommendation(jacketRecommendation);
                setNeedJacket(needJacketResponse);
                setIsLoading(false); // Update loading status

                // Record the end time and calculate latency
                const endTime = Date.now();
                const latency = endTime - startTime;

                // Log the latency event to Google Analytics
                if (window.gtag) {
                    window.gtag('event', 'recommendation_loaded', {
                        event_category: 'Recommendation',
                        event_label: 'Jacket Recommendation Latency',
                        value: latency,
                        recommendation_load_time_ms: latency,
                    });
                }
            } catch (error) {
                console.error("Weather data fetch error:", error);
                setRecommendation("Failed to retrieve weather data.");
                setNeedJacket("ERROR");
                setIsLoading(false); // Update loading status

                // Record the end time and calculate latency
                const endTime = Date.now();
                const latency = endTime - startTime;

                // Send the error event to Google Analytics
                if (window.gtag) {
                    window.gtag('event', 'recommendation_error', {
                        event_category: 'Recommendation',
                        event_label: 'Weather Data Fetch Error',
                        value: latency,
                    });
                }
            }
        }, (error) => {
            console.error("Geolocation error:", error);
            setRecommendation("Geolocation error. Unable to retrieve location.");
            setNeedJacket("ERROR");
            setIsLoading(false); // Update loading status

            // Record the end time and calculate latency
            const endTime = Date.now();
            const latency = endTime - startTime;

            // Send the error event to Google Analytics
            if (window.gtag) {
                window.gtag('event', 'recommendation_error', {
                    event_category: 'Recommendation',
                    event_label: 'Geolocation Error',
                    value: latency,
                });
            }
        });
    }, []);

    return (
        <div>
            {/* Title container to keep the title fixed in position */
                <div style={{ minHeight: '64px' }}>
                    <h2>Do I need a jacket?</h2>
                </div>}
            {/* Content container with conditional rendering for loading/error/jacket recommendation */}
            <div style={{ minHeight: '250px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <p style={{ fontSize: isLoading ? '24px' : '96px', margin: '20px 0', fontWeight: 'bold' }}>{needJacket}</p>
                {!isLoading && needJacket === "YES" && (
                    <p style={{ fontSize: '24px' }}>You should wear a {recommendation}.</p>
                )}
                {!isLoading && needJacket === "ERROR" && (
                    <p style={{ fontSize: '24px', color: 'red' }}>{recommendation}</p>
                )}
            </div>
        </div>
    );
};

export default JacketRecommendation;