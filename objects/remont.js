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

function chooser_fields_to_string(choosed_fields, fields_list){
    var string = '';
    for(key in choosed_fields){
	string += fields_list[key][0] + '=да;'; 
    }

    return string;
}

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
			      chooser_click.set_label(chooser_fields_to_string(choosed_fields, fields));
			      info.on_choose(choosed_fields);
			  }
		      }, null, stack);
	    
	};
	chooser_click = new ui.highlevel.click(info, null, stack);	
    }
}

function form(desc, parent, stack){
    with(ui.highlevel){	
	for(key in desc){
	    if(typeof desc[key] == 'string' && key == 'type'){
		switch(desc[key]){
		case 'form' :
		    if(!desc.hasOwnProperty('label'))
		       return 'label is not found';
		    desc.width = 2;
		    desc.height = 1;
		    desc.on_click = function(sprout, stack){
			//FIXME uuid generate instead form string
			var form_card = new card({name : 'form'}, null, stack);
			if(typeof form_card.old != 'undefined')
			    return;
			desc.collection = {};
			form(desc.items, desc.collection, stack);
		    };
		    new click(desc, null ,stack);
		    break;
		case 'chooser':		    
		    break;
		case 'entry' :
		    new entry(desc, null, stack);
		    break;
		}    	    
	    } else
		if(typeof desc[key] == 'object' && key != 'items')
		    form(desc[key], {}, stack);
	}
    }
}

var floor_desc = {
    type : 'form',
    label : 'добавить пол',
    
    items : {
	width : {
	    type : 'entry',
	    advertisement : 'ширина в метрах',
	    width : 2,
	    height : 1
	},
	length : {
	    type : 'entry',
	    advertisement : 'длина в метрах',
	    width : 2,
	    height : 1
	},
	condition : {
	    type : 'chooser',
	    label : 'текущее состояние',
	    values : {
		bad : ['плохое', true],
		medium : ['среднее', false],
		good : ['хороше', false],
		concrete : ['бетонный пол', true],
		wood : ['доска, фанера или паркет по лаге', false]    	    		
	    }
	},
	to_do : {
	    type : 'chooser',
	    label : 'что сделать',
	    values : {
		//    wood : ['фанера по лаге', false],
		//    concrete : ['растворная стяжка', false],
		//    lightconcrete : ['лёгкое выравнивание самовыравнивающимся раствором', false],
		laminate : ['уложить ламинат', false],
		pvh : ['уложить линолиум', true]		
	    }
	}	
    }	    
};

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

	floor.to_do = new chooser({
				      width : 2,
				      height : 1,
				      label : 'что нужно сделать'
				  }, floor_to_do, null, stack);	
	new click({
		      width : 1,
		      height : 1,
		      label : 'закончить',
		      on_click : function(sprout, stack){
			  stack.card = prev_card;
			  for(key in floor){
			      floor[key] = floor[key].get_value();
			  }
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
	var room = {};
	new entry({
		      height : 1,
		      width : 2,
		      advertisement : 'название комнаты'
		  }, null, stack);
	new form(floor_desc, room, stack);
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

