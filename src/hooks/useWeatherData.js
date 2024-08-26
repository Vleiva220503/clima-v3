// import { useState } from "react";
import { useQuery } from 'react-query';

const fetchWeather = async (loc) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?appid=248115fe010e3bc09c2f1d44241f16ca&lang=en&q=${loc}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Error fetching weather data');
  }
  return response.json();
};

const fetchForecast = async (loc) => {
  const url = `https://api.openweathermap.org/data/2.5/forecast?appid=248115fe010e3bc09c2f1d44241f16ca&lang=en&q=${loc}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Error fetching forecast data');
  }
  return response.json();
};

const useWeatherData = (defaultCity) => {
  const initialLocation = defaultCity || "Nicaragua"; 

  const { data: weather, isLoading: isLoadingWeather, isError: isErrorWeather } = useQuery(
    ["weather", initialLocation],
    () => fetchWeather(initialLocation),
    {
      enabled: !!initialLocation,
    }
  );

  const { data: forecast, isLoading: isLoadingForecast, isError: isErrorForecast } = useQuery(
    ["forecast", initialLocation],
    () => fetchForecast(initialLocation),
    {
      enabled: !!initialLocation,
    }
  );

  const hasData = !!weather && !!forecast;

  return {
    weather,
    forecast,
    isLoadingWeather,
    isLoadingForecast,
    isErrorWeather,
    isErrorForecast,
    hasData,
  };
};

export default useWeatherData;
