import axios from "axios";

const API_KEY = "54669575-c2336e168543ddb8f43b85352";
const BASE_URL = "https://pixabay.com/api/";


export const getImagesByQuery = async (query, page, perPage) => {
   
    const response = await axios.get(BASE_URL, {
        params: {
            key: API_KEY,
            q: query,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            per_page: perPage,
            page: page
        }
    });
    console.log(response);
    return response.data;
    
};


