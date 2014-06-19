/*
 * Черновик приложения такси, реализующего два подприложения - одно для пассажира, а другое для перевозчика
 */

function _send_order(sprout, stack){
    
}

function create_order(sprout, stack){
    return new card(
	new entry({
		      height : 1,
		      width : 5,
		      advertisement : 'откуда'
		  }),
	new entry({
		      height : 1,
		      width : 5,
		      advertisement : 'куда'
		  }),
	new entry({
		      height : 1,
		      width : 3,
		      advertisement : 'сколько'
		  }),
	new entry({
		      height : 1,
		      width : 5,
		      advertisement : 'когда'
		  }),
	new click_item({
			   height : 1,
			   width : 2,
			   label : 'заказать',
			   on_click : _send_order
		       })
    );    
}

function passenger(sprout, stack){
    var orders;

    return new card(
	new label({
		      height : 2,
		      width : 5,
		      text : 'мои заказы'
		  }),
	new click_item({
			   height : 1,
			   width : 5,
			   label : 'создать новый',
			   on_click : create_order 
		       }),
	msg(orders, 'get_orders_by_id', myid).sprout(
	    f(function(sprout, stack){
		  for(order_id in stack.orders){
		      new passenger_order(stack.orders[order_id]);
		  }
	      })
	),
	msg(orders, 'subscribe_on_orders_by_id')
    )

}

function taxi(sprout, stack){
    var order_list, order;
    return new card(
	new label({
		      height : 2,
		      width : 6,
		      text : 'список заказов'
		  }),
	msg(orders, 'get_orders').sprout(
	    f(function(sprout, stack){
		  for(order_id in stack.orders){
		      new taxi_order(stack.orders[order_id]);
		  }
	      })
	)
    );    
}

exports.init = function(env, dsa){
    dsa.on('create', function(sprout, stack){
	       var sub_app_chooser = new card(
		   new click_item({
				      height : 2,
				      width : 4,
				      label : 'пассажир',
				      on_click : passenger
				  }),
		   new click_item({
				      height : 2,
				      width : 4,
				      label : 'перевозчик',
				      on_click : taxi
				  })
	       );
	   });
    dsa.on('destroy', function(sprout, stack){
	   });
}
