
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

export default timer;
export {getZero};