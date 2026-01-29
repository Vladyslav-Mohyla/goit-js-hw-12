import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery } from './js/pixabay-api'; // импорт функции запроса на Pixabay
import {
  clearGallery,
  createGallery,
  hideLoader,
  showLoader,
} from './js/render-functions';

const form = document.querySelector('.form');

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  const searchValue = event.target.elements['search-text'].value.trim();

  if (!searchValue) {
    alert('Введіть пошукове значення');
    return;
  }
  showLoader();
  clearGallery();
  getImagesByQuery(searchValue)
    .then(({ hits }) => {
      if (hits.length === 0) {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });

        return;
      }

      createGallery(hits);
    })
    .catch(error =>
      iziToast.error({
        message: `${error}`,
        position: 'topRight',
      })
    )
    .finally(() => {
      hideLoader();
    });
}
