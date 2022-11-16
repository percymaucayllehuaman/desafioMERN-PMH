
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

const countries_container = document.getElementById('container_items_contries');
const buttons_regions = document.querySelectorAll('.ul_regions > li a');
const button_search = document.querySelector('form .column_left .line .button_search');


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
                <img src="${item.flags.png}">
                <h2 class="name_country">${item.name.common}</h2> 
                <h3 class="region">${item.continents}</h3>
            </div>
        `;              ////interpolando valor
}

///https://www.youtube.com/watch?v=FqcRTO3rYWw&t=737s  link del ayudnatia 09/11
const  fetchRegion = async (e) => {
    const response = await fetch(`https://restcountries.com/v3.1/region/${e}`);
    const data = await response.json();
    return data;
};

const fetchByName = async (e) => {
    const response = await fetch(`https://restcountries.com/v3.1/name/${e}`);
    const data = await response.json();
    return data;
}

const makeSearch = async (region) => {
    const data = await fetchRegion(region);
    const template = data.map((element) => printView(element))
    countries_container.innerHTML=template.join('');
}
const makeSearchCountry = async (country) => {
    const data = await fetchByName(country);
    const template = data.map((element) => printView(element))
    countries_container.innerHTML=template.join('');
}

buttons_regions.forEach((element)=>{
    element.addEventListener("click",(event) => makeSearch(event.target.textContent));
});


button_search.addEventListener('click',(e) =>{
    const textSearch = document.querySelector('form .row_container_widgets .column_left #input_search');
    if(textSearch.value != ""){
        makeSearchCountry(textSearch.value);
    }else{
        alert('Ingrese Country');
    }
});


window.addEventListener('load',function(){
    fetchData(url);
});


/** prototype eleminar espacio vacios al inicio y al final */

String.prototype.trimLeft = String.prototype.trimLeft || function () {
    return this.replace(/^\s+/, "");
};
 
String.prototype.trimRight = String.prototype.trimRight || function () {
    return this.replace(/\s+$/, "");
};


/**
 * dropdown regions button
 */

var button_dropdown_toggle = document.getElementById('button_dropdown_toggle');
button_dropdown_toggle.addEventListener('click',(element)=>{
    var regions = document.getElementById('ul_regions');
    var icon = document.getElementById('icon_filer_caret');
    if(regions.style.display == 'none' || regions.style.display == ''){
        regions.style.display = 'block';
        regions.style.transition = "transition: all 2s ease-in-out"
        icon.className = 'fas fa-caret-right';
    }else if(regions.style.display == 'block'){
        regions.style.display = 'none';
        icon.className = 'fas fa-caret-down';
    }
});