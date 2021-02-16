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
                console.log('son iguales:', (citySelectedId === 'place.11654497431140100'));
                console.log(typeof(citySelectedId));
                
                // Clima objeto
                const citySelected = cities.find( city => city.id === citySelectedId );
                console.log(citySelected, 'ciudad seleccionada');

                // Mostrar resultados
                console.log('\nInformacion del lugar\n'.green);
                console.log('Ciudad:', citySelected.name);
                console.log('Lat:', citySelected.lat);
                console.log('Lng:', citySelected.lng);
                console.log('Temperatura:');
                console.log('Minima:');
                console.log('Maxima:');
                break;
        
            default:
                break;
        }
        
        if ( option !== 0) await pause();
        
    } while (option !== 0);


};

main();
