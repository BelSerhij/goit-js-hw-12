import { getImagesByQuery } from './js/pixabay-api.js'; 
import { createGallery, clearGallery, showLoader, hideLoader, showLoadMoreButton, hideLoadMoreButton } from './js/render-functions.js'; 

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const input = document.getElementById('datetime-picker');
const form = document.querySelector('.form'); 
const galleryContainer = document.querySelector(".gallery");
const loaderElement = document.querySelector('.loader'); 
const loadMore = document.querySelector('.load-more');

let page = 1;
let perPage = 6;
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
    hideLoadMoreButton(loadMore);
    showLoader(loaderElement);

    try {
        const data = await getImagesByQuery(currentQuery, page, perPage);
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
            showLoadMoreButton(loadMore);
            loadMore.textContent = "Load more";
        } else if (totalHits > 0) {
            iziToast.info({ message: "We're sorry, but you've reached the end of search results." });
        }
       
        
    } catch (error) {
        iziToast.error({ message: 'Помилка сервера!', position: 'topRight' });
        console.error(error);
    }
    finally {
        hideLoader(loaderElement);
    }
});

loadMore.addEventListener("click", async () => {
    page += 1;
    showLoader(loaderElement);
    loadMore.disabled = true;

  try {
    const data = await getImagesByQuery(currentQuery, page, perPage);
    const images = data.hits;
    const totalHits = data.totalHits;
      
    createGallery(images, galleryContainer);
      
      window.scrollBy({
           top: 500,
           behavior: "smooth",
      }); 
      
    if (page > 1) {
        loadMore.textContent = "Fetch more posts";
    }
      
    const totalLoadedImages = page * perPage;
        if (totalLoadedImages >= totalHits) {
            hideLoadMoreButton(loadMore);
            iziToast.info({
                message: "We're sorry, but you've reached the end of search results.",
                position: 'bottomCenter'
            });
        }
    } catch (error) {
        console.error("Помилка при завантаженні:", error);
    } finally {
        hideLoader(loaderElement);
        loadMore.disabled = false;
    }
});

