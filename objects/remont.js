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
	    //alert(this.rooms[key].floor.width * this.rooms[key].floor.length * 300);
	}
    }
};

function chooser(info, fields, lala, stack){
    var chooser_click;
    with(ui.highlevel){
	info.on_click = function(sprout, stack){
	    var chooser_card = new card({ name : 'выбирете один или несколько пунктов'}, null ,stack);
	    var choosed_fields = {};
	    for(key in fields){
		(function(key){
		     new click({
				   width : 2,
				   height : 1,
				   label : fields[key][0],
				   on_click : function(sprout, stack){
				       choosed_fields[key] = true;
				   }
			       }, null, stack);		     
		 })(key);
	    }

	    new click({
			  width : 1,
			  height : 1,
			  label : 'закончить',
			  on_click : function(sprout, stack){
			      chooser_card.destroy();
			      info.on_choose(choosed_fields);
			  }
		      }, null, stack);
	    
	};
	chooser_click = new ui.highlevel.click(info, null, stack);	
    }
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

function chooser_fields_to_string(choosed_fields, fields_list){
    var string = '';
    for(key in choosed_fields){
	string += fields_list[key][0] + '=да;'; 
    }

    return string;
}

function add_room_floor(sprout, stack){
    var prev_card = stack.card;
    with(ui.highlevel){
	var floor_card = new card({
				      name : 'добавляем пол'
				  }, null, stack);    
	if(typeof floor_card.old != 'undefined')
	    return;

	var floor = {
	};

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
			label : 'нынешнее состояние',
			on_choose : function(fields){
			    floor.condition = fields;
			}
		    }, floor_condition, null, stack);
	new chooser({
			width : 2,
			height : 1,
			label : 'что нужно сделать',
			on_choose : function(fields){
			    floor.to_do = fields;
			}
		    }, floor_to_do, null, stack);	
	new click({
		      width : 1,
		      height : 1,
		      label : 'закончить',
		      on_click : function(sprout, stack){
			  stack.card = prev_card;
			  new text({
				       width : 3,
				       height : 1,
				       text : chooser_fields_to_string(floor.condition, floor_condition) 
				   }, null, stack);
			  new text({
				       width : 3,
				       height : 1,
				       text : chooser_fields_to_string(floor.to_do, floor_to_do)
				   }, null, stack);
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

