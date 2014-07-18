var orders = [    
],
subscribers = {
    _new : [],
    changed : [],
    removed : [],
    taken : []
};

orders["vah"] = {
    to : 'pio',
    from : 'mega',
    money : 80,
    when : '161210072014'
};

orders["ptah"] = {
    to : 'zbi',
    from : 'uralmash',
    money : 100,
    when : '173010072014'
};

exports.init = function(dsa){
    dsa.on('create', function(sprout ,stack){
	   });
    dsa.on('destroy', function(sprout, stack){
	   });
    dsa.on('push_order', function(sprout, stack, order){
	       orders[order.id] = order;
	       for(key in subscribers._new){
	       	   stack.order = order;
		   dsa.sprout.run(subscribers._new[key], stack);
	       }
//	       dsa.sprout.run(sprout, stack);

//	       var update_obj = {
//	       };
//	       update_obj[order.id] = order;
//	       msg(storage, 'update', order.geo_id, update_obj); 
	   });
    dsa.on('get_orders', function(sprout, stack){
	       stack.orders = orders;
//	       msg(storage, 'extract', geo, { actived : true });
	   });
    dsa.on('get_order_by_id', function(sprout, stack, id){
	       stack.order = orders[id];
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

    /*
     * subscribe requester service on follow events:
     * + order is taken(by taxi)
     * + new order pushed(by passenger)
     * + order is changed(by passenger) 
     * + order is removed(by passenger) 
     */
    dsa.on('subscribe', function(sprout, stack, event, id){
	       if(subscribers.hasOwnProperty(event)){
		   subscribers[event].push(sprout);
	       } else
		   console.log('event with that name is unexist');
	       return true;
	   });
};