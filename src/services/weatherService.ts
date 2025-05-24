import axios from 'axios';
import { WeatherData } from '@/types/forum';

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const API_URL = process.env.NEXT_PUBLIC_WEATHER_API_URL;

if (!API_KEY) {
  throw new Error('Weather API key is missing. Please set the NEXT_PUBLIC_WEATHER_API_KEY environment variable.');
}

if (!API_URL) {
  throw new Error('Weather API URL is missing. Please set the NEXT_PUBLIC_WEATHER_API_URL environment variable.');
}

export const weatherService = {
  async getCurrentWeather(location: string): Promise<WeatherData> {
    try {
      const response = await axios.get(`${API_URL}/forecast.json?key=${API_KEY}&q=${location}&days=7`);

      if (response.status !== 200) {
        throw new Error(`Failed to fetch weather data. Status code: ${response.status}`);
      }

      const data = response.data;

      if (!data) {
        throw new Error('No weather data received');
      }

      const forecastData = data.forecast.forecastday;

      if (!Array.isArray(forecastData)) {
        throw new Error('Invalid forecast data format');
      }

      // Calculate heat units and growing days with proper date arithmetic
      const heatUnits = forecastData.reduce((total: number, day: any) => {
        const maxTemp = day.day.maxtemp_c;
        const minTemp = day.day.mintemp_c;
        const avgTemp = (maxTemp + minTemp) / 2;
        return total + Math.max(0, avgTemp - 10); // Base temperature of 10°C
      }, 0);

      const growingDays = forecastData.filter((day: any) => {
        const maxTemp = day.day.maxtemp_c;
        const minTemp = day.day.mintemp_c;
        const avgTemp = (maxTemp + minTemp) / 2;
        return avgTemp > 5; // Growing threshold of 5°C
      }).length;

      return {
        location: data.location.name,
        current: {
          temp_c: data.current.temp_c,
          condition: {
            text: data.current.condition.text,
            icon: data.current.condition.icon,
          },
          wind_kph: data.current.wind_kph,
          humidity: data.current.humidity,
          precip_mm: data.current.precip_mm,
        },
        forecast: {
          forecastday: forecastData.map((day: any) => ({
            date: day.date,
            day: {
              maxtemp_c: day.day.maxtemp_c,
              mintemp_c: day.day.mintemp_c,
              condition: {
                text: day.day.condition.text,
                icon: day.day.condition.icon,
              },
              daily_chance_of_rain: day.day.daily_chance_of_rain,
            },
          })),
        },
        heatUnits: heatUnits,
        growingDays: growingDays,
      };
    } catch (error: any) {
      console.error('Weather service error:', error);
      throw new Error(error.response?.data?.error?.message || 'Failed to fetch weather data');
    }
  },

  async getForecast(location: string) {
    try {
      const response = await axios.get(`${API_URL}/forecast.json?key=${API_KEY}&q=${location}&days=7`);
      return response.data;
    } catch (error: any) {
      console.error('Error fetching forecast:', error);
      throw new Error(error.response?.data?.error?.message || 'Failed to fetch forecast data');
    }
  },
};
