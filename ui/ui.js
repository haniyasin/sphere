exports.ui = function(context, send, react, sequence){
    react("init", 
	  function(next){
	      sequence(['s', 'dsa.manager', 'get', 'dsa.ui'],
		       ['s', context.service, 'set', 'ui', 'ret.last'],
		       ['s', 'dsa.manager', 'get', 'sphere.ui.address_panel'],
		       ['s', context.service, 'set', 'address_panel', 'ret.last'],
		       ['s', 'dsa.manager', 'get', 'sphere.objects_maker'],
		       ['s', context.service, 'set', 'objects_maker', 'ret.last'],
		       ['s', 'dsa.manager', 'get', 'sphere.ui.area', 'primary', 'ret[4]'],
		       ['s', context.service, 'set', 'primary_area', 'ret.last'],
		       ['s', 'dsa.manager', 'get', 'sphere.ui.area', 'slave', 'ret[4]'],
		       ['s', context.service, 'set', 'slave_area', 'ret.last'],
		       ['s', 'dsa.manager', 'get', 'sphere.ui.action_panel'],
		       ['s', context.service, 'set', 'action_panel'],
		       ['s', next.service, "initialized"]);
	      
	  });
    react("show_hide", 
	  function(next){
	      send(context.get("ui"), "show_hide");
	  });
}
