/*
 * implementation of orders service for using by many passenger or taxi clients
 */
var error = require('../../../parts/error.js');

var orders = [    
];

orders["vah"] = {
    id : 'vah',
    to : 'pio',
    from : 'mega',
    money : '80',
    when : '161210072014'
};

orders["ptah"] = {
    id : 'ptah',
    to : 'zbi',
    from : 'uralmash',
    money : '100',
    when : '173010072014'
};

function subscribers(event_names, dsa){
    var handlers = {};
    
    for(key in event_names){
	handlers[event_names[key]] = [];
    }

    this.emit = function(event_name, stack){
	var _handlers = handlers[event_name];
	for(key in _handlers){
	    stack['event'] = event_name;
	    dsa.sprout.run(_handlers[key], stack);
	}
    };

    this.subscribe = function(event_name, sprout){
	if(!handlers.hasOwnProperty(event_name))
	    console.log(new error('event is not exist', event_name));
	handlers[event_name].push(sprout);
    };
}


exports.init = function(dsa){
    var events = new subscribers(['_new', 'replace', 'remove', 'take'], dsa);
    dsa.on('create', function(sprout ,stack){
	   });
    dsa.on('destroy', function(sprout, stack){
	   });
    dsa.on('push_order', function(sprout, stack, order){
	       orders[order.id] = order;
	       stack.order = order;
	       events.emit('_new', stack);
	       
	       //	       var update_obj = {
	       //	       };
	       //	       update_obj[order.id] = order;
	       //	       msg(storage, 'update', order.geo_id, update_obj); 
	   });

    dsa.on('replace_order', function(sprout, stack, order){
	       orders[order.id] = order;
	       stack.order = order;
	       events.emit('replace', stack);
	   });

    dsa.on('remove_order', function(sprout, stack, id){
	       delete orders[id];

	       stack.order = order;
	       events.emit('remove', stack);
	   });

    dsa.on('take_order', function(sprout, stack, id){
/*	       var update_obj = {
		   actived : {}  
	       };
	       update_obj.actived[id] = false;
	       msg(storage, 'update', geo, update_obj);
*/
	       stack.order = order;
	       events.emit('take', stack);
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

    /*
     * subscribe requester service on follow events:
     * + order is taken(by taxi)
     * + new order pushed(by passenger)
     * + order is changed(by passenger) 
     * + order is removed(by passenger) 
     */
    dsa.on('subscribe', function(sprout, stack, event, id){
	       events.subscribe(event, sprout);
	       return true;
	   });
};