function openModal(modalSelector, modalTimerId) { // функция открытия модального окна
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';    // ставим блокировку overflow в body
    console.log(modalTimerId);
    if (modalTimerId) {
        clearInterval(modalTimerId); 
    } 
}

function closeModal(modalSelector)   {   // функция на закрытие модального окна
    const modal = document.querySelector(modalSelector);
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';          //убираем блокировку overflow
}


function modal(triggerSelector, modalSelector, modalTimerId) {

    // модальные окна "Связаться с нами" *************************

    const modalTrigger = document.querySelectorAll(triggerSelector),
          modal = document.querySelector(modalSelector);
         
          //делаем делегирование событий на родительский элемент '[data-close]'

    modalTrigger.forEach(item => {
        item.addEventListener('click', () => openModal(modalSelector, modalTimerId));
    });

    modal.addEventListener('click', (e) => {    // выбираем все область modal
        if (e.target === modal || e.target.getAttribute('data-close') == "")  {  // если объект события === область модального окна(подложка) || атрибут крестика модального окна
            closeModal(modalSelector);   // вызываем ф-ию закрытия модального окна
        }
    });

    document.addEventListener('keydown', (e) => {   // закрытие модального окна через "Escape" условие, что окно открыто("show")
        if (e.code == 'Escape' && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });


    function showModalByScroll() { // функция обработчика на скролл страницы
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {  //прокрученная часть + видимая часть >= общая длина документа
            openModal(modalSelector, modalTimerId);    // запускаем окно
            window.removeEventListener('scroll', showModalByScroll);    // удаляем обработчик, чтобы каждый раз не вызывался, а только 1 раз
        }

    }
    window.addEventListener('scroll', showModalByScroll);   // навешиваем обработчик событий на страницу с запуском функции после скрола
}

export default modal;
export {openModal};
export {closeModal};