/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
function calc() {
    
    // КАЛЬКУЛЯТОР***********

    const result = document.querySelector('.calculating__result span');

    // проверяем данные в localStorage, если есть подгружаем, если нет устанавливаем значения переменных

    let sex, height, weight, age, ratio;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);

            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        });
    }
    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    // создаем функцию калькулятор
    function calcTotal() {
        if(!sex || !height || !weight || !age || !ratio) { // проверка полей
            result.textContent = '***';
            return;
        }
        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    calcTotal();


    // функция по сбору статичных данных значений атрибутов и ID из блоков, удаление активных классов
    /* вешаем обработчик событий на род.элемент click. Из выбранного элемента мы сохраняем либо атрибут data-ratio, если его
        нет, то берем значение ID */

    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }

                // убираем класс активности у всех элементов
                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                }); 
                // назначаем активный класс на выбранный элемент
                e.target.classList.add(activeClass);
                calcTotal();
            });
        });

    }
    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    // функция по сбору динамических данных с div calculating__choose_medium

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);
        
        input.addEventListener('input', () => {
            // если значение содержит не цифры
            if (input.value.match(/\D/g)) {
                input.style.border = '2px solid red';
            } else {
                input.style.border = 'none';
            }
            
            switch(input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
            calcTotal();
        });
    }

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);


/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function cards() {

    // классы для карточек (создаем класс с аргументами, присваиваем переменные содержимому карточки, пишем функцию render(создает div вставляет полученные переменные в HTML и помещает 
    // в родительский элемент))*****************************


    class MenuCard {    // создаем класс для отображения динамической карточки

        constructor(src, alt, title, descr, price, parentSelector, ...classes) {    //ссылка картинка, алт, название, описание, цена
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector); // родительский DOM элемент, в который будем вставлять div
            this.transfer = 27; // курс для конвертации
            this.changeToUAH();
        }

        changeToUAH() { // метод конвертации валюты гривны => USD
            
            this.price = this.price * this.transfer;
        }

        render() {  // создаем элемент, помещаем в него верстку, дополняем данными как арументами помещаем на страницу

                const element = document.createElement('div');

                if(this.classes.length === 0) {
                    this.element = 'menu__item';
                    element.classList.add(this.element);
                } else {
                    this.classes.forEach(className => element.classList.add(className));
                }

                this.classes.forEach(className => element.classList.add(className)); // добавляем классы в div
                element.innerHTML = `
                    <img src= ${this.src} alt= ${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
                `; 
            this.parent.append(element); // вставляем в родительский элемент div
        }
    }

    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu') // запрашиваем и получаем информацию по menu от db.json
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => { // в объекте в свойчтве data лежит ответ от сервера
                new MenuCard(img, altimg, title, descr, price, '.menu__field .container').render();
            });
        });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function forms(formSelector, modalTimerId) {

    // отправка данных с форм "Перезвонить мне" на сервер********************

    const forms = document.querySelectorAll(formSelector);

    const message = {   // статусы отправки
        loading: 'img/spinner/spinner.svg', // помещаем спиннер
        success: 'Спасибо! Мы с вами свяжемся',
        failure: 'Что-то пошло не так',
    };
    forms.forEach(item => {     // на каждую форму вешаем функцию postData
        bindPostData(item);
    });

    function bindPostData(form) { // функция для привязки постинга
        form.addEventListener('submit', (e) => {    // обработчик события на нажатие кнопки
            e.preventDefault();                     // отменяем стандартное действие

            const statusMessage = document.createElement('img'); // создаем элемент на каждую форму 
            statusMessage.src = message.loading; // путь к каринке
            // далее используем style.cssText - так как такой метод позволяет задать несколько стилей с удалением существующих
            statusMessage.style.cssText = ` 
                display: block;
                margin: 0 auto;
            `;
            //form.append(statusMessage); - не будем использовать append так как сьезжает верстка, так как картинка помещается перед </form>
            form.insertAdjacentElement('afterend', statusMessage); // размещаем после элемента </form>

            const formData = new FormData(form)         // создаем глобальный объект для отправки данных с форм

            const json = JSON.stringify(Object.fromEntries(formData.entries()));    // преобразуем глобальный объект formData в массив и обратно(fromEntries и entries)
            //Получаем классический объект JS и преобразовываем его в json

            (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)  // отправляем полученный объект на сервер
            .then(data => {   
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            })
            .catch(() => {   // обрабатываем полученный не успешный результат
                showThanksModal(message.failure);
            })
            .finally(() => { // очищение данных форм выполняется в любом случае
                form.reset();
            })
        });
    }
    
// КРАСИВОЕ ОПОВЕЩЕНИЕ ПОЛЬЗОВАТЕЛЯ ПОСЛЕ ОТПРАВКИ МОДАЛЬНОГО ОКНА***********

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide'); // скрываем
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimerId);

        const thanksModal = document.createElement('div');  // создаем модальное окно благодарности
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div data-close class="modal__close">&times;</div>
                <div class="modal__title">${message}</div> 
            </div>
        `;
        document.querySelector('.modal').append(thanksModal);   // вставляем созданное окно в .modal
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show'); // показываем
            prevModalDialog.classList.remove('hide');
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
        }, 4000);
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__,
/* harmony export */   "openModal": () => /* binding */ openModal,
/* harmony export */   "closeModal": () => /* binding */ closeModal
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _timer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./timer */ "./js/modules/timer.js");



function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {

        // СОЗДАНИЕ СЛАЙДЕРА***********

        const next = document.querySelector(nextArrow), // кнопка
            prev = document.querySelector(prevArrow), // кнопка
            slides = document.querySelectorAll(slide),  // слайды
            slider = document.querySelector(container),    // оболочка всего слайдера
            current = document.querySelector(currentCounter), // номер слайда
            total = document.querySelector(totalCounter),     // всего слайдов
            slidesWrapper = document.querySelector(wrapper),
            slidesField = document.querySelector(field),
            width = window.getComputedStyle(slidesWrapper).width; // вытаскиваем ширину слайда из объекта


        let slideIndex = 1;
        let offset = 0;


    // устанавливаем ширину блока inner равной кол-ву слайдов (100% текущей ширины на каждый слайд)
        slidesField.style.width = 100 * slides.length + '%';
        slidesField.style.display = 'flex';
        slidesField.style.transition = '0.5s all';

    // скрываем элементы не попадающие в область видимости

    slidesWrapper.style.overflow = 'hidden';

    // задаем каждой картинке (слайду) одинаковую ширину равной ширине окна отображения width
    slides.forEach(slide => slide.style.width = width);
    plusCounter();

    // функция преобразования offset в число и удаленя 'PX'

    function deleteNoDigits(str) {
        return +str.replace(/\D/g, '');
    }

    // прописываем смещение вправо по оси X через transformX
    // width - строка, через регулярку оставляем только числа и пре-ем в число

    next.addEventListener('click', () => {

        if (offset == deleteNoDigits(width) * (slides.length - 1)) {    // долистали до конца и возврат слайдера в начало
            offset = 0;
        } else {
            offset += deleteNoDigits(width); // добавялем ширину слайда для смещения
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        opacityShow(dots);
        plusCounter();

    });

    // меняем условия местами, так как все работает наоборот
    prev.addEventListener('click', () => {

        if (offset == 0) {
            offset = deleteNoDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNoDigits(width); // отнимаем ширину слайда для смещения
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        opacityShow(dots);
        plusCounter();

    });

    function plusCounter() {    // номера 
        total.innerText = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.getZero)(slides.length);   //всего
        current.innerText = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.getZero)(slideIndex);
    }


    // НАВИГАЦИЯ ДЛЯ СЛАЙДОВ***********

    let dots = [];
    // создаем обертку для точек
    const indicators = document.createElement('ol');
    indicators.classList.add('carousel-indicators');

    slider.style.position = 'relative';

    // помещаем созданную обертку indicators в слайдер
    slider.append(indicators);

    // создаем точки и помещаем в indicators
    // каждой точке назначаем атрибут и класс

    for (let i = 0; i < slides.length; i++) {

        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');

            if (i == 0) {
                dot.style.opacity = 1;
            }

        indicators.append(dot); // пуш в обертку
        dots.push(dot);         // пуш в массив

    }

    // фуннкция  изменеия прозрачности индикаторов при листании
    function opacityShow (element) {

        element.forEach(data => data.style.opacity = '0.5');
        element[slideIndex - 1].style.opacity = '1';

    }

    // перемещение слайдов при нажатии на индикаторы


    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = deleteNoDigits(width) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            opacityShow(dots);
            plusCounter();
        })
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });

function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {

    let tabs = document.querySelectorAll(tabsSelector),      // захватываем кладки (табы) "Тип питания"
        tabsContent = document.querySelectorAll(tabsContentSelector),          //захватывем контент в каждом табе
        tabsParent = document.querySelector(tabsParentSelector);


    function hideTabContent() {     //функция скрытия контента табов   
    tabsContent.forEach(item => {
        item.style.display = 'none';    // скрываем контент ВСЕХ табов из видимости
    });

    tabs.forEach(item => {
        item.classList.remove(activeClass);    //убираем активность табов (класс активности)
    });
    }

    function showTabContent(i = 0) {    // показываем контент ОДНОГО таба i = 0 хначение по дефолту
        tabsContent[i].style.display = 'block';
        tabs[i].classList.add(activeClass);    //добавляем активность классу
    }

    hideTabContent();   //скрываем весб контент
    showTabContent();  //задаем показ 0 слайда по дефолту из табов

    // вешаем обработчик событий на родительскую область с кнопками tabsParent (лучший способ)
    tabsParent.addEventListener('click', (e) => {
    const target = e.target;    // переменная на объект события

    if (target && target.classList.contains(tabsSelector.slice(1))) { 
        tabs.forEach((item, i) => {
            if(target == item)  {
                hideTabContent();
                showTabContent(i);
                }
            });
        } 
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__,
/* harmony export */   "getZero": () => /* binding */ getZero
/* harmony export */ });

function getZero(num)   {   // функция преобразует число в строку и ставит "0" перед цифрами (0 - 9)
    if (num >= 0 && num < 10) {    // условие подстановки "0"
        return `0${num}`;
    } else {
        return num;
    }
}


function timer(id, deadLine) {
    
    // работа с блоком "Осталось до конца акции" - Таймер***********************

    function getTimeRemaining(endtime)  {   // функция по расчету временных промежутков
        const total = Date.parse(endtime) - Date.parse(new Date()),    // разница в миллисекундах, parse преобразовывает в заданный формат
            days = Math.floor(total / (1000 * 60 * 60 * 24)),        // общее кол-во мс делим на кол-во мс в дне и округляем
            hours = Math.floor((total / (1000 * 60 * 60)) % 24),     // кол-во мс переводим в часы и делим с остатком для получения остатка (кол-ва дней)
            minutes = Math.floor((total / 1000 / 60) % 60),          // получаем остаток минут
            seconds = Math.floor((total / 1000) % 60);               // получаем остаток количества секунд         
            
        return {    //результат функции помещаем а объект
            total,
            days,
            hours,
            minutes,
            seconds
        };
    }

    function setClock(selector, endtime)    {   // функция для установки времни в элементы страницы
        const timer = document.querySelector(selector), // назначаем переменные для элементов страницы
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);    // запуск функции каждую 1 секунду
        
        updateClock();  // запускаем вручную данную функцию, чтобы при обновлении страницы не было паузы в таймере

        function updateClock()  {               // записываем полученные значения из объекта в элементы HTML
            let t = getTimeRemaining(endtime);
                
            days.innerHTML = getZero(t.days);   //функция подставляет "0" перед цифрами до "9"
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0)   {
                clearInterval(timeInterval);    // останавливаем setInterval
            }
        } 
    }
    setClock(id, deadLine);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);


/***/ }),

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");











document.addEventListener('DOMContentLoaded', () => {

    const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__.openModal)('.modal', modalTimerId), 10000);

    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_5__.default)('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_4__.default)({
        container: '.offer__slider',
        slide: '.offer__slide',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_1__.default)();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_2__.default)('form', modalTimerId);
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__.default)('[data-modal]', '.modal', modalTimerId);
    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_0__.default)();
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_6__.default)('.timer', '2021-08-29');

});

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postData": () => /* binding */ postData,
/* harmony export */   "getResource": () => /* binding */ getResource
/* harmony export */ });

    const postData = async (url, data) => {
        const res = await fetch(url, {  // дожидаемся результата
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });

        return await res.json();    // дожидаемся результата
    };

    async function getResource(url) {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status:${res.status}`);
        }
        return await res.json();
    }

    
    

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./js/script.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=bundle.js.map