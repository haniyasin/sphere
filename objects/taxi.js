/*
 * Черновик приложения такси, реализующего два подприложения - одно для пассажира, а другое для перевозчика
 */

var uuid = require('../../modules/uuid.js'),
ui = require('../../dsa/objects/ui.js'),
dsa = require('../../dsa/init.js');

/*
 * passenger app
 */

var porders = dsa.get('sphere/objects/taxi/orders'); //instance for using by passenger app

function edit_order_card(stack, defaults, click_label, click_callback){
    with(ui.highlevel){
	var new_order = new card({
		     name : 'edit_order'
		 }, null, stack);

	var entry_def = {
	    height : 1,
	    width : 2
	};
	if(!defaults.hasOwnProperty('from'))
	    entry_def.advertisement = 'откуда';
	else
	    entry_def.text = defaults.from;
	var _from = new entry(entry_def, null, stack);

	entry_def = {
	    height : 1,
	    width : 2
	};
	if(!defaults.hasOwnProperty('to'))
	    entry_def.advertisement = 'куда';
	else
	    entry_def.text = defaults.to;
	var _to = new entry(entry_def, null, stack);

	entry_def = {
	    height : 1,
	    width : 2
	};
	if(!defaults.hasOwnProperty('money'))
	    entry_def.advertisement = 'сколько';
	else
	    entry_def.text = defaults.money;
	var _money = new entry(entry_def, null, stack);

	entry_def = {
	    height : 1,
	    width : 2
	};
	if(!defaults.hasOwnProperty('when'))
	    entry_def.advertisement = 'когда';
	else
	    entry_def.text = defaults.when;
	var _when = new entry(entry_def, null, stack);

	new click({
		      height : 1,
		      width : 1,    
		      label : click_label,
		      on_click : function(){
			  var order = { 
			      id : defaults.hasOwnProperty('id') ? defaults.id : uuid.generate_str(), 
			      to : _to.get_value(),
		      	      from : _from.get_value(),
			      money : _money.get_value(),
			      when : _when.get_value()
			  };

			  for(key in defaults){
			      if(order[key] == '')
				  order[key] = defaults[key];
			  }
			  click_callback(order);
			  new_order.destroy(stack);
		      }
		  }, null, stack);
    }
}

function create_order(sprout, stack){
    edit_order_card(stack, {}, 'заказать', function(order){
			  //сделать проверку всех значений, to и from  это элементы списка
			  porders.push_order(order).run();
			  stack.passenger.make_current(stack);
			  order_item(stack, order);
		      });
}

function order_item(stack, order_info){
    with(ui.highlevel){	
	var order_click = new click(
	    {
		width : 2,
		height : 1,
		label : 'от [' + order_info.from + '] до [' + order_info.to + '] за [' + order_info.money + ']',
		on_click : function(sprout, stack){
		    var order_card = new card({ name : 'porder_' + order_info.id}, null, stack);
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
				   label : 'изменить',
				   on_click : function(sprout, stack){
				       order_card.destroy(stack);
				       edit_order_card(stack, order_info, 'изменить', function(order){
							   order_info = order;
							   order_click.set_label('от [' + order_info.from + '] до [' + order_info.to + '] за [' + order_info.money + ']');
							   porders.replace_order(order).run();
						       });
				   }
			       }, null, stack ); 			     
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
    porders.get_order_by_id('vah').sprout(
	dsa.seq.f(function(sprout, stack){
		      stack.order_item(stack, stack.order);
		  })
    ).run(stack);

    porders.on_subscribe  = function(sprout, stack){
    };

    porders.subscribe('take').run(stack);
}

/*
 * taxi app
 */

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
				   }
			       }, null, stack ); 			     
		    new click( { 
				   height : 1,
				   width : 1,
				   row : true,
				   label : 'написать',
				   on_click : function(sprout, stack){
				   }
			       }, null, stack ); 			     
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
    torders.get_orders().sprout(
	dsa.seq.f(function(sprout, stack){
		      for(item in stack.orders){
			  stack.taxi_order(stack, stack.orders[item]);
		      }
		  })
    ).run(stack);
    
    torders.on_subscribe = function(sprout, stack){
	switch(stack.event){
	    case '_new' :
	        taxi_card.make_current(stack);
	        taxi_order(stack, stack.order);
	    break;

	    case 'replace' : 
	        ui_orders[stack.order.id].click.set_label('от [' + stack.order.from + '] до [' + stack.order.to + '] за [' + stack.order.money + ']');
	    break;
	}
//	stack.prev_card.make_current();
    };

    torders.subscribe('_new').run(stack);
    torders.subscribe('replace').run(stack);    
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

