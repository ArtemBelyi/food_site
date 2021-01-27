
import calc from './modules/calc';
import cards from './modules/cards';
import forms from './modules/forms';
import modal from './modules/modal';
import slider from './modules/slider';
import tabs from './modules/tabs';
import timer from './modules/timer';
import {openModal} from './modules/modal';


document.addEventListener('DOMContentLoaded', () => {

    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 10000);

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    slider({
        container: '.offer__slider',
        slide: '.offer__slide',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
    cards();
    forms('form', modalTimerId);
    modal('[data-modal]', '.modal', modalTimerId);
    calc();
    timer('.timer', '2021-08-29');

});