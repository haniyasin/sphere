/*
 * Черновик приложения-калькулятора стоимости ремонта 
 */

var ui = require('../../dsa/objects/ui.js');
var uuid = require('../../modules/uuid.js');

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

function chooser(info, fields, stack){
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
			var form_card = new card({name : uuid.generate_str()}, null, stack);
			desc.collection = {};
			form(desc.items, desc.collection, stack);

			new click({
				      width : 1,
				      height : 1,
				      label : 'закончить',
				      on_click : function(sprout, stack){
					  //			  stack.card = prev_card;
					  //			  calc.calculate();
					  for(key in desc.items){
					      alert(desc.items[key].get_value());
					  }

					  form_card.destroy();
				      }
				  }, null, stack);			
		    };
		    new click(desc, null ,stack);
		    break;

		case 'chooser':
		    desc.on_choose = function(fields){
			desc.get_value = function(){
			    return fields;
			};	
		    };
		    desc.element = new chooser(desc, desc.values, stack);		    
		    break;

		case 'entry' :
		    desc.element = new entry(desc, null, stack);
		    desc.get_value = desc.element.get_value;	
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
	    label : 'как сейчас',
	    width : 2,
	    height : 1,
	    values : {
		bad : ['кривой, вода в угол утекает', true],
		medium : ['терпимо, но вода в угол', false],
		good : ['относительно ровный', false],
		concrete : ['бетонный пол', true],
		wood : ['доска, фанера или паркет по лаге', false]    	    		
	    }
	},
	to_do : {
	    type : 'chooser',
	    label : 'что сделать',
	    width : 2,
	    height : 1,
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

var ceiling_desc = {
    type : "form",
    label : "добавить потолок",
    
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
	    label : 'как сейчас',
	    width : 2,
	    height : 1,
	    values : {
		bad : ['кривой, с перепадами', true],
		medium : ['корявый', false],
		good : ['неплохой', false],
		concrete : ['бетон, монолит', true],
		plate : ['плита', false]    	    		
	    }
	},
	to_do : {
	    type : 'chooser',
	    label : 'что сделать',
	    width : 2,
	    height : 1,
	    values : {
		vinil : ['натяжной потолок', false],
		paint : ['выровнять и покрасить', true],
		gips_paint : ['гипсокартон и покрасить', false]		
	    }
	}	
    }
};

var wall_desc = {
    type : "form",
    label : "добавить стену",
    
    items : {
	length : {
	    type : 'entry',
	    advertisement : 'длина в метрах',
	    width : 2,
	    height : 1
	},
	height : {
	    type : 'entry',
	    advertisement : 'высота в метрах',
	    width : 2,
	    height : 1
	},
	condition : {
	    type : 'chooser',
	    label : 'как сейчас',
	    width : 2,
	    height : 1,
	    values : {
		bad : ['кривизна, выбоины, шишки', true],
		medium : ['выбоины и шишки', false],
		good : ['небольшие неровности', false],
		concrete : ['бетон или панель', true],
		brick : ['кирпич', false]
	    }
	},
	to_do : {
	    type : 'chooser',
	    label : 'что сделать',
	    width : 2,
	    height : 1,
	    values : {
		wallpaper : ['обои наклеить', false],
		paint : ['покрасить', true]		
	    }
	}	
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
  	new form(ceiling_desc, room ,stack);
	new form(wall_desc, room, stack);
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
/*	new click({
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
		  }, null, stack);	*/
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

