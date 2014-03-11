exports.address_panel = function(context, send, react, sequence){
    react("init",
	  function(next, ui, area){
	      context.set('ui', ui);
	      context.set('area', area);
	      sequence(['s', ui, 'give_element'],
		       ['fn', function(context, sequence, ret, next){
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
					    "heigth" : "10%",
					    
					    "on_typed" : [
						['s', context.service, 'set', 'address', 'ret.last']
					    ] 
					},
					"button" : {
					    "name" : 'gobutton',
					    "color" : 'red',
					    "x" : "78%",
					    "y" : "1%",
					    "width" : "20%",
					    "heigth" : "10%",
					    
					    "on_pressed" : [
						['s', context.service, 'get', 'address']
						['s', context.service, 'get', 'area'],
						['ff', function(sequence, ret, next){
						     if(ret.first == 'pressed')
							 sequence.push('s', ret.last, 'open', ret[-1]);
						 }]
					    ]
					}		    
				    }
				}
			    }
			    sequence.push('s', context.get('ui'), 'fill_element', ret.last, ui_item);	
			}]
		      );
	  });
    
    react("visible",
	  function(next, state){
	      //важно что поверхности, они же element, отключаются ui рекурсивно, так что может и не надо будет ничего делать
	      //тут приостанавливаем или возобновляем свою визуальную или иную активность
	  });
}
