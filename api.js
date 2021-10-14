const axios = require("axios");

module.exports.getNews = async () => {
    const today = new Date();
    const results = [];
    const newsURL = `https://gnews.io/api/v4/top-headlines?country=gb&from=${today.toISOString()}&token=${process.env.NEWSAPI}`;
    
    let result = await axios.get(newsURL);

    for (let article of result.data.articles) {
        results.push({
            title: article.title,
            description: article.description
        });
    }

    return results;
};

module.exports.getWeather = async (latlon) => {
    const latLon = {
        london: ['51.50853', '-0.12574'],
        belfast: ['54.583333', '-5.933333'],
        exeter: ['50.7236', '-3.52751'],
        birmingham: ['52.489471', '-1.898575'],
        blackpool: ['53.81667', '-3.05'],
        dumfries: ['55.072350', '-3.606790'],
        inverness: ['57.47908', '-4.22398']
    };
    const results = [];

    for (let location in latLon) {
        const weatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${latLon[location][0]}&lon=${latLon[location][1]}&units=metric&exclude=minutely,hourly,daily&appid=${process.env.WEATHERAPI}`;
        let result = await axios.get(weatherURL);

        results.push({
                city: location,
                temp: Math.round(result.data.current.temp),
                description: result.data.current.weather[0].description
            });
    }

    return results;
};
