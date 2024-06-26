import Notiflix from "notiflix";

const COUNTRIES_API_URL = "https://restcountries.com/v3.1/all?fields=name,flags`";
const fetchCountreies = async name => {
    try {
        const response = await fetch(
            COUNTRIES_API_URL +
            name +
            '?fields=name.official,capital,population,flags.svg,languages'
        );
        if (response.status == 200) {
            let object = await response.json();
            return object;
        }
    } catch (error) {
        throw new Error(response.status);
    }
};

export { fetchCountreies };