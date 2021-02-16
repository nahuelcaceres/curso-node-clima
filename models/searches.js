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

    async city( place = ''){

        try {
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ place }.json`,
                params: this.paramsMapbox,
            });
            
            const response = await instance.get();
            console.log(response.data);

            return [];
            
        } catch (err) {
            return [];    
        }
    }
}

module.exports = Searches;