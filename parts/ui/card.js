/*
 * Implementation of card abstraction
 * 
 * Card - это что-то вроде сетки, на которой можно размещать части и в различных условиях эта сетка может
 * быть отображена как сетка, список, пара списков или как-то иначе. 
 */

exports.init = function(env, dsa, ui){
    dsa.on('card_create', 
	   function(stack, info, add_to){
	       dsa.sprout([
			      {
				  action : ['s', ui.container, 'create', {
						x : '5%',
						y : '5%',
						width : '90%',
						height : '90%'
					    }] 	  
			      }
			  ]);
	   });

    dsa.on('card_delete', 
	   function(stack, id){
	   });    
}