
import { print_a_title } from '../utils/printInterfaces.js';


import {fetchDetailsByCca2, makeDetailsByCca2, fetchDataAll, printView, printDetails, fetchRegion, fetchByName, makeSearch, fetchDetails, makeDetails, makeSearchCountry, countriesCard} from '../api/index.js';
import {url, countries_container, buttons_regions, button_search, details_container} from '../api/index.js';

const routerFunction = (location) =>{
    const [,method,code] = location.split("_");
    console.log("change hash to -> "+method);
    switch (method) {
        case "":
            break;
        case "home":
            details_container.innerHTML = ' ';
            fetchDataAll(url);
            // print_a_title(method);
        break;
        case "search":
            // print_a_title(method);
        break;
        case "filter":
            // print_a_title(method);
        break;
        case "details":
            if(code){
                makeDetailsByCca2(code);
                console.log('Country Name -> '+code);
            }
            // print_a_title(method);
            break;
        default:
            console.log('Your are in a 404 error');
            break;
    }
};

export { routerFunction };
///fetchDetailsByCca2, makeDetailsByCca2,
export { fetchDataAll, printView, printDetails, fetchRegion, fetchByName, makeSearch, fetchDetails, makeDetails, makeSearchCountry, countriesCard};
export {url, countries_container, buttons_regions, button_search, details_container};