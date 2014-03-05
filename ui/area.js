exports.init = function(send, react){
    var _name = null,
    _object_in = null,
    _element = null,
    size = 1;
    
    return {
	"in" : {
	    "init" : function(name){
		_name = name;
		//нужно регистрировать себя в соответствии с именем
		send_sequent(['ui', 'give_element'],
			     function(client, element){
				 _element = element;
				 //надо придать фрейму характеристики area_primary  или area_slave
			     },
			     ['sphere.object_manager', 'load', 'sphere.objects.welcome', element]);
	    },
	    "visible_changed" : function(client, state){
		//важно что поверхности, они же element, отключаются ui рекурсивно, так что может и не надо будет ничего делать
		//тут приостанавливаем или возобновляем свою визуальную или иную активность
	    },
	    "resize" : function(client){
		//изменяем размер либо до максимального либо до нормального, но только для primary  
	    },
	    "open" : function(client, address){
		send(object_in, 'release');
		send('sphere.object_manager', 'load', address, element);
	    },
	    
	    "object_created" : function(client, object_in){
                _object_in = object_in;
	    }
	}    
    }
}
