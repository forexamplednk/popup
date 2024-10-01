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

  };

  let show = function(content = null) {
    remove();
    create();
  };

  let action = function(e) {
    e.preventDefault();

    let elem = e.target;    

    if (!('popup' in elem.dataset)) return;
    if ('popupId' in elem.dataset) {
      let id = elem.dataset.popupId;
      let contentById = document.querySelector(`#${id}`);
       // console.log(contentById);
      if (!contentById) return;
      
      contentById = contentById.innerHTML;
      show(contentById);
      
    }
    //console.dir(elem)
  };
 
  let elems = document.querySelectorAll('[data-popup]');
  if (!elems || elems.length == 0) return;

  elems.forEach(function(elem) {
    elem.addEventListener('click', action)
  });
  
}

window.addEventListener('load', function() {
  popup();
})