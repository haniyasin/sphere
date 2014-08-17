/*
 * passenger application
 */

var uuid = require('../../../modules/uuid.js'),
ui = require('../../../dsa/objects/ui.js'),
dsa = require('../../../dsa/init.js');

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

var orders = [];

function order_item(stack, order_info){
    with(ui.highlevel){	
	var order = orders[order_info.id] = {};
	order.click = new click(
	    {
		width : 2,
		height : 1,
		label : 'от [' + order_info.from + '] до [' + order_info.to + '] за [' + order_info.money + ']',
		on_click : function(sprout, stack){
		    order.card = new card({ 
					      name : 'porder_' + order_info.id,
					      width : 3
					  }, null, stack);

		    if(typeof order.card.old != 'undefined')
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
				       order.card.destroy(stack);
				       edit_order_card(stack, order_info, 'изменить', function(_order){
							   order_info = _order;
							   order.click.set_label('от [' + order_info.from + '] до [' + order_info.to + '] за [' + order_info.money + ']');
							   porders.replace_order(_order).run();
						       });
				   }
			       }, null, stack);
 		    new click( {
				   height : 1,
				   width : 1,
				   row : true,
				   label : 'удалить',
				   on_click : function(sprout, stack){
				       order.click.destroy();
				       order.card.destroy();
				       porders.remove_order(order_info.id).run(stack);
				   }
			       }, null ,stack);
		}
	    }, null, stack)
    }
}

exports.init = function(_dsa){
    var display_stack;
    _dsa.on('display', function(sprout, stack){
		display_stack = stack;
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
		
		//    porders.subscribe('take',).run(stack);
	    });
    
    _dsa.on('msg', function(sprout, stack, id, _text){
		orders[id].click.set_label(_text);
		with(ui.highlevel){
		    new card({ name : 'msg' + id}, null, display_stack);
		    new text({
				 height : 1,
				 width : 1,
				 text : _text
			     }, null, display_stack);
		    var answer = new entry({
					       height : 2,
					       width : 3,
					       advertisement : 'введите ответ'
					   }, null, display_stack);
		    new click({
				  height : 1,
				  width : 1,
				  label : 'ответить',
				  on_click : function(sprout, stack){
				      var taxi = dsa.get('sphere/objects/taxi/taxi');
				      taxi.msg(id, answer.get_value()).run(stack);
				  }
			      }, null, display_stack);
		}
		//установить каллбэк для отображения сообщения
	   });
};