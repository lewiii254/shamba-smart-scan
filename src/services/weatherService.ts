
import { WeatherData } from '@/types/forum';

// Dummy data for Nairobi weather - completely static to avoid any runtime errors
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
        icon: "https://cdn.weatherapi.com/weather/64x64/day/116.png",
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
              icon: "https://cdn.weatherapi.com/weather/64x64/day/116.png",
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
              icon: "https://cdn.weatherapi.com/weather/64x64/day/113.png",
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
              icon: "https://cdn.weatherapi.com/weather/64x64/day/296.png",
            },
            daily_chance_of_rain: 70,
          },
        },
      ],
    },
  };
};

export const getUserLocation = async (): Promise<{ lat: number; lon: number }> => {
  try {
    return new Promise((resolve) => {
      // Always resolve with Nairobi coordinates to avoid geolocation issues
      resolve({
        lat: -1.286389,
        lon: 36.817223
      });
    });
  } catch (error) {
    console.warn('Location error, using Nairobi as fallback:', error);
    return {
      lat: -1.286389,
      lon: 36.817223
    };
  }
};

export const getWeatherData = async (lat: number, lon: number): Promise<WeatherData> => {
  try {
    console.log('Using dummy weather data for Nairobi');
    return getDummyNairobiWeather();
  } catch (error) {
    console.error('Weather service error:', error);
    return getDummyNairobiWeather();
  }
};

export const weatherService = {
  async getCurrentWeather(location: string): Promise<WeatherData> {
    try {
      console.log('Using dummy weather data for:', location);
      return getDummyNairobiWeather();
    } catch (error) {
      console.error('Weather service error:', error);
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
    } catch (error) {
      console.error('Error fetching forecast:', error);
      const dummyData = getDummyNairobiWeather();
      return {
        forecast: dummyData.forecast
      };
    }
  },
};
