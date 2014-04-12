/*
 * Управляющий сервис ui для сферы, загружает все необходимые зависимости. Может быть как часть приложения,
 * так и отдельным, занимающимся чисто ui. 
 * Главная задача этого сервиса сделать так, чтобы небыло никакой разницы при формировании ui для различных 
 * устройств(от 1,5 до 60 дюймов), используя один набор инструментов
  * 
 */

function pc(mq){
    var ui = {
    }
    ui.label = sloader.load('dsa/services/ui/overlay/label', mq, env);    
    ui.button = sloader.load('dsa/services/ui/overlay/button', mq, env);    
    ui.entry = sloader.load('dsa/services/ui/overlay/entry', mq, env);
    ui.panel = sloader.load('dsa/services/ui/overlay/panel', mq, env);
    ui.container = sloader.load('dsa/services/ui/overlay/container', mq, env);
    
    return  ui;
//    var address_panel = sloader.load('sphere/ui/address_panel', mq, env);
//    var action_panel = sloader.load('sphere/ui/action_panel', mq, env);
//    var area = sloader.load('sphere/ui/area', mq, env);
//    var objects_loader = sloader.load('sphere/objects_loader', mq, env);    
}

exports.init = function(env, context, send, react, sprout){
    var ui;
    react('init', function(stack){
	      var _mq;
	      if('pc_style') //personal computer interface
		  ui = pc(_mq);
	      //creating folowing services: menu, area, items
	  });
}