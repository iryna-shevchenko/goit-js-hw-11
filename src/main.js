'use strict';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// import { handleFormSubmit } from './js/pixabay-api';
import { renderImages } from './js/render-functions';

const API_KEY = '44479541-afd008fbdfda4a6c986ece69f';
const searchFormElement = document.querySelector('.search-form');
const galleryElement = document.querySelector('.gallery');
const textInputElement = document.querySelector('.search-input');
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const loaderElement = document.querySelector('.loader');
loaderElement.style.display = 'none';

searchFormElement.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(event) {
  event.preventDefault();
  const inputValue = textInputElement.value.trim();

  if (!inputValue) {
    iziToast.warning({
      title: 'Warning!',
      message: 'Please enter image name!',
      position: 'topRight',
    });
    return;
  }

  clearGallery();
  loaderElement.style.display = 'block';

  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: inputValue,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });

  fetch(`https://pixabay.com/api/?${searchParams}`)
    .then(response => {
      loaderElement.style.display = 'none';

      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
        return;
      }
      renderImages(data.hits);
      lightbox.refresh();
    })
    .catch(error => {
      console.error('Error fetching images:', error);
      iziToast.error({
        message: 'Failed to fetch images. Please try again later.',
        position: 'topRight',
      });
    });
}

function clearGallery() {
  galleryElement.innerHTML = '';
}