exports.init = function(send, react){
    var _name = null,
    object = null,
    _address = null,
    _element = null;
    
    return {
	"in" : {
	    "init" : function(name){
		_name = name;
		//нужно регистрировать себя в соответствии с именем
		send('ui', 'give_element');
	    },
	    "visible_changed" : function(client, state){
		//важно что поверхности, они же element, отключаются ui рекурсивно, так что может и не надо будет ничего делать
		//тут приостанавливаем или возобновляем свою визуальную или иную активность
	    },
	    "new_element" : function(client, element){
		_element = element;
		object = 'sphere.object.welcome';
		send('sphere.objects.welcome', 'take', element);
	    },
	    "resize" : function(client){
		//изменяем размер либо до максимального либо до нормального, но только для primary  
	    },
	    "open" : function(client, address){
		send(object, 'release');
		_address = object = address;
		send(address, 'take', element);
	    }
	}    
    }
}
