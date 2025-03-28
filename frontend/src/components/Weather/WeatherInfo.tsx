import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchCapitalCityWeather } from "../../store/slices/weatherSlice";
import { useEffect } from "react";
import { RootState } from "../../store/store";
import { Alert, Box, CircularProgress, Typography } from "@mui/material";
import { Air, Speed, Thermostat, WaterDrop, WbSunny } from "@mui/icons-material";

interface WeatherInfoProps {
  capitalCity: string;
}

export const WeatherInfo = ({ capitalCity }: WeatherInfoProps) => {
  const dispatch = useAppDispatch();
  const weather = useAppSelector((state: RootState) => state.weather.weather);
  const loading = useAppSelector((state: RootState) => state.weather.loading);
  const error = useAppSelector((state: RootState) => state.weather.error);

  useEffect(() => {
    if (capitalCity) {
      dispatch(fetchCapitalCityWeather(capitalCity));
    }
  }, [capitalCity, dispatch]);

  if (loading) return <CircularProgress />;

  if (error) {
    return (
      <Alert severity="error">
        <strong>Error fetching weather for "{capitalCity}".</strong>
        <br />
        This location may not be recognized by the weather provider (OpenWeather).
      </Alert>
    );
  }

  if (!weather) {
    return (
      <Alert severity="info">
        Weather data not available.
      </Alert>
    );
  }

  return (
    <Box>
      <Typography variant="body2" sx={{ display: "flex", alignItems: "center" }}>
        <Thermostat sx={{ mr: 0.5 }} /> Feels Like: {weather.feels_like}°C
      </Typography>
      <Typography variant="body2" sx={{ display: "flex", alignItems: "center" }}>
        <WaterDrop sx={{ mr: 0.5 }} /> Humidity: {weather.humidity}%
      </Typography>
      <Typography variant="body2" sx={{ display: "flex", alignItems: "center" }}>
        <WbSunny sx={{ mr: 0.5 }} /> Temperature: {weather.temperature}°C
      </Typography>
      <Typography variant="body2" sx={{ display: "flex", alignItems: "center" }}>
        <Speed sx={{ mr: 0.5 }} /> Wind Speed: {weather.wind_speed} m/s
      </Typography>
      <Typography variant="body2" sx={{ display: "flex", alignItems: "center" }}>
        <Air sx={{ mr: 0.5 }} /> {weather.condition}
      </Typography>
    </Box>
  );
};
