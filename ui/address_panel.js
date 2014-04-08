/*
 * top panel with address, go button and other controls
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
			     name : 'addr_panel',
			     action : ['s', ui.panel, 'create', {
					   x : '5%',
					   y : '0%',
					   width : '90%',
					   height : '30%',
					   
					   position : 'top',

					   maximized : false
				       }, 'root', '_frame'],

			     next : [
				 {
				     name : 'address',
				     action : ['s', ui.entry, 'create', {
						   "placeholder" : 'введите адрес',
						   "x" : "0%",
						   "y" : "0%",
						   "width" : "76%",
						   "height" : "90%",
						   "on_text_change" : [
						       ['f', function(stack, sprout_pusher){
							    console.log(stack);
							} ]
						   ] 
					       }, 'addr_panel', 'maximized'],
				 },
				 {
				     action : ['s', ui.button, 'create', {
						   "color" : 'red',
						   "x" : "76%",
						   "y" : "0%",
						   "width" : "24%",
						   "height" : "90%",

						   "label" : 'загрузить',
						   
						   "on_pressed" : [
						       ['f', function(stack, sprout_pusher){
							    console.log('button pressed');
							}]
						   ]
					       }, 'addr_panel', 'maximized']
				 },
				 {
				     action : ['s', ui.label, 'create', {
						   x : "20%",
						   y : "5%",
						   width : "60%",
						   height : "90",
						   
						   text : "никакой страницы не загружено"
					       }, 'addr_panel', 'minimized']
				 }
			     ]
			 }
		     ], _stack);
	  });
   
}
