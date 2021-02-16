require('dotenv').config();

const { inputRead, inquirerMenu, pause } = require("./helpers/inquierer");
const Searches = require("./models/searches");

const main = async() => {
    const searches = new Searches();

    let option;
    
    do {

        option = await inquirerMenu();

        switch ( option ) {
            case 1:
                // Mostrar mensaje
                const place = await inputRead('Ciudad: ');
                const data = await searches.city( place );

                console.log(place);
                
                // Buscar los lugares
                // Seleccionar opcion

                // Clima objeto

                // Mostrar resultados
                console.log('\nInformacion del lugar\n'.green);
                console.log('Ciudad:');
                console.log('Lat:');
                console.log('Lng:');
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