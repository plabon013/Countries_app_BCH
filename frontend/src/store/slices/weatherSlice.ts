import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { weatherApi } from "../../api/services/weather";


interface WeatherState {
  weather: {
    temperature: number;
    feels_like: number;
    humidity: number;
    wind_speed: number;
    condition: string;
    icon: string;
  } | null;
  loading: boolean;
  error: string | null;
}

const initialState: WeatherState = {
  weather: null,
  loading: false,
  error: null,
};

// Async thunk to fetch weather
export const fetchCapitalCityWeather = createAsyncThunk(
  "weather/fetchCapitalCityWeather",
  async (city: string, thunkAPI) => {
    try {
      const data = await weatherApi.getWeatherByCity(city);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || "Failed to fetch weather");
    }
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCapitalCityWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCapitalCityWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.weather = action.payload;
      })
      .addCase(fetchCapitalCityWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default weatherSlice.reducer;
