// Ця функція повинна приймати масив images, створювати HTML-розмітку для галереї, додавати її в контейнер галереї та викликати метод екземпляра SimpleLightbox refresh(). Нічого не повертає.
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryList = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const lightbox = new SimpleLightbox('.gallery a', { captionsData: 'alt' });

export function createGallery(images) {
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
  lightbox.refresh();
}

//  повинна очищати вміст контейнера галереї
export function clearGallery() {
  galleryList.innerHTML = '';
}

// Повинна додавати клас для відображення лоадера

export function showLoader() {
  loader.classList.remove('hidden');
}

//  повинна прибирати клас для відображення лоадера
export function hideLoader() {
  loader.classList.add('hidden');
}
