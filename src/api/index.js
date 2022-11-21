
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
    // var cards = document.querySelectorAll('.container_items_contries .item');
    // cards.forEach((item, index)=>{
    //     item.addEventListener('click',(event)=>{            
    //         // console.log(item.dataset.id);
    //         location.hash = `_details_${item.childNodes[3].textContent}`;
    //         makeDetails(item.childNodes[3].textContent);
    //     });
    // })
}


function printView(item){
    
    return `
            <a href="#_details_${item.cca2}" class="item" data-id="${item.cca2}">
                <img src="${item.flags.png}">
                <h2 class="name_country">${item.name.common}</h2> 
                <h3 class="region">${item.region}</h3>
            </a>
        `;              ////interpolando valor
}

function printDetails(country){
    return `
                <div class="container_gohome"><a href="#_home">Go Home</a></div>
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
    // var cards = document.querySelectorAll('.container_items_contries .item');
    // cards.forEach((item, index)=>{
    //     item.addEventListener('click',(event)=>{            
    //         // console.log(item.dataset.id);
    //         location.hash = `_details_${item.childNodes[3].textContent}`;
    //         makeDetails(item.childNodes[3].textContent);
    //     });
    // })
    
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

const fetchDetailsByCca2 = async (code) =>{
    const response = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
    const data = await response.json();
    return data;
}

const makeDetailsByCca2 = async (country_code) => {
    const data = await fetchDetailsByCca2(country_code);
    console.log(data);
    const template = data.map((element) => printDetails(element))
    countries_container.innerHTML= " ";
    details_container.innerHTML = template.join('');
}


const makeSearchCountry = async (country) => {
    const data = await fetchByName(country);
    if(data.status != 404){
        const template = data.map((element) => printView(element))
        countries_container.innerHTML=template.join('');
    }else{
        alert('No results for '+country);
    }
    
    // adding event to card
    // var cards = document.querySelectorAll('.container_items_contries .item');
    // cards.forEach((item, index)=>{
    //     item.addEventListener('click',(event)=>{            
    //         // console.log(item.dataset.id);
    //         location.hash = `_details_${item.childNodes[3].textContent}`;
    //         makeDetails(item.childNodes[3].textContent);
    //     });
    // })
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


export {fetchDetailsByCca2, makeDetailsByCca2, fetchDataAll, printView, printDetails, fetchRegion, fetchByName, makeSearch, fetchDetails, makeDetails, makeSearchCountry, countriesCard}
export {url, countries_container, buttons_regions, button_search, details_container}