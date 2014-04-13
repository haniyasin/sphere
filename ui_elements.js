/*
 * Управляющий сервис ui для сферы, загружает все необходимые зависимости. Может быть как часть приложения,
 * так и отдельным, занимающимся чисто ui. 
 * Главная задача этого сервиса сделать так, чтобы небыло никакой разницы при формировании ui для различных 
 * устройств(от 1,5 до 60 дюймов), используя один набор инструментов
  * 
 */

function pc(env, mq){
    var ui = {
    }
    var sloader = env.dsa.service_loader;
    ui.label = sloader.load('dsa/services/ui/overlay/label', mq, env);    
    ui.button = sloader.load('dsa/services/ui/overlay/button', mq, env);    
    ui.entry = sloader.load('dsa/services/ui/overlay/entry', mq, env);
    ui.panel = sloader.load('dsa/services/ui/overlay/panel', mq, env);
    ui.container = sloader.load('dsa/services/ui/overlay/container', mq, env);
    
    return  ui;
}

function elements_init(env, dsa, ll_widgets){
    var econstructors = env.sphere.parts.ui,
        elements = [];
    for (constructor in econstructors){
	econstructors[constructor].init(env, dsa, ll_widgets);
	elements.push(constructor);
    }
    return elements;
}

exports.init = function(env, dsa){
    var ll_widgets,
        hl_elements;
    dsa.on('init', 
	   function(stack){
	       var _mq;
	       if('pc_style') //personal computer interface
		   ll_widgets = pc(env, dsa.mq),
	       
	       hl_elements = elements_init(env, dsa, ll_widgets);	       
	   });

    dsa.on('destroy', function(stack){
	   });
}