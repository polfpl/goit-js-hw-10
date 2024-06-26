import Notiflix from "notiflix";

const COUNTRIES_API_URL = "https://restcountries.com/v3.1/names";
const fetchCountreies = async name => {
    try {
        const response = await fetch(
            COUNTRIES_API_URL +
            name +
            '?fields=name,capital,population,flags,languages'
        );
        if (response.status == 200) {
            let json = await response.json();
            return json;
        }
    } catch (error) {
        throw new Error(response.status);
    }
};

export { fetchCountreies };