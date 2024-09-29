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

  };

  let remove = function() {

  };

  let show = function() {

  };

  let action = function() {

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