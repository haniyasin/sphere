/*
 * Черновик приложения такси, реализующего два подприложения - одно для пассажира, а другое для перевозчика
 */

var uuid = require('../../modules/uuid.js'),
ui = require('../../dsa/objects/ui.js'),
dsa = require('../../dsa/init.js'),
orders = dsa.get('sphere/objects/taxi/orders');

function create_order(sprout, stack){
    with(ui.highlevel){
	var new_order = new card({
		     name : 'new_order'
		 }, null, stack),
	_from = new entry({
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
			  var order_info = { 
			      id : uuid.generate_str(), 
			      to : _to.get_value(),
		      	      from : _from.get_value(),
			      money : _money.get_value(),
			      when : _when.get_value()
			  };
			  orders.push_order(order_info).run();
			  stack.passenger.make_current(stack);
			  order_item(stack, order_info);
			  new_order.destroy(stack);
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
		      on_click : function(sprout, stack){
			  new card({ name : 'order'}, null, stack);
			  new text({ 
				       height : 1,
				       width : 1,
				       text : 'откуда -' + order_info.from }, null, stack);
			  new text({ 
				       height : 1,
				       width : 1,
				       text : 'куда -' + order_info.to }, null, stack);
			  new text({ 
				       height : 1,
				       width : 1,
				       text : 'цена -' + order_info.money }, null, stack);
			  new text({ 
				       height : 1,
				       width : 1,
				       text : 'когда -' + order_info.when }, null, stack);
			  new click( { 
					 height : 1,
					 width : 1,
					 label : 'изменить' }, null, stack ); 			     
		      }
		  }, null, stack)
    }
}

function passenger(sprout, stack){
    with(ui.highlevel){
	stack.passenger = new card({
				       name : 'passenger'
				   }, null, stack);
	if(typeof stack.passenger.old != 'undefined')
	    return;

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
}

function taxi_order(stack, order_info){
    with(ui.highlevel){	
	new click({
		      width : 2,
		      height : 1,
		      label : 'от [' + order_info.from + '] до [' + order_info.to + '] за [' + order_info.money + ']',
		      on_click : function(sprout, stack){
			  var order_card = new card({ name : 'order' + order_info.from}, null, stack);
			  if(typeof order_card.old != 'undefined')
			      return;

			  new text({ 
				       height : 1,
				       width : 1,
				       text : 'откуда -' + order_info.from }, null, stack);
			  new text({ 
				       height : 1,
				       width : 1,
				       text : 'куда -' + order_info.to }, null, stack);
			  new text({ 
				       height : 1,
				       width : 1,
				       text : 'цена -' + order_info.money }, null, stack);
			  new text({ 
				       height : 1,
				       width : 1,
				       text : 'когда -' + order_info.when }, null, stack);
			  new click( { 
					 height : 1,
					 width : 1,
					 label : 'изменить' }, null, stack ); 			     
		      }
		  }, null, stack)
    }    
}

function taxi(sprout, stack){
    var taxi_card;

    with(ui.highlevel){
	taxi_card = new card( {
				  name : 'taxi'
			      }, null , stack);
	if(typeof taxi_card.old != 'undefined')
	    return;

	new text({
		      height : 1,
		      width : 2,
		      text : 'список заказов'
		  },null, stack);	
    }

    stack.taxi_order = taxi_order;
    orders.get_orders().sprout(
	dsa.seq.f(function(sprout, stack){
		      for(item in stack.orders){
			  stack.taxi_order(stack, stack.orders[item]);
		      }
		  })
    ).run(stack);
    
    orders.on_subscribe = function(sprout, stack){
	taxi_card.make_current(stack);
	taxi_order(stack, stack.order);
//	stack.prev_card.make_current();
    };

    orders.subscribe('_new').run(stack);    
}

module.exports = function(dsa, stack){
    with(ui.highlevel){
	var sub_app_chooser = new card( {
					    name : "app_chooser"
					}, null, stack);
	if(typeof sub_app_chooser.old != 'undefined')
	    return;

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

