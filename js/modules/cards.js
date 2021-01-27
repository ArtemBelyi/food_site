import {getResource} from '../services/services';


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

    getResource('http://localhost:3000/menu') // запрашиваем и получаем информацию по menu от db.json
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => { // в объекте в свойчтве data лежит ответ от сервера
                new MenuCard(img, altimg, title, descr, price, '.menu__field .container').render();
            });
        });
}

export default cards;