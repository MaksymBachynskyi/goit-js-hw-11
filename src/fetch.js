import axios from 'axios';
///////////////////////////BASIC-FOR-URL/////////////////////
axios.defaults.baseURL = 'https://pixabay.com/api/';
key = '38353309-e4de21ca68fdebd8c76b476b8';
const params = new URLSearchParams({
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
});
///////////////////////BASIC-Fetch//////////////////////
const fetchGet = async function (searchValue, page) {
  const a = await axios.get(
    `?key=${key}&q=${searchValue}&${params}&page=${page}&per_page=40`
  );
  const { data } = a;
  return data;
};
/////////////////////////////////CREATE-ELEMET-HTML///////////////////////
function createElForDoom(a) {
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
        return createMarkup(
          webformatURL,
          tags,
          views,
          comments,
          downloads,
          likes,
          largeImageURL
        );
      }
    )
    .join('');
}
////////////////////////BASIC-MARKUP////////////////////
function createMarkup(
  webformatURL,
  tags,
  views,
  comments,
  downloads,
  likes,
  largeImageURL
) {
  return ` <div class="photo-card"><a class="gallery__link" href="${largeImageURL}">
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
</div> `;
}
///////////////////////////////////////////////
export { fetchGet, createElForDoom };
