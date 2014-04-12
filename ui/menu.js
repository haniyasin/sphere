/*
 * Implementation of ui menu abstaction. 
 * 
 * Меню, в понимании этого сервиса это больше смысл, чем форма.
 * Это значит, что панель приборов, меню, всплывающее меню и все другие вещи, которые являются списком
 * действий - это меню. Форма представления выбирается для каждого устройства или разрешения экрана - собственная.
 * Вот возможные варианты: 
 * - menu(обычный дисплей, к примеру ноутбук), 
 * - toolbar(большой экран),
 * - popup(когда множество меню нужно сочетать друг с другом на одном экране)
 * - старомодное меню мобильников - вертикальный список(если меньше 5и дюймов)
 *   Тут надо пояснить, сейчас на мобильниках используются всякие там списки, которые тоже являются этакой
 *   эволюцией такого меню, так что это меню может быть и списком.
 * - и прочее
 * 
 * 
 */

exports.init = function(env, context, send, react, sprout){
    
}