import galleryImages from './export-imgs.js'

const galleryList = document.querySelector('.js-gallery');
const modalWindowImg = document.querySelector('.lightbox__image');
const modalWindow = document.querySelector('.js-lightbox');

const ImagesMarkup = getGalleryImages(galleryImages);

galleryList.insertAdjacentHTML('beforeend', ImagesMarkup);

function getGalleryImages(images){
    return images.map(({original, preview, description, index }) => {
        return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      data-index='${index}'
      alt="${description}"
    />
  </a>
</li>`}).join(' ');

}

// modalWindow.addEventListener('click', onCloseBtn)

// function onCloseBtn(evt) {
  //   if (evt.target.classList.contains('lightbox__button') && !evt.target.classList.contains('lightbox__image')) {
    //     modalWindow.classList.remove('is-open')
    //     calerImgAttributes()
    //   }
    // }
    
    
galleryList.addEventListener('click', onClickModal);
let currentIndex = null;

    
    function onClickModal(evt) {
      evt.preventDefault()
      let currentIndex = +evt.target.dataset.index;
      if (evt.target.classList.contains('gallery__image')) {
        modalWindow.classList.add('is-open')
      }
      
      modalWindowImg.src = evt.target.dataset.source
      modalWindowImg.alt = evt.target.alt
    }
    
    modalWindow.addEventListener('click', onClickBackdrop)
    
    function onClickBackdrop(evt) {
      if (!evt.target.hasAttribute('src')) {
        modalWindow.classList.remove('is-open')
        clearModalImgAttributes()
      }
    }
    
    function clearModalImgAttributes() {
      
        modalWindowImg.src = "";
        modalWindowImg.alt = "";
      
}
window.addEventListener('keydown', onEscpCloseModal)
function onEscpCloseModal(evt) {
  if (evt.code === 'Escape') {
    modalWindow.classList.remove('is-open')
      clearModalImgAttributes()
  }
}

function changeModalImgAttributes() {
  modalWindowImg.src = galleryImages[currentIndex].original;
    modalWindowImg.alt = galleryImages[currentIndex].alt;
}
window.addEventListener('keydown', onClickArrow)

function onClickArrow(evt) {
  if (evt.code === 'ArrowLeft') {
    (currentIndex === 0) ? currentIndex = galleryImages.length - 1 : currentIndex -= 1;
    // if (currentIndex === 0) {
    //   currentIndex = galleryImages.length - 1
    // } else {
    //   currentIndex -= 1
    // }
    
    changeModalImgAttributes()
  };
  if (evt.code === 'ArrowRight') {
    (currentIndex === galleryImages.length - 1) ? currentIndex = 0 : currentIndex++;
    // if (currentIndex === galleryImages.length - 1) {
    //   currentIndex = 0;
    // } else {
    //   currentIndex ++
    // }
    changeModalImgAttributes()
  }
}



