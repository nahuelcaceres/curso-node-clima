require('dotenv').config();

const { inputRead, inquirerMenu, pause, showCitiesResult } = require("./helpers/inquierer");
const Searches = require("./models/searches");

const main = async() => {
    const searches = new Searches();

    let option;

    do {

        option = await inquirerMenu();

        switch ( option ) {
            case 1:
                // Mostrar mensaje.....
                const place = await inputRead('Ciudad: ');
                
                // Buscar los lugares
                const cities = await searches.cities( place );
                // console.log(cities);
                
                // Seleccionar opcion
                const citySelectedId = await showCitiesResult( cities );
                const citySelected = cities.find( city => city.id === citySelectedId );
                
                // Clima objeto
                const weather = await searches.weather(citySelected.lat, citySelected.lng);
                
                // Mostrar resultados
                console.clear();
                console.log('\nInformacion del lugar\n'.green);
                console.log('Ciudad:', citySelected.name.green);
                console.log('Lat:', citySelected.lat);
                console.log('Lng:', citySelected.lng);
                console.log('Temperatura:', weather.temp);
                console.log('Minima:', weather.min);
                console.log('Maxima:', weather.max);
                console.log('Como esta el clima:', weather.desc.green);
                break;
        
            default:
                break;
        }
        
        if ( option !== 0) await pause();
        
    } while (option !== 0);


};

main();
