const axios = require('axios');

class Searches {

    history = ['Buenos Aires', 'Barcelona', 'Rio de Janeiro'];

    constructor(){

    }

    get paramsMapbox() {

        return {
            'access_token': process.env.MAPBOX_API_KEY,
            'limit': 5,
            'language': 'es',
        };
    };

    get paramsOpenweather() {
        return {
                   appid: process.env.OPENWEATHER_API_KEY,
                   units: 'metric',
                   lang: 'es',
                };
    }

    async cities( place = ''){

        try {
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ place }.json`,
                params: this.paramsMapbox,
            });
            
            const response = await instance.get();
            
            return response.data.features.map( (place) => ({
                id: place.id,
                name: place.place_name,
                lng: place.center[0],
                lat: place.center[1],
            }));

            
        } catch (err) {
            return [];    
        }
    }

    async weather( lat, lng ) {
        try {
           const instance = axios.create({
               baseURL: 'https://api.openweathermap.org/data/2.5/weather',
               params: { ...this.paramsOpenweather, lat, lon: lng },
           }); 

           const response = await instance.get();
           const { weather, main } = response.data;

           return {
               desc: weather[0].description,
               min: main.temp_min,
               max: main.temp_max,
               temp: main.temp,
           };

        } catch (err) {
            console.log(err);
        }
    };
}

module.exports = Searches;