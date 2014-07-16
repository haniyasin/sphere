/*
 * Черновик приложения такси, реализующего два подприложения - одно для пассажира, а другое для перевозчика
 */
var uuid = require('../../modules/uuid.js'),
ui = require('../../dsa/objects/ui.js'),
dsa = require('../../dsa/init.js'),
orders = dsa.get('sphere/objects/taxi/orders');

function create_order(sprout, stack){
    with(ui.highlevel){
	new card({
		     name : 'order'
		 }, null, stack);
	var _from = new entry({
				  height : 1,
				  width : 2,
				  advertisement : 'откуда'
			      }, null, stack),
	_to = new entry({
			    height : 1,
			    width : 2,
			    advertisement : 'куда'
			}, null, stack),
	_money = new entry({
			       height : 1,
			       width : 1,
			       advertisement : 'сколько'
			   }, null, stack),
	_when = new entry({
			      height : 1,
			      width : 1,
			      advertisement : 'когда'
			  }, null, stack);
	new click({
		      height : 1,
		      width : 1,
		      label : 'заказать',
		      on_click : function(){
			  //сделать проверку всех значений, to и from  это элементы списка
			  orders.push_order({ 
						id : uuid.generate_str(), 
						to : _to.get_value(),
		      				from : _from.get_value(),
						money : _money.get_value(),
						when : _when.get_value()
					    }).run();   
		      }
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
    orders.get_order_by_id('vah').sprout(
	dsa.seq.f(function(sprout, stack){
			  stack.order_item(stack, stack.order);
		  })
    ).run(stack);
    orders.get_order_by_id('uhaha').sprout(
	dsa.seq.f(function(sprout, stack){
			  stack.order_item(stack, stack.order);
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
//    alert(stack.card + dsa + 'uhaha');
    with(ui.highlevel){
	var sub_app_chooser = new card( {
					    name : "app_chooser"
					}, null, stack);
	new click({
		      height : 1,
		      width : 2,
		      label : 'пассажир',
		      on_click : function(){passenger(null, stack);}
		  }, null, stack);
	new click({
		      height : 1,
		      width : 2,
		      label : 'перевозчик',
		      on_click : function(){taxi(null, stack);}
		  }, null, stack);

    };
	
    this.destroy = function(){
    };
};

