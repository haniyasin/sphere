/*
 * Сервис, который реализует б'ольшую часть функциональности сферы, конечно же используя другие сервисы.
 * Может быть как частью приложения, так и работать отдельно.
 * Его назначение - сосредоточить в себе функциональность сферы полностью абстрагировавшись от способов
 * вывода информации, способов её передачи, хранения и извлечения. По этим причинам, frontend использует ui
 * как frontend себя и backend для хранения и переработки совместно с другими frontend.
 */




exports.init = function(env, dsa){
    var ui;
    var _backend;
    dsa.on('create', 
	   function(sprout, stack, ui, backend){
	       ui = ui;
	       _backend = backend;

	       dsa.sprout.msg(ui, 'size_ask').run();

	       return false;
	       with(dsa.sprout){
		   msg(ui, 'card_create', {
			   name : 'address'
		       }, 'main').sprout(
			   msg(ui, 'part_create', {
				   type : 'text_input',
				   size : 2,
				   advetisement : 'type an address'
			       }, 'address'),
			   msg(ui, 'part_create', {
				   type : 'click_item',
				   size : 2,
				   label : 'go'
			       }, 'address')
		       ).run();
		   msg(ui, 'card_create', {
			   name : 'actions'
		       }, 'main').sprout(
			   msg(ui, 'part_create', {
				   type : 'click_item',
				   size : 2,
				   label : 'edit'
			       }, 'actions'),
			   msg(ui, 'part_create', {
				   type : 'click_item',
				   size : 2,
				   label : 'create'
			       }, 'actions')
		       ).run();
	       }

//    var address_panel = sloader.load('sphere/ui/address_panel', mq, env);
//    var action_panel = sloader.load('sphere/ui/action_panel', mq, env);
//    var area = sloader.load('sphere/ui/area', mq, env);
//    var objects_loader = sloader.load('sphere/objects_loader', mq, env);    
/*
	       seq.run([{
			    name : 'objects_loader',
			    
			    action : ['s', objects_loader, 'init', ui], 
			    
			    next : [
				{
				    action : ['s', area, 'create', ui] 
				},
				{
				    action : ['s', address_panel, 'create', ui]
				},
				{
				    action : ['s', action_panel, 'create', ui]   
				}
			    ]
			}
	    ]);    	       */
	   });
    
    dsa.on('destroy',
	  function(sprout, stack){
	  });
}