exports.init = function(context, send, react, sequence){
    react("init",
	  function(next, ui, area){
	      context.set('ui', ui);
	      context.set('area', area);
	      sequence(['s', ui, 'give_element'],
		       ['lf', function(context, sequence, ret, next){
			 context.set('element', ret.last);
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
			    sequence.push('s', context.get('ui'), 'fill_element', element, ui_item);	
			}]
		      );
	  });
    
    react("visible",
	  function(next, state){
	      //важно что поверхности, они же element, отключаются ui рекурсивно, так что может и не надо будет ничего делать
	      //тут приостанавливаем или возобновляем свою визуальную или иную активность
	  });
    
    //скорее работу самого виджета адрес надо вынести в отдельный сервис
    react("typed",
	  function(next, item, typed){
		//когда набирают в entry, люди приходят сообщения с тем, что уже набрано. В дальнейшем можно
	      //запросить всё, что было набрано
	      context.set('address', typed);	    
	  });
    
    react("pressed",
	  function(next, item, state){
	      if(state == 'pressed')
		  send(context.get('area'), 'open', context.get('address'))
	  });
}
