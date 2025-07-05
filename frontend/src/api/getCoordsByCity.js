import axios from "axios";

export const getCoordsByCity = async (city, country) => {
  try {
    const response = await axios.get("https://nominatim.openstreetmap.org/search", {
      params: {
        q: `${city}, ${country}`,
        format: "json",
        limit: 1,
      },
    });

    if (response.data.length > 0) {
      const { lat, lon } = response.data[0];
      return { lat: parseFloat(lat), lon: parseFloat(lon) };
    } else {
      console.warn("Koordinate nisu pronađene za", city);
      return null;
    }
  } catch (error) {
    console.error("Greška pri geokodiranju:", error);
    return null;
  }
};
    