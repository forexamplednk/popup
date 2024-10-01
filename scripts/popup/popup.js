let popup = function() {
  /*
  0. Открывает большие изображения в попап окне
  1. Открывает любое содержимое (заранее подготовленное)
  2. Просмотр видео (Youtube)
  */
  /*
  Проверять наличие элементов с атрибутом "data-popup"
  */
    let create = function() {
      let elemBackground = document.createElement('div');
      elemBackground.classList.add('popup__background');
  
      let elem = document.createElement('div');
      elem.classList.add('popup');
  
      let buttonClose = document.createElement('button');
      buttonClose.classList.add('popup__close');
      buttonClose.innerText = '+';
  
      let elemBlock = document.createElement('div');
      elemBlock.classList.add('popup__block');
  
      let elemContent = document.createElement('div');
      elemContent.classList.add('popup__content');
  
      elemBlock.append(elemContent);
      elem.append(buttonClose, elemBlock);
  
      buttonClose.addEventListener('click', remove);
      elem.addEventListener('click', function(e) {
        if (!e.target.classList.contains('popup')) return;
        remove();
      });
  
      return [elemBackground, elem];
    };
  
    let remove = function() {
      let elemsPopupBackground = document.querySelectorAll('.popup__background');
      let elemsPopup = document.querySelectorAll('.popup');
  
      elemsPopupBackground.forEach(function(elemPopupBackground) {
        elemPopupBackground.remove();
      });
  
      elemsPopup.forEach(function(elemPopup) {
        elemPopup.remove();
      });
    };
  
    let show = function(content = null, src = null, type = null) {
      remove();
      let elems = create();
  
      if (type == 'photo' && src) {
        let imageElem = document.createElement('img');
        imageElem.src = src;
  
        content = imageElem.outerHTML;
      }
         // <iframe src="https://www.youtube.com/embed/VJm_AjiTEEc?si=4PivswHcgbA776oA" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
         if (type == 'video' && src) {
          src = src.split('/').pop();
           content = `<iframe src="https://www.youtube.com/embed/${src} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
        }
  
      if (content) {
        let contentElem = elems[1].querySelector('.popup__content');
        contentElem.innerHTML = content;
      }
  
      document.body.append(elems[0], elems[1]);
    };
  
    let action = function(e) {
      e.preventDefault();
  
      let elem = e.target;
      
      if (!('popup' in elem.dataset)) {
        let elemParent = elem.closest('[data-popup]');
        if (!elemParent) return;
        elem = elemParent;
      };
  
      // if (!('popup' in elem.dataset)) return;
      if ('popupId' in elem.dataset) {
        let id = elem.dataset.popupId;
        let contentById = document.querySelector(`#${id}`);
         // console.log(contentById);
        if (!contentById) return;
        
        contentById = contentById.innerHTML;
        show(contentById);
      }
  
      if ('popupVideo' in elem.dataset) {
        let src = elem.dataset.popupVideo;
  
        if (!src) return;
        show(null, src, 'video');
      }
  
      if (elem.tagName == 'A') {
        if (elem.children[0] && elem.children[0].tagName == 'IMG') {
          let href = elem.href;
          
          // if (!href || /\/.+\S\.(?:png|jpg|jpeg|gif)/gi.test(href)) return;
          if (!href) return;
          show(null, href, 'photo');
        }
      }
      //console.dir(elem)
    };
   
    let elems = document.querySelectorAll('[data-popup]');
    if (!elems || elems.length == 0) return;
  
    elems.forEach(function(elem) {
      elem.addEventListener('click', action)
    });
    
  }
  
  window.addEventListener('load', popup());