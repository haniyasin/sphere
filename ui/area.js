exports.init = function(env, context, send, react, sprout){
    context.set('size', 'normal');

    react("create",
	  function(stack, ui, objects_loader){
	      context.set('ui', ui);
	      context.set('object_maker', objects_loader);
	      
	      var _stack = [];	      
	      _stack['root'] = {_frame : 0};

	      sprout([
			 {
			     name : 'main_container',

			     action : ['s', ui.container, 'create', {
					   x : "5%",
					   y : "12%",
					   width : "90%",
					   height : "76%"
				       }, 'root', '_frame'],

			     next : [
				 {
				     action : ['s', ui.label, 'create', {
						   "x" : "0%",
						   "y" : "0%",
						   "width" : "100%",
						   "height" : "100%",
						   
						   "image" : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAMSURBVBhXY3growIAAycBLhVrvukAAAAASUVORK5CYII='
					       }, 'main_container', '_frame1']
				 },
				 {
				     action : ['s', ui.label, 'create', {
						   "x" : "0%",
						   "y" : "0%",
						   "width" : "100%",
						   "height" : "100%",
						   
						   "image" : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAMSURBVBhXY3growIAAycBLhVrvukAAAAASUVORK5CYII='
					       }, 'main_container', '_frame2']
				 }
			     ]
			 }
		     ],
		    _stack);

//			   //надо придать фрейму характеристики area_primary  или area_slave
//		       },
//		       ['s', context.service, 'set', 'element', 'ret[0]'],
//		       ['s', objects_loader, 'load', 'welcome', 'ret[0'],
//		       ['s', context.service, 'set', 'object_in', 'ret.last']);
	  });

    react("visible",
	  function(stack, visible){
		//важно что поверхности, они же element, отключаются ui рекурсивно, так что может и не надо будет ничего делать
		//тут приостанавливаем или возобновляем свою визуальную или иную активность
	    });
    
    react("resize", 
	  function(stack){
	      //изменяем размер либо до максимального либо до нормального, но только для primary  
	  });

    react("who_opened",
	  function(stack, obj, field){
	      stack[obj][field] = context.get(object_in);
	  });

    react("open",
	  function(stack, address){
//		sequence(['s', context.get('object_in'), 'release'],
//			 ['s', context.get('objects_loader'), 'load', address, context.get('element')],
//			 ['s', context.service, 'set', 'object_in', 'ret.last']);
	  });
}
