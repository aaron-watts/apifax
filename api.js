if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const axios = require("axios");

module.exports.getNews = async () => {
    const today = new Date();
    const newsURL = `https://gnews.io/api/v4/top-headlines?country=gb&from=${today.toISOString()}&token=${process.env.NEWSAPI}`;
    
    let result = await axios.get(newsURL);
    return result.data.articles;
}

module.exports.getWeather = async (latlon) => {
    const latLon = {
        london: ['51.50853', '-0.12574'],
        belfast: ['54.583333', '-5.933333'],
        exeter: ['50.7236', '-3.52751'],
        birmingham: ['52.489471', '-1.898575'],
        blackpool: ['53.81667', '-3.05'],
        dumfries: ['-3.606790', '55.072350'],
        inverness: ['57.47908', '-4.22398']
    };
    const results = {};

    for (let location in latLon) {
        const weatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${latLon[location][0]}&lon=${latLon[location][1]}&exclude=minutely,hourly,daily&appid=${process.env.WEATHERAPI}`;
        let result = await axios.get(weatherURL);
        results[location] = result.data;
    }

    return results;
}

// const myFunc = () => {
//     const r = getWeather().then(i=>{console.log(i)})
// }

// myFunc();
