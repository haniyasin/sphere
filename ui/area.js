exports.area = function(context, send, react, sequence){
    context.set('name', '');
    context.set('size', 'normal');

    react("init",
	  function(next, name, objects_maker){
	      context.set('name', name);
	      //нужно регистрировать себя в соответствии с именем
	      sequence(['s',ui, 'give_element', context.service],
		       function(sequence, ret, next){
			   //надо придать фрейму характеристики area_primary  или area_slave
		       },
		       ['s', context.service, 'set', 'element', 'ret[0]'],
		       ['s', objects_maker, 'load', 'welcome', 'ret[0'],
		       ['s', context.service, 'set', 'object_in', 'ret.last']);
	  });
    react("visible",
	  function(next, visible){
		//важно что поверхности, они же element, отключаются ui рекурсивно, так что может и не надо будет ничего делать
		//тут приостанавливаем или возобновляем свою визуальную или иную активность
	    });
    
    react("resize", 
	  function(next){
	      //изменяем размер либо до максимального либо до нормального, но только для primary  
	  });
    react("open",
	  function(next, address){
		sequence(['s', context.get('object_in'), 'release'],
			 ['s', objects_maker, 'load', address, context.get('element')],
			 ['s', context.service, 'set', 'object_in', 'ret.last']);
	  });
}
