const fs = require('fs');

const axios = require('axios');

class Searches {

    history = [];
    reposityPath = './db/database.json';

    constructor(){
        this.loadFromRepository();
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

    get capitalizedHistory() {
    
        return this.history.map( (place) => {
            let places = place.split(' ');

            places = places.map( p => p[0].toUpperCase() + p.substring(1) );

            return places.join(' ');
        });
    };

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

    addHistory( place = '') {

        if (this.history.includes( place.toLocaleLowerCase() )){
            return;
        }

        this.history.unshift( place.toLocaleLowerCase() );

        // Grabar
        this.saveToRepository();
    };

    saveToRepository(){
        const payload = {
            history: this.history
        };

        fs.writeFileSync(this.reposityPath, JSON.stringify( payload ));
    }

    loadFromRepository(){
        if (!fs.existsSync( this.reposityPath )) return;

        const repositoryData = fs.readFileSync(this.reposityPath, {encoding: 'utf8'});

        const data = JSON.parse(repositoryData);

        this.history = data.history;

    }
}

module.exports = Searches;