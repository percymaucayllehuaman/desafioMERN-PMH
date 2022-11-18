import { print_a_title } from '../utils/printInterfaces.js';


const routerFunction = (location) =>{
    const [,method,countryName] = location.split("_");
    console.log("change hash to -> "+method);
    switch (method) {
        case "home":
            print_a_title(method);
        break;
        case "search":
            print_a_title(method);
        break;
        case "filter":
            print_a_title(method);
        break;
        case "details":
            if(countryName){
                console.log('Country Name -> '+countryName);
            }
            print_a_title(method);
            break;
        default:
            console.log('Your are in a 404 error');
            break;
    }
};

export { routerFunction };