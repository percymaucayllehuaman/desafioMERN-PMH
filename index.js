
import { routerFunction } from './src/router/index.js';

const onLoadApp = () => {
    location.hash = '_home';
 }
//On load app function
window.addEventListener("load",() => onLoadApp());

//listener hash changer
window.addEventListener("hashchange", () => {
    // console.log(location.hash);
    routerFunction(location.hash);
});





/** API COUNTRIES */



const url = 'https://restcountries.com/v3.1/all';
var countries_container = document.getElementById('container_items_contries');

async function fetchData(url){
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    const viewItem = data.map((item) => printView(item));  ///return array de countries
    countries_container.innerHTML = viewItem.join('');   // los une sin espacio
}


function printView(item){
    
    return `
            <div class="item">
                <h1 class="name_country">${item.name.common}</h1>    
            </div>
        `;              ////interpolando valor
}


window.addEventListener('load',function(){
    fetchData(url);
});



/*

function getCountries(){
    const res = fetch(url);
    // regresa una promesa
    return res;
}



getCountries().then(item => item.json()).then(item_country => {
    item_country.map(post => {
        const i = document.createElement('a')
        // console.log(i);
        console.log(post.name.official);
        i.innerHTML = post.name.common+'<br>';
        countries_container.appendChild(i);
    })
});

function data_person(name, lastname, edad, birthday){
    return {name, lastname, edad, birthday};
}

var juan = data_person('juan', 'Huaman Huaman', 27, new Date(Date.now()));
console.log(juan);


// dropdown button
var button_dropdown_toggle = document.getElementById('button_dropdown_toggle');
button_dropdown_toggle.addEventListener('click',(element)=>{
    regions = document.getElementById('ul_regions');
    icon = document.getElementById('icon_filer_caret');
    if(regions.style.display == 'none' || regions.style.display == ''){
        regions.style.display = 'block';
        // regions.style.transition = 'height 2s';
        icon.className = 'fas fa-caret-right';
    }else if(regions.style.display == 'block'){
        regions.style.display = 'none';
        icon.className = 'fas fa-caret-down';
    }
});

*/