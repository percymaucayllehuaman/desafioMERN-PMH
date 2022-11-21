

import { routerFunction } from './src/router/index.js';

import {fetchDataAll, printView, printDetails, fetchRegion, fetchByName, makeSearch, fetchDetails, makeDetails, makeSearchCountry, countriesCard} from './src/api/index.js';
import {url, countries_container, buttons_regions, button_search, details_container} from './src/api/index.js';


const onLoadApp = () => {
    // location.hash = '_home';
 }
//On load app function
window.addEventListener("load",() => onLoadApp());

//listener hash changer
window.addEventListener("hashchange", () => {
    // console.log(location.hash);
    routerFunction(location.hash);
});


window.addEventListener('load',function(){

    fetchDataAll(url);

    ///form submit
    var form = document.getElementById('form_filter');
    form.addEventListener('submit',(event)=>{
        event.preventDefault();
    });

    buttons_regions.forEach((element)=>{
        element.addEventListener("click",(event) => {
            makeSearch(event.target.textContent);
        });
    });
    button_search.addEventListener('click',(e) =>{
        const textSearch = document.querySelector('form .row_container_widgets .column_left #input_search');
        if(textSearch.value != ""){
            details_container.innerHTML = ' ';
            makeSearchCountry(textSearch.value);
            ///adding avent to card
        }else{
            alert('Enter Country');
        }
    });


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