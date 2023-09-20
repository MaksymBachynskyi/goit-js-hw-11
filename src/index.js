import { fetchGet, createMarkup } from './fetch';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';

/////////////////////////START//////////////////////

let modal = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: '250ms',
});
let totalImg = 0;
let page = 1;
let input = '';
const galleryEl = document.querySelector('.gallery');
const fromEl = document.querySelector('.search-form');
const btnLoadMore = document.querySelector('.load');
///////////////////////////////////MAIN-SUBMIT//////////////////////
fromEl.addEventListener('submit', onSubmitSearch);
async function onSubmitSearch(evnt) {
  btnLoadMore.classList.add('isHidden');
  evnt.preventDefault();
  page = 1;
  galleryEl.innerHTML = '';
  input = evnt.currentTarget.elements.searchQuery.value;
  if (!input || input === ' ') {
    Notiflix.Notify.failure('You must to include something');
    evnt.currentTarget.reset();
    return;
  }

  try {
    const get = await fetchGet(input, page);
    galleryEl.insertAdjacentHTML('beforeend', createMarkup(get.hits));

    totalImg = get.totalHits;

    if (!get.totalHits) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    Notiflix.Notify.success(`Hooray! We found ${get.totalHits} images.`);
    modal.refresh();
    btnLoadMore.classList.remove('isHidden');
  } catch (error) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  } finally {
    evnt.target.reset();
  }
}
/////////////////////////////////LOADMORE//////////////////////
btnLoadMore.addEventListener('click', onLoadMore);

async function onLoadMore() {
  page += 1;

  btnLoadMore.classList.add('isHidden');
  try {
    const get = await fetchGet(input, page);
    galleryEl.insertAdjacentHTML('beforeend', createMarkup(get.hits));

    totalImg -= 40;
    modal.refresh();
    if (totalImg > 0) {
      Notiflix.Notify.success(`Hooray! We found ${totalImg} images.`);
      btnLoadMore.classList.remove('isHidden');
    } else {
      Notiflix.Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
    }
  } catch (error) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
}
