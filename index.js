
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
const details_container = document.getElementById('container_details');


async function fetchDataAll(url){
    const response = await fetch(url);
    const data = await response.json();
    const viewItem = data.map((item) => printView(item));  ///return array de countries
    countries_container.innerHTML = viewItem.join('');   // los une sin espacio

    /* agregando event to card*/ 
    var cards = document.querySelectorAll('.container_items_contries .item');
    cards.forEach((item, index)=>{
        item.addEventListener('click',(event)=>{            
            // console.log(item.dataset.id);
            location.hash = `_details_${item.childNodes[3].textContent}`;
            makeDetails(item.childNodes[3].textContent);
        });
    })
}


function printView(item){
    
    return `
            <div href="#_details_${item.cca2}" class="item" data-id="${item.cca2}">
                <img src="${item.flags.png}">
                <h2 class="name_country">${item.name.common}</h2> 
                <h3 class="region">${item.region}</h3>
            </div>
        `;              ////interpolando valor
}

function printDetails(country){
    return `
                <div class="container_gohome"><a href="#home">Go Home</a></div>
                <div class="item_detail one" data-id="${country.cca2}">
                    <img id="img_flag" src="${country.flags.png}">
                    <p class="name_country">Name: ${country.name.official}</p> 
                    <p class="name_country">Capital: ${country.capital}</p> 
                </div>
                <div class="item_detail two" data-id="${country.cca2}">
                    <img id="img_coat" src="${country.coatOfArms.png}">
                    <p class="language">Languages: ${Object.values(country.languages)}</p>
                    <p class="borders">Borders: ${country.borders}</p>
                </div>
                <div class="item_detail three" data-id="${country.cca2}">
                    <p class="language">Sub región ${country.subregion}</p>
                    <p class="language">Poputatión ${country.population}</p>
                    <p class="language">Time Zone ${country.timezones}</p>
                </div>
        `; 
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

    ///adding avent to card
    var cards = document.querySelectorAll('.container_items_contries .item');
    cards.forEach((item, index)=>{
        item.addEventListener('click',(event)=>{            
            // console.log(item.dataset.id);
            location.hash = `_details_${item.childNodes[3].textContent}`;
            makeDetails(item.childNodes[3].textContent);
        });
    })
    
}

const fetchDetails = async (country) =>{
    const response = await fetch(`https://restcountries.com/v3.1/name/${country}`);
    const data = await response.json();
    return data;
}

const makeDetails = async (country) => {
    const data = await fetchDetails(country);
    const template = data.map((element) => printDetails(element))
    countries_container.innerHTML= " ";
    details_container.innerHTML = template.join('');
}


const makeSearchCountry = async (country) => {
    const data = await fetchByName(country);
    const template = data.map((element) => printView(element))
    countries_container.innerHTML=template.join('');

    // adding event to card
    var cards = document.querySelectorAll('.container_items_contries .item');
    cards.forEach((item, index)=>{
        item.addEventListener('click',(event)=>{            
            // console.log(item.dataset.id);
            location.hash = `_details_${item.childNodes[3].textContent}`;
            makeDetails(item.childNodes[3].textContent);
        });
    })
}







var countriesCard = (countries) => {
    countries.forEach((item,index)=>{
        item.addEventListener('click',(event)=>{
            location.hash = "_details_"+item.childNodes.textContent;
            const details = fetchCountry(item.dataset.id);
            console.log(details.name.common);
        });
    });
};






window.addEventListener('load',function(){
    fetchDataAll(url);

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
            alert('Ingrese Country');
        }
    });



    // var cards = document.querySelectorAll('.container_items_contries .item');
    // console.log(cards[0]);
    // // cards.forEach((item, index)=>{
    // //     item.addEventListener('click',(event)=>{
    // //         console.log(item.childNodes[3].textContent);
    // //     });
    // // });
    // countriesCard(cards);
   

    // var cards = document.querySelectorAll('.container_items_contries .item');

    // const fetchCountry = async (code) => {
    //     const response = await fetch(`https://restcountries.com/v3.1/alpha/{$code}`);
    //     const data = await response.json();
    //     return data;
    // }
    // console.log(cards.length);
        // cards[0].addEventListener('click',(event)=>{
        //     console.log(cards[0].childNodes[3].textContent);
        // })
        // cards.forEach((item, index)=>{
        //     item.addEventListener('click',(event)=>{
        //         console.log(item.childNodes[3].textContent);
        //     });
        // });
        // countriesCard(cards);
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