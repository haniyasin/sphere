/*
 * Черновик приложения такси, реализующего два подприложения - одно для пассажира, а другое для перевозчика
 */

var ui = require('../../dsa/objects/ui.js'),
dsa = require('../../dsa/init.js');

function _send_order(sprout, stack){
    
}

function create_order(sprout, stack){
    stack = [];
    
    with(ui.highlevel){
	new card({
		     name : 'order'
		 }, null, stack);
	new entry({
		      height : 1,
		      width : 2,
		      advertisement : 'откуда'
		  }, null, stack);
	new entry({
		      height : 1,
		      width : 2,
		      advertisement : 'куда'
		  }, null, stack),
	new entry({
		      height : 1,
		      width : 1,
		      advertisement : 'сколько'
		  }, null, stack),
	new entry({
		      height : 1,
		      width : 1,
		      advertisement : 'когда'
		  }, null, stack),
	new click({
		      height : 1,
		      width : 1,
		      label : 'заказать',
		      on_click : _send_order
		  }, null, stack);
    }
}

function order_item(stack, order_info){
    with(ui.highlevel){	
	new click({
		      width : 2,
		      height : 1,
		      label : 'от [' + order_info.from + '] до [' + order_info.to + '] за [' + order_info.money + ']',
		      on_click : function(){}
		  }, null, stack)
    }
}

function passenger(sprout, stack){
    var orders = dsa.get('sphere/objects/taxi/orders');
    stack = [];

    with(ui.highlevel){
	new card({
		     name : 'passenger'
		 }, null, stack);
	
	new text({
		      height : 1,
		      width : 2,
		      text : 'мои заказы'
		  }, null ,stack),
	new click({
			   height : 1,
			   width : 2,
			   label : 'создать новый',
			   on_click : create_order 
		       }, null, stack);	
    }
    
    stack.order_item = order_item;
    orders.get_orders_by_id('myid').sprout(
	dsa.seq.f(function(sprout, stack){
		      for(order_id in stack.orders){
			  stack.order_item(stack, stack.orders[order_id]);
		      }
		  })
    ).run(stack);
    orders.subscribe('myid').run();
}

function taxi(sprout, stack){
    var orders = dsa.get('sphere/objects/taxi/orders');
    stack = [];
    with(ui.highlevel){
	new card( {
		      name : 'taxi'
		  }, null , stack);
	new text({
		      height : 1,
		      width : 2,
		      text : 'список заказов'
		  },null, stack);	
    }

 //   msg(orders, 'get_orders').sprout(
//	    f(function(sprout, stack){
//		  for(order_id in stack.orders){
//		      new taxi_order(stack.orders[order_id]);
//		  }
//	      })
//	)
//    );    
}

module.exports = function(dsa, stack){
    stack = [];
//    alert('ddddd');
    with(ui.highlevel){
	var sub_app_chooser = new card( {
					    name : "app_chooser"
					}, null, stack);
	new click({
		      height : 2,
		      width : 2,
		      label : 'пассажир',
		      on_click : function(){sub_app_chooser.destroy();passenger();}
		  }, null, stack);
	new click({
		      height : 2,
		      width : 2,
		      label : 'перевозчик',
		      on_click : function(){sub_app_chooser.destroy();taxi();}
		  }, null, stack);

    };
	
    this.destroy = function(){
    };
};

