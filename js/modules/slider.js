import {getZero} from './timer';


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
        total.innerText = getZero(slides.length);   //всего
        current.innerText = getZero(slideIndex);
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

export default slider;