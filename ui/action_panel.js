/*
 * bottom panel with actions like a create, edit
 * 
 */

exports.init = function(env, context, send, react, sprout){
    react("create", 
	  function(stack, ui, area){
	      context.set('ui', ui);
	      context.set('area', area);

	      var _stack = [];
	      _stack['root'] = {_frame : 0};

	      sprout([
			 {
			     name : 'action_panel',
			     action : ['s', ui.panel, 'create', {
					   x : '5%',
					   y : '0%',
					   width : '90%',
					   height : '30%',
					   
					   position : 'bottom',
				   
					   maximized : false
				       }, 'root', '_frame'],
			     
			     next : [{
					 action : ['s', ui.button, 'create', {
						       "x" : "0%",
						       "y" : "0%",
						       "width" : "33%",
						       "height" : "60%",
						       
						       "label" : 'увеличить',

						       "on_pressed" : [
							   ['f', function(stack, sprout_pusher){}]
						       ]
						   }, 'action_panel', 'maximized' 
						  ]    
				     },
				     {
					 action : ['s', ui.button, 'create', {
						       "x" : "33%",
						       "y" : "0%",
						       "width" : "33%",
						       "height" : "60%",
						       
						       "label": 'изменить',
						       "on_pressed" : [
							   ['s', context.service, 'get', 'area'],
							   ['s', 'ret.last', 'who_opened'],
							   ['ff', function(sequnce,ret, next){
								if(ret.last == 'pressed'){
								    sequence.push('s', ret.last, 'open', 'editor', 'ret[-1]');
								}
							    }]
						       ],

						   }, 'action_panel', 'maximized']
				     },
				     {
					 action : ['s', ui.button, 'create', {
						       "x" : "66%",
						       "y" : "0%",
						       "width" : "34%",
						       "height" : "60%",
						       
						       "label" : 'создать',

						       "on_pressed" : [
							   ['s', context.service, 'get', 'area'],
							   ['ff', function(sequnce,ret, next){
								if(ret.last == 'pressed'){
								    sequence.push('s', 'ret[-1]', 'open', 'editor')
								}
							    }]
						       ]
						   }, 'action_panel', 'maximized']	 
				     },
				     {
					 action : ['s', ui.label, 'create', {
						       x : "20%",
						       y : "15%",
						       width : "60%",
						       height : "70%",
						       
						       text : "воспользуйтесь инструментами"
						   }, 'action_panel', 'minimized']
				     }

				    ]
			 }
		     ], _stack);
	  });
    
    react("visible_changed",
	  function(client, state){
		//важно что поверхности, они же element, отключаются ui рекурсивно, так что может и не надо будет ничего делать
	      //тут приостанавливаем или возобновляем свою визуальную или иную активность
	  });
}
