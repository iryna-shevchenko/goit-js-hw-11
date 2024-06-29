'use strict';

const API_KEY = '44479541-afd008fbdfda4a6c986ece69f';


export function getImages() {

  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: inputValue,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });
}

  