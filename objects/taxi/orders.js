exports.init = function(dsa){
    dsa.on('create', function(sprout ,stack){
	   });
    dsa.on('destroy', function(sprout, stack){
	   });
    dsa.on('push_order', function(sprout, stack, order){
	       var update_obj = {
	       };
	       update_obj[order.id] = order;
	       msg(storage, 'update', order.geo_id, update_obj); 
	   });
    dsa.on('get_orders', function(sprout, stack){
	       msg(storage, 'extract', geo, { actived : true });
	   });
    dsa.on('get_orders_by_id', function(sprout, stack, id){
	       stack.orders = {
		   "vah" : {
		       to : 'pio',
		       from : 'mega',
		       money : 80,
		       when : '161210072014'
		   },
		   "ptah" : {
		       to : 'zbi',
		       from : 'uralmash',
		       money : 100,
		       when : '173010072014'
		   }
	       };
/*	       msg(storage, 'extract', geo, {actived : true}).sprout(
		   f(function(sprout, stack){
			 var founded_orders = {
			     };
			 for(order_id in stack.orders){
			     if(stack.orders[order_id].id == id)
				 founded_orders[id] = stack.orders[order_id];
			 }
		     })
	       );
*/
	   });
    dsa.on('take_order', function(sprout, stack, id){
	       var update_obj = {
		   actived : {}  
	       };
	       update_obj.actived[id] = false;
	       msg(storage, 'update', geo, update_obj);
	   });
    dsa.on('subscribe', function(sprout, stack, id){
	   });
}