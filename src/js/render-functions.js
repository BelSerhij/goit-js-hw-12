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

export function showLoader(loaderElement) {
    loaderElement.style.display = 'block';
}

export function hideLoader(loaderElement) {
    loaderElement.style.display = 'none';
}

export function showLoadMoreButton(loadMore) {
    loadMore.style.display = 'flex';
}

export function hideLoadMoreButton(loadMore) {
    loadMore.style.display = 'none';
}