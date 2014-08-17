/*
 * Черновик приложения-калькулятора стоимости ремонта 
 */

var ui = require('../../dsa/objects/ui.js');

var calc = {
    type : 'flat',
    rooms : [],
    kitchens : [],
    bedrooms : [],

    calculate : function(){
	for(key in this.rooms){
	    alert(this.rooms[key].floor.width * this.rooms[key].floor.length * 300);
	}
    }
};

function chooser(info, lala, stack){
    info.on_click = function(sprout, stack){
	
    };
    new ui.highlevel.click(info, null, stack);
}

var floor_condition = {
    bad : ['плохое', true],
    medium : ['среднее', false],
    good : ['хороше', false],
    concrete : ['бетонный пол', true],
    wood : ['доска, фанера или паркет по лаге', false]    
},
floor_to_do = {
//    wood : ['фанера по лаге', false],
//    concrete : ['растворная стяжка', false],
//    lightconcrete : ['лёгкое выравнивание самовыравнивающимся раствором', false],
    laminate : ['уложить ламинат', false],
    pvh : ['уложить линолиум', true]
};

function add_room_floor(sprout, stack){
    with(ui.highlevel){
	var floor_card = new card({
				      name : 'добавляем пол'
				  }, null, stack);    
	if(typeof floor_card.old != 'undefined')
	    return;

	new entry({
		      width : 1,
		      height : 1,
		      advertisement : 'ширина в метрах'
		  }, null, stack);    
	new entry({
		      width : 1,
		      height : 1,
		      advertisement : 'длина в метрах'
		  }, null, stack);
	new chooser({
			width : 2,
			height : 1,
			label : 'нынешнее состояние'	    
		    }, null, stack);
	new chooser({
			width : 2,
			height : 1,
			label : 'что нужно сделать'
		    }, null, stack);	
	new click({
		      width : 1,
		      height : 1,
		      label : 'закончить',
		      on_click : function(sprout, stack){
			  calc.rooms.push({
					      floor : {
						  width : 5,
						  length : 5
					      }
					  });
			  calc.calculate();
		      }
		  }, null, stack);
    }
}

function add_room_ceiling(sprout, stack){
    
}

function add_room_wall(sprout, stack){
    
}

function add_room(sprout, stack){
    with(ui.highlevel){
	var room_card = new card({
				     name : 'новая комната'
				 }, null, stack);
	if(typeof room_card.old != 'undefined')
	    return;
	new entry({
		      height : 1,
		      width : 2,
		      advertisement : 'название комнаты'
		  }, null, stack);
	new click({
		      height : 1,
		      width : 1,
		      label : 'добавить пол',
		      on_click : add_room_floor
		   }, null, stack);
  	new click({
		      height : 1,
		      width : 1,
		      label : 'добавить потолок',
		      on_click : add_room_ceiling
		   }, null, stack);
	new click({
		      height : 1,
		      width : 1,
		      label : 'добавить стену',
		      on_click : add_room_wall
		   }, null, stack);
      }    
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
		      on_click : function(){
			  calc.type = 'flat',
			  flat(null, stack);
		      }
		  }, null, stack);
	calc.summ = new text({
				 height : 1,
				 width : 1,
				 text : '0 рублей'
			     }, null, stack);
/*	new click({
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
*/
    };
	
    this.destroy = function(){
    };    
}

