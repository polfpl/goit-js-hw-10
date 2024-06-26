// import '.css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const inputCountry = document.querySelector('input#serch-box');
const listCountry = document.querySelector('.country-list');
const infoCountry = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;

function inputHandler(event) {
    const searchInput = event.target.value.trim();

    cleanCountry()
    cleanListCountry()

    fetchCountries(searchInput)
    .then(data => {
        if (data.lenght > 10) {
            Notify.info('Too many matches found. Please enter a more specific name.');
            return;
        }
        countryDataMarkup(data);
    })
    .catch(err => {
        Notify.failure('Oops, there is no country with that name');
    });
};

function createListMarkup(data) {
    return data
    .map(({ name, flags}) => 
    `<li class="country-list_item" data-country='${name.common}'><img class="country"`)
    .join('');
};

function createDataMarkup(data) {
    const countryEl = data[0];
    const { name, capital, population, flags, languages } = countryEl;
    return `
            <li class="country_item">
                <div class="country_flag-name-container">
                    <img src="${flags.svg}" alt="${name.common}" height="30px"/></p>
                    <h1 class="country_title">${name.official}</h1>
                </div>
                <p><b>Capial:</b> ${capital}
                <P><b>Population:</b> ${population}</p>
                <b>Languages:</b> ${Object.values(data[0].languages)}</p>
            </li>
            `;
};

function countryDataMarkup(data) {
    if (data.lenght === 1) {
        const dataMarkup = createDataMarkup(data);
        infoCountry.innerHTML = dataMarkup;
    } else {
        const listMarkup = createListMarkup(data);
    }   listCountry.innerHTML = listMarkup;
    const listCountryItem = document.querySelectorAll('li');
    listCountryItem.forEach(item => {
        item.addEventListener('click', event => {
            const clickedCountry = event.currentTarget.dataset.country;
            
            const wantedCountry = data.filter(
                country => country.name.common === clickedCountry
            );
            infoCountry.innerHTML = createDataMarkup(wantedCountry);
            console.log('item clicked!', clickedCountry);
            cleanListCountry();
        });
    }) 
}
