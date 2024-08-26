import { useState, useEffect } from 'react';

const useCard = (weather, forecast) => {
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:00`;
    };

    const [iconUrl, setIconUrl] = useState("");
    const [forecastItems, setForecastItems] = useState([]);

    useEffect(() => {
        if (weather) {
            const url = "http://openweathermap.org/img/w/";
            setIconUrl(url + weather.weather[0].icon + ".png");
        }
        if (forecast) {
            const url = "http://openweathermap.org/img/w/";
            const items = forecast.list.slice(1, 4).map((item) => ({
                iconUrl: url + item.weather[0].icon + ".png",
                description: item.weather[0].description,
                temp: (item.main.temp - 273.15).toFixed(1),
                date: formatDate(item.dt_txt),
            }));
            setForecastItems(items);
        }
    }, [weather, forecast]);

    return { formatDate, iconUrl, forecastItems };
};

export default useCard;
