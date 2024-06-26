// import Notiflix from "notiflix";

const COUNTRIES_API_URL = "https://restcountries.com/v3.1/name/{name}";
const fetchCountreies = async name => {
    try {
        const response = await fetch(
            COUNTRIES_API_URL + name + '?fields=name,capital,population,flags,languages'
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