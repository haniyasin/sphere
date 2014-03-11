exports.action_panel = function(context, send, react, sequence){
    react("init", 
	  function(next, ui, area){
	      context.set('ui', ui);
	      context.set('area', area);
	      sequence(['s', ui, 'give_element'],
		       ['fn', function(context, sequence, ret, next){
			    context.set('element', element);
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
					"heigth" : "10%",
					
					"on_pressed" : [
					    ['s', context.service, 'get', 'area'],
					    ['ff', function(sequnce,ret, next){
						 if(ret.last == 'pressed'){
						     sequence.push('s', ret[-1], 'resize')
						 }
					     }]
					]
				    },
				    "edit" : {
					"type" : 'button',
					"color" : 'blue',
					"x" : "78%",
					"y" : "1%",
					"width" : "28%",
					"heigth" : "10%",
					
					"on_pressed" : [
					    ['s', context.service, 'get', 'area'],
					    ['s', 'ret.last', 'who_opened'],
					    ['ff', function(sequnce,ret, next){
						 if(ret.last == 'pressed'){
						     sequence.push('s', ret.last, 'open', 'editor', 'ret[-1]');
						 }
					     }]
					]
				    },
				    "create" : {
					"type" : 'button',
					"color" : 'blue',
					"x" : "3%",
					"y" : "1%",
					"width" : "28%",
					"heigth" : "10%",
					
					"on_pressed" : [
					    ['s', context.service, 'get', 'area'],
					    ['ff', function(sequnce,ret, next){
						 if(ret.last == 'pressed'){
						     sequence.push('s', 'ret[-1]', 'open', 'editor')
						 }
					     }]
					]
				    }
				}
			    }
			    sequence.push(context.get('ui'), 'fill_element', 'ret[-1]', ui_item);	
			}]
		      );
	  });
    
    react("visible_changed",
	  function(client, state){
		//важно что поверхности, они же element, отключаются ui рекурсивно, так что может и не надо будет ничего делать
	      //тут приостанавливаем или возобновляем свою визуальную или иную активность
	  });
}
