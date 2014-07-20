/*
 * Черновик приложения-калькулятора стоимости ремонта 
 */

var ui = require('../../dsa/objects/ui.js');

function add_room(sprout, stack){
    
}

function add_bathroom(sprout, stack){
    
}

function add_kitchen(sprout, stack){
    
}

function flat(sprout, stack){
    with(ui.highlevel){
	var flat = new card({
		     name : 'flat'
		 }, null, stack);
	if(typeof flat.old != 'undefined')
	    return;

	new text({
		      height : 1,
		      width : 2,
		      text : 'сбор информации'
		  }, null ,stack);
	new entry({
		      height : 1,
		      width : 2,
		      advertisement : 'адрес'
		  }, null, stack);
	new click({
		      height : 1,
		      width : 2,
		      label : 'добавить комнату',
		      on_click : add_room 
		  }, null, stack);	
	new click({
		      height : 1,
		      width : 2,
		      label : 'добавить санузел',
		      on_click : add_bathroom 
		  }, null, stack);	
	new click({
		      height : 1,
		      width : 2,
		      label : 'добавить кухню',
		      on_click : add_kitchen 
		  }, null, stack);	
    }
    
//    stack.order_item = order_item;
//    orders.get_order_by_id('vah').sprout(
//	dsa.seq.f(function(sprout, stack){
//		      stack.order_item(stack, stack.order);
//		  })
//    ).run(stack);
}

module.exports = function(dsa, stack){
    with(ui.highlevel){
	var remont_type = new card( {
					name : "remont_type"
				    }, null, stack);
	if(typeof remont_type.old != 'undefined')
	    return;

	new click({
		      height : 1,
		      width : 1,
		      label : 'квартира',
		      on_click : function(){flat(null, stack);}
		  }, null, stack);
	new click({
		      height : 1,
		      width : 1,
		      label : 'дом',
		      on_click : function(){house(null, stack);}
		  }, null, stack);
	new click({
		      height : 1,
		      width : 1,
		      label : 'гараж',
		      on_click : function(){garage(null, stack);}
		  }, null, stack);

    };
	
    this.destroy = function(){
    };    
}

