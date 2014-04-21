/*
 * Implementation of part(element, item) abstraction
 * 
 * Часть - это фрагмент menu или card. Каждая часть может занимать какое-то пространство, обозначаемое
 * числом от 1 до 10. Размер это всего лишь предпочитаемая величина. Помимо размера возможно назначить 
 * приоритет для вертикального и горизонтального отображения.
 * С помощью частей формируется весь ui, располагая эти части либо в виде элементов меню, либо в виде
 * содержимого card. 
 */

exports.init = function(env, dsa, ui){
    dsa.on('part_create',
	  function(sprout, stack, info, add_to){
	      var block_size = dsa.context.get('block_size');

	      if(!info.hasOwnProperty('type')){
		  console.log('type of part is not setted');
		  return false;
	      };
	      if(!info.hasOwnProperty('width')){
		  console.log('width of part is not setted');
		  return false;
	      };
	      if(!info.hasOwnProperty('height')){
		  console.log('height of part is not setted');
		  return false;
	      };

	      switch(info.type){
	      case 'text_input' :
		  //something like a entry
		  with(dsa.sprout){
		      stack['ui_service'] = ui.entry;
		      stack['part'] = {
			  x : '0%',
			  width : (info.width * block_size.width) + 'px',
			  height : (info.height * block_size.height)  + 'px',
			  placeholder : info.advetisement
		      };

		      msg(dsa.context.service, 'card_get_hoffset', info.height).sprout(
			  f(function(sprout, stack){
				var info = stack.part;
				info.y = stack.card_hoffset  + 'px';
				sprout.msg(stack.ui_service, 'create', info).run(stack);
			    })
		      ).run(stack);
		  }
		  break;
		  
	      case 'click_item' : 
		  //button, list click item or something else
		  with(dsa.sprout){
		      stack['ui_service'] = ui.button;
		      stack['part'] = {
			  x : '0%',
			  width : (info.width * block_size.width) + 'px',
			  height : (info.height * block_size.height)  + 'px',
			  label : info.label
		      };

		      msg(dsa.context.service, 'card_get_hoffset', info.height).sprout(
			  f(function(sprout, stack){
				var info = stack.part;
				info.y = stack.card_hoffset  + 'px';
				sprout.msg(stack.ui_service, 'create', info).run(stack);
			    })
		      ).run(stack);
		  }
		  break;
	      };
	  });

    dsa.on('part_delete',
	  function(sprout,stack, id){
	  });
};