import {closeModal, openModal} from './modal';
import {postData} from '../services/services';

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

            postData('http://localhost:3000/requests', json)  // отправляем полученный объект на сервер
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
        openModal('.modal', modalTimerId);

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
            closeModal('.modal');
        }, 4000);
    }
}

export default forms;