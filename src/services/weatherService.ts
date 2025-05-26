
import axios from 'axios';
import { WeatherData } from '@/types/forum';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const API_URL = import.meta.env.VITE_WEATHER_API_URL;

// Dummy data for Nairobi weather
const getDummyNairobiWeather = (): WeatherData => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const dayAfter = new Date(today);
  dayAfter.setDate(today.getDate() + 2);

  return {
    location: "Nairobi",
    current: {
      temp_c: 24,
      condition: {
        text: "Partly cloudy",
        icon: "//cdn.weatherapi.com/weather/64x64/day/116.png",
      },
      wind_kph: 12,
      humidity: 65,
      precip_mm: 0,
    },
    forecast: {
      forecastday: [
        {
          date: today.toISOString().split('T')[0],
          day: {
            maxtemp_c: 26,
            mintemp_c: 18,
            condition: {
              text: "Partly cloudy",
              icon: "//cdn.weatherapi.com/weather/64x64/day/116.png",
            },
            daily_chance_of_rain: 20,
          },
        },
        {
          date: tomorrow.toISOString().split('T')[0],
          day: {
            maxtemp_c: 25,
            mintemp_c: 17,
            condition: {
              text: "Sunny",
              icon: "//cdn.weatherapi.com/weather/64x64/day/113.png",
            },
            daily_chance_of_rain: 10,
          },
        },
        {
          date: dayAfter.toISOString().split('T')[0],
          day: {
            maxtemp_c: 27,
            mintemp_c: 19,
            condition: {
              text: "Light rain",
              icon: "//cdn.weatherapi.com/weather/64x64/day/296.png",
            },
            daily_chance_of_rain: 70,
          },
        },
      ],
    },
  };
};

export const getUserLocation = async (): Promise<{ lat: number; lon: number }> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
      },
      (error) => {
        console.warn('Geolocation error:', error);
        // Fallback to Nairobi coordinates
        resolve({
          lat: -1.286389,
          lon: 36.817223
        });
      },
      {
        timeout: 10000,
        enableHighAccuracy: true
      }
    );
  });
};

export const getWeatherData = async (lat: number, lon: number): Promise<WeatherData> => {
  try {
    console.log('Using dummy weather data for Nairobi');
    // Return dummy data for now
    return getDummyNairobiWeather();
  } catch (error: any) {
    console.error('Weather service error:', error);
    // Return dummy data as fallback
    return getDummyNairobiWeather();
  }
};

export const weatherService = {
  async getCurrentWeather(location: string): Promise<WeatherData> {
    try {
      console.log('Using dummy weather data for:', location);
      // Return dummy data for now
      return getDummyNairobiWeather();
    } catch (error: any) {
      console.error('Weather service error:', error);
      // Return dummy data as fallback
      return getDummyNairobiWeather();
    }
  },

  async getForecast(location: string) {
    try {
      console.log('Using dummy forecast data for:', location);
      const dummyData = getDummyNairobiWeather();
      return {
        forecast: dummyData.forecast
      };
    } catch (error: any) {
      console.error('Error fetching forecast:', error);
      const dummyData = getDummyNairobiWeather();
      return {
        forecast: dummyData.forecast
      };
    }
  },
};
