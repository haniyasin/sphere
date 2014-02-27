exports.init = function(send, react){
    var _element = null;
    
    return {
	"in" : {
	    "init" : function(){
		send('ui', 'give_element');
	    },
	    "visible_changed" : function(client, state){
		//важно что поверхности, они же element, отключаются ui рекурсивно, так что может и не надо будет ничего делать
		//тут приостанавливаем или возобновляем свою визуальную или иную активность
	    },
	    "new_element" : function(client, element){
		_element = element;
		var ui_item = {
		    "type" : 'image',
		    "color" : 'red',
		    "childs" : {
			"resize" :{
			    "type" : 'button',
			    "color" : 'blue',
			    "x" : "3%",
			    "y" : "1%",
			    "width" : "28%",
			    "heigth" : "10%"
			},
			"edit" : {
			    "type" : 'button',
			    "color" : 'blue',
			    "x" : "78%",
			    "y" : "1%",
			    "width" : "28%",
			    "heigth" : "10%"
			},
			"create" : {
			    "type" : 'button',
			    "color" : 'blue',
			    "x" : "3%",
			    "y" : "1%",
			    "width" : "28%",
			    "heigth" : "10%"
			}
		    }
		}
		send('ui', 'fill_element', element, ui_item);	    
	    },
	    "pressed" : function(client, item, state){
		if(state == 'pressed')
		    switch(item){
		    case 'resize' :
			send('sphere.ui.area_primary', 'resize');
			break;
		    case 'edit' : 
			send('sphere.ui.area_primary', 'open', 'sphere.ui.editor');
			break;
		    case 'create' :
			send('sphere.ui.area_primary', 'open', 'sphere.ui.editor_new');
			break;
		    }
	    }
	}    
    }
}
