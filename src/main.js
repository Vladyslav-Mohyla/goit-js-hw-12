import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery } from './js/pixabay-api'; // импорт функции запроса на Pixabay
import {
  clearGallery,
  createGallery,
  hideLoader,
  showLoader,
  showLoadMore,
  hideLoadMore,
  loadMoreBtn,
} from './js/render-functions';

const form = document.querySelector('.form');
const firstCard = document.querySelector('.gallery li');

let query = '';
let page = 1;
const perPage = 15;
let totalHits = 0;
let isLoading = false;

form.addEventListener('submit', onFormSubmit);
if (loadMoreBtn) loadMoreBtn.addEventListener('click', onLoadBtn);

async function onLoadBtn() {
  if (isLoading) return;
  if (!query) return;

  page += 1;
  hideLoadMore();
  showLoader();
  isLoading = true;
  if (loadMoreBtn) loadMoreBtn.disabled = true;

  try {
    const data = await getImagesByQuery(query, page);
    totalHits = data.totalHits;

    if (!data.hits || data.hits.length === 0) {
      iziToast.info({ message: 'No more images', position: 'topRight' });
      hideLoadMore();
      return;
    }

    createGallery(data.hits);

    // плавна прокрутка вниз на дві висоти карточки після додавання нових елементів
    const firstCard = document.querySelector('.gallery li');
    if (firstCard) {
      const { height: cardHeight } = firstCard.getBoundingClientRect();
      window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });
    }

    const loaded = page * perPage;
    if (loaded < totalHits) {
      showLoadMore();
    } else {
      hideLoadMore();
      iziToast.info({
        message: "You've reached the end of search results.",
        position: 'topRight',
      });
    }
  } catch (error) {
    console.error(error);
    iziToast.error({ message: 'Error fetching images', position: 'topRight' });
  } finally {
    hideLoader();
    isLoading = false;
    if (loadMoreBtn) loadMoreBtn.disabled = false;
  }
}

async function onFormSubmit(event) {
  event.preventDefault();
  const searchValue = event.target.elements['search-text'].value.trim();

  if (!searchValue) {
    alert('Введіть пошукове значення');
    return;
  }

  query = searchValue;
  page = 1;
  totalHits = 0;

  hideLoadMore();

  clearGallery();
  showLoader();
  isLoading = true;

  try {
    const data = await getImagesByQuery(query, page);
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });

      return;
    }

    createGallery(data.hits);

    // плавна прокрутка вниз на дві висоти карточки після додавання нових елементів

    if (firstCard) {
      const { height: cardHeight } = firstCard.getBoundingClientRect();
      window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });
    }

    const loaded = page * perPage;
    if (loaded < totalHits) {
      showLoadMore();
    } else {
      hideLoadMore();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
  } catch (error) {
    console.error(error);
    iziToast.error({ message: 'Error fetching images', position: 'topRight' });
  } finally {
    hideLoader();
    isLoading = false;
  }
}
