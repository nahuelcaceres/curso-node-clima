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
}

module.exports = Searches;