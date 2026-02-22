import { getImagesByQuery } from './js/pixabay-api.js'; 
import { createGallery, clearGallery, toggleLoader, updateLoadMoreButton} from './js/render-functions.js'; 

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const input = document.getElementById('datetime-picker');
const form = document.querySelector('.form'); 
const galleryContainer = document.querySelector(".gallery");
const loaderElement = document.querySelector('.loader'); 
const loadMore = document.querySelector('.load-more');

let page = 1;
const perPage = 15;
let currentQuery = ""

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    currentQuery = input.value.trim();

    if (!currentQuery) {
        iziToast.warning({ message: 'Введіть запит!', position: 'topRight' });
        return;
    }

    page = 1;
    clearGallery(galleryContainer);
    updateLoadMoreButton(loadMore, { isVisible: false }); // Ховаємо через функцію
    toggleLoader(loaderElement, true); // Показуємо лоадер через функцію

    try {
        const data = await getImagesByQuery(currentQuery, page);
            const images = data.hits;
            const totalHits = data.totalHits;
        
        if (images.length === 0) {
            iziToast.error({
                message: 'На жаль, за вашим запитом нічого не знайдено.',
                position: 'topRight'
            });
            return;
        }

        createGallery(images, galleryContainer);
        input.value = ''; 
        
        if (totalHits > perPage) {
            updateLoadMoreButton(loadMore, { isVisible: true, isLoading: false });
            // loadMore.textContent = "Load more";
        } else {
            iziToast.info({ message: "We're sorry, but you've reached the end of search results." });
        }
       
        
    } catch (error) {
        iziToast.error({ message: 'Помилка сервера!', position: 'topRight' });
        console.error(error);
    }
    finally {
        toggleLoader(loaderElement, false);
    }
});

loadMore.addEventListener("click", async () => {
    page += 1;
    toggleLoader(loaderElement, true);
    updateLoadMoreButton(loadMore, { isLoading: true }); // Інкапсульований стан завантаження

  try {
    const data = await getImagesByQuery(currentQuery, page);
    const images = data.hits;
    const totalHits = data.totalHits;
      
      createGallery(images, galleryContainer);
       
       const galleryItem = document.querySelector(".gallery-item");
        if (galleryItem) {
            const { height } = galleryItem.getBoundingClientRect();
            window.scrollBy({
                top: height * 2,
                behavior: "smooth",
            });
        }
      
     const isEnd = page * perPage >= data.totalHits;
      if (isEnd) {
            updateLoadMoreButton(loadMore, { isEnd: true });
            iziToast.info({ message: "We're sorry, but you've reached the end of search results." });
        } else {
            updateLoadMoreButton(loadMore, { isLoading: false });
        }
    } catch (error) {
        iziToast.error({ message: 'Помилка завантаження!' });
        updateLoadMoreButton(loadMore, { isLoading: false });
    } finally {
        toggleLoader(loaderElement, false);
    }
});

