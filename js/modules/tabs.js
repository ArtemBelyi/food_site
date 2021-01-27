
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

export default tabs;