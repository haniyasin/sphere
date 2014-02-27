exports.init = function(send, react){
    var _element = '',
    address = '' ;

    return {
	"in" : {
	    "init" : function(){
		//просим выделения элемента у канваса
		send('ui', 'give_element');
	    },
	    "visible_changed" : function(client, state){
		//важно что поверхности, они же element, отключаются ui рекурсивно, так что может и не надо будет ничего делать
		//тут приостанавливаем или возобновляем свою визуальную или иную активность
	    },
	    "new_element" : function(client, element){
		//получаем запрошенный элемент. Примичательно, что можем получить новый в результате удаления
		//старого и создания нового без нашего ведома:)
		_element = element;
		var ui_item = {
		    "image" : {
			"color" : 'white',
			"childs" : {
			    "entry" : {
				"name" : 'address',
				"color" : 'grey',
				"x" : "3%",
				"y" : "1%",
				"width" : "75%",
				"heigth" : "10%"			    
			    },
			    "button" : {
				"name" : 'gobutton',
				"color" : 'red',
				"x" : "78%",
				"y" : "1%",
				"width" : "20%",
				"heigth" : "10%"
			    }		    
			}
		    }
		}
		send('ui', 'fill_element', element, ui_item);
	    },
	    "typed" : function(client, item, typed){
		//когда набирают в entry, люди приходят сообщения с тем, что уже набрано. В дальнейшем можно
		//запросить всё, что было набрано
		address = typed;	    
	    },
	    "pressed" : function(client, item, state){
		if(state == 'pressed')
		    send('sphere.ui.area_primary', 'open', address)
	    }
	}
    }
}
