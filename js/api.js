var countries_container = document.getElementById('container_items_contries');
console.log(countries_container)
function getCountries(){
    const res = fetch('https://restcountries.com/v3.1/all');
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
    return {name, lastname, edad, birthday}
}

juan = data_person('juan', 'Huaman Huaman', 27, new Date(Date.now()));
console.log(juan);


// dropdown button
button_dropdown_toggle = document.getElementById('button_dropdown_toggle');
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