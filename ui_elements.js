/*
 * Управляющий сервис ui для сферы, загружает все необходимые зависимости. Может быть как часть приложения,
 * так и отдельным, занимающимся чисто ui. 
 * Главная задача этого сервиса сделать так, чтобы небыло никакой разницы при формировании ui для различных 
 * устройств(от 1,5 до 60 дюймов), используя один набор инструментов
  * 
 */

function pc(env, mq){
    var ui = {
    };

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
	   function(sprout, stack){
	       if('pc_style') //personal computer interface
		   ll_widgets = pc(env, dsa.mq),
	       
	       hl_elements = elements_init(env, dsa, ll_widgets);
	   });

    dsa.on('destroy', function(sprout, stack){
	   });

    dsa.on('block_size_ask',
	  function(sprout, stack){
	      dsa.context.set('block_size', { width : 40, height : 30 });
	      return false; //because on_pressed is not working, bug in the dsa.
	      with(dsa.sprout){
		  msg(ll_widgets.container, 'create', {
			  x : '15%',
			  y : '5%',
			  width : '70%',
			  height : '90%'
		      }).sprout(
			  msg(ll_widgets.label, 'create', {
				  x : '0%',
				  width : '100%',
				  height : '30px',
				  
				  text : 'Выберите подходящий размер'
			      }),
			  msg(ll_widgets.button, 'create', {
				  x : '0%',
				  y : '30px',
				  width : '120px',
				  height : '30px',
				  label : 'Такой',
				  on_pressed : f(function(sprout, stack){
						     console.log('dddddeeeee');
						 })
			      }),
			  msg(ll_widgets.button, 'create', {
				  x : '0%',
				  y : '62px',
				  width : '200px',
				  height : '60px',
				  label : 'Сякой'
			      }),
			  msg(ll_widgets.button, 'create', {
				  x : '0%',
				  y : '124px',
				  width : '400px',
				  height : '100px',
				  label : 'Этакий'
			      }),
			  msg(ll_widgets.button, 'create', {
				  x : '0%',
				  y : '226px',
				  width : '600px',
				  height : '140px',
				  label : 'Большой'
			      })
		      ).run();
	      }
	  });
}