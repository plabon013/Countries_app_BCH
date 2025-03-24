export const weatherApi = {
    getWeatherByCity: async (city: string) => {
      const API_KEY = "1d7db278dfb7242c3080e5d39e178f40"; // Your OpenWeather API key
  
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  
      try {
        const response = await fetch(url);
  
        if (!response.ok) {
          throw new Error(`Error fetching weather for ${city}`);
        }
  
        const data = await response.json();
  
        return {
          temperature: data.main.temp,
          feels_like: data.main.feels_like,
          humidity: data.main.humidity,
          wind_speed: data.wind.speed,
          condition: data.weather[0].description,
          icon: data.weather[0].icon
        };
      } catch (error) {
        console.error("Weather API error:", error);
        throw error;
      }
    },
  };
  