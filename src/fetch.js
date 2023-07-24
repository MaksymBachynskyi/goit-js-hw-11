import axios from 'axios';
///////////////////////////BASIC-FOR-URL/////////////////////
axios.defaults.baseURL = 'https://pixabay.com/api/';

const params = new URLSearchParams({
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
});
///////////////////////BASIC-Fetch//////////////////////
const fetchGet = async function (searchValue, page) {
  const a = await axios.get(
    `?key=38353309-e4de21ca68fdebd8c76b476b8&q=${searchValue}&${params}&page=${page}&per_page=40`
  );
  const { data } = a;
  return data;
};
////////////////////////BASIC-MARKUP////////////////////

function createMarkup(a) {
  return a
    .map(
      ({
        webformatURL,
        tags,
        views,
        comments,
        downloads,
        likes,
        largeImageURL,
      } = {}) => {
        return `<div class="photo-card"><a class="gallery__link" href="${largeImageURL}">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
  <div class="info">
    <p class="info-item">
      <b>Likes:${likes}</b>
    </p>
    <p class="info-item">
      <b>Views:${views}</b>
    </p>
    <p class="info-item">
      <b>Comments:${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads:${downloads}</b>
    </p>
  </div>
</div>`;
      }
    )
    .join('');
}
///////////////////////////////////////////////
export { fetchGet, createMarkup };
