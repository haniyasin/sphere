/*
 * taxi application
 */

var uuid = require('../../../modules/uuid.js'),
ui = require('../../../dsa/objects/ui.js'),
dsa = require('../../../dsa/init.js');

var torders = dsa.get('sphere/objects/taxi/orders'), //instance for using by taxi app
ui_orders = [];

function taxi_order(stack, order_info){
    ui_orders[order_info.id] = {};
    with(ui.highlevel){	
	ui_orders[order_info.id].click = new click(
	    {
		width : 2,
		height : 1,
		label : 'от [' + order_info.from + '] до [' + order_info.to + '] за [' + order_info.money + ']',
		on_click : function(sprout, stack){
		    var order_card = new card({ name : 'torder_' + order_info.id}, null, stack);
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
				   label : 'согласиться',
				   on_click : function(sprout, stack){
				       var passenger = dsa.get(order_info.passenger);
				       passenger.take().run(stack);
				   }
			       }, null, stack ); 			     
		    new click( { 
				   height : 1,
				   width : 1,
				   row : true,
				   label : 'написать',
				   on_click : function(sprout, stack){
				       var msg_card = new card({ name : 'msg_to_passenger'}, null, stack),
				       msg_text = new entry({
						     height : 2,
						     width : 3,
						     advertisement : 'Введите ваше сообщение'
						 }, null, stack);
				       new click({
						     height : 1,
						     width : 1,
						     label : 'отправить',
						     on_click : function(sprout, stack){
							 //нужно подгружать сервис пассажира по order_info.passenger
							 var passenger = dsa.get('sphere/objects/taxi/passenger');
							 //здесь создаём карточку-форму сообщения
							 passenger.msg(order_info.id, msg_text.get_value()).run(stack);
						     }
						 }, null, stack);
				       new click({
						     height : 1,
						     width : 1,
						     row : true,
						     label : 'вернуться',
						     on_click : function(sprout, stack){
							 msg_card.destroy();
						     }
						 }, null, stack);
 				   }
			       }, null, stack ); 			     
		}
	    }, null, stack)
    }    
}

exports.init = function(_dsa){
    var display_stack;
    _dsa.on('display', function(sprout, stack){
		display_stack = stack;
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

		torders.on_subscribe = function(sprout, stack){
		    switch(stack.event){
		    case '_new' :
			taxi_card.make_current(stack);
			taxi_order(stack, stack.order);
			break;

		    case 'replace' : 
			ui_orders[stack.order.id].click.set_label('от [' + stack.order.from + '] до [' + stack.order.to + '] за [' + stack.order.money + ']');
			break;

		    case  'remove' :
			ui_orders[stack.order.id].click.destroy();
			break;
		    }
		    //	stack.prev_card.make_current();
		};

		torders.subscribe('_new').run(stack);

		torders.on_get_orders = function(sprout, stack){
		    for(item in stack.orders){
			taxi_order(stack, stack.orders[item]);
			torders.subscribe('replace', stack.orders[item].id).run(stack);
  			torders.subscribe('remove', stack.orders[item].id).run(stack);
		    }	
		};

		torders.get_orders().run(stack);    
	    });

    _dsa.on('msg', function(sprout, stack, id, text){
		ui_orders[id].click.set_label(text);
	    });
};