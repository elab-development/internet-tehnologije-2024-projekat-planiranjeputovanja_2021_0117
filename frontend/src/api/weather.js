import axios from "axios";

export const getWeatherByCoords = async (lat, lon) => {
  try {
    const response = await axios.get("https://api.open-meteo.com/v1/forecast", {
      params: {
        latitude: lat,
        longitude: lon,
        current_weather: true,
      },
    });

    return response.data.current_weather;
  } catch (error) {
    console.error("Greška pri dohvatanju vremena:", error);
    return null;
  }
};
