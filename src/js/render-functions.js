import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
});

export function createGallery(images, container) {
    const markup = images.map(image => `
        <li class="gallery-item">
            <a class="gallery-link" href="${image.largeImageURL}">
                <img class="gallery-image" src="${image.webformatURL}" alt="${image.tags}" />
            </a>
            <div class="info">
                <p class="info-item Likes"><b>Likes</b><span>${image.likes}</span></p>
                <p class="info-item"><b>Views</b><span>${image.views}</span></p>
                <p class="info-item"><b>Comments</b><span>${image.comments}</span></p>
                <p class="info-item"><b>Downloads</b><span>${image.downloads}</span></p>
            </div>
        </li>
    `).join("");

    container.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();
}


export function clearGallery(container) {
    container.innerHTML = '';
}
export function toggleLoader(loader, isVisible) {
    isVisible ? loader.classList.remove('is-hidden') : loader.classList.add('is-hidden');
}

// Керування кнопкою "Load More" (стан, текст, видимість)
export function updateLoadMoreButton(btn, { isVisible, isLoading, isEnd }) {
    if (isVisible !== undefined) {
        isVisible ? btn.classList.remove('is-hidden') : btn.classList.add('is-hidden');
    }
    
    if (isLoading !== undefined) {
        btn.disabled = isLoading;
        btn.textContent = isLoading ? "Loading..." : "Load more";
    }

    if (isEnd) {
        btn.classList.add('is-hidden');
    }
}

export function smoothScroll() {
    const galleryItem = document.querySelector(".gallery-item");
    if (galleryItem) {
        const { height } = galleryItem.getBoundingClientRect();
        window.scrollBy({
            top: height * 2,
            behavior: "smooth",
        });
    }
}

