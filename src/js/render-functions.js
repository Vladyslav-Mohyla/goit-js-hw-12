// Ця функція повинна приймати масив images, створювати HTML-розмітку для галереї, додавати її в контейнер галереї та викликати метод екземпляра SimpleLightbox refresh(). Нічого не повертає.
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryList = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
export const loadMoreBtn = document.querySelector('.loader-btn');
const lightbox = new SimpleLightbox('.gallery a', { captionsData: 'alt' });

export function createGallery(images) {
  if (!galleryList) return;
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<li>
  <a href='${largeImageURL}'>
  <img src="${webformatURL}" alt="${tags}" width = 360px height = 200px/>
  </a>
  <div class="text-img-engagement">
    <p>Likes <span>${likes}</span></p>
    <p>View <span>${views}</span></p>
    <p>Comments <span>${comments}</span></p>
    <p>Downloads <span>${downloads}</span></p>
  </div>
</li>`
    )
    .join('');
  galleryList.insertAdjacentHTML('beforeend', markup);
  if (lightbox) lightbox.refresh();
}

//  повинна очищати вміст контейнера галереї
export function clearGallery() {
  galleryList.innerHTML = '';
}

// Повинна додавати клас для відображення лоадера

export function showLoader() {
  if (!loader) return;
  loader.classList.remove('hidden', 'is-hidden');
  loader.style.display = '';
}

export function hideLoader() {
  if (!loader) return;
  loader.classList.add('hidden', 'is-hidden');
  loader.style.display = 'none';
}

if (loader) {
  hideLoader();
}

export function showLoadMore() {
  if (!loadMoreBtn) return;
  loadMoreBtn.classList.remove('hidden');
}

export function hideLoadMore() {
  if (!loadMoreBtn) return;
  loadMoreBtn.classList.add('hidden');
}
